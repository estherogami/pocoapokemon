// Flow A — Crear entrada del diario personal.

function FlowDiary() {
  const today = { d: 18, month: "Mayo", weekday: "Lunes", weather: "Soleado · 22°", moon: "🌒" };
  const moodActive = "calm";
  const entry = `Hoy hemos avanzado mucho con el balcón del segundo piso. BU me ayudó a cargar las tablas largas y, aunque pesaban un montón, no se separó de mí ni un segundo.

Por la tarde, mientras descansaba en la orilla del lago, vi a PS pasarme cerca pero no se atrevió a salir del agua. Mañana le llevaré bayas dulces para ver si se anima.

Me he ido a dormir contento. La casa empieza a parecer una de verdad.`;

  return (
    <SheetPaper
      label="Diario del día"
      idx="14" total="56"
      stamp={{ text: "Lunes · soleado", kind: "lime" }}
      tapes={[
        { color: "purple", top: 26, left: -22, rot: -7 },
        { color: "cyan",   top: 32, right: -28, rot: 6 },
        { color: "lime",   bottom: 70, left: -28, rot: 9 },
      ]}
      mascotPos={{ position: "absolute", bottom: 90, right: 36, transform: "rotate(8deg)" }}
      mascotColor="#C59BFF"
    >
      {/* Top strip: date + weather + mood */}
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 24, marginBottom: 22 }}>
        {/* Big date */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 72, fontWeight: 900, color: "var(--pk-purple)", lineHeight: 0.85, letterSpacing: -2 }}>{today.d}</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>{today.month}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--pk-text-soft)" }}>{today.weekday}</div>
          </div>
        </div>

        {/* Weather + season */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <span className="pk-pill pk-pill--lime" style={{ fontSize: 11 }}>☀ {today.weather}</span>
          <span className="pk-pill pk-pill--cyan" style={{ fontSize: 11 }}>{today.moon} Luna creciente</span>
          <span className="pk-pill pk-pill--purple" style={{ fontSize: 11 }}>🌸 Primavera tardía</span>
          <span className="pk-pill pk-pill--ghost" style={{ fontSize: 11 }}>Día 142</span>
        </div>

        {/* Streak */}
        <div style={{ textAlign: "center", background: "var(--pk-beige)", borderRadius: 14, padding: "8px 14px" }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: "var(--pk-brown-dark)", lineHeight: 1 }}>7</div>
          <div style={{ fontSize: 10, fontWeight: 900, color: "var(--pk-brown-dark)", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>días seguidos</div>
        </div>
      </div>

      {/* Mood selector */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 12, fontWeight: 900, color: "var(--pk-brown)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
          ¿Cómo me siento hoy?
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {MOODS.map((m) => {
            const active = m.id === moodActive;
            return (
              <div key={m.id} style={{
                background: active ? m.color : "var(--pk-white)",
                border: active ? "3px solid var(--pk-purple)" : "2px dashed rgba(161,116,88,0.35)",
                borderRadius: 14,
                padding: "12px 6px",
                textAlign: "center",
                position: "relative",
                boxShadow: active ? "var(--sh-raised)" : "none",
                transform: active ? "rotate(-2deg)" : "none",
              }}>
                <div style={{ fontSize: 24, fontFamily: "monospace", color: "var(--pk-text)" }}>{m.face}</div>
                <div style={{ fontSize: 11, fontWeight: 900, color: "var(--pk-text)", marginTop: 4 }}>{m.label}</div>
                {active && (
                  <span style={{
                    position: "absolute", top: -10, right: -10,
                    background: "var(--pk-purple)", color: "#fff", width: 22, height: 22, borderRadius: 11,
                    fontSize: 14, fontWeight: 900,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>✓</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Text area — handwriting */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 900, color: "var(--pk-brown)", letterSpacing: 1.5, textTransform: "uppercase" }}>
            ¿Qué pasó hoy?
          </label>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--pk-text-soft)" }}>187 / 500 caracteres</span>
        </div>
        <div className="pk-paper-ruled" style={{
          background: "rgba(255,255,255,0.7)",
          borderRadius: 12,
          border: "2px solid rgba(161,116,88,0.35)",
          borderStyle: "dashed",
          padding: "12px 18px",
          minHeight: 240,
          fontFamily: '"Bradley Hand", "Marker Felt", "Segoe Script", cursive',
          fontSize: 17, lineHeight: "32px", color: "var(--pk-brown-dark)",
          whiteSpace: "pre-wrap",
        }}>
          {entry}<span style={{ display: "inline-block", width: 2, height: 22, background: "var(--pk-purple)", marginLeft: 2, verticalAlign: "middle", animation: "" }} />
        </div>
      </div>

      {/* Photo strip + auto-highlights */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
        <Block title="Recuerdos del día" count={3} accent="cyan">
          <div style={{ display: "flex", gap: 10 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: 92, height: 92, borderRadius: 12,
                background: ["var(--pk-cyan)", "var(--pk-lime)", "var(--pk-purple-soft)"][i],
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "var(--sh-raised)",
                border: "3px solid #fff",
                transform: `rotate(${(i - 1) * 3}deg)`,
                position: "relative",
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M4 22 L12 12 L18 18 L22 14 L28 22 L28 26 L4 26 Z" fill="#fff" opacity="0.7" />
                  <circle cx="22" cy="9" r="2.5" fill="#fff" opacity="0.7" />
                </svg>
                <span className="pk-tape pk-tape--beige" style={{ position: "absolute", top: -8, left: 12, width: 40, height: 12, transform: "rotate(-4deg)" }} />
              </div>
            ))}
            <div style={{
              width: 92, height: 92, borderRadius: 12,
              border: "2px dashed var(--pk-brown)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 4,
              color: "var(--pk-brown-dark)", fontSize: 11, fontWeight: 900, textAlign: "center", lineHeight: 1.2,
            }}>
              <span style={{ fontSize: 22, fontWeight: 400 }}>+</span>
              Añadir<br/>foto
            </div>
          </div>
        </Block>

        <Block title="Resumen de hoy" accent="lime">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <ResumeRow icon="🏠" text="Avanzaste la Ampliación 2º piso" sub="+12% completado" color="var(--pk-purple)" />
            <ResumeRow icon="🌳" text="Recolectaste 8 maderas con BU" sub="Bosque Susurrante" color="#6FA420" />
            <ResumeRow icon="👀" text="Avistaste Psyduck en el lago" sub="No capturado" color="var(--pk-cyan)" />
            <ResumeRow icon="✓"  text="Completaste 4 tareas del día" color="var(--pk-purple)" />
          </div>
        </Block>
      </div>

      <FooterCTA primary="Guardar entrada" secondary="Cancelar" hint="Se añadirá a tu cuaderno del día" />
    </SheetPaper>
  );
}

function ResumeRow({ icon, text, sub, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0" }}>
      <span style={{
        width: 28, height: 28, borderRadius: 8, background: color, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
        flexShrink: 0,
      }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 900, color: "var(--pk-text)", lineHeight: 1.2 }}>{text}</div>
        {sub && <div style={{ fontSize: 10, fontWeight: 700, color: "var(--pk-text-soft)", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

window.FlowDiary = FlowDiary;
