import React, { useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    rating: 0,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (form.rating === 0) {
      setError("❌ Please select a rating");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      // 🔹 Make sure your backend is running at localhost:5000
      await axios.post("http://localhost:5000/api/feedback", form, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess("Feedback sent successfully!");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        rating: 0,
      });
    } catch (err) {
      console.error("Feedback Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "❌ Failed to send feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BREADCRUMB */}
      <section
        className="breadcrumb-section"
        style={{
          backgroundImage: "url(/assets/img/breadcrumb-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 0",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb-text">
                <h2>FEEDBACK</h2>
                <div className="bt-option">
                  <a href="/">Home</a>
                  <span>Feedback</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            {/* LEFT INFO */}
            <div className="col-lg-6">
              <div className="section-title contact-title">
                <span>FeedBack</span>
                <h2>We Value Your Feedback</h2>
              </div>

              <div className="contact-widget">
                <div className="cw-text">
                  <p>
                    Great fitness tracker! The interface is clean, easy to use, and helps me stay consistent with my workouts and health goals.
                  </p>

                  <p>This fitness tracker keeps me motivated every day. Tracking my workouts, steps, and progress has never been easier. Highly recommended for anyone serious about their health!</p>
                
                <p>I love how this fitness tracker organizes all my workout data in one place. The progress charts and activity tracking make it easy to see improvements over time.</p>
                <p>The website is fast, responsive, and visually appealing. Everything from workout tracking to progress analysis feels smooth and well-designed.</p>
                </div>

              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="col-lg-6">
              <div className="leave-comment">
                <form onSubmit={submitHandler}>
                  <input
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />

                  <textarea
                    name="message"
                    placeholder="Your Feedback"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="5"
                  />

                  <div style={{ marginBottom: "20px" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: star <= form.rating ? "orange" : "#555",
                          marginRight: "5px",
                        }}
                        onClick={() => setForm({ ...form, rating: star })}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Feedback"}
                  </button>

                  {success && <p style={{ color: "lightgreen" }}>{success}</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
              </div>
            </div>
          </div>

          {/* MAP */}
         
        </div>
      </section>
    </>
  );
};

export default Feedback;
