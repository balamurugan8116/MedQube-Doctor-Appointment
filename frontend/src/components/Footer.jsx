export default function Footer({ setActiveNav }) {
  const links = {
    Platform:  ["Dashboard", "Appointments", "Doctors", "Technology"],
    Company:   ["About Us", "Careers", "Press", "Blog"],
    Support:   ["Documentation", "Help Center", "Contact", "Status"],
    Legal:     ["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Cookie Policy"],
  };

  return (
    <footer style={{ background: "#0a1628", color: "#8a9ab8", marginTop: 0 }}>
      {/* Top */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "48px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "linear-gradient(135deg,#1D9E75,#185FA5)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <i className="ti ti-heartbeat" style={{ color: "#fff", fontSize: 20 }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>
                  Med<span style={{ color: "#5DCAA5" }}>Qube</span>
                </div>
                <div style={{ fontSize: 10, color: "#5a7090", letterSpacing: 0.6 }}>SMART HEALTHCARE</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#6a7fa0", lineHeight: 1.7, marginBottom: 18 }}>
              Intelligent scheduling for the modern hospital. Real-time doctor tracking powered by RFID, face detection, and AI.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: "ti-brand-twitter", label: "Twitter" },
                { icon: "ti-brand-linkedin", label: "LinkedIn" },
                { icon: "ti-brand-github", label: "GitHub" },
              ].map(s => (
                <div key={s.label} style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: "#162035", border: "0.5px solid #1e3050",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer"
                }}>
                  <i className={`ti ${s.icon}`} style={{ color: "#5a7090", fontSize: 15 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 14 }}>
                {section}
              </div>
              {items.map(item => (
                <div
                  key={item}
                  onClick={() => ["Dashboard","Appointments","Doctors","Technology","Contact"].includes(item) && setActiveNav(item)}
                  style={{ fontSize: 13, color: "#6a7fa0", marginBottom: 9, cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={e => e.target.style.color = "#5DCAA5"}
                  onMouseLeave={e => e.target.style.color = "#6a7fa0"}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Certifications row */}
        <div style={{ borderTop: "0.5px solid #1a2e4a", paddingTop: 24, marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#4a6080", marginRight: 4 }}>CERTIFIED & COMPLIANT:</span>
            {["HIPAA", "ISO 27001", "NABH Ready", "GDPR"].map(c => (
              <span key={c} style={{
                background: "#162035", border: "0.5px solid #1e3050",
                color: "#5a7090", fontSize: 11, fontWeight: 600,
                padding: "3px 10px", borderRadius: 5
              }}>
                <i className="ti ti-shield-check" style={{ fontSize: 11, marginRight: 4 }} />
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 12, color: "#4a6080" }}>
            © 2026 MedQube (Developed by Balamurugan R), Chennai, Tamil Nadu, India.
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="status-dot" style={{ background: "#1D9E75", width: 6, height: 6 }} />
            <span style={{ fontSize: 12, color: "#5DCAA5" }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
