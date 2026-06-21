import { useState, useRef, useEffect } from "react";

const ROLE_META = {
  patient: { label: "Patient", color: "#185FA5", bg: "#E6F1FB", icon: "ti-user" },
  doctor:  { label: "Doctor",  color: "#1D9E75", bg: "#E1F5EE", icon: "ti-stethoscope" },
  admin:   { label: "Admin",   color: "#854F0B", bg: "#FAEEDA", icon: "ti-shield-star" },
};

export default function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const meta = ROLE_META[user.role] || ROLE_META.patient;

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "transparent", border: "0.5px solid #e2e4ec", borderRadius: 9,
          padding: "5px 10px 5px 5px", cursor: "pointer"
        }}
      >
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: "linear-gradient(135deg, #E6F1FB, #EEEDFE)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: "#185FA5"
        }}>{initials}</div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#0f1c3f", lineHeight: 1.2 }}>{user.name}</div>
          <div style={{ fontSize: 10, color: meta.color, fontWeight: 600 }}>{meta.label}</div>
        </div>
        <i className="ti ti-chevron-down" style={{ fontSize: 14, color: "#999" }} />
      </button>

      {open && (
        <div style={{
          position: "absolute", right: 0, top: "calc(100% + 8px)",
          background: "#fff", borderRadius: 12, border: "0.5px solid #e2e4ec",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)", width: 220, zIndex: 300, overflow: "hidden"
        }}>
          <div style={{ padding: "14px 16px", borderBottom: "0.5px solid #f0f0f0" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0f1c3f" }}>{user.name}</div>
            <div style={{ fontSize: 12, color: "#999" }}>{user.email}</div>
            <span className="badge" style={{ background: meta.bg, color: meta.color, marginTop: 6 }}>
              <i className={`ti ${meta.icon}`} style={{ fontSize: 11 }} /> {meta.label} Account
            </span>
          </div>
          <button
            onClick={onLogout}
            style={{
              width: "100%", textAlign: "left", padding: "11px 16px",
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13, color: "#A32D2D", display: "flex", alignItems: "center", gap: 8
            }}
          >
            <i className="ti ti-logout" style={{ fontSize: 15 }} /> Log Out
          </button>
        </div>
      )}
    </div>
  );
}
