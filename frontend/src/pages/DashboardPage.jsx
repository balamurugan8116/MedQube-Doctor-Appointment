import { useState, useEffect } from "react";
import { STATS, DOCTORS, APPOINTMENTS, STATUS_COLORS } from "../data/constants";
import StatCard from "../components/StatCard";
import AppointmentTable from "../components/AppointmentTable";

export default function DashboardPage() {
  const [liveTime, setLiveTime] = useState(new Date());
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const t = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const filtered = filter === "all" ? DOCTORS : DOCTORS.filter(d => d.status === filter);
  const available  = DOCTORS.filter(d => d.status === "available").length;
  const inSession  = DOCTORS.filter(d => d.status === "in-session").length;
  const away       = DOCTORS.filter(d => d.status === "away").length;

  return (
    <div className="fade-up">
      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ marginBottom: 4 }}>Live Dashboard</h1>
          <p style={{ fontSize: 13 }}>
            <i className="ti ti-clock" style={{ fontSize: 13 }} />{" "}
            {liveTime.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            {" "}·{" "}
            <strong style={{ color: "#0f1c3f" }}>
              {liveTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </strong>
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ background: "#E1F5EE", border: "0.5px solid #9FE1CB", borderRadius: 8, padding: "7px 14px", fontSize: 12, color: "#0F6E56", fontWeight: 600 }}>
            <span className="status-dot" style={{ background: "#1D9E75" }} />{" "}
            System Operational
          </div>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>
            <i className="ti ti-refresh" /> Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {STATS.map((s, i) => <StatCard key={s.label} {...s} trend={[+12, -3, +8, +5][i]} />)}
      </div>

      {/* Doctor availability status summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Available",   count: available,  icon: "ti-user-check",  color: "#1D9E75", bg: "#E1F5EE" },
          { label: "In Session",  count: inSession,  icon: "ti-user-heart",  color: "#185FA5", bg: "#E6F1FB" },
          { label: "Away",        count: away,        icon: "ti-user-off",    color: "#854F0B", bg: "#FAEEDA" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div className="icon-box" style={{ width: 40, height: 40, background: s.bg }}>
              <i className={`ti ${s.icon}`} style={{ color: s.color, fontSize: 20 }} />
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#0f1c3f", lineHeight: 1 }}>{s.count}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{s.label}</div>
            </div>
            {/* Mini bar */}
            <div style={{ flex: 1, height: 4, background: "#f0f2f8", borderRadius: 2, marginLeft: 8, overflow: "hidden" }}>
              <div style={{ width: `${(s.count / DOCTORS.length) * 100}%`, height: "100%", background: s.color, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Doctor grid */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <i className="ti ti-stethoscope" style={{ color: "#1D9E75" }} />
            Doctor Availability
          </h2>
          <div style={{ display: "flex", gap: 6 }}>
            {["all", "available", "in-session", "away"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="btn"
                style={{
                  padding: "5px 13px", fontSize: 12,
                  background: filter === f ? "#1D9E75" : "transparent",
                  color: filter === f ? "#fff" : "#666",
                  border: "0.5px solid " + (filter === f ? "#1D9E75" : "#e2e4ec")
                }}
              >
                {f === "all" ? "All" : f === "in-session" ? "In Session" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-auto-300">
          {filtered.map(d => {
            const sc = STATUS_COLORS[d.status];
            return (
              <div key={d.id} style={{
                background: "#fafbff", borderRadius: 10,
                border: `0.5px solid ${sc.border}`, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 12
              }}>
                <div className="avatar">{d.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f1c3f", marginBottom: 1 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "#888", marginBottom: 5 }}>{d.specialty} · {d.room}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    <span className="badge" style={{ background: sc.bg, color: sc.text, border: `0.5px solid ${sc.border}` }}>
                      <span className="status-dot" style={{ background: sc.dot }} />
                      {d.status === "in-session" ? "In Session" : d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                    </span>
                    <span style={{ fontSize: 11, color: "#aaa" }}>
                      <i className="ti ti-users" style={{ fontSize: 11 }} /> {d.patients}
                    </span>
                    <span style={{ fontSize: 11, color: "#aaa" }}>
                      <i className="ti ti-clock" style={{ fontSize: 11 }} /> {d.nextSlot}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {d.rfid && <span style={{ fontSize: 10, background: "#E1F5EE", color: "#0F6E56", borderRadius: 4, padding: "1px 6px", fontWeight: 600 }}>RFID</span>}
                  {d.face && <span style={{ fontSize: 10, background: "#EEEDFE", color: "#534AB7", borderRadius: 4, padding: "1px 6px", fontWeight: 600 }}>FACE</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Appointments table */}
      <div className="card">
        <h2 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <i className="ti ti-calendar-event" style={{ color: "#534AB7" }} />
          Today's Appointment Queue
          <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 400, color: "#888" }}>
            {APPOINTMENTS.length} total · {APPOINTMENTS.filter(a => a.status === "waiting").length} waiting
          </span>
        </h2>
        <AppointmentTable appointments={APPOINTMENTS} />
      </div>
    </div>
  );
}
