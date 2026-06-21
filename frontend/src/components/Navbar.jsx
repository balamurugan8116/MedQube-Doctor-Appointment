import { NAV_ITEMS } from "../data/constants";
import UserMenu from "./UserMenu";

const ROLE_NAV = {
  patient: NAV_ITEMS,
  doctor: NAV_ITEMS.filter(n => ["Home", "Dashboard", "Appointments", "Technology", "Contact"].includes(n.label)),
  admin: NAV_ITEMS,
};

export default function Navbar({ activeNav, setActiveNav, authSlot, user, onLogout }) {
  const navItems = user ? (ROLE_NAV[user.role] || NAV_ITEMS) : [
    { label: "Home", icon: "ti-home-2" },
    { label: "Technology", icon: "ti-cpu" },
    { label: "Contact", icon: "ti-mail" },
  ];

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "0.5px solid #e2e4ec",
      position: "sticky",
      top: 0,
      zIndex: 200,
      boxShadow: "0 1px 12px rgba(0,0,0,0.04)"
    }}>
      <div style={{
        maxWidth: 1140,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => setActiveNav("Home")}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, #1D9E75 0%, #185FA5 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(29,158,117,0.35)"
          }}>
            <i className="ti ti-heartbeat" style={{ color: "#fff", fontSize: 20 }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 19, letterSpacing: -0.6, color: "#0f1c3f", lineHeight: 1 }}>
              Med<span style={{ color: "#1D9E75" }}>Qube</span>
            </div>
            <div style={{ fontSize: 10, color: "#aaa", letterSpacing: 0.6, fontWeight: 500 }}>SMART HEALTHCARE</div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              style={{
                padding: "7px 13px",
                borderRadius: 8,
                border: "none",
                background: activeNav === item.label ? "#E1F5EE" : "transparent",
                color: activeNav === item.label ? "#0F6E56" : "#555",
                fontWeight: activeNav === item.label ? 600 : 400,
                fontSize: 13.5,
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 5,
                transition: "all 0.15s"
              }}
            >
              <i className={`ti ${item.icon}`} style={{ fontSize: 15 }} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side: auth slot (logged out) or user menu (logged in) */}
        {user ? (
          <UserMenu user={user} onLogout={onLogout} />
        ) : authSlot ? (
          authSlot
        ) : (
          <button
            onClick={() => setActiveNav("Appointments")}
            className="btn btn-primary"
            style={{ fontSize: 13, padding: "9px 18px", borderRadius: 9, fontWeight: 600 }}
          >
            <i className="ti ti-calendar-plus" style={{ fontSize: 15 }} />
            Book Appointment
          </button>
        )}
      </div>

      {/* Live status bar */}
      <div style={{
        background: "linear-gradient(90deg, #0f6e56 0%, #185FA5 100%)",
        padding: "4px 24px",
        display: "flex", alignItems: "center", gap: 20
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="status-dot" style={{ background: "#5DCAA5", width: 6, height: 6 }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>System Online</span>
        </div>
        {[
          { icon: "ti-user-check", label: "18 Doctors Monitored" },
          { icon: "ti-radar",      label: "RFID Active" },
          { icon: "ti-camera",     label: "Face Detection Running" },
          { icon: "ti-brain",      label: "AI Scheduler Active" },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <i className={`ti ${s.icon}`} style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
