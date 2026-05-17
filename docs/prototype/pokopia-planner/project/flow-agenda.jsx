// Flow D — Añadir actividad a la agenda. 4 activity types share a sheet.

function FlowAgenda() {
  const selectedType = "gather"; // 'gather' | 'capture' | 'craft' | 'event'

  return (
    <SheetPaper
      label="Nueva actividad"
      idx="14" total="56"
      stamp={{ text: "Para mañana" }}
      tapes={[
        { color: "lime",   top: 28, left: -22, rot: -7 },
        { color: "purple", top: 32, right: -28, rot: 6 },
      ]}
      mascotPos={{ position: "absolute", bottom: 84, right: 30, transform: "rotate(6deg)" }}
      mascotColor="#DCB680"
    >
      {/* Type selector — 4 big cards */}
      <div style={{ fontSize: 12, fontWeight: 900, color: "var(--pk-brown)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
        ¿Qué tipo de actividad?
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
        <TypeCard kind="gather"  active={selectedType === "gather"} />
        <TypeCard kind="capture" active={selectedType === "capture"} />
        <TypeCard kind="craft"   active={selectedType === "craft"} />
        <TypeCard kind="event"   active={selectedType === "event"} />
      </div>

      {/* Type-specific body */}
      {selectedType === "gather" && <GatherBody />}

      {/* Time + relations */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: 14, marginBottom: 14 }}>
        <FormField label="Hora" icon="🕒">
          09:30 — 11:30
        </FormField>
        <FormField label="Prioridad">
          <span className="pk-pill pk-pill--purple" style={{ fontSize: 12 }}>Alta</span>
          <span className="pk-pill pk-pill--ghost"  style={{ fontSize: 12 }}>Media</span>
          <span className="pk-pill pk-pill--ghost"  style={{ fontSize: 12 }}>Baja</span>
        </FormField>
        <FormField label="Vincular a obra" hint="opcional">
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, background: "var(--pk-purple)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900 }}>🏠</span>
            Ampliación 2º piso
          </span>
        </FormField>
      </div>

      {/* All 4 activity types preview row */}
      <Block title="Vista previa en la agenda de hoy" accent="cyan" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <PreviewRow time="07:00" t="Regar el huerto" tag="rutina" />
          <PreviewRow time="09:30" t="Recolectar 16 maderas con BU" tag="gather" highlight />
          <PreviewRow time="12:00" t="Visitar al carpintero por cristal" tag="craft" />
          <PreviewRow time="18:30" t="Esperar lluvia para encontrar PI" tag="capture" />
          <PreviewRow time="20:00" t="Festival de farolillos · Plaza" tag="event" />
        </div>
      </Block>

      <FooterCTA
        primary="Añadir a la agenda"
        secondary="Cancelar"
        hint="Recolectar · 16 maderas · con BU · 09:30"
      />
    </SheetPaper>
  );
}

function TypeCard({ kind, active }) {
  const data = {
    gather:  { label: "Recolectar materiales", icon: "🌳", color: "var(--pk-lime)", sub: "madera, piedra, bayas…" },
    capture: { label: "Capturar Pokémon",      icon: "✨", color: "var(--pk-cyan)", sub: "necesita hábitat" },
    craft:   { label: "Conseguir receta",      icon: "📜", color: "var(--pk-purple-soft)", sub: "del mercader o NPC" },
    event:   { label: "Participar en evento",  icon: "🎏", color: "var(--pk-beige)", sub: "festivales, ferias" },
  }[kind];
  return (
    <div style={{
      background: active ? data.color : "var(--pk-white)",
      borderRadius: 14,
      padding: "14px 12px",
      border: active ? "3px solid var(--pk-purple)" : "2px dashed rgba(161,116,88,0.35)",
      textAlign: "center",
      position: "relative",
      boxShadow: active ? "var(--sh-raised)" : "none",
      transform: active ? "rotate(-1.5deg)" : "none",
    }}>
      <div style={{ fontSize: 26 }}>{data.icon}</div>
      <div style={{ fontSize: 12, fontWeight: 900, color: "var(--pk-text)", marginTop: 6, lineHeight: 1.2 }}>{data.label}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: "var(--pk-text-soft)", marginTop: 4 }}>{data.sub}</div>
      {active && (
        <span style={{
          position: "absolute", top: -10, right: -10,
          background: "var(--pk-purple)", color: "#fff", width: 24, height: 24, borderRadius: 12,
          fontSize: 14, fontWeight: 900,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>✓</span>
      )}
    </div>
  );
}

function GatherBody() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <FormField label="Materiales a recolectar" icon="📦" hint="del catálogo">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <SelectedMatChip matId="wood" qty={16} />
            <SelectedMatChip matId="stone" qty={4} />
            <span style={{
              fontSize: 12, fontWeight: 900, color: "var(--pk-purple)",
              border: "2px dashed var(--pk-purple)", borderRadius: 999,
              padding: "5px 10px",
            }}>+ Añadir</span>
          </div>
        </FormField>
        <FormField label="Lugar" icon="📍">
          Bosque Susurrante
        </FormField>
      </div>

      <Block title="Pokémon que pueden ayudar" count="2" accent="lime" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {[POKES[0], POKES[2]].map((p) => (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "var(--pk-white)", borderRadius: 12, padding: "8px 12px",
              border: p.id === "BU" ? "2px solid var(--pk-purple)" : "2px solid rgba(161,116,88,0.25)",
              boxShadow: "var(--sh-raised)",
            }}>
              <PokeAvatar id={p.id} color={p.color} size={36} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 900 }}>{p.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--pk-text-soft)" }}>+30% madera</div>
              </div>
              {p.id === "BU" && (
                <span style={{ width: 20, height: 20, borderRadius: 10, background: "var(--pk-purple)", color: "#fff", fontSize: 12, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
              )}
            </div>
          ))}
        </div>
      </Block>
    </>
  );
}

function SelectedMatChip({ matId, qty }) {
  const m = MAT_DB.find(x => x.id === matId);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "var(--pk-purple-soft)",
      padding: "4px 10px 4px 4px", borderRadius: 999,
      fontSize: 13, fontWeight: 900, color: "var(--pk-text)",
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: 12, background: m.color,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <MatGlyph kind={m.glyph} size={14} color="#fff" />
      </span>
      {m.name} ×{qty}
    </span>
  );
}

function PreviewRow({ time, t, tag, highlight }) {
  const c = { gather: "var(--pk-lime)", capture: "var(--pk-cyan)", craft: "var(--pk-purple-soft)", event: "var(--pk-beige)", rutina: "rgba(161,116,88,0.25)" }[tag];
  const tagLabel = { gather: "recolectar", capture: "capturar", craft: "receta", event: "evento", rutina: "rutina" }[tag];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "62px 1fr auto", alignItems: "center", gap: 10,
      padding: "8px 10px",
      borderRadius: 10,
      background: highlight ? "rgba(193,227,108,0.30)" : "transparent",
      border: highlight ? "2px dashed var(--pk-purple)" : "none",
    }}>
      <span style={{ fontSize: 13, fontWeight: 900, fontVariantNumeric: "tabular-nums", color: "var(--pk-purple)" }}>{time}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--pk-text)" }}>{t}</span>
      <span className="pk-pill" style={{ background: c, color: "var(--pk-text)", fontSize: 10, padding: "3px 8px" }}>{tagLabel}</span>
    </div>
  );
}

Object.assign(window, { FlowAgenda, TypeCard, GatherBody, SelectedMatChip, PreviewRow });
