// V3 — Right rail (En curso, Pokémon, Wishlist, Notas)

function V3Right() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <V3RailBuilds />
      <V3RailPokes />
      <V3RailWish />
      <V3RailNotes />
    </div>
  );
}

function V3RailBuilds() {
  const others = BUILDS.slice(1);
  return (
    <section style={{ background: "var(--pk-white)", borderRadius: 18, padding: "16px 18px", boxShadow: "var(--sh-raised)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 900 }}>Otras construcciones</h3>
        <span style={{ fontSize: 11, fontWeight: 900, color: "var(--pk-purple)" }}>{others.length}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {others.map((b) => {
          const isDone = b.status === "completado";
          return (
            <div key={b.id} style={{
              padding: "12px 14px", borderRadius: 12,
              background: isDone ? "rgba(193,227,108,0.20)" : "var(--pk-beige-cream)",
              position: "relative",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 900, lineHeight: 1.25 }}>{b.name}</div>
                  <div style={{ marginTop: 4 }}><MapDot where={b.location} /></div>
                </div>
                <StatusPill status={b.status} />
              </div>
              {!isDone && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "var(--pk-text-soft)", textTransform: "uppercase", letterSpacing: 1 }}>
                      {b.subtasks.filter(s => s.done).length}/{b.subtasks.length} pasos
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 900, color: "var(--pk-purple)" }}>{Math.round(b.progress * 100)}%</span>
                  </div>
                  <div className="pk-bar" style={{ height: 5 }}>
                    <i style={{ width: (b.progress * 100) + "%" }} />
                  </div>
                  {/* mini materials chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                    {b.materials.slice(0, 3).map((m, i) => (
                      <span key={i} style={{
                        fontSize: 10, fontWeight: 700,
                        padding: "3px 7px", borderRadius: 999,
                        background: m.have >= m.need ? "var(--pk-lime)" : "rgba(255,255,255,0.7)",
                        color: "var(--pk-text)",
                      }}>
                        {m.name} {m.have}/{m.need}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function V3RailPokes() {
  return (
    <section style={{ background: "var(--pk-white)", borderRadius: 18, padding: "16px 18px", boxShadow: "var(--sh-raised)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 900 }}>Pokémon pendientes</h3>
        <span className="pk-pill pk-pill--cyan" style={{ fontSize: 10 }}>{POKES.length} pistas</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {POKES.map((p, i) => (
          <div key={p.id} style={{
            display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 10,
            padding: "8px 10px", borderRadius: 10,
            background: i % 2 === 0 ? "var(--pk-beige-cream)" : "transparent",
          }}>
            <PokeAvatar id={p.id} color={p.color} size={36} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 900 }}>{p.name}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--pk-text-soft)", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {p.where}
              </div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 900, color: "var(--pk-purple)", textAlign: "right", whiteSpace: "nowrap" }}>{p.when}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function V3RailWish() {
  return (
    <section style={{
      background: "var(--pk-purple-soft)", borderRadius: 18, padding: "16px 18px",
      boxShadow: "var(--sh-raised)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 900 }}>Wishlist · ideas</h3>
        <span style={{ fontSize: 11, fontWeight: 900, color: "var(--pk-purple-dark)" }}>{WISHLIST.length}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {WISHLIST.map((w, i) => (
          <span key={i} style={{
            fontSize: 12, fontWeight: 700,
            padding: "6px 10px", borderRadius: 999,
            background: "rgba(255,255,255,0.65)",
            color: "var(--pk-text)",
          }}>
            {w.t}
          </span>
        ))}
      </div>
    </section>
  );
}

function V3RailNotes() {
  return (
    <section style={{
      background: "var(--pk-beige)", borderRadius: 18, padding: "16px 18px",
      boxShadow: "var(--sh-raised)",
    }}>
      <h3 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 900, color: "var(--pk-brown-dark)" }}>Notas rápidas</h3>
      <div style={{
        background: "rgba(255,255,255,0.55)", borderRadius: 12, padding: "12px 14px",
        fontFamily: '"Bradley Hand", "Marker Felt", "Segoe Script", cursive',
        fontSize: 14, lineHeight: 1.65, color: "var(--pk-brown-dark)",
      }}>
        · Cristal templado del mercader del jueves<br />
        · Plantar bayas Aspear junto al río<br />
        · Hablar con EE antes de la cueva
      </div>
    </section>
  );
}

Object.assign(window, { V3Right, V3RailBuilds, V3RailPokes, V3RailWish, V3RailNotes });
