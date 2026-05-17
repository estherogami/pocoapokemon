// V3 — Diario + rail. Two-column: today on left, rail with builds + pokes + wishlist on right.

function V3Diary() {
  return (
    <div className="pk" style={{
      width: 1280, height: 1640, position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg, #F6EBD3 0%, #EBD7B5 100%)",
      padding: "48px 48px 56px",
    }}>
      <V3TopBar />
      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 24, marginTop: 24 }}>
        <V3Left />
        <V3Right />
      </div>
      <div style={{ position: "absolute", top: 28, right: 80, transform: "rotate(-8deg)" }}>
        <Mascot size={110} color="#95E1F3" />
      </div>
    </div>
  );
}

function V3TopBar() {
  return (
    <header style={{
      background: "var(--pk-white)", borderRadius: 20, padding: "18px 24px",
      boxShadow: "var(--sh-raised)", display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, background: "var(--pk-purple)",
          color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1,
        }}>
          <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1 }}>MAY</span>
          <span style={{ fontSize: 24, fontWeight: 900, marginTop: 2 }}>18</span>
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, lineHeight: 1.1 }}>Diario de obras · Lunes</h1>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--pk-text-soft)", marginTop: 4 }}>
            Pokopia · Día 142 · Primavera tardía · {TODAY.weather}
          </div>
        </div>
      </div>
      <nav style={{ display: "flex", gap: 6 }}>
        {["Hoy", "Semana", "Mes", "Mapa", "Pokédex"].map((t, i) => (
          <span key={t} style={{
            padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            background: i === 0 ? "var(--pk-purple)" : "transparent",
            color: i === 0 ? "#fff" : "var(--pk-text)",
          }}>{t}</span>
        ))}
      </nav>
    </header>
  );
}

window.V3Diary = V3Diary;
