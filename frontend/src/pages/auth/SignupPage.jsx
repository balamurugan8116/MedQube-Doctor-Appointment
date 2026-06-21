import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SignupPage({ onSuccess, goToLogin }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Name, email and password are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const user = await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      onSuccess(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f1c3f 0%, #163255 60%, #0f3d2e 100%)",
      padding: 24
    }}>
      <div style={{
        background: "#fff", borderRadius: 18, padding: "40px 36px",
        width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 11,
              background: "linear-gradient(135deg, #1D9E75, #185FA5)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <i className="ti ti-heartbeat" style={{ color: "#fff", fontSize: 21 }} />
            </div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#0f1c3f" }}>
              Med<span style={{ color: "#1D9E75" }}>Qube</span>
            </div>
          </div>
        </div>

        <h1 style={{ fontSize: 21, textAlign: "center", marginBottom: 4 }}>Create your account</h1>
        <p style={{ fontSize: 13, color: "#888", textAlign: "center", marginBottom: 26 }}>
          Sign up as a patient to start booking appointments.
        </p>

        {error && (
          <div style={{
            background: "#FCEBEB", border: "0.5px solid #F7C1C1", color: "#A32D2D",
            borderRadius: 9, padding: "10px 14px", fontSize: 13, marginBottom: 16,
            display: "flex", alignItems: "center", gap: 8
          }}>
            <i className="ti ti-alert-circle" style={{ fontSize: 16 }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label className="label"><i className="ti ti-user" style={{ fontSize: 12 }} /> Full Name</label>
            <input className="input" placeholder="e.g. Suresh Kumar" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="label"><i className="ti ti-mail" style={{ fontSize: 12 }} /> Email</label>
            <input type="email" className="input" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="label"><i className="ti ti-phone" style={{ fontSize: 12 }} /> Phone (optional)</label>
            <input className="input" placeholder="+91 98765 43210" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>

          <div className="grid-2" style={{ gap: 12, marginBottom: 22 }}>
            <div>
              <label className="label"><i className="ti ti-lock" style={{ fontSize: 12 }} /> Password</label>
              <input type="password" className="input" placeholder="Min. 6 characters" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div>
              <label className="label"><i className="ti ti-lock-check" style={{ fontSize: 12 }} /> Confirm</label>
              <input type="password" className="input" placeholder="Re-enter password" value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })} />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: 12, fontSize: 14.5, opacity: loading ? 0.75 : 1 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" /> Creating account…
              </>
            ) : (
              <>
                <i className="ti ti-user-plus" style={{ fontSize: 16 }} /> Create Account
              </>
            )}
          </button>
        </form>

        <p style={{ fontSize: 13, color: "#888", textAlign: "center", marginTop: 20 }}>
          Already have an account?{" "}
          <span style={{ color: "#1D9E75", fontWeight: 600, cursor: "pointer" }} onClick={goToLogin}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
