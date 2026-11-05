import { Link } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";
import FitnessImagesSection from "../components/FitnessImagesSection";

export default function Dashboard() {
  return (
    <>
 
      {/* HERO / HEADER */}
     <section style={styles.hero}>
  <div style={styles.overlay}>
    <div style={styles.heroContent}>
      <h1 style={styles.heroTitle}>Track Your Fitness</h1>
      <h1 style={styles.heroTitle}>
        On
        <img
          src="/assets/img/brandlogow.png"
          alt="Gym Center Logo"
          style={{
            height: "130px",
            width: "auto",
            padding: "0 0 50px 20px",
          }}
        />
      </h1>

      <p style={styles.heroSubtitle}>
        Track your workouts, monitor your nutrition, and transform your health
      </p>

      <div style={styles.heroButtons}>
        <Link to="/workout" style={styles.heroBtnPrimary}>
          Start Workout
        </Link>
        <Link to="/nutrition" style={styles.heroBtnSecondary}>
          Track Nutrition
        </Link>
      </div>
    </div>
  </div>
</section>

      <WhyChooseUs/>


      {/* MAIN CONTENT */}
      <div style={styles.container}>
        {/* ABOUT */}
        <section id="/About" style={styles.about}>
          <h2 style={styles.sectionTitle}>About This Website</h2>
          <p style={styles.text}>
            This fitness tracking platform helps you stay consistent with your
            health goals by allowing you to track <strong>workouts</strong>,
            calculate calories burned, and manage your daily
            <strong> nutrition intake</strong>. Everything is saved securely and
            visualized with charts to help you improve over time.
          </p>
        </section>

        {/* FEATURES */}
        <section style={styles.cards}>
          {/* NUTRITION */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🥗 Nutrition Tracking</h3>
            <p style={styles.cardText}>
              Log meals, add food items, calculate total calories, and visualize
              your nutrition habits using interactive charts.
            </p>
            <ul style={styles.list}>
              <li>✔ Add meals & food items</li>
              <li>✔ Auto calorie calculation</li>
              <li>✔ Edit & delete entries</li>
              <li>✔ Calories chart</li>
            </ul>
            <Link to="/nutrition" style={styles.button}>
              Go to Nutrition Tracker
            </Link>
          </div>

          {/* WORKOUT */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🏋️ Workout Tracking</h3>
            <p style={styles.cardText}>
              Track workouts with date & time, calculate calories burned, and
              monitor workout duration using charts.
            </p>
            <ul style={styles.list}>
              <li>✔ Multiple workout types</li>
              <li>✔ Auto calorie burn calculation</li>
              <li>✔ Date & time tracking</li>
              <li>✔ Workout duration chart</li>
            </ul>
            <Link to="/workout" style={styles.button}>
              Go to Workout Tracker
            </Link>
          </div>
        </section>

        <FitnessImagesSection/>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
hero: {
  position: "relative",  
  height: "700px",
  backgroundImage: "url(/assets/img/hero/hero-1.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
},


overlay: {
  height: "100%",
  background: "rgba(0,0,0,0.30)",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "90px 8% 0", 
},

  heroContent: {
    maxWidth: "500px",
    color: "#fff",
    textAlign: "left",
  },

  heroTitle: {
    fontSize: "46px",
    fontWeight: "800",
    color: "#ff7a18",
    marginBottom: "15px",
    lineHeight: 1.2,
  },

  heroSubtitle: {
    fontSize: "18px",
    lineHeight: 1.7,
    marginBottom: "25px",
    color: "#ddd",
  },

  heroButtons: {
    display: "flex",
    gap: "15px",
  },

  heroBtnPrimary: {
    padding: "14px 22px",
    background: "linear-gradient(135deg, #ff7a18, #ff4500)",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
    borderRadius: "6px",
  },

  heroBtnSecondary: {
    padding: "14px 22px",
    border: "1px solid #ff7a18",
    color: "#ff7a18",
    textDecoration: "none",
    fontWeight: "600",
    borderRadius: "6px",
  },

  container: {
    maxWidth: "1200px",
    margin: "60px auto",
    padding: "0 20px",
    color: "#fff",
  },

  about: {
    background: "rgba(0,0,0,0.85)",
    padding: "30px",
    borderRadius: "12px",
    marginBottom: "50px",
  },

  sectionTitle: {
    fontSize: "28px",
    marginBottom: "15px",
    color: "#ff7a18",
  },

  text: {
    fontSize: "16px",
    lineHeight: 1.8,
    color: "#ddd",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
  },

  card: {
    background: "linear-gradient(145deg, #1a1a1a, #0f0f0f)",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
  },

  cardTitle: {
    fontSize: "24px",
    color: "#ff7a18",
    marginBottom: "10px",
  },

  cardText: {
    fontSize: "15px",
    lineHeight: 1.7,
    marginBottom: "15px",
    color: "#ccc",
  },

  list: {
    listStyle: "none",
    padding: 0,
    marginBottom: "20px",
    color: "#eee",
    lineHeight: 1.8,
  },

  button: {
    display: "inline-block",
    padding: "12px 20px",
    background: "linear-gradient(135deg, #ff7a18, #ff4500)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "600",
  },
};
