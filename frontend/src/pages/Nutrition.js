import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BACKEND_URL = "http://localhost:5000/api/nutrition";

const Nutrition = () => {
  const { user } = useUser();

  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    mealType: "",
    foodItems: [{ name: "", quantity: "", calories: "" }],
    totalCalories: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMealType, setFilterMealType] = useState("");
  const [openExportMenuId, setOpenExportMenuId] = useState(null);


  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchNutrition = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BACKEND_URL}/${user.id}`);
      setEntries(res.data);
    } catch {
      setError("Failed to fetch nutrition entries.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchNutrition();
  }, [fetchNutrition]);

  const handleFoodChange = (index, field, value) => {
    const items = [...form.foodItems];
    items[index][field] = value;
    setForm({ ...form, foodItems: items });
  };

  const addFoodItem = () =>
    setForm({
      ...form,
      foodItems: [...form.foodItems, { name: "", quantity: "", calories: "" }],
    });

  const removeFoodItem = (index) =>
    setForm({
      ...form,
      foodItems: form.foodItems.filter((_, i) => i !== index),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const totalCalories = form.foodItems.reduce(
      (sum, f) => sum + Number(f.calories || 0),
      0
    );

    const payload = {
      ...form,
      user: user.id,
      totalCalories,
      foodItems: form.foodItems.map((f) => ({
        ...f,
        calories: Number(f.calories || 0),
      })),
    };

    try {
      if (editingId) {
        await axios.put(`${BACKEND_URL}/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post(`${BACKEND_URL}`, payload);
      }
      setForm({ mealType: "", foodItems: [{ name: "", quantity: "", calories: "" }], totalCalories: 0 });
      fetchNutrition();
    } catch {
      setError("Failed to save nutrition entry.");
    }
  };

  const handleEdit = (entry) => {
    setForm({
      mealType: entry.mealType,
      foodItems: entry.foodItems.map((f) => ({ ...f, calories: f.calories.toString() })),
      totalCalories: entry.totalCalories,
    });
    setEditingId(entry._id);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${BACKEND_URL}/${deleteId}`);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchNutrition();
    } catch {
      setError("Failed to delete entry.");
    }
  };

  const filteredEntries = entries.filter(
    (e) =>
      e.mealType.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterMealType ? e.mealType === filterMealType : true)
  );

  const visibleEntries = showAll ? filteredEntries : filteredEntries.slice(0, 2);
  const chartData = filteredEntries.map((e) => ({ name: e.mealType, calories: e.totalCalories }));

const exportCSV = (entry) => {
  const rows = [["Meal Type", "Food", "Quantity", "Calories", "Total Calories"]];

  // Only use this entry
  entry.foodItems.forEach((f) => {
    rows.push([entry.mealType, f.name, f.quantity, f.calories, entry.totalCalories]);
  });

  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${entry.mealType}_nutrition.csv`;
  a.click();
};

const exportPDF = (entry) => {
  const doc = new jsPDF();
  doc.text("Nutrition Report", 14, 15);

  const tableData = [];

  // Add the meal header
  tableData.push([`${entry.mealType} (Total: ${entry.totalCalories} cal)`, "", "", "", ""]);

  // Add each food item
  entry.foodItems.forEach((f) => {
    tableData.push(["", f.name, f.quantity, f.calories, ""]);
  });

  autoTable(doc, {
    head: [["Meal / Food", "Food Name", "Qty", "Calories", "Total"]],
    body: tableData,
    startY: 25,
    theme: "grid",
    headStyles: { fillColor: [255, 122, 24] },
    styles: { fontSize: 10 },
  });

  doc.save(`${entry.mealType}_nutrition.pdf`);
};


  return (
    <>
      <style>
        {`
          input.no-spin::-webkit-outer-spin-button,
          input.no-spin::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input.no-spin { -moz-appearance: textfield; }
        `}
      </style>

      <section
        className="breadcrumb-section"
        style={{
          backgroundImage: "url(/assets/img/nutri.png)",
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 0",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb-text">
                <h2>Nutrition</h2>
                <div className="bt-option">
                  <a href="/">Home</a>
                  <span>Nutrition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={styles.container}>
        <h1 style={styles.title}>Nutrition Tracker</h1>

        {error && <p style={styles.error}>{error}</p>}
        {loading && <p style={{ color: "#fff" }}>Loading...</p>}

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            required
            value={form.mealType}
            onChange={(e) => setForm({ ...form, mealType: e.target.value })}
            style={styles.input}
          >
            <option value="">Select Meal Type</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>

          {form.foodItems.map((item, i) => (
            <div key={i} style={styles.row}>
              <input
                type="text"
                placeholder="Food Name"
                value={item.name}
                onChange={(e) => handleFoodChange(i, "name", e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleFoodChange(i, "quantity", e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Calories"
                className="no-spin"
                value={item.calories}
                onChange={(e) => handleFoodChange(i, "calories", e.target.value)}
                style={styles.input}
                required
              />
              <button type="button" onClick={() => removeFoodItem(i)} style={styles.delete}>
                ✕
              </button>
            </div>
          ))}

          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" onClick={addFoodItem} style={styles.button}>
              Add Food
            </button>
            <button type="submit" style={styles.button}>
              {editingId ? "Update Entry" : "Add Entry"}
            </button>
          </div>
        </form>

        {/* SEARCH & FILTER */}
        <div style={styles.row}>
          <input
            type="text"
            placeholder="Search by meal type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <select
            value={filterMealType}
            onChange={(e) => setFilterMealType(e.target.value)}
            style={styles.input}
          >
            <option value="">All Meals</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </div>

        {/* EXPORT OPTIONS */}
        

        {/* ENTRIES LIST */}
        <h2 style={styles.h2}>Your Entries</h2>
        {visibleEntries.map((entry) => (
  <div key={entry._id} style={styles.card}>
    <div style={{ position: "relative" }}>
      {/* Three-dot button */}
      <span
        style={styles.threeDot}
        onClick={() =>
          setOpenExportMenuId(openExportMenuId === entry._id ? null : entry._id)
        }
      >
        ⋮
      </span>

      {/* Dropdown menu */}
    {openExportMenuId === entry._id && (
  <div style={styles.menu}>
    <button onClick={() => exportCSV(entry)} style={styles.menuItem}>
      Export CSV
    </button>
    <button onClick={() => exportPDF(entry)} style={styles.menuItem}>
      Export PDF
    </button>
  </div>
)}

    </div>

    <strong>
      {entry.mealType} — {entry.totalCalories} cal
    </strong>
    <ul>
      {entry.foodItems.map((f, i) => (
        <li key={i}>
          {f.name} — {f.quantity} — {f.calories} cal
        </li>
      ))}
    </ul>
    <div style={styles.actions}>
      <button onClick={() => handleEdit(entry)} style={styles.edit}>
        Edit
      </button>
      <button onClick={() => confirmDelete(entry._id)} style={styles.delete}>
        Delete
      </button>
    </div>
  </div>
))}


        {filteredEntries.length > 2 && (
          <button
            style={{ ...styles.showButton, marginTop: 10 }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}

        {/* CHART */}
        <h2 style={styles.h2}>Calories Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories" fill="#ff7a18" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3 style={{ color: "#ff7a18" }}>Confirm Delete</h3>
            <p>Are you sure you want to delete this entry?</p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 20,
              }}
            >
              <button
                onClick={() => setShowDeleteModal(false)}
                style={modalStyles.cancel}
              >
                Cancel
              </button>
              <button onClick={handleDelete} style={modalStyles.confirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    maxWidth: 900,
    margin: "50px auto",
    padding: 30,
    background: "rgba(0,0,0,0.85)",
    borderRadius: 12,
    color: "#fff",
  },
  title: { textAlign: "center", color: "#ff7a18", marginBottom: 30 },
  form: { display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 },
  row: { display: "flex", gap: 10 },
  input: {
    flex: 1,
    padding: 12,
    background: "#111",
    border: "1px solid #444",
    color: "#fff",
  },
  button: {
    padding: 14,
    background: "linear-gradient(135deg, #ff7a18, #ff4500)",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
threeDot: {
    cursor: "pointer",
    fontSize: 24,
    position: "absolute",
    top: 10,
    right: 10,
    userSelect: "none",
  },
  menu: {
    position: "absolute",
    top: 40,
    right: 0,
    background: "#222",
    border: "1px solid #444",
    borderRadius: 6,
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    overflow: "hidden",
  },
  menuItem: {
    padding: "10px 16px",
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.2s",
  },
  showButton: {
    background: "transparent",
    textDecoration: "underline orange",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  card: { background: "#111", padding: 16, marginBottom: 12 },
  actions: { marginTop: 10, display: "flex", gap: 10 },
  edit: { background: "transparent", border: "1px solid orange", color: "orange", padding: "6px 12px" },
  delete: { background: "#ff7a18", border: "none", padding: "6px 12px", cursor: "pointer" },
  h2: { color: "#fff", margin: "30px 0 15px" },
  error: { color: "red" },
};
styles.menuItem[":hover"] = {
  background: "#ff7a18",
  color: "#000",
};

const modalStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#1a1a1a",
    padding: 25,
    borderRadius: 12,
    maxWidth: 400,
    width: "90%",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
  },
  cancel: {
    padding: "10px 20px",
    border: "1px solid #ff7a18",
    background: "transparent",
    color: "#ff7a18",
    cursor: "pointer",
  },
  confirm: { padding: "10px 20px", border: "none", background: "#ff7a18", color: "#000", cursor: "pointer" },
};

export default Nutrition;
