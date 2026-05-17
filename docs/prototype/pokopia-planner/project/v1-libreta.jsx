// V1 — Libreta cosida. Single page, paper texture, washi tape, cozy storybook.

function V1Libreta() {
  return (
    <div className="pk pk-paper-bg" style={{
      width: 1280, height: 1640, position: "relative", overflow: "hidden",
      padding: "72px 72px 80px",
    }}>
      {/* Washi tapes at corners */}
      <div className="pk-tape pk-tape--purple" style={{ top: 28,  left: -18, transform: "rotate(-7deg)" }} />
      <div className="pk-tape pk-tape--lime"   style={{ top: 38,  right: -22, transform: "rotate(6deg)" }} />
      <div className="pk-tape pk-tape--cyan"   style={{ bottom: 60, left: -28, transform: "rotate(8deg)" }} />

      {/* Mascot decoration */}
      <div style={{ position: "absolute", bottom: 50, right: 60, transform: "rotate(6deg)" }}>
        <Mascot size={150} color="#C59BFF" />
      </div>

      {/* Header */}
      <header style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--pk-brown)", letterSpacing: 2, textTransform: "uppercase" }}>
            Cuaderno de Pokopia · Semana 21
          </div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 16 }}>
            <div style={{ fontSize: 88, fontWeight: 900, color: "var(--pk-purple)", lineHeight: 0.9, letterSpacing: -2 }}>
              18
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: "var(--pk-text)", lineHeight: 1 }}>Mayo, lunes</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--pk-text-soft)" }}>
                Día 142 en Pokopia · {TODAY.weather} {TODAY.moon}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <span className="pk-stamp">Plan del día</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--pk-brown-dark)" }}>3 construcciones activas · 5 capturas pendientes</span>
        </div>
      </header>

      {/* Row 1 — Foco del día + agenda */}
      <section style={{ display: "grid", gridTemplateColumns: "440px 1fr", gap: 28, marginBottom: 32 }}>
        {/* Foco del día */}
        <div style={{
          background: "var(--pk-purple)", color: "#fff", borderRadius: 20, padding: 24,
          boxShadow: "var(--sh-elevated)", position: "relative",
        }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 2, opacity: 0.7 }}>FOCO DEL DÍA</div>
          <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.15, marginTop: 8, marginBottom: 14 }}>
            Terminar el balcón del 2º piso
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.9 }}>Casa principal · Prado del Inicio</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: 12, padding: "10px 12px", display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Progreso</span>
            <span style={{ fontSize: 13, fontWeight: 900 }}>62%</span>
          </div>
          <div className="pk-bar" style={{ background: "rgba(255,255,255,0.20)", marginBottom: 18 }}>
            <i style={{ width: "62%", background: "var(--pk-lime)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {BUILDS[0].subtasks.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0" }}>
                <span className="pk-check" style={{
                  borderColor: "#fff",
                  background: s.done ? "var(--pk-lime)" : "transparent",
                }}>
                  {s.done && <span style={{ width: 9, height: 5, borderLeft: "2.2px solid #5a4a2a", borderBottom: "2.2px solid #5a4a2a", transform: "rotate(-45deg) translate(1px,-1px)" }} />}
                </span>
                <span style={{
                  fontSize: 14, fontWeight: 700,
                  opacity: s.done ? 0.6 : 1,
                  textDecoration: s.done ? "line-through" : "none",
                }}>{s.t}</span>
              </div>
            ))}
          </div>
          <div className="pk-tape pk-tape--lime" style={{ top: -12, left: 28, transform: "rotate(-4deg)", width: 90, height: 18 }} />
        </div>

        {/* Agenda */}
        <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 16, padding: "20px 24px", border: "1.5px dashed rgba(161,116,88,0.4)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "var(--pk-text)" }}>Agenda de hoy</h3>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--pk-text-soft)" }}>6 entradas</span>
          </div>
          <div>
            {SCHEDULE.map((e, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "62px 1fr auto", alignItems: "center", padding: "8px 0", borderBottom: i < SCHEDULE.length - 1 ? "1px dotted rgba(161,116,88,0.35)" : "none" }}>
                <span style={{ fontSize: 14, fontWeight: 900, fontVariantNumeric: "tabular-nums", color: "var(--pk-purple)" }}>{e.time}</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{e.t}</span>
                <span className={"pk-pill " + (
                  e.tag === "build"   ? "pk-pill--purple" :
                  e.tag === "captura" ? "pk-pill--cyan"   :
                  e.tag === "ocio"    ? "pk-pill--lime"   :
                                        "pk-pill--ghost"
                )} style={{ fontSize: 10, padding: "3px 8px" }}>{e.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Row 2 — En construcción */}
      <section style={{ marginBottom: 32 }}>
        <SectionTitle title="En construcción" count="3" accent="lime" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {BUILDS.slice(0, 3).map((b) => <BuildPaperCard key={b.id} b={b} />)}
        </div>
      </section>

      {/* Row 3 — Pokémon + Wishlist */}
      <section style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 28 }}>
        <div>
          <SectionTitle title="Pokémon por capturar" count={POKES.length} accent="cyan" />
          <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 16, padding: "8px 18px", border: "1.5px dashed rgba(161,116,88,0.4)" }}>
            {POKES.map((p, i) => (
              <div key={p.id} style={{
                display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 14,
                padding: "12px 0",
                borderBottom: i < POKES.length - 1 ? "1px dotted rgba(161,116,88,0.35)" : "none",
              }}>
                <PokeAvatar id={p.id} color={p.color} size={40} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "var(--pk-text)" }}>{p.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--pk-text-soft)", marginTop: 2 }}>{p.tip}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <MapDot where={p.where} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--pk-purple)" }}>{p.when}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle title="Lista de deseos" count={WISHLIST.length} accent="purple" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            {WISHLIST.map((w, i) => (
              <div key={i} style={{
                background: i % 2 ? "var(--pk-beige-cream)" : "var(--pk-white)",
                padding: "10px 14px", borderRadius: 12,
                boxShadow: "var(--sh-raised)",
                transform: `rotate(${(i % 2 ? 1 : -1) * (0.5 + (i % 3) * 0.4)}deg)`,
                display: "flex", flexDirection: "column", gap: 4,
                minWidth: 150,
              }}>
                <span style={{ fontSize: 14, fontWeight: 900, color: "var(--pk-text)" }}>{w.t}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--pk-brown)", letterSpacing: 1, textTransform: "uppercase" }}>{w.tag}</span>
              </div>
            ))}
          </div>
          {/* Notes */}
          <div style={{ background: "rgba(255,255,255,0.55)", borderRadius: 12, padding: "16px 18px", border: "1.5px dashed rgba(161,116,88,0.4)" }}>
            <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: 1.5, color: "var(--pk-brown)", marginBottom: 8, textTransform: "uppercase" }}>Notas</div>
            <div style={{ fontFamily: '"Bradley Hand", "Marker Felt", "Segoe Script", cursive', fontSize: 15, lineHeight: 1.7, color: "var(--pk-text)" }}>
              · El mercader del jueves trae cristal templado, llevar 80 monedas.<br />
              · Avisar a EE antes de ir a la cueva — le da miedo Zubat.<br />
              · Probar a plantar bayas Aspear cerca del río.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* — small helpers private to V1 — */
function SectionTitle({ title, count, accent = "purple" }) {
  const tape = { purple: "pk-tape--purple", lime: "pk-tape--lime", cyan: "pk-tape--cyan", beige: "pk-tape--beige" }[accent];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, position: "relative" }}>
      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "var(--pk-text)" }}>{title}</h3>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 26, height: 26, padding: "0 8px", borderRadius: 13, background: "var(--pk-purple)", color: "#fff", fontSize: 12, fontWeight: 900 }}>{count}</span>
      <div style={{ flex: 1, height: 0, borderTop: "2px dashed rgba(161,116,88,0.4)" }} />
      <div className={"pk-tape " + tape} style={{ position: "static", width: 60, height: 16, transform: "rotate(-3deg)" }} />
    </div>
  );
}

function BuildPaperCard({ b }) {
  const isDone = b.status === "completado";
  return (
    <div style={{
      background: "var(--pk-white)",
      borderRadius: 14,
      padding: 18,
      boxShadow: "var(--sh-paper)",
      position: "relative",
      minHeight: 260,
    }}>
      {isDone && <span className="pk-stamp pk-stamp--lime" style={{ position: "absolute", top: 14, right: 14 }}>Listo</span>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 900, lineHeight: 1.25, color: "var(--pk-text)" }}>{b.name}</div>
          <div style={{ marginTop: 6 }}><MapDot where={b.location} /></div>
        </div>
        {!isDone && <StatusPill status={b.status} />}
      </div>

      {!isDone && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--pk-text-soft)", textTransform: "uppercase", letterSpacing: 1 }}>Materiales</span>
            <span style={{ fontSize: 11, fontWeight: 900, color: "var(--pk-purple)" }}>{Math.round(b.progress * 100)}%</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {b.materials.map((m, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: "var(--pk-text)", marginBottom: 3 }}>
                  <span>{m.name}</span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>{m.have} / {m.need}</span>
                </div>
                <MaterialBar have={m.have} need={m.need} variant={i === 0 ? "" : (i === 1 ? "pk-bar--lime" : "pk-bar--beige")} />
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px dotted rgba(161,116,88,0.4)", paddingTop: 8 }}>
            {b.subtasks.slice(0, 3).map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 0" }}>
                <Check on={s.done} />
                <span style={{ fontSize: 12, fontWeight: 600, color: s.done ? "var(--pk-text-soft)" : "var(--pk-text)", textDecoration: s.done ? "line-through" : "none" }}>{s.t}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {isDone && (
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--pk-text-soft)", lineHeight: 1.5, marginTop: 14 }}>
          {b.note}
        </div>
      )}
    </div>
  );
}

window.V1Libreta = V1Libreta;
