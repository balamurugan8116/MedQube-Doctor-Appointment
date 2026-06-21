import { useState } from "react";
import { APPOINTMENTS, SPECIALTIES, APPT_STATUS_COLORS } from "../data/constants";

export default function AppointmentsPage() {
  const [form, setForm] = useState({ name: "", specialty: "", date: "", priority: "Normal" });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [bookSuccess, setBookSuccess] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    if (!form.name || !form.specialty) return;
    setAiLoading(true);
    setAiResult(null);
    setTimeout(() => {
      setAiLoading(false);
      setAiResult({
        doctor: "Dr. Priya Nair",
        slot: "11:00 AM",
        date: form.date || "Today",
        room: "OPD-1",
        token: "MQ-" + Math.floor(1000 + Math.random() * 9000),
      });
      setBookSuccess(true);
    }, 1800);
  };

  return (
    <div className="fade-up">
      <h1 style={{ marginBottom: 4 }}>Book an Appointment</h1>
      <p className="section-sub">Our AI will instantly find the best available doctor for your needs.</p>

      <div className="grid-2">
        {/* ── Form Card ── */}
        <div className="card" style={{ padding: 28 }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <i className="ti ti-user-circle" style={{ color: "#1D9E75" }} />
            Your Details
          </h2>

          {bookSuccess && aiResult ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", background: "#E1F5EE",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px", border: "3px solid #9FE1CB"
              }}>
                <i className="ti ti-check" style={{ color: "#1D9E75", fontSize: 30 }} />
              </div>
              <h3 style={{ fontSize: 19, marginBottom: 6 }}>Appointment Confirmed!</h3>
              <p style={{ fontSize: 13, marginBottom: 22 }}>Your slot has been allocated by the AI scheduler.</p>

              <div style={{ background: "#f7f8fc", borderRadius: 12, padding: "18px", textAlign: "left", marginBottom: 22 }}>
                {[
                  ["ti-stethoscope", "Doctor", aiResult.doctor],
                  ["ti-calendar",    "Date",   aiResult.date],
                  ["ti-clock",       "Time",   aiResult.slot],
                  ["ti-door-enter",  "Room",   aiResult.room],
                  ["ti-ticket",      "Token",  aiResult.token],
                ].map(([icon, k, v]) => (
                  <div key={k} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "9px 0", borderBottom: "0.5px solid #eaecf3"
                  }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", fontSize: 13 }}>
                      <i className={`ti ${icon}`} style={{ fontSize: 14 }} />{k}
                    </span>
                    <span style={{ fontWeight: 700, color: "#0f1c3f", fontSize: 13.5 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
                  <i className="ti ti-download" /> Save Pass
                </button>
                <button
                  className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => { setBookSuccess(false); setAiResult(null); setForm({ name: "", specialty: "", date: "", priority: "Normal" }); }}
                >
                  <i className="ti ti-plus" /> Book Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBook}>
              <div style={{ marginBottom: 16 }}>
                <label className="label"><i className="ti ti-user" style={{ fontSize: 12 }} /> Full Name</label>
                <input
                  className="input" placeholder="e.g. Suresh Kumar"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="label"><i className="ti ti-stethoscope" style={{ fontSize: 12 }} /> Specialty Needed</label>
                <select
                  className="select" value={form.specialty}
                  onChange={e => setForm({ ...form, specialty: e.target.value })}
                >
                  <option value="">Select specialty</option>
                  {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid-2" style={{ gap: 12, marginBottom: 16 }}>
                <div>
                  <label className="label"><i className="ti ti-calendar" style={{ fontSize: 12 }} /> Preferred Date</label>
                  <input
                    type="date" className="input"
                    value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label"><i className="ti ti-flag" style={{ fontSize: 12 }} /> Priority</label>
                  <select className="select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: 13, fontSize: 15, opacity: aiLoading ? 0.75 : 1 }}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <>
                    <span className="spinner" />
                    AI is finding your slot…
                  </>
                ) : (
                  <>
                    <i className="ti ti-cpu" style={{ fontSize: 17 }} />
                    Assign with AI
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* ── Side Panel ── */}
        <div>
          <div className="card" style={{ marginBottom: 16, padding: 22 }}>
            <h2 style={{ fontSize: 15, display: "flex", alignItems: "center", gap: 7, marginBottom: 16 }}>
              <i className="ti ti-list-details" style={{ color: "#534AB7" }} />
              Current Queue
            </h2>
            {APPOINTMENTS.slice(0, 4).map((a, i) => {
              const ac = APPT_STATUS_COLORS[a.status];
              return (
                <div key={a.id} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                  borderBottom: i < 3 ? "0.5px solid #f0f0f0" : "none"
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, background: "#f0f2f8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "#666"
                  }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0f1c3f" }}>{a.patient}</div>
                    <div style={{ fontSize: 11.5, color: "#999" }}>
                      <i className="ti ti-clock" style={{ fontSize: 11 }} /> {a.time} · {a.dept}
                    </div>
                  </div>
                  <span className="badge" style={{ background: ac.bg, color: ac.text }}>{a.status}</span>
                </div>
              );
            })}
          </div>

          <div style={{
            background: "linear-gradient(135deg, #E1F5EE, #E6F1FB)", borderRadius: 14,
            border: "0.5px solid #9FE1CB", padding: "20px 22px", marginBottom: 16
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div className="icon-box" style={{ width: 38, height: 38, background: "rgba(255,255,255,0.6)", flexShrink: 0 }}>
                <i className="ti ti-brain" style={{ color: "#0F6E56", fontSize: 20 }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#04342C", marginBottom: 4 }}>How AI Scheduling Works</div>
                <div style={{ fontSize: 13, color: "#0a5040", lineHeight: 1.6 }}>
                  When you submit, our AI checks all available doctors matching your specialty, weighs current workloads, and picks the optimal slot — typically in under 2 seconds.
                </div>
              </div>
            </div>
          </div>

          {/* Quick contact */}
          <div className="card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div className="icon-box" style={{ width: 38, height: 38, background: "#FAECE7" }}>
              <i className="ti ti-phone" style={{ color: "#D85A30", fontSize: 18 }} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#999" }}>Need urgent help?</div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f1c3f" }}>Call front desk: 044-2345 6789</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
