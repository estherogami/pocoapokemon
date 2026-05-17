// V3 — Left column (Today's focus, schedule, materials check)

function V3Left() {
  const b = BUILDS[0];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Focus card */}
      <div style={{ background: "var(--pk-white)", borderRadius: 20, overflow: "hidden", boxShadow: "var(--sh-raised)" }}>
        {/* Hero band */}
        <div style={{
          background: "linear-gradient(135deg, var(--pk-purple) 0%, var(--pk-purple-soft) 100%)",
          padding: "20px 24px", color: "#fff", position: "relative", overflow: "hidden",
        }}>
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute", right: -30, top: -40, opacity: 0.25 }} aria-hidden="true">
            <path d="M20 110 L80 30 L140 110 L140 140 L20 140 Z" fill="#fff" />
            <rect x="68" y="100" width="24" height="40" fill="var(--pk-purple)" />
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 2, opacity: 0.8 }}>OBRA DEL DÍA</div>
              <h2 style={{ margin: "6px 0 0", fontSize: 24, fontWeight: 900, lineHeight: 1.15, maxWidth: 420 }}>{b.name}</h2>
              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <span style={{ background: "rgba(255,255,255,0.20)", padding: "5px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                  📍 {b.location}
                </span>
                <span style={{ background: "rgba(255,255,255,0.20)", padding: "5px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                  Tarde · 3-5 horas
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 38, fontWeight: 900, lineHeight: 1 }}>{Math.round(b.progress * 100)}%</div>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, marginTop: 2 }}>completado</div>
            </div>
          </div>
        </div>

        {/* Body: materials grid + subtasks */}
        <div style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.5, color: "var(--pk-text-soft)", textTransform: "uppercase", marginBottom: 10 }}>
            Materiales requeridos
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
            {b.materials.map((m, i) => {
              const pct = Math.min(1, m.have / m.need);
              const isDone = pct >= 1;
              return (
                <div key={i} style={{
                  border: "2px solid " + (isDone ? "var(--pk-lime)" : "rgba(0,0,0,0.06)"),
                  borderRadius: 14, padding: "12px 14px",
                  background: isDone ? "rgba(193,227,108,0.15)" : "var(--pk-beige-cream)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 900 }}>{m.name}</span>
                    {isDone && <span style={{ fontSize: 12, fontWeight: 900, color: "#5a8e1a" }}>✓</span>}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, fontVariantNumeric: "tabular-nums", marginTop: 4, color: "var(--pk-purple-dark)" }}>
                    {m.have}<span style={{ fontSize: 14, color: "var(--pk-text-soft)" }}> / {m.need}</span>
                  </div>
                  <div className="pk-bar" style={{ height: 5, marginTop: 8 }}>
                    <i style={{ width: (pct * 100) + "%", background: isDone ? "var(--pk-lime)" : undefined }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.5, color: "var(--pk-text-soft)", textTransform: "uppercase", marginBottom: 8 }}>
            Pasos de hoy ({b.subtasks.filter(s => s.done).length}/{b.subtasks.length})
          </div>
          <div>
            {b.subtasks.map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 10,
                background: i % 2 === 0 ? "var(--pk-beige-cream)" : "transparent",
              }}>
                <Check on={s.done} />
                <span style={{
                  fontSize: 14, fontWeight: 700,
                  color: s.done ? "var(--pk-text-soft)" : "var(--pk-text)",
                  textDecoration: s.done ? "line-through" : "none",
                  flex: 1,
                }}>{s.t}</span>
                {!s.done && i === b.subtasks.findIndex(x => !x.done) && (
                  <span className="pk-pill pk-pill--purple" style={{ fontSize: 10, padding: "3px 8px" }}>SIGUIENTE</span>
                )}
              </div>
            ))}
          </div>

          {/* Note */}
          <div style={{
            marginTop: 14, padding: "10px 14px",
            background: "var(--pk-cyan)", borderRadius: 10,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 16 }}>💭</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--pk-text)" }}>{b.note}</span>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div style={{ background: "var(--pk-white)", borderRadius: 20, padding: "20px 24px", boxShadow: "var(--sh-raised)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>Plan del día</h3>
          <div style={{ display: "flex", gap: 6 }}>
            <span className="pk-pill pk-pill--purple" style={{ fontSize: 10 }}>3 builds</span>
            <span className="pk-pill pk-pill--cyan" style={{ fontSize: 10 }}>1 captura</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {SCHEDULE.map((e, i) => {
            const colors = { build: "var(--pk-purple)", captura: "var(--pk-cyan)", ocio: "var(--pk-lime)", rutina: "var(--pk-beige)" };
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 12px", borderRadius: 10,
                background: "var(--pk-beige-cream)",
                borderLeft: `4px solid ${colors[e.tag]}`,
              }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: "var(--pk-purple)", fontVariantNumeric: "tabular-nums", minWidth: 38 }}>{e.time}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--pk-text)" }}>{e.t}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.V3Left = V3Left;
