import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Get In Touch Section */}
      <div className="gettouch-section">
        <div className="container">
          <div className="row">

            <div className="col-md-4">
              <div className="gt-text">
                <i className="fa fa-map-marker"></i>
                <p>
                  SOUTH KARACHI, PAKISTAN
                  <br /> PK 76500
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="gt-text">
                <i className="fa fa-mobile"></i>
                <ul>
                  <li>92-123-158</li>
                  <li>92-256-369</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="gt-text email">
                <i className="fa fa-envelope"></i>
                <p>FitManTracker@gmail.com</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Section */}
      <section className="footer-section">
        <div className="container">
          <div className="row">

            {/* About */}
            <div className="col-lg-4">
              <div className="fs-about">
                <div className="fa-logo">
                  <img
                    src="/assets/img/brandlogow.png"
                    alt="Gym Center Logo"
                    style={{ height: "62px", width: "auto" }}
                  />
                </div>

                <p>
                  Track your workout and nutrition with FitMan and make your body healthy.
                </p>

             <div className="fa-social">
  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <i className="fa fa-facebook"></i>
  </a>

  <a
    href="https://twitter.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter"
  >
    <i className="fa fa-twitter"></i>
  </a>

  <a
    href="https://www.youtube.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
  >
    <i className="fa fa-youtube-play"></i>
  </a>

  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <i className="fa fa-instagram"></i>
  </a>

</div>

              </div>
            </div>

            {/* Useful Links */}
            <div className="col-lg-2 col-md-3 col-sm-6">
              <div className="fs-widget">
                <h4>Useful Links</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/workout">Workout</Link></li>
                  <li><Link to="/nutrition">Nutrition</Link></li>
                </ul>
              </div>
            </div>

            {/* Support */}
            <div className="col-lg-2 col-md-3 col-sm-6">
              <div className="fs-widget">
                <h4>Support</h4>
                <ul>
                  <li><Link to="/termsandconditions">Terms & Conditions</Link></li>
                  <li><Link to="/privacypolicy">Privacy Policy</Link></li>
                  <li><Link to="*">Subscribe</Link></li>
                  <li><Link to="/feedback">Feedback</Link></li>
                </ul>
              </div>
            </div>

            {/* Tips */}
            <div className="col-lg-4 col-md-6">
              <div className="fs-widget">
                <h4>Tips & Guides</h4>

                <div className="fw-recent">
                  <h6>
                    <Link to="*">
                      Physical fitness may help prevent depression, anxiety
                    </Link>
                  </h6>
                </div>

                <div className="fw-recent">
                  <h6>
                    <Link to="*">
                      Fitness: Best exercise to lose belly fat and tone up
                    </Link>
                  </h6>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="copyright-text">
                <p>
                  © {year} All rights reserved | Made with{" "}
                  <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                  <span style={{ color: "#ff7a18", fontWeight: "600" }}>
                    FITMAN
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Search Model */}
      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">+</div>
          <form className="search-model-form">
            <input type="text" placeholder="Search here....." />
          </form>
        </div>
      </div>
    </>
  );
};

export default Footer;
