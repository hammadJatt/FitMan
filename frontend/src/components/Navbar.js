import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const overlayStyle = {
    display: menuOpen ? "block" : "none",
    position: "fixed",
    inset: 0,
    zIndex: 998,
  };

  const menuStyle = {
    position: "fixed",
    top: 0,
    left: menuOpen ? "0" : "-260px",
    width: "260px",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.95)",
    padding: "20px",
    zIndex: 999,
    transition: "0.3s ease",
    borderRight: "2px solid #ff7a18",
  };

  const linkStyle = {
    borderTop: "1px solid #ff7a18",
    display: "block",
    padding: "12px 0",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    fontFamily: "Poppins, sans-serif",
  };

  const hamburgerStyle = {
    fontSize: "26px",
    cursor: "pointer",
    color: "#fff",
    display: isMobile ? "block" : "none",
  };

  const desktopMenuStyle = {
    display: isMobile ? "none" : "flex",
    gap: "20px",
    listStyle: "none",
    alignItems: "center",
    margin: 0,
    padding: 0,
    fontFamily: "Poppins, sans-serif",
  };

  return (
    <>
      {/* CSS FOR HOVER */}
      <style>
        {`
          .nav-link {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            font-family: Poppins, sans-serif;
            transition: color 0.3s ease;
          }

          .nav-link:hover {
            color: #ff7a18;
          }
        `}
      </style>

      <div style={overlayStyle} onClick={() => setMenuOpen(false)} />

      {/* MOBILE MENU */}
      <div style={menuStyle}>
        <div
          style={{ color: "#ff7a18", textAlign: "right", cursor: "pointer" }}
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <li><Link className="nav-link" style={linkStyle} to="/">Home</Link></li>
          <li><Link className="nav-link" style={linkStyle} to="/nutrition">Nutrition Tracker</Link></li>
          <li><Link className="nav-link" style={linkStyle} to="/workout">Workout Tracker</Link></li>
          <li><Link className="nav-link" style={linkStyle} to="/feedback">Feedback</Link></li>

          <SignedOut>
            <li>
              <Link className="nav-link" style={linkStyle} to="/sign-in">
                Sign In
              </Link>
            </li>
          </SignedOut>
        </ul>
      </div>

      {/* HEADER */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          padding: "15px 30px",
          backgroundColor: "#00000072",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <Link to="/">
          <img src="/assets/img/brandlogow.png" alt="Logo" style={{ height: "62px" }} />
        </Link>

        <ul style={desktopMenuStyle}>
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/nutrition">Nutrition</Link></li>
          <li><Link className="nav-link" to="/workout">Workout</Link></li>
          <li><Link className="nav-link" to="/feedback">Feedback</Link></li>

          <li>
            <SignedOut>
              <Link
                to="/sign-in"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  color: hover ? "#fff" : "#ff7a18",
                  backgroundColor: hover ? "#ff7a18" : "transparent",
                  border: "2px solid #ff7a18",
                  padding: "6px 14px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>

        <div style={hamburgerStyle} onClick={() => setMenuOpen(true)}>
          ☰
        </div>
      </header>
    </>
  );
};

export default Navbar;
