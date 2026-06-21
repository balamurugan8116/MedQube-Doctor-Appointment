import { PRIORITY_COLORS, APPT_STATUS_COLORS } from "../data/constants";

export default function AppointmentTable({ appointments }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="mq-table">
        <thead>
          <tr>
            {["#", "Time", "Patient", "Department", "Doctor", "Priority", "Status"].map(h => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, i) => {
            const pc = PRIORITY_COLORS[a.priority];
            const ac = APPT_STATUS_COLORS[a.status];
            return (
              <tr key={a.id}>
                <td style={{ color: "#bbb", fontWeight: 600 }}>{String(i + 1).padStart(2, "0")}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <i className="ti ti-clock" style={{ color: "#888", fontSize: 13 }} />
                    <span style={{ fontWeight: 600, color: "#0f1c3f" }}>{a.time}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "linear-gradient(135deg,#E1F5EE,#E6F1FB)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, color: "#185FA5"
                    }}>
                      {a.patient.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <span style={{ fontWeight: 500, color: "#1a1a2e" }}>{a.patient}</span>
                  </div>
                </td>
                <td>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <i className="ti ti-building-hospital" style={{ color: "#888", fontSize: 12 }} />
                    {a.dept}
                  </span>
                </td>
                <td style={{ color: "#555", fontSize: 13 }}>{a.doctor}</td>
                <td>
                  <span className="badge" style={{ background: pc.bg, color: pc.text, border: `0.5px solid ${pc.border}` }}>
                    {a.priority === "urgent" && <i className="ti ti-alert-triangle" style={{ fontSize: 11 }} />}
                    {a.priority === "high"   && <i className="ti ti-arrow-up" style={{ fontSize: 11 }} />}
                    {a.priority === "normal" && <i className="ti ti-minus" style={{ fontSize: 11 }} />}
                    {a.priority.charAt(0).toUpperCase() + a.priority.slice(1)}
                  </span>
                </td>
                <td>
                  <span className="badge" style={{ background: ac.bg, color: ac.text, border: `0.5px solid ${ac.border}` }}>
                    {a.status === "confirmed" && <i className="ti ti-check" style={{ fontSize: 11 }} />}
                    {a.status === "waiting"   && <i className="ti ti-loader-2" style={{ fontSize: 11 }} />}
                    {a.status === "scheduled" && <i className="ti ti-calendar-event" style={{ fontSize: 11 }} />}
                    {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
