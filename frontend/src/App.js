import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";

import Nutrition from "./pages/Nutrition";
import Workout from "./pages/Workout";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Feedback from "./pages/Feedback";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

// Fixed ProtectedRoute
function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();

  // Hide Navbar & Footer on auth pages
  const hideOnAuthPages = ["/sign-in", "/sign-up"];
  const showNavbarAndFooter = !hideOnAuthPages.includes(location.pathname);

  const clerkTheme = {
    layout: {
      logoPlacement: "inside",
      logoImageUrl: "/assets/img/brandlogo.png",
      card: { backgroundColor: "#000000c2", borderRadius: "12px", color: "#fff" },
      header: { color: "#ff7a18" },
      input: { backgroundColor: "#1a1a1a", color: "#fff", borderColor: "#ff7a18" },
      button: { backgroundColor: "#ff7a18", color: "#000", borderRadius: "6px" },
      link: { color: "#ff7a18" },
    },
  };

  return (
    <>
      {showNavbarAndFooter && <Navbar />}

      <main>
        <Routes>
          {/* Public Dashboard */}
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes */}
          <Route path="/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
          <Route path="/workout" element={<ProtectedRoute><Workout /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
          <Route path="/termsandconditions" element={<ProtectedRoute><TermsAndConditions /></ProtectedRoute>} />
          <Route path="/privacypolicy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />

          {/* Auth Routes */}
          <Route path="/sign-in" element={<SignedOut><div style={centerStyle}><SignIn appearance={clerkTheme} /></div></SignedOut>} />
          <Route path="/sign-up" element={<SignedOut><div style={centerStyle}><SignUp appearance={clerkTheme} /></div></SignedOut>} />
        </Routes>
      </main>

      {showNavbarAndFooter && <Footer />}
    </>
  );
}

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#111",
  padding: "20px",
};

export default AppWrapper;
