export default function StatCard({ label, value, icon, color, bg, trend }) {
  return (
    <div className="card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px" }}>
      <div
        className="icon-box"
        style={{ width: 48, height: 48, background: bg, borderRadius: 12 }}
      >
        <i className={`ti ${icon}`} style={{ color, fontSize: 24 }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#0f1c3f", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{label}</div>
      </div>
      {trend && (
        <div style={{
          fontSize: 11, fontWeight: 600,
          color: trend > 0 ? "#1D9E75" : "#D85A30",
          background: trend > 0 ? "#E1F5EE" : "#FAECE7",
          padding: "2px 8px", borderRadius: 5
        }}>
          <i className={`ti ${trend > 0 ? "ti-trending-up" : "ti-trending-down"}`} style={{ fontSize: 10 }} />
          {" "}{Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}
