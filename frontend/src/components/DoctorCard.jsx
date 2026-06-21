import { STATUS_COLORS } from "../data/constants";

export default function DoctorCard({ doctor, onBook }) {
  const sc = STATUS_COLORS[doctor.status];
  const statusLabel =
    doctor.status === "in-session" ? "In Session" :
    doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1);

  return (
    <div className="card fade-up" style={{ padding: 22 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
        <div className="avatar avatar-lg">{doctor.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f1c3f", marginBottom: 2 }}>{doctor.name}</div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>
            <i className="ti ti-building-hospital" style={{ fontSize: 12, marginRight: 4 }} />
            {doctor.specialty}
          </div>
          <span className="badge" style={{ background: sc.bg, color: sc.text, border: `0.5px solid ${sc.border}` }}>
            <span className="status-dot" style={{ background: sc.dot }} />
            {statusLabel}
          </span>
        </div>

        {/* Rating */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f1c3f" }}>
            <i className="ti ti-star-filled" style={{ color: "#F4BB00", fontSize: 13 }} />
            {" "}{doctor.rating}
          </div>
          <div style={{ fontSize: 11, color: "#aaa" }}>{doctor.exp}</div>
        </div>
      </div>

      <hr className="divider" />

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[
          { icon: "ti-users",      label: "Today",       value: `${doctor.patients} pts` },
          { icon: "ti-clock",      label: "Next slot",   value: doctor.nextSlot          },
          { icon: "ti-door-enter", label: "Room",        value: doctor.room              },
        ].map(m => (
          <div key={m.label} style={{ background: "#f7f8fc", borderRadius: 8, padding: "9px 10px", textAlign: "center" }}>
            <i className={`ti ${m.icon}`} style={{ color: "#888", fontSize: 14 }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: "#0f1c3f", marginTop: 3 }}>{m.value}</div>
            <div style={{ fontSize: 10, color: "#bbb" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Detection badges */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {doctor.rfid && (
          <span className="badge" style={{ background: "#E1F5EE", color: "#0F6E56", border: "0.5px solid #9FE1CB" }}>
            <i className="ti ti-scan" style={{ fontSize: 11 }} /> RFID Active
          </span>
        )}
        {doctor.face && (
          <span className="badge" style={{ background: "#EEEDFE", color: "#534AB7", border: "0.5px solid #CECBF6" }}>
            <i className="ti ti-camera" style={{ fontSize: 11 }} /> Face Detect
          </span>
        )}
        {!doctor.rfid && !doctor.face && (
          <span className="badge" style={{ background: "#f0f2f8", color: "#999", border: "0.5px solid #e0e3ee" }}>
            <i className="ti ti-device-mobile" style={{ fontSize: 11 }} /> Mobile Proximity
          </span>
        )}
      </div>

      {/* Book button */}
      <button
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center", fontSize: 13, padding: "9px" }}
        onClick={() => onBook && onBook(doctor)}
        disabled={doctor.status === "away"}
      >
        <i className="ti ti-calendar-plus" style={{ fontSize: 14 }} />
        {doctor.status === "away" ? "Currently Unavailable" : "Book This Doctor"}
      </button>
    </div>
  );
}
