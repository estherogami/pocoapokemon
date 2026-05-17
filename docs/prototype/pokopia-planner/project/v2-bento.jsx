// V2 — Bento cozy. Modular grid of cards, mix of beige/white/purple, cleaner app-like.

function V2Bento() {
  return (
    <div className="pk pk-cream-bg" style={{
      width: 1280, height: 1640, position: "relative", overflow: "hidden",
      padding: "56px 56px 64px",
    }}>
      <V2Header />
      <V2Grid />
      <div style={{ position: "absolute", bottom: 24, right: 32 }}>
        <Mascot size={130} color="#DCB680" />
      </div>
    </div>
  );
}

function V2Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 20, background: "var(--pk-purple)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "var(--sh-elevated)",
        }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
            <path d="M5 18 L17 6 L29 18 L29 28 Q29 30 27 30 L7 30 Q5 30 5 28 Z" fill="#fff" />
            <rect x="14" y="20" width="6" height="10" fill="var(--pk-purple)" />
            <circle cx="17" cy="16" r="2.2" fill="var(--pk-lime)" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 2, color: "var(--pk-brown)", textTransform: "uppercase" }}>
            Planner de Pokopia
          </div>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: "var(--pk-text)", lineHeight: 1.1 }}>
            Lunes 18 de mayo
          </h1>
          <div style={{ marginTop: 4, fontSize: 13, fontWeight: 700, color: "var(--pk-text-soft)" }}>
            Día 142 · Primavera · {TODAY.weather}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <StatChip label="En curso" value="3" color="var(--pk-purple-soft)" />
        <StatChip label="Pendientes" value="5" color="var(--pk-cyan)" />
        <StatChip label="Listos" value="12" color="var(--pk-lime)" />
      </div>
    </header>
  );
}

function StatChip({ label, value, color }) {
  return (
    <div style={{
      background: color, borderRadius: 16, padding: "10px 16px",
      minWidth: 92, textAlign: "center", boxShadow: "var(--sh-raised)",
    }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: "var(--pk-text)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--pk-text)", marginTop: 4, opacity: 0.75 }}>{label}</div>
    </div>
  );
}

function V2Grid() {
  // 12-col grid, 3 rows
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridAutoRows: "minmax(0,auto)",
      gap: 20,
    }}>
      {/* Focus build (large) — cols 1-7 */}
      <div style={{ gridColumn: "span 7" }}>
        <V2FocusCard b={BUILDS[0]} />
      </div>

      {/* Schedule — cols 8-12 */}
      <div style={{ gridColumn: "span 5" }}>
        <V2ScheduleCard />
      </div>

      {/* Builds en curso — full row, 2 columns */}
      <div style={{ gridColumn: "span 4" }}><V2BuildCard b={BUILDS[1]} /></div>
      <div style={{ gridColumn: "span 4" }}><V2BuildCard b={BUILDS[2]} /></div>
      <div style={{ gridColumn: "span 4" }}><V2WishCard /></div>

      {/* Pokémon — cols 1-7 */}
      <div style={{ gridColumn: "span 7" }}><V2PokeCard /></div>

      {/* Notes — cols 8-12 */}
      <div style={{ gridColumn: "span 5" }}><V2NotesCard /></div>
    </div>
  );
}

window.V2Bento = V2Bento;
window.V2BentoCards = { V2FocusCard: null }; // placeholder; cards defined in v2-bento-cards.jsx
