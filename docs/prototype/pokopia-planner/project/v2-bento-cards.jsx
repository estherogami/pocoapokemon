// V2 — Bento cards (focus, schedule, build, wish, poke, notes)

function V2FocusCard({ b }) {
  return (
    <div style={{
      background: "var(--pk-purple)", color: "#fff", borderRadius: 24, padding: 28,
      boxShadow: "var(--sh-elevated)", height: "100%", position: "relative", overflow: "hidden",
    }}>
      {/* deco rays */}
      <svg width="220" height="220" viewBox="0 0 220 220" style={{ position: "absolute", top: -60, right: -50, opacity: 0.18 }} aria-hidden="true">
        <circle cx="110" cy="110" r="80" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="2 8" />
        <circle cx="110" cy="110" r="50" fill="#fff" opacity="0.4" />
      </svg>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 2, opacity: 0.7, textTransform: "uppercase" }}>Construcción del día</div>
          <h2 style={{ margin: "6px 0 0", fontSize: 28, fontWeight: 900, lineHeight: 1.1 }}>{b.name}</h2>
          <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.18)", padding: "5px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
              <path d="M5.5 0.7c2.6 0 4.7 2 4.7 4.6 0 3.2-4.7 7.0-4.7 7.0S0.8 8.5 0.8 5.3C0.8 2.7 2.9 0.7 5.5 0.7Z" fill="#fff" />
              <circle cx="5.5" cy="5.0" r="1.6" fill="var(--pk-purple)" />
            </svg>
            {b.location}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 0.9, letterSpacing: -1 }}>{Math.round(b.progress * 100)}<span style={{ fontSize: 22 }}>%</span></div>
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, marginTop: 4 }}>completado</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {b.materials.map((m, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8 }}>{m.name}</div>
            <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.1, marginTop: 2, fontVariantNumeric: "tabular-nums" }}>
              {m.have}<span style={{ opacity: 0.5, fontSize: 14 }}>/{m.need}</span>
            </div>
            <div className="pk-bar" style={{ background: "rgba(255,255,255,0.20)", marginTop: 6, height: 5 }}>
              <i style={{ width: Math.min(100, (m.have / m.need) * 100) + "%", background: "var(--pk-lime)" }} />
            </div>
          </div>
        ))}
      </div>

      <div>
        {b.subtasks.slice(0, 4).map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
            <span className="pk-check" style={{
              borderColor: "#fff",
              background: s.done ? "var(--pk-lime)" : "transparent",
            }}>
              {s.done && <span style={{ width: 9, height: 5, borderLeft: "2.2px solid #4a3a1a", borderBottom: "2.2px solid #4a3a1a", transform: "rotate(-45deg) translate(1px,-1px)" }} />}
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, opacity: s.done ? 0.6 : 1, textDecoration: s.done ? "line-through" : "none" }}>{s.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function V2ScheduleCard() {
  return (
    <div style={{ background: "var(--pk-white)", borderRadius: 24, padding: 24, boxShadow: "var(--sh-raised)", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>Agenda</h3>
        <span className="pk-pill pk-pill--purple" style={{ fontSize: 10 }}>HOY · 6 entradas</span>
      </div>
      <div style={{ position: "relative", paddingLeft: 14 }}>
        <div style={{ position: "absolute", left: 4, top: 6, bottom: 6, width: 2, background: "var(--pk-purple-tint)", borderRadius: 1 }} />
        {SCHEDULE.map((e, i) => {
          const dotColor = { build: "var(--pk-purple)", captura: "var(--pk-cyan)", ocio: "var(--pk-lime)", rutina: "var(--pk-beige)" }[e.tag];
          return (
            <div key={i} style={{ position: "relative", display: "grid", gridTemplateColumns: "52px 1fr", alignItems: "center", padding: "9px 0", gap: 8 }}>
              <span style={{ position: "absolute", left: -14, top: "50%", transform: "translateY(-50%)", width: 10, height: 10, borderRadius: 5, background: dotColor, boxShadow: "0 0 0 3px #fff, 0 0 0 4.5px var(--pk-purple-tint)" }} />
              <span style={{ fontSize: 12, fontWeight: 900, fontVariantNumeric: "tabular-nums", color: "var(--pk-purple)" }}>{e.time}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--pk-text)" }}>{e.t}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function V2BuildCard({ b }) {
  const isDone = b.status === "completado";
  return (
    <div style={{
      background: "var(--pk-white)", borderRadius: 20, padding: 18,
      boxShadow: "var(--sh-raised)", height: "100%", position: "relative",
      border: isDone ? "2px solid var(--pk-lime)" : "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <StatusPill status={b.status} />
        <MapDot where={b.location} />
      </div>
      <h4 style={{ margin: "6px 0 12px", fontSize: 17, fontWeight: 900, lineHeight: 1.2 }}>{b.name}</h4>

      <div style={{ marginBottom: 10 }}>
        {b.materials.slice(0, 3).map((m, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", padding: "4px 0", borderBottom: i < Math.min(b.materials.length, 3) - 1 ? "1px solid rgba(0,0,0,0.05)" : "none", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700 }}>{m.name}</span>
            <span style={{ fontSize: 12, fontWeight: 900, fontVariantNumeric: "tabular-nums", color: m.have >= m.need ? "var(--pk-purple)" : "var(--pk-text-soft)" }}>
              {m.have} / {m.need}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--pk-text-soft)" }}>{b.subtasks.filter(s => s.done).length}/{b.subtasks.length} pasos</span>
        <span style={{ fontSize: 13, fontWeight: 900, color: "var(--pk-purple)" }}>{Math.round(b.progress * 100)}%</span>
      </div>
      <div className="pk-bar" style={{ marginTop: 6 }}>
        <i style={{ width: (b.progress * 100) + "%" }} />
      </div>
    </div>
  );
}

function V2WishCard() {
  return (
    <div style={{ background: "var(--pk-purple-soft)", borderRadius: 20, padding: 20, height: "100%", boxShadow: "var(--sh-raised)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900 }}>Lista de deseos</h3>
        <span style={{ fontSize: 11, fontWeight: 900, color: "var(--pk-purple)", background: "rgba(255,255,255,0.6)", padding: "3px 8px", borderRadius: 999 }}>{WISHLIST.length}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {WISHLIST.slice(0, 5).map((w, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "rgba(255,255,255,0.6)", padding: "8px 12px", borderRadius: 12,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--pk-text)" }}>{w.t}</span>
            <span style={{ fontSize: 10, fontWeight: 900, color: "var(--pk-purple-dark)", textTransform: "uppercase", letterSpacing: 0.5 }}>{w.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function V2PokeCard() {
  return (
    <div style={{ background: "var(--pk-white)", borderRadius: 24, padding: 24, boxShadow: "var(--sh-raised)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>Pokémon por capturar</h3>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--pk-text-soft)", marginTop: 2 }}>5 pistas activas en el mapa</div>
        </div>
        <span className="pk-pill pk-pill--cyan" style={{ fontSize: 10 }}>WISHLIST · CAPTURA</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {POKES.map((p) => (
          <div key={p.id} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 12px",
            background: "var(--pk-beige-cream)",
            borderRadius: 14,
          }}>
            <PokeAvatar id={p.id} color={p.color} size={42} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 900 }}>{p.name}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--pk-text-soft)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.where}</div>
            </div>
            <span className="pk-pill pk-pill--ghost" style={{ fontSize: 9, padding: "3px 8px" }}>{p.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function V2NotesCard() {
  return (
    <div style={{
      background: "var(--pk-beige)", borderRadius: 24, padding: 24,
      boxShadow: "var(--sh-raised)", height: "100%", position: "relative", overflow: "hidden",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "var(--pk-brown-dark)" }}>Notas del día</h3>
        <span style={{ fontSize: 11, fontWeight: 900, color: "#fff", background: "var(--pk-brown)", padding: "3px 8px", borderRadius: 999 }}>3 ideas</span>
      </div>
      <div style={{
        background: "rgba(255,255,255,0.55)", borderRadius: 14, padding: "14px 16px",
        fontFamily: '"Bradley Hand", "Marker Felt", "Segoe Script", cursive',
        fontSize: 16, lineHeight: 1.7, color: "var(--pk-brown-dark)",
      }}>
        · El mercader del jueves trae cristal templado.<br />
        · Avisar a EE antes de ir a la cueva — le da miedo Zubat.<br />
        · Probar a plantar bayas Aspear cerca del río.<br />
        · El tronco grande del bosque norte ya está listo para talar.
      </div>
    </div>
  );
}

Object.assign(window, { V2FocusCard, V2ScheduleCard, V2BuildCard, V2WishCard, V2PokeCard, V2NotesCard });
