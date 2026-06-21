import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usersApi } from "../api/client";
import { SPECIALTIES } from "../data/constants";

const ROLE_META = {
  patient: { label: "Patient", color: "#185FA5", bg: "#E6F1FB" },
  doctor:  { label: "Doctor",  color: "#1D9E75", bg: "#E1F5EE" },
  admin:   { label: "Admin",   color: "#854F0B", bg: "#FAEEDA" },
};

export default function AdminHome({ user }) {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "doctor", specialty: "", room: "", experience: "" });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadUsers = async () => {
    setLoadingUsers(true);
    setFetchError("");
    try {
      const { users } = await usersApi.listAll(token);
      setUsers(users);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!form.name || !form.email || !form.password) {
      setFormError("Name, email and password are required.");
      return;
    }
    setSubmitting(true);
    try {
      await usersApi.createStaff(form, token);
      setFormSuccess(`${form.role === "doctor" ? "Doctor" : "Admin"} account created successfully.`);
      setForm({ name: "", email: "", password: "", role: "doctor", specialty: "", room: "", experience: "" });
      loadUsers();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (u) => {
    try {
      if (u.isActive) await usersApi.deactivate(u._id, token);
      else await usersApi.activate(u._id, token);
      loadUsers();
    } catch (err) {
      setFetchError(err.message);
    }
  };

  const counts = {
    patient: users.filter(u => u.role === "patient").length,
    doctor:  users.filter(u => u.role === "doctor").length,
    admin:   users.filter(u => u.role === "admin").length,
  };

  return (
    <div className="fade-up">
      <div style={{
        background: "linear-gradient(135deg, #0f1c3f, #854F0B)", borderRadius: 16,
        padding: "30px 32px", marginBottom: 28, color: "#fff",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16
      }}>
        <div>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
            <i className="ti ti-shield-star" /> Admin Dashboard
          </div>
          <h1 style={{ color: "#fff", fontSize: 24, marginBottom: 0 }}>{user.name}</h1>
        </div>
        <button className="btn" style={{ background: "#fff", color: "#854F0B", fontWeight: 700 }}
          onClick={() => setShowForm(s => !s)}>
          <i className={`ti ${showForm ? "ti-x" : "ti-user-plus"}`} />
          {showForm ? "Close Form" : "Add Doctor / Admin"}
        </button>
      </div>

      {/* Counts */}
      <div className="grid-3" style={{ marginBottom: 28 }}>
        {[
          { role: "patient", icon: "ti-users",       label: "Patients" },
          { role: "doctor",  icon: "ti-stethoscope", label: "Doctors"  },
          { role: "admin",   icon: "ti-shield-star", label: "Admins"   },
        ].map(c => {
          const meta = ROLE_META[c.role];
          return (
            <div key={c.role} className="card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className="icon-box" style={{ width: 44, height: 44, background: meta.bg }}>
                <i className={`ti ${c.icon}`} style={{ color: meta.color, fontSize: 22 }} />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#0f1c3f" }}>{counts[c.role]}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{c.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create staff form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 24, padding: 24 }}>
          <h2 style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <i className="ti ti-user-plus" style={{ color: "#1D9E75" }} /> Create Staff Account
          </h2>

          {formError && (
            <div style={{ background: "#FCEBEB", border: "0.5px solid #F7C1C1", color: "#A32D2D", borderRadius: 9, padding: "10px 14px", fontSize: 13, marginBottom: 14 }}>
              <i className="ti ti-alert-circle" /> {formError}
            </div>
          )}
          {formSuccess && (
            <div style={{ background: "#E1F5EE", border: "0.5px solid #9FE1CB", color: "#0F6E56", borderRadius: 9, padding: "10px 14px", fontSize: 13, marginBottom: 14 }}>
              <i className="ti ti-circle-check" /> {formSuccess}
            </div>
          )}

          <form onSubmit={handleCreate}>
            <div className="grid-2" style={{ gap: 14, marginBottom: 14 }}>
              <div>
                <label className="label">Full Name</label>
                <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dr. Jane Doe" />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane.doe@medqube.health" />
              </div>
            </div>

            <div className="grid-2" style={{ gap: 14, marginBottom: 14 }}>
              <div>
                <label className="label">Temporary Password</label>
                <input type="text" className="input" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min. 6 characters" />
              </div>
              <div>
                <label className="label">Role</label>
                <select className="select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {form.role === "doctor" && (
              <div className="grid-3" style={{ gap: 14, marginBottom: 14 }}>
                <div>
                  <label className="label">Specialty</label>
                  <select className="select" value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })}>
                    <option value="">Select</option>
                    {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Room</label>
                  <input className="input" value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} placeholder="OPD-4" />
                </div>
                <div>
                  <label className="label">Experience</label>
                  <input className="input" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="8 yrs" />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={submitting} style={{ opacity: submitting ? 0.75 : 1 }}>
              {submitting ? <><span className="spinner" /> Creating…</> : <><i className="ti ti-check" /> Create Account</>}
            </button>
          </form>
        </div>
      )}

      {/* User list */}
      <div className="card">
        <h2 style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <i className="ti ti-users" style={{ color: "#534AB7" }} /> All Accounts
        </h2>

        {fetchError && (
          <div style={{ background: "#FCEBEB", border: "0.5px solid #F7C1C1", color: "#A32D2D", borderRadius: 9, padding: "10px 14px", fontSize: 13, marginBottom: 14 }}>
            <i className="ti ti-alert-circle" /> {fetchError}
          </div>
        )}

        {loadingUsers ? (
          <div style={{ textAlign: "center", padding: 30, color: "#999" }}>
            <span className="spinner" style={{ borderTopColor: "#888", borderColor: "rgba(0,0,0,0.1)" }} /> Loading accounts…
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="mq-table">
              <thead>
                <tr>
                  {["Name", "Email", "Role", "Status", "Action"].map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {users.map(u => {
                  const meta = ROLE_META[u.role];
                  return (
                    <tr key={u._id}>
                      <td style={{ fontWeight: 600, color: "#0f1c3f" }}>{u.name}</td>
                      <td style={{ color: "#888" }}>{u.email}</td>
                      <td><span className="badge" style={{ background: meta.bg, color: meta.color }}>{meta.label}</span></td>
                      <td>
                        <span className="badge" style={{
                          background: u.isActive ? "#E1F5EE" : "#FCEBEB",
                          color: u.isActive ? "#0F6E56" : "#A32D2D"
                        }}>
                          {u.isActive ? "Active" : "Deactivated"}
                        </span>
                      </td>
                      <td>
                        {u._id !== user._id && (
                          <button className="btn btn-ghost" style={{ fontSize: 11, padding: "4px 10px" }} onClick={() => toggleActive(u)}>
                            {u.isActive ? "Deactivate" : "Activate"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
