import React from "react";

export default function TermsAndConditions() {
  return (
    <>
      {/* PAGE WRAPPER */}
      <div style={styles.page}>
        {/* HERO */}
        <section style={styles.hero}>
          <div style={styles.heroOverlay}>
            <h1 style={styles.heroTitle}>Terms & Conditions</h1>
            <p style={styles.heroSubtitle}>
              Please read these terms carefully before using our fitness platform
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <div style={styles.container}>
          <Section
            title="1. Introduction"
            text="These Terms and Conditions govern your use of the Fitness Tracker Website. By accessing or using this platform, you agree to comply with these terms. If you do not agree, you must discontinue use immediately."
          />

          <Section
            title="2. User Authentication & Account Security"
            text="Users are required to create an account to access the dashboard. You are responsible for maintaining the confidentiality of your login credentials and all activities performed under your account."
          />

          <Section
            title="3. Data Collection & Privacy"
            text="The platform collects fitness-related data such as workouts and nutrition entries. All data is securely stored and used solely to provide personalized fitness insights. We do not sell or misuse user data."
          />

          <Section
            title="4. Usage Guidelines"
            list={[
              "Users must provide accurate and truthful information",
              "Unauthorized access or misuse of the system is prohibited",
              "Users must not attempt to modify or disrupt the platform",
            ]}
          />

          <Section
            title="5. Health Disclaimer"
            text="This platform is not a medical service. Workout and nutrition recommendations are for informational purposes only. Users should consult healthcare professionals before making health-related decisions."
          />

          <Section
            title="6. Intellectual Property"
            text="All content, designs, logos, and software components are the intellectual property of the Fitness Tracker Website and may not be copied or reused without permission."
          />

          <Section
            title="7. Account Termination"
            text="We reserve the right to suspend or terminate accounts that violate these terms or engage in unlawful or harmful activities."
          />

          <Section
            title="8. Limitation of Liability"
            text="The platform is provided on an 'as-is' basis. We are not liable for any damages resulting from the use or inability to use the system."
          />

          <Section
            title="9. Modifications to Terms"
            text="These terms may be updated at any time. Continued use of the platform constitutes acceptance of the revised terms."
          />

          <Section
            title="10. Contact Information"
            text="If you have questions regarding these Terms and Conditions, please contact the support team through the Feedback section."
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
    backgroundImage: "url('/assets/img/hero/hero-2.jpg')",
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
    maxWidth: "600px",
    color: "#ddd",
  },

  container: {
    maxWidth: "1000px",
    margin: "0 auto",
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
