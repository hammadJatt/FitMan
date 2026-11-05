import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={styles.page}>
      {/* BACKGROUND OVERLAY */}
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={styles.code}>404</h1>
          <h2 style={styles.title}>Page Not Found</h2>

          <p style={styles.text}>
            Oops! The page you are looking for doesn’t exist or has been moved.
            Please check the URL or return to the homepage.
          </p>

          <div style={styles.actions}>
            <Link to="/" style={styles.primaryBtn}>
              Go to Dashboard
            </Link>
            <Link to="/feedback" style={styles.secondaryBtn}>
              Report a Problem
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/assets/img/notfound.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Poppins, sans-serif",
    color: "#fff",
  },

  overlay: {
    minHeight: "100vh",
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    textAlign: "center",
  },

  content: {
    maxWidth: "600px",
  },

  code: {
    fontSize: "140px",
    fontWeight: "900",
    color: "#ff7a18",
    marginBottom: "10px",
    lineHeight: 1,
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "10px",
    color : "#fff",
  },

  text: {
    fontSize: "16px",
    color: "#ddd",
    lineHeight: 1.8,
    marginBottom: "30px",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "14px 24px",
    background: "linear-gradient(135deg, #ff7a18, #ff4500)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "600",
  },

  secondaryBtn: {
    padding: "14px 24px",
    border: "1px solid #ff7a18",
    color: "#ff7a18",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "600",
  },
};
