export default function PatientHome({ user, setActiveNav }) {
  return (
    <div className="fade-up">
      <div style={{
        background: "linear-gradient(135deg, #1D9E75, #185FA5)", borderRadius: 16,
        padding: "30px 32px", marginBottom: 28, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16
      }}>
        <div>
          <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>Welcome back,</div>
          <h1 style={{ color: "#fff", fontSize: 24, marginBottom: 0 }}>{user.name}</h1>
        </div>
        <button className="btn" style={{ background: "#fff", color: "#1D9E75", fontWeight: 700 }}
          onClick={() => setActiveNav("Appointments")}>
          <i className="ti ti-calendar-plus" /> Book New Appointment
        </button>
      </div>

      <div className="grid-3">
        {[
          { icon: "ti-calendar-event", color: "#1D9E75", bg: "#E1F5EE", title: "My Appointments", desc: "View upcoming and past visits", nav: "Appointments" },
          { icon: "ti-stethoscope",    color: "#185FA5", bg: "#E6F1FB", title: "Find a Doctor",    desc: "Browse doctors by specialty",  nav: "Doctors" },
          { icon: "ti-user-circle",    color: "#534AB7", bg: "#EEEDFE", title: "My Profile",        desc: "Update your contact details",  nav: "Contact" },
        ].map(c => (
          <div key={c.title} className="card" style={{ cursor: "pointer" }} onClick={() => setActiveNav(c.nav)}>
            <div className="icon-box" style={{ width: 44, height: 44, background: c.bg, marginBottom: 14 }}>
              <i className={`ti ${c.icon}`} style={{ color: c.color, fontSize: 22 }} />
            </div>
            <h3 style={{ marginBottom: 6 }}>{c.title}</h3>
            <p style={{ fontSize: 13 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
