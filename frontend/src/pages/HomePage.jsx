import { STATS } from "../data/constants";
import StatCard from "../components/StatCard";

export default function HomePage({ setActiveNav }) {
  return (
    <div className="fade-up">

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f1c3f 0%, #163255 60%, #0f3d2e 100%)",
        borderRadius: 20,
        padding: "64px 56px",
        marginBottom: 32,
        position: "relative",
        overflow: "hidden"
      }}>
        {/* decorative circles */}
        {[
          { size: 320, top: -80,  right: -80,  opacity: 0.06 },
          { size: 180, top: 40,   right: 120,  opacity: 0.08 },
          { size: 100, bottom: 20,left: 200,   opacity: 0.07 },
        ].map((c, i) => (
          <div key={i} style={{
            position: "absolute",
            width: c.size, height: c.size, borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.15)",
            top: c.top, right: c.right, bottom: c.bottom, left: c.left,
            opacity: c.opacity
          }} />
        ))}

        <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(29,158,117,0.2)", border: "0.5px solid rgba(29,158,117,0.4)",
            color: "#5DCAA5", borderRadius: 20, padding: "5px 14px",
            fontSize: 12, fontWeight: 500, marginBottom: 20
          }}>
            <span className="status-dot" style={{ background: "#5DCAA5" }} />
            Live System Active · 18 Doctors Currently Monitored
          </div>

          <h1 style={{
            fontSize: 50, fontWeight: 800, letterSpacing: -1.5,
            lineHeight: 1.1, marginBottom: 20, color: "#fff"
          }}>
            Healthcare scheduling,{" "}
            <span style={{ color: "#5DCAA5" }}>intelligently automated.</span>
          </h1>

          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 36, lineHeight: 1.7 }}>
            MedQube uses RFID, face detection & AI to monitor doctor presence in real time and assign appointment slots automatically — slashing wait times and improving care flow.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              className="btn btn-primary"
              style={{ fontSize: 15, padding: "13px 26px", borderRadius: 10 }}
              onClick={() => setActiveNav("Appointments")}
            >
              <i className="ti ti-calendar-plus" style={{ fontSize: 17 }} />
              Book Appointment
            </button>
            <button
              className="btn"
              style={{
                fontSize: 15, padding: "13px 26px", borderRadius: 10,
                background: "rgba(255,255,255,0.08)", color: "#fff",
                border: "0.5px solid rgba(255,255,255,0.2)"
              }}
              onClick={() => setActiveNav("Dashboard")}
            >
              <i className="ti ti-layout-dashboard" style={{ fontSize: 17 }} />
              View Live Dashboard
            </button>
          </div>
        </div>

        {/* floating tech badges */}
        <div style={{
          position: "absolute", right: 56, top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", gap: 10
        }}>
          {[
            { icon: "ti-radar",         label: "RFID Tracking",      color: "#5DCAA5" },
            { icon: "ti-camera",        label: "Face Detection",      color: "#82A8F0" },
            { icon: "ti-device-mobile", label: "Mobile Proximity",    color: "#C3B1F8" },
            { icon: "ti-brain",         label: "AI Scheduling",       color: "#FAC775" },
          ].map(b => (
            <div key={b.label} style={{
              background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: 10, padding: "8px 14px",
              display: "flex", alignItems: "center", gap: 8
            }}>
              <i className={`ti ${b.icon}`} style={{ color: b.color, fontSize: 16 }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{b.label}</span>
              <i className="ti ti-check" style={{ color: "#5DCAA5", fontSize: 12, marginLeft: "auto" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid-4" style={{ marginBottom: 40 }}>
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} trend={[+12, -3, +8, +5][i]} />
        ))}
      </div>

      {/* ── Features ── */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ marginBottom: 4 }}>Built for the modern hospital</h2>
        <p className="section-sub">Everything your team needs to run a smarter scheduling operation.</p>
        <div className="grid-auto-280">
          {[
            { icon: "ti-radar",          color: "#1D9E75", bg: "#E1F5EE", title: "Real-time Presence Tracking",     desc: "RFID tags and face detection confirm which doctors are physically on-premises with sub-200ms latency." },
            { icon: "ti-brain",          color: "#534AB7", bg: "#EEEDFE", title: "AI Appointment Allocation",       desc: "The AI engine weighs doctor load, patient priority, and specialty to assign the next optimal slot automatically." },
            { icon: "ti-users",          color: "#185FA5", bg: "#E6F1FB", title: "Smart Patient Flow",             desc: "Dynamic queue reordering based on urgency levels ensures critical patients are never delayed." },
            { icon: "ti-device-mobile",  color: "#D85A30", bg: "#FAECE7", title: "Mobile Proximity Detection",     desc: "Staff smartphones act as a secondary proximity signal, cross-verified with RFID for maximum reliability." },
            { icon: "ti-chart-bar",      color: "#854F0B", bg: "#FAEEDA", title: "Data-Driven Analytics",          desc: "Hospital administrators access live dashboards and trend analytics for staffing and resource planning." },
            { icon: "ti-shield-check",   color: "#0F6E56", bg: "#E1F5EE", title: "Zero Scheduling Conflicts",     desc: "Automated slot validation prevents double-bookings and room conflicts before they happen." },
          ].map(f => (
            <div className="card" key={f.title} style={{ padding: 22 }}>
              <div className="icon-box" style={{ width: 46, height: 46, background: f.bg, marginBottom: 14 }}>
                <i className={`ti ${f.icon}`} style={{ color: f.color, fontSize: 22 }} />
              </div>
              <h3 style={{ marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <div className="card" style={{ marginBottom: 40, padding: "34px 32px" }}>
        <h2 style={{ marginBottom: 4 }}>How MedQube works</h2>
        <p className="section-sub" style={{ marginBottom: 30 }}>From patient check-in to consultation in four seamless steps.</p>
        <div className="grid-4">
          {[
            { n: "01", icon: "ti-scan",            color: "#1D9E75", bg: "#E1F5EE", title: "Doctor Check-in",    desc: "RFID or face detection confirms arrival and presence on the ward floor." },
            { n: "02", icon: "ti-clipboard-list",  color: "#534AB7", bg: "#EEEDFE", title: "Patient Registers",  desc: "Patient registers via kiosk or app — urgency and specialty are noted." },
            { n: "03", icon: "ti-cpu",             color: "#185FA5", bg: "#E6F1FB", title: "AI Assigns Slot",    desc: "The engine picks the best available doctor and time slot in under 2 seconds." },
            { n: "04", icon: "ti-bell-ringing",    color: "#D85A30", bg: "#FAECE7", title: "Patient Notified",   desc: "SMS + app notification with room number, token, and wait estimate." },
          ].map((s, i) => (
            <div key={s.n} style={{ textAlign: "center", position: "relative" }}>
              {i < 3 && (
                <div style={{
                  position: "absolute", top: 23, left: "60%", width: "80%",
                  borderTop: "1.5px dashed #e2e4ec", zIndex: 0
                }} />
              )}
              <div className="icon-box" style={{
                width: 48, height: 48, background: s.bg,
                margin: "0 auto 14px", position: "relative", zIndex: 1
              }}>
                <i className={`ti ${s.icon}`} style={{ color: s.color, fontSize: 22 }} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: s.color, marginBottom: 5, letterSpacing: 0.5 }}>STEP {s.n}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#0f1c3f", marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#888", lineHeight: 1.55 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <div style={{
        background: "linear-gradient(135deg, #1D9E75, #185FA5)",
        borderRadius: 16, padding: "36px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap"
      }}>
        <div>
          <h2 style={{ color: "#fff", marginBottom: 6, fontSize: 22 }}>Ready to transform your hospital's scheduling?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Join 120+ hospitals already running on MedQube.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button className="btn" style={{ background: "#fff", color: "#1D9E75", fontWeight: 700, padding: "11px 22px" }}
            onClick={() => setActiveNav("Contact")}>
            <i className="ti ti-mail" /> Contact Sales
          </button>
          <button className="btn" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "0.5px solid rgba(255,255,255,0.25)", padding: "11px 22px" }}
            onClick={() => setActiveNav("Dashboard")}>
            <i className="ti ti-layout-dashboard" /> Live Demo
          </button>
        </div>
      </div>
    </div>
  );
}
