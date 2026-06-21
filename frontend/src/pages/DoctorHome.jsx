import { APPOINTMENTS } from "../data/constants";

export default function DoctorHome({ user }) {
  const myAppointments = APPOINTMENTS.filter(a => a.doctor.includes(user.name.split(" ")[1] || user.name));
  const queue = myAppointments.length ? myAppointments : APPOINTMENTS.slice(0, 3);

  return (
    <div className="fade-up">
      <div style={{
        background: "linear-gradient(135deg, #185FA5, #0f1c3f)", borderRadius: 16,
        padding: "30px 32px", marginBottom: 28, color: "#fff"
      }}>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
          <i className="ti ti-stethoscope" /> Doctor Dashboard
        </div>
        <h1 style={{ color: "#fff", fontSize: 24, marginBottom: 4 }}>{user.name}</h1>
        <div style={{ fontSize: 13, opacity: 0.75 }}>{user.specialty || "General Medicine"} · {user.room || "OPD-1"}</div>
      </div>

      <div className="grid-3" style={{ marginBottom: 28 }}>
        {[
          { icon: "ti-calendar-event", color: "#1D9E75", bg: "#E1F5EE", value: queue.length, label: "Patients Today" },
          { icon: "ti-clock-hour-4",   color: "#185FA5", bg: "#E6F1FB", value: "8 min",        label: "Avg. Consult Time" },
          { icon: "ti-circle-check",   color: "#534AB7", bg: "#EEEDFE", value: "94%",           label: "On-Time Rate" },
        ].map(s => (
          <div key={s.label} className="card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="icon-box" style={{ width: 44, height: 44, background: s.bg }}>
              <i className={`ti ${s.icon}`} style={{ color: s.color, fontSize: 22 }} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#0f1c3f" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <i className="ti ti-list-details" style={{ color: "#1D9E75" }} />
          Your Patient Queue
        </h2>
        {queue.map((a, i) => (
          <div key={a.id} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
            borderBottom: i < queue.length - 1 ? "0.5px solid #f0f0f0" : "none"
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: "#f0f2f8",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#666"
            }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0f1c3f" }}>{a.patient}</div>
              <div style={{ fontSize: 12, color: "#999" }}>{a.time} · {a.dept}</div>
            </div>
            <button className="btn btn-outline" style={{ fontSize: 12, padding: "6px 14px" }}>
              <i className="ti ti-stethoscope" style={{ fontSize: 13 }} /> Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
