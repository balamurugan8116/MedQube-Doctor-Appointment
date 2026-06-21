import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contactInfo = [
    { icon: "ti-mail",     color: "#1D9E75", bg: "#E1F5EE", label: "Email",         value: "hello@medqube.health" },
    { icon: "ti-phone",    color: "#185FA5", bg: "#E6F1FB", label: "Phone",         value: "+91 44 2345 6789" },
    { icon: "ti-map-pin",  color: "#534AB7", bg: "#EEEDFE", label: "Address",       value: "12 OMR Tech Park, Chennai, Tamil Nadu 600096" },
    { icon: "ti-clock",    color: "#854F0B", bg: "#FAEEDA", label: "Support Hours", value: "Mon–Sat, 8:00 AM – 8:00 PM IST" },
  ];

  return (
    <div className="fade-up">
      <h1 style={{ marginBottom: 4 }}>Get in Touch</h1>
      <p className="section-sub">Interested in deploying MedQube at your hospital? Talk to our integration team.</p>

      <div className="grid-2">
        {/* Form */}
        <div className="card" style={{ padding: 28 }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <i className="ti ti-message-2" style={{ color: "#1D9E75" }} />
            Send Us a Message
          </h2>

          {sent && (
            <div style={{
              background: "#E1F5EE", border: "0.5px solid #9FE1CB", borderRadius: 9,
              padding: "12px 16px", marginBottom: 18, display: "flex", alignItems: "center", gap: 8
            }}>
              <i className="ti ti-circle-check" style={{ color: "#1D9E75", fontSize: 18 }} />
              <span style={{ fontSize: 13.5, color: "#0F6E56", fontWeight: 500 }}>Message sent! We'll get back to you within 24 hours.</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { label: "Your Name", icon: "ti-user", placeholder: "e.g. Dr. Anitha Reddy" },
              { label: "Hospital / Organization", icon: "ti-building-hospital", placeholder: "e.g. Apollo Hospitals" },
              { label: "Email Address", icon: "ti-mail", placeholder: "you@hospital.com" },
              { label: "Phone Number", icon: "ti-phone", placeholder: "+91 98765 43210" },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 14 }}>
                <label className="label"><i className={`ti ${f.icon}`} style={{ fontSize: 12 }} /> {f.label}</label>
                <input className="input" placeholder={f.placeholder} required />
              </div>
            ))}
            <div style={{ marginBottom: 18 }}>
              <label className="label"><i className="ti ti-message-dots" style={{ fontSize: 12 }} /> Message</label>
              <textarea className="input" rows={4} placeholder="Tell us about your hospital's scheduling needs…" style={{ resize: "vertical" }} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 13, fontSize: 15 }}>
              <i className="ti ti-send" style={{ fontSize: 16 }} />
              Send Message
            </button>
          </form>
        </div>

        {/* Info panel */}
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
            {contactInfo.map(c => (
              <div key={c.label} className="card" style={{ padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div className="icon-box" style={{ width: 42, height: 42, background: c.bg, flexShrink: 0 }}>
                  <i className={`ti ${c.icon}`} style={{ color: c.color, fontSize: 21 }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#999", marginBottom: 3 }}>{c.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f1c3f" }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{
              height: 200, background: "linear-gradient(135deg, #E6F1FB, #EEEDFE)",
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8
            }}>
              <i className="ti ti-map-2" style={{ fontSize: 36, color: "#185FA5" }} />
              <span style={{ fontSize: 13, color: "#185FA5", fontWeight: 500 }}>OMR Tech Park, Chennai</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
