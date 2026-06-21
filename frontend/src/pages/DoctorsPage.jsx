import { useState } from "react";
import { DOCTORS, SPECIALTIES } from "../data/constants";
import DoctorCard from "../components/DoctorCard";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");

  const filtered = DOCTORS.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
                           d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = specialtyFilter === "All" || d.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="fade-up">
      <h1 style={{ marginBottom: 4 }}>Our Doctors</h1>
      <p className="section-sub">Real-time availability monitored via RFID and face detection.</p>

      {/* Filter bar */}
      <div className="card" style={{ padding: 16, marginBottom: 24, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <i className="ti ti-search" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa", fontSize: 16 }} />
          <input
            className="input"
            style={{ paddingLeft: 36 }}
            placeholder="Search by name or specialty…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="select" style={{ width: 200 }} value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)}>
          <option>All</option>
          {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
        </select>
        <div style={{ fontSize: 12, color: "#999", marginLeft: "auto" }}>
          <i className="ti ti-users" style={{ fontSize: 13 }} /> {filtered.length} doctors found
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid-auto-300">
          {filtered.map(d => <DoctorCard key={d.id} doctor={d} />)}
        </div>
      ) : (
        <div className="card" style={{ textAlign: "center", padding: "48px 20px" }}>
          <i className="ti ti-mood-empty" style={{ fontSize: 40, color: "#ccc" }} />
          <p style={{ marginTop: 10 }}>No doctors match your search.</p>
        </div>
      )}
    </div>
  );
}
