import React from "react";

const FitnessImagesSection = () => {
  return (
    <section className="gallery-section spad">
      <div className="container">
        
        {/* Section Title */}
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-title">
              <span>Our Gallery</span>
              <h2>TRACK YOUR FITNESS JOURNEY</h2>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="gallery-item">
              <img src="assets/img/tacker1.jpeg" alt="Workout Tracking" />
              <h5>Workout Tracking</h5>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="gallery-item">
              <img src="assets/img/tracker2.jpeg" alt="Nutrition Monitoring" />
              <h5>Nutrition Monitoring</h5>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="gallery-item">
              <img src="assets/img/tracker3.jpeg" alt="Progress Analytics" />
              <h5>Progress Analytics</h5>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="gallery-item">
              <img src="assets/img/tracker4.jpeg" alt="Health Insights" />
              <h5>Health Insights</h5>
            </div>
          </div>
        </div>

      </div>

      {/* Inline CSS (optional – remove if already using CSS file) */}
      <style>
        {`
          .gallery-item {
            text-align: center;
            margin-bottom: 30px;
          }

          .gallery-item img {
            width: 100%;
            border-radius: 8px;
          }

          .gallery-item h5 {
            margin-top: 15px;
            font-weight: 600;
            color: #ffffff;
          }
        `}
      </style>
    </section>
  );
};

export default FitnessImagesSection;
