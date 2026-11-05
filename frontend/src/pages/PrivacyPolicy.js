import React from "react";

export default function PrivacyPolicy() {
  return (
    <>
      {/* PAGE WRAPPER */}
      <div style={styles.page}>
        {/* HERO */}
        <section style={styles.hero}>
          <div style={styles.heroOverlay}>
            <h1 style={styles.heroTitle}>Privacy Policy</h1>
            <p style={styles.heroSubtitle}>
              Your privacy matters. Learn how we collect, use, and protect your data.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <div style={styles.container}>
          <Section
            title="1. Overview"
            text="This Privacy Policy explains how the Fitness Tracker Website collects, uses, stores, and protects user information. By using this platform, you agree to the practices described in this policy."
          />

          <Section
            title="2. Information We Collect"
            list={[
              "Personal details such as name and email during authentication",
              "Workout data including exercise type, duration, and calories burned",
              "Nutrition data such as meals, food items, and calorie intake",
              "Technical data like browser type and device information",
            ]}
          />

          <Section
            title="3. How We Use Your Information"
            list={[
              "To provide personalized fitness and nutrition tracking",
              "To securely store and retrieve user-specific data",
              "To improve system performance and user experience",
              "To communicate important updates or notifications",
            ]}
          />

          <Section
            title="4. Data Security"
            text="We implement authentication mechanisms, secure storage, and access controls to protect user data from unauthorized access, alteration, or disclosure. User data is accessible only to authenticated users."
          />

          <Section
            title="5. Data Sharing"
            text="We do not sell, trade, or rent user data to third parties. User information is used strictly for platform functionality and academic demonstration purposes."
          />

          <Section
            title="6. Cookies & Tracking Technologies"
            text="The platform may use cookies or similar technologies to maintain login sessions and improve usability. These technologies do not store sensitive personal information."
          />

          <Section
            title="7. User Rights"
            list={[
              "Access and review your personal data",
              "Update or correct inaccurate information",
              "Request deletion of your account and data",
            ]}
          />

          <Section
            title="8. Data Retention"
            text="User data is retained only for as long as necessary to provide services. Upon account deletion, associated data may be permanently removed from the system."
          />

          <Section
            title="9. Policy Updates"
            text="This Privacy Policy may be updated periodically. Continued use of the platform after changes indicates acceptance of the revised policy."
          />

          <Section
            title="10. Contact Us"
            text="If you have any questions or concerns regarding this Privacy Policy, please contact us through the Feedback section of the website."
          />
        </div>
      </div>
    </>
  );
}

/* ================= REUSABLE SECTION ================= */

function Section({ title, text, list }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {text && <p style={styles.text}>{text}</p>}
      {list && (
        <ul style={styles.list}>
          {list.map((item, index) => (
            <li key={index}>✔ {item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    backgroundColor: "#0b0b0b",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    color: "#fff",
  },

  hero: {
    height: "300px",
    backgroundImage: "url('/assets/img/about-us.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },

  heroOverlay: {
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "0 20px",
  },

  heroTitle: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#ff7a18",
    marginBottom: "10px",
  },

  heroSubtitle: {
    fontSize: "16px",
    maxWidth: "650px",
    color: "#ddd",
  },

  container: {
    maxWidth: "1000px",
    margin: "0px auto",
    padding: "40px 20px",
  },

  section: {
    background: "linear-gradient(145deg, #1a1a1a, #0f0f0f)",
    padding: "30px",
    borderRadius: "16px",
    marginBottom: "30px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
  },

  sectionTitle: {
    fontSize: "24px",
    color: "#ff7a18",
    marginBottom: "12px",
  },

  text: {
    fontSize: "15px",
    lineHeight: 1.8,
    color: "#ddd",
  },

  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
    color: "#eee",
    lineHeight: 1.9,
  },
};
