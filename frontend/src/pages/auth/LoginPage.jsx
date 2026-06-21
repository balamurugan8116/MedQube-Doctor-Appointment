import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage({ onSuccess, goToSignup }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      onSuccess(user); // parent decides where to route based on user.role
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
        width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
      }}>
        {/* Logo */}
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

        <h1 style={{ fontSize: 21, textAlign: "center", marginBottom: 4 }}>Welcome back</h1>
        <p style={{ fontSize: 13, color: "#888", textAlign: "center", marginBottom: 26 }}>
          Log in to your patient, doctor, or admin account.
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
          <div style={{ marginBottom: 16 }}>
            <label className="label"><i className="ti ti-mail" style={{ fontSize: 12 }} /> Email</label>
            <input
              type="email"
              className="input"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label className="label"><i className="ti ti-lock" style={{ fontSize: 12 }} /> Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="••••••••"
                style={{ paddingRight: 40 }}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "#999", padding: 4
                }}
              >
                <i className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`} style={{ fontSize: 16 }} />
              </button>
            </div>
          </div>

          <div style={{ textAlign: "right", marginBottom: 22 }}>
            <span style={{ fontSize: 12.5, color: "#1D9E75", cursor: "pointer", fontWeight: 500 }}>
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: 12, fontSize: 14.5, opacity: loading ? 0.75 : 1 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" /> Signing in…
              </>
            ) : (
              <>
                <i className="ti ti-login" style={{ fontSize: 16 }} /> Log In
              </>
            )}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "22px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#eee" }} />
          <span style={{ fontSize: 11, color: "#bbb" }}>NEW PATIENT?</span>
          <div style={{ flex: 1, height: 1, background: "#eee" }} />
        </div>

        <button
          type="button"
          className="btn btn-outline"
          style={{ width: "100%", justifyContent: "center", padding: 11 }}
          onClick={goToSignup}
        >
          <i className="ti ti-user-plus" style={{ fontSize: 16 }} />
          Create a patient account
        </button>

        <p style={{ fontSize: 11.5, color: "#bbb", textAlign: "center", marginTop: 20, lineHeight: 1.5 }}>
          Doctor and admin accounts are created by hospital administration.
          <br />Contact your admin if you need access.
        </p>
      </div>
    </div>
  );
}
