export default function TechnologyPage() {
  const techCards = [
    {
      icon: "ti-scan", color: "#1D9E75", bg: "#E1F5EE", title: "RFID Tracking",
      points: [
        "Passive RFID tags embedded in doctor ID badges",
        "Readers installed at every ward entry/exit point",
        "Presence updated within 200ms of tag detection",
        "Multi-zone triangulation for room-level accuracy",
      ],
    },
    {
      icon: "ti-camera", color: "#534AB7", bg: "#EEEDFE", title: "Face Detection",
      points: [
        "On-device inference — no cloud image uploads",
        "Confirms the RFID badge holder is physically present",
        "Works in low-light conditions up to 8m range",
        "Fully compliant with hospital privacy policy",
      ],
    },
    {
      icon: "ti-device-mobile", color: "#185FA5", bg: "#E6F1FB", title: "Mobile Proximity",
      points: [
        "Staff app uses BLE beacons as a secondary signal",
        "Cross-verified against RFID to eliminate ghost presence",
        "Battery-efficient background scanning mode",
        "Opt-in for privacy — not required for core function",
      ],
    },
  ];

  const aiInputs = [
    { label: "Doctor Availability",   icon: "ti-stethoscope",         color: "#1D9E75", bg: "#E1F5EE", type: "input"  },
    { label: "Patient Priority Score",icon: "ti-heart-rate-monitor",  color: "#D85A30", bg: "#FAECE7", type: "input"  },
    { label: "Current Workload",      icon: "ti-chart-bar",           color: "#534AB7", bg: "#EEEDFE", type: "input"  },
    { label: "Specialty Match",       icon: "ti-list-check",          color: "#185FA5", bg: "#E6F1FB", type: "input"  },
    { label: "Optimal Slot",          icon: "ti-calendar-check",      color: "#854F0B", bg: "#FAEEDA", type: "output" },
    { label: "Wait Time Estimate",    icon: "ti-clock",               color: "#0F6E56", bg: "#E1F5EE", type: "output" },
  ];

  return (
    <div className="fade-up">
      <h1 style={{ marginBottom: 4 }}>The Technology Behind MedQube</h1>
      <p className="section-sub">Three detection layers, unified by a single AI decision engine.</p>

      <div className="grid-3" style={{ marginBottom: 32 }}>
        {techCards.map(t => (
          <div key={t.title} className="card" style={{ padding: 24 }}>
            <div className="icon-box" style={{ width: 48, height: 48, background: t.bg, marginBottom: 16 }}>
              <i className={`ti ${t.icon}`} style={{ color: t.color, fontSize: 24 }} />
            </div>
            <h3 style={{ marginBottom: 14 }}>{t.title}</h3>
            <ul style={{ listStyle: "none" }}>
              {t.points.map(p => (
                <li key={p} style={{ display: "flex", gap: 9, alignItems: "flex-start", padding: "5px 0" }}>
                  <i className="ti ti-circle-check" style={{ color: t.color, fontSize: 15, marginTop: 1, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "#667", lineHeight: 1.55 }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* AI Engine Diagram */}
      <div className="card" style={{ padding: 30, marginBottom: 28 }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <i className="ti ti-cpu" style={{ color: "#1D9E75" }} />
          AI Scheduling Engine
        </h2>
        <p style={{ fontSize: 13.5, marginBottom: 26 }}>Every appointment decision is made in under 2 seconds using a multi-factor optimization model.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "center" }}>
          {/* Inputs */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#aaa", letterSpacing: 0.6, marginBottom: 10 }}>INPUTS</div>
            {aiInputs.filter(f => f.type === "input").map(f => (
              <div key={f.label} style={{
                background: "#f7f8fc", borderRadius: 9, padding: "11px 13px",
                display: "flex", gap: 10, alignItems: "center", marginBottom: 8
              }}>
                <div className="icon-box" style={{ width: 32, height: 32, background: f.bg, flexShrink: 0 }}>
                  <i className={`ti ${f.icon}`} style={{ color: f.color, fontSize: 16 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#333" }}>{f.label}</span>
              </div>
            ))}
          </div>

          {/* Center processor */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: "linear-gradient(135deg, #1D9E75, #185FA5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(29,158,117,0.35)", margin: "0 auto"
            }}>
              <i className="ti ti-brain" style={{ color: "#fff", fontSize: 34 }} />
            </div>
            <i className="ti ti-arrow-narrow-right" style={{ color: "#ccc", fontSize: 22, display: "block", margin: "8px auto" }} />
          </div>

          {/* Outputs */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#aaa", letterSpacing: 0.6, marginBottom: 10 }}>OUTPUTS</div>
            {aiInputs.filter(f => f.type === "output").map(f => (
              <div key={f.label} style={{
                background: "#f7f8fc", borderRadius: 9, padding: "11px 13px",
                display: "flex", gap: 10, alignItems: "center", marginBottom: 8
              }}>
                <div className="icon-box" style={{ width: 32, height: 32, background: f.bg, flexShrink: 0 }}>
                  <i className={`ti ${f.icon}`} style={{ color: f.color, fontSize: 16 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#333" }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture stack */}
      <div className="card" style={{ padding: 30 }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <i className="ti ti-stack-2" style={{ color: "#185FA5" }} />
          Tech Stack
        </h2>
        <div className="grid-4">
          {[
            { label: "Frontend",  value: "React.js",          icon: "ti-brand-react",      color: "#61DAFB", bg: "#E8F8FE" },
            { label: "Backend",   value: "Node.js + Express", icon: "ti-brand-nodejs",      color: "#3C873A", bg: "#E9F6E9" },
            { label: "Database",  value: "MongoDB",           icon: "ti-database",          color: "#13AA52", bg: "#E5F8EE" },
            { label: "AI/ML",     value: "Python + TensorFlow",icon: "ti-cpu",              color: "#FF8A00", bg: "#FFF1E0" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center", padding: "16px 12px", background: "#fafbff", borderRadius: 10 }}>
              <div className="icon-box" style={{ width: 40, height: 40, background: s.bg, margin: "0 auto 10px" }}>
                <i className={`ti ${s.icon}`} style={{ color: s.color, fontSize: 21 }} />
              </div>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0f1c3f" }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
