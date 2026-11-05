import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { API } from "../api";
import jsPDF from "jspdf";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

/* ENUMS */
const workoutNames = ["Running", "Walking", "Cycling", "Swimming", "Yoga", "Weight Training", "HIIT", "Stretching"];
const categories = ["Cardio", "Strength", "Flexibility", "HIIT", "Yoga"];
const workoutCategoryMap = { Running: "Cardio", Walking: "Cardio", Cycling: "Cardio", Swimming: "Cardio", Yoga: "Yoga", Stretching: "Flexibility", "Weight Training": "Strength", HIIT: "HIIT" };
const caloriesMap = { Running: 10, Walking: 4, Cycling: 8, Swimming: 9, Yoga: 3, "Weight Training": 6, HIIT: 12, Stretching: 2 };

const Workout = () => {
  const { user } = useUser();
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", duration: "", startDate: "", startTime: "", calories: 0, note: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);


  // Auto-clear success & error messages
  useEffect(() => { if (success) { const timer = setTimeout(() => setSuccess(""), 3000); return () => clearTimeout(timer); } }, [success]);
  useEffect(() => { if (error) { const timer = setTimeout(() => setError(""), 3000); return () => clearTimeout(timer); } }, [error]);

  // Fetch workouts
  const fetchWorkouts = useCallback(async () => {
    if (!user) return;
    try { 
      const res = await API.get(`/workout/${user.id}`); 
      setWorkouts(res.data); 
    } catch (err) { console.error(err); }
  }, [user]);
  useEffect(() => { fetchWorkouts(); }, [fetchWorkouts]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const category = workoutCategoryMap[value] || "";
      const calories = value && form.duration ? caloriesMap[value] * Number(form.duration) : 0;
      setForm({ ...form, name: value, category, calories });
    } else if (name === "duration") {
      const durationNum = Number(value);
      const calories = form.name ? caloriesMap[form.name] * durationNum : 0;
      setForm({ ...form, duration: value, calories });
    } else { setForm({ ...form, [name]: value }); }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.name || !form.category || !form.startDate || !form.startTime || (form.name && !form.duration)) {
      setError("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      const startTimeISO = new Date(`${form.startDate}T${form.startTime}`).toISOString();
      const payload = { ...form, duration: Number(form.duration), calories: Number(form.calories), startTime: startTimeISO, user: user.id };
      if (editingId) {
        await API.put(`/workout/${editingId}`, payload);
        setSuccess("Workout updated successfully!");
        setEditingId(null);
      } else {
        await API.post("/workout", payload);
        setSuccess("Workout added successfully!");
      }
      setForm({ name: "", category: "", duration: "", startDate: "", startTime: "", calories: 0, note: "" });
      fetchWorkouts();
    } catch (err) { console.error(err); setError("Failed to save workout"); } 
    finally { setLoading(false); }
  };

  const handleEdit = (w) => {
    const dateObj = w.startTime ? new Date(w.startTime) : null;
    setForm({ 
      name: w.name, 
      category: w.category, 
      duration: w.duration, 
      startDate: dateObj ? dateObj.toISOString().split("T")[0] : "", 
      startTime: dateObj ? dateObj.toTimeString().slice(0,5) : "", 
      calories: w.calories || 0, 
      note: w.note || "" 
    });
    setEditingId(w._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (id) => { setDeleteId(id); setShowDeleteModal(true); };
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await API.delete(`/workout/${deleteId}`);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchWorkouts();
    } catch(err) { console.error(err); setError("Failed to delete workout"); }
  };

  const filteredWorkouts = workouts.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterCategory ? w.category === filterCategory : true));
  const visibleWorkouts = showAll ? filteredWorkouts : filteredWorkouts.slice(0, 2);
  const chartData = filteredWorkouts.map(w => ({ name: w.name, duration: w.duration }));
  const exportWorkoutCSV = (w) => {
  const rows = [
    ["Workout Name", w.name],
    ["Category", w.category],
    ["Duration (min)", w.duration],
    ["Calories", w.calories || "N/A"],
    ["Date", new Date(w.startTime).toLocaleString()],
    ["Note", w.note || "N/A"],
  ];

  const csvContent =
    "data:text/csv;charset=utf-8," +
    rows.map(r => r.join(",")).join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = `${w.name}_Workout_Report.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const exportWorkoutPDF = (w) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Workout Report", 20, 20);

  doc.setFontSize(12);
  doc.text(`Workout: ${w.name}`, 20, 40);
  doc.text(`Category: ${w.category}`, 20, 50);
  doc.text(`Duration: ${w.duration} min`, 20, 60);
  doc.text(`Calories: ${w.calories || "N/A"}`, 20, 70);
  doc.text(`Date: ${new Date(w.startTime).toLocaleString()}`, 20, 80);

  if (w.note) {
    doc.text("Note:", 20, 95);
    doc.text(w.note, 20, 105);
  }

  doc.save(`${w.name}_Workout_Report.pdf`);
};




  return (
    <>
      <section className="breadcrumb-section" style={{ backgroundImage: "url(/assets/img/breadcrumb-bg.jpg)", height:"300px", backgroundSize: "cover", backgroundPosition: "center", padding: "100px 0" }}>
        <style>
          {`
            input[type="date"]::-webkit-calendar-picker-indicator,
            input[type="time"]::-webkit-calendar-picker-indicator {
              filter: invert(1);
              cursor: pointer;
            }
          `}
        </style>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb-text">
                <h2>Workout</h2>
                <div className="bt-option"><a href="/">Home</a><span>Workout</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={styles.container}>
        <h1 style={styles.title}>Workout Tracker</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <select name="name" value={form.name} onChange={handleChange} required style={styles.input}>
            <option value="">Select Workout</option>
            {workoutNames.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
          <select name="category" value={form.category} onChange={handleChange} required style={styles.input}>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div style={styles.row}>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required style={styles.col6} />
            <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required style={styles.col6} />
          </div>
          {form.name && <input type="number" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (minutes)" required style={styles.input} />}
          {form.name && <input type="number" name="calories" value={form.calories || ""} readOnly style={{ ...styles.input, backgroundColor: "#474747ff" }} placeholder="Calories burned" />}
          <textarea name="note" value={form.note} onChange={handleChange} placeholder="Add any notes..." rows={3} style={styles.textarea} />
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          <button style={styles.button}>{loading ? "Saving..." : editingId ? "Update Workout" : "Add Workout"}</button>
        </form>

        {/* SEARCH & FILTER */}
        <div style={styles.row}>
          <input type="text" placeholder="Search workout..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.col6} />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={styles.col6}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

     {/* LIST */}
<h2 style={styles.h2}>Your Workouts</h2>

{visibleWorkouts.map(w => {
  const startTime = w.startTime ? new Date(w.startTime) : null;

  return (
    <div key={w._id} style={styles.card}>

      {/* THREE DOT MENU (TOP RIGHT) */}
      <div style={styles.menuWrapper}>
        <button
          style={styles.menuButton}
          onClick={() =>
            setOpenMenuId(openMenuId === w._id ? null : w._id)
          }
        >
          ⋮
        </button>

        {openMenuId === w._id && (
          <div style={styles.menu}>
            <button
              style={styles.menuItem}
              onClick={() => exportWorkoutCSV(w)}
            >
              Export CSV
            </button>
            <button
              style={styles.menuItem}
              onClick={() => exportWorkoutPDF(w)}
            >
              Export PDF
            </button>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <strong>{w.name}</strong> — {w.category} — {w.duration} min
      {w.calories && <> — {w.calories} cal</>}
      {startTime && (
        <> — {startTime.toLocaleDateString()}{" "}
        {startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</>
      )}
      {w.note && <p><em>Note: {w.note}</em></p>}

      {/* ACTION BUTTONS */}
      <div style={styles.actions}>
        <button onClick={() => handleEdit(w)} style={styles.edit}>Edit</button>
        <button onClick={() => confirmDelete(w._id)} style={styles.delete}>Delete</button>
      </div>

    </div>
  );
})}


        {filteredWorkouts.length > 2 && <button style={{ ...styles.showButton, marginTop: 10 }} onClick={() => setShowAll(!showAll)}>{showAll ? "Show Less" : "Show All"}</button>}

        {/* CHART */}
        <h2 style={styles.h2}>Workout Duration Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="duration" fill="#ff7a18" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3 style={{ color: "#ff7a18" }}>Confirm Delete</h3>
            <p>Are you sure you want to delete this workout?</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
              <button onClick={() => setShowDeleteModal(false)} style={modalStyles.cancel}>Cancel</button>
              <button onClick={handleDelete} style={modalStyles.confirm}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Workout;

const styles = {
  container: {
    maxWidth: 900,
    margin: "50px auto",
    padding: 30,
    background: "rgba(0,0,0,0.85)",
    borderRadius: 12,
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    color: "#ff7a18",
    letterSpacing: 1,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 40,
    background: "rgba(255,255,255,0.03)",
    padding: 25,
  },
  row: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
  },
  col6: {
    flex: "1 1 48%",
    padding: "12px 14px",
    border: "1px solid #444",
    background: "#111",
    color: "#fff",
    outline: "none",
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #444",
    background: "#111",
    color: "#fff",
    outline: "none",
  },
  h2: {
    color: "white",
    margin: "20px",
  },
  textarea: {
    padding: "12px 14px",
    border: "1px solid #444",
    background: "#111",
    color: "#fff",
    resize: "vertical",
  },
  button: {
    marginTop: 10,
    padding: 14,  
    border: "none",
    background: "linear-gradient(135deg, #ff7a18, #ff4500)",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  showButton: {
    background: "transparent",
    textDecoration: "underline orange",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    background: "rgba(239,68,68,0.15)",
    padding: 10,
    color: "#ff7a18",
    fontSize: 14,
  },
  success: {
    background: "rgba(16,185,129,0.15)",
    padding: 10,
    color: "#10b981",
    fontSize: 14,
  },
  card: {
  position: "relative",  
  background: "linear-gradient(145deg, #1a1a1a, #0f0f0f)",
  padding: 18,
  marginTop: 14,
  boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
  transition: "transform 0.3s ease",
},

  actions: {
    marginTop: 10,
    display: "flex",
    gap: 10,
  },
  edit: {
    padding: "8px 14px",
    border: "1px solid #ff7a18",
    background: "transparent",
    color: "#ff7a18",
    cursor: "pointer",
  },
  delete: {
    padding: "8px 14px",
    border: "none",
    background: "#ff7a18",
    color: "#000",
    cursor: "pointer",
  },
  export: {
  padding: "8px 12px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  cursor: "pointer"
},
menuWrapper: {
  position: "absolute",
  top: 12,
  right: 12,
},

menuButton: {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: 20,
  cursor: "pointer",
},

menu: {
  position: "absolute",
  top: 24,
  right: 0,
  background: "#1a1a1a",
  border: "1px solid #444",
  borderRadius: 6,
  minWidth: 140,
  zIndex: 10,
},

menuItem: {
  width: "100%",
  padding: "10px 14px",
  background: "transparent",
  border: "none",
  color: "#fff",
  textAlign: "left",
  cursor: "pointer",
},


};
const modalStyles = {
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  modal: { backgroundColor: "#1a1a1a", padding: 25, borderRadius: 12, maxWidth: 400, width: "90%", textAlign: "center", color: "#fff", boxShadow: "0 10px 40px rgba(0,0,0,0.6)" },
  cancel: { padding: "10px 20px", border: "1px solid #ff7a18", background: "transparent", color: "#ff7a18", cursor: "pointer" },
  confirm: { padding: "10px 20px", border: "none", background: "#ff7a18", color: "#000", cursor: "pointer" }
};
