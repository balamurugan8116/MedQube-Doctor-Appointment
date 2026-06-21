import { useState } from "react";
import "./styles/global.css";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import TechnologyPage from "./pages/TechnologyPage";
import ContactPage from "./pages/ContactPage";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import PatientHome from "./pages/PatientHome";
import DoctorHome from "./pages/DoctorHome";
import AdminHome from "./pages/AdminHome";

function AppContent() {
  const { user, loading, logout } = useAuth();
  const [activeNav, setActiveNav] = useState("Home");
  const [authView, setAuthView] = useState(null); // null | "login" | "signup"

  // Still restoring session from a saved token — avoid flashing the wrong UI
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f6fb" }}>
        <span className="spinner" style={{ borderTopColor: "#1D9E75", borderColor: "rgba(29,158,117,0.2)", width: 28, height: 28 }} />
      </div>
    );
  }

  // ── Not logged in: show marketing site, with Login/Signup reachable from nav ──
  if (!user) {
    if (authView === "login") {
      return (
        <LoginPage
          onSuccess={() => setAuthView(null)}
          goToSignup={() => setAuthView("signup")}
        />
      );
    }
    if (authView === "signup") {
      return (
        <SignupPage
          onSuccess={() => setAuthView(null)}
          goToLogin={() => setAuthView("login")}
        />
      );
    }

    const publicPages = {
      Home: <HomePage setActiveNav={setActiveNav} />,
      Technology: <TechnologyPage />,
      Contact: <ContactPage />,
    };

    return (
      <div style={{ background: "#f4f6fb", minHeight: "100vh" }}>
        <Navbar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          authSlot={
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={() => setAuthView("login")}>
                <i className="ti ti-login" /> Log In
              </button>
              <button className="btn btn-primary" style={{ fontSize: 13 }} onClick={() => setAuthView("signup")}>
                <i className="ti ti-user-plus" /> Sign Up
              </button>
            </div>
          }
        />
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "32px 24px 64px" }}>
          {publicPages[activeNav] || publicPages.Home}
        </div>
        <Footer setActiveNav={setActiveNav} />
      </div>
    );
  }

  // ── Logged in: role-aware app ──
  const roleHome = {
    patient: <PatientHome user={user} setActiveNav={setActiveNav} />,
    doctor: <DoctorHome user={user} />,
    admin: <AdminHome user={user} />,
  };

  const pages = {
    Home: roleHome[user.role],
    Dashboard: <DashboardPage />,
    Appointments: <AppointmentsPage />,
    Doctors: <DoctorsPage />,
    Technology: <TechnologyPage />,
    Contact: <ContactPage />,
  };

  return (
    <div style={{ background: "#f4f6fb", minHeight: "100vh" }}>
      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        user={user}
        onLogout={() => { logout(); setActiveNav("Home"); }}
      />
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "32px 24px 64px" }}>
        {pages[activeNav] || pages.Home}
      </div>
      <Footer setActiveNav={setActiveNav} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
