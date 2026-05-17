// Flow B — Crear proyecto de construcción.
// After picking a recipe, materials list auto-populates and the user can
// adjust qty and see have/need from inventory.

function FlowBuild() {
  const recipe = RECIPE_DB.find(r => r.id === "expand"); // "Ampliación 2º piso"
  // synthetic inventory have-counts
  const inv = { wood: 24, stone: 8, wool: 3, glass: 0, hay: 5, water: 1, rope: 0, nail: 6, iron: 0, berry: 12, leaf: 4, cloth: 2 };

  return (
    <SheetPaper
      label="Nueva obra"
      idx="22" total="56"
      stamp={{ text: "En proyecto" }}
      tapes={[
        { color: "purple", top: 26, left: -22, rot: -7 },
        { color: "lime",   top: 32, right: -28, rot: 6 },
      ]}
      mascotPos={{ position: "absolute", bottom: 84, left: 28, transform: "rotate(-10deg)" }}
      mascotColor="#C1E36C"
    >
      {/* Row 1 — Name + Location + Priority */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 6 }}>
        <FormField label="Nombre de la obra" hint="cómo aparecerá en el cuaderno">
          Ampliación 2º piso · Casa principal
        </FormField>
        <FormField label="Tipo" icon="🏷">
          <span className="pk-pill pk-pill--purple" style={{ fontSize: 12 }}>Vivienda</span>
          <span className="pk-pill pk-pill--ghost" style={{ fontSize: 12 }}>Anexo</span>
        </FormField>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 18 }}>
        <FormField label="Ubicación" icon="📍">
          Prado del Inicio
        </FormField>
        <FormField label="Inicio">
          Lun 18 May
        </FormField>
        <FormField label="Fecha objetivo" hint="opcional">
          Vie 22 May
        </FormField>
      </div>

      {/* Row 2 — Recipe picker (selected state) */}
      <div style={{
        background: "var(--pk-purple-soft)",
        borderRadius: 16, padding: "14px 16px",
        marginBottom: 16, position: "relative",
      }}>
        <span className="pk-tape pk-tape--beige" style={{ top: -10, left: 22, transform: "rotate(-3deg)", width: 80, height: 16 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 14, background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--sh-raised)", flexShrink: 0,
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M5 22 L20 8 L35 22 L35 33 Q35 35 33 35 L7 35 Q5 35 5 33 Z" fill="var(--pk-purple)" />
              <rect x="16" y="24" width="8" height="11" fill="#fff" />
              <rect x="9" y="14" width="4" height="4" fill="#fff" />
              <rect x="27" y="14" width="4" height="4" fill="#fff" />
              <rect x="13" y="2" width="14" height="10" fill="var(--pk-purple-soft)" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.5, color: "var(--pk-purple-dark)", textTransform: "uppercase" }}>Receta seleccionada</div>
            <div style={{ fontSize: 19, fontWeight: 900, color: "var(--pk-text)", marginTop: 2 }}>{recipe.name}</div>
            <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6, fontSize: 11, fontWeight: 700, color: "var(--pk-text)" }}>
              <span className="pk-pill" style={{ background: "rgba(255,255,255,0.7)", fontSize: 11 }}>{recipe.tag}</span>
              <span className="pk-pill" style={{ background: "rgba(255,255,255,0.7)", fontSize: 11 }}>tamaño {recipe.size}</span>
              <span className="pk-pill" style={{ background: "rgba(255,255,255,0.7)", fontSize: 11 }}>~{recipe.time}</span>
              <span className="pk-pill" style={{ background: "rgba(255,255,255,0.7)", fontSize: 11 }}>{recipe.mats.length} materiales</span>
            </div>
          </div>
          <button style={{
            border: "2px solid var(--pk-purple)", background: "rgba(255,255,255,0.7)", color: "var(--pk-purple)",
            fontSize: 12, fontWeight: 900, padding: "8px 14px", borderRadius: 12, fontFamily: "inherit",
          }}>Cambiar →</button>
        </div>
      </div>

      {/* Row 3 — Materials required (auto from recipe) */}
      <Block title="Materiales necesarios" count={recipe.mats.length} accent="purple" style={{ marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {recipe.mats.map(([matId, need]) => {
            const mat = MAT_DB.find(m => m.id === matId);
            const have = inv[matId] || 0;
            return (
              <div key={matId} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "var(--pk-white)", borderRadius: 12, padding: "8px 10px",
                border: have >= need ? "2px solid var(--pk-lime)" : "2px solid rgba(161,116,88,0.25)",
                boxShadow: "var(--sh-raised)",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: mat.color,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.12)",
                }}>
                  <MatGlyph kind={mat.glyph} size={24} color="#fff" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "var(--pk-text)" }}>{mat.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 900, fontVariantNumeric: "tabular-nums", color: have >= need ? "#5a8e1a" : "var(--pk-purple)", marginTop: 2 }}>
                    {have} / {need}
                    {have < need && <span style={{ color: "var(--pk-text-soft)", fontWeight: 700 }}> · faltan {need - have}</span>}
                  </div>
                </div>
              </div>
            );
          })}
          {/* add custom material slot */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            border: "2px dashed var(--pk-brown)", borderRadius: 12, padding: "8px 10px",
            color: "var(--pk-brown-dark)", fontSize: 12, fontWeight: 900,
          }}>
            <span style={{ fontSize: 18, fontWeight: 400 }}>+</span> Añadir material
          </div>
        </div>
      </Block>

      {/* Row 4 — Initial subtasks + assignees */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, marginBottom: 14 }}>
        <Block title="Pasos iniciales" count="4" accent="lime">
          {[
            { t: "Talar 4 árboles en el bosque", done: false },
            { t: "Hablar con el carpintero", done: false },
            { t: "Colocar ventanas y tejas", done: false },
            { t: "Pintar el balcón", done: false },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
              <Check on={s.done} />
              <span style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{s.t}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "var(--pk-text-soft)" }}>{i === 0 ? "drag · drop ↕" : ""}</span>
            </div>
          ))}
          <div style={{
            marginTop: 8, padding: "8px 0",
            display: "flex", alignItems: "center", gap: 8,
            color: "var(--pk-purple)", fontSize: 12, fontWeight: 900,
            borderTop: "1px dotted rgba(161,116,88,0.4)",
          }}>
            <span style={{ fontSize: 16, fontWeight: 400 }}>+</span> Añadir paso
          </div>
        </Block>

        <Block title="Ayudantes asignados" accent="cyan">
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            {POKES.slice(0, 2).map((p) => (
              <div key={p.id} style={{ position: "relative" }}>
                <PokeAvatar id={p.id} color={p.color} size={48} ring="var(--pk-purple)" />
                <span style={{
                  position: "absolute", bottom: -4, right: -4,
                  width: 16, height: 16, borderRadius: 8, background: "var(--pk-purple)",
                  color: "#fff", fontSize: 11, fontWeight: 900,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>✓</span>
              </div>
            ))}
            <div style={{
              width: 48, height: 48, borderRadius: 24,
              border: "2px dashed var(--pk-brown)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--pk-brown-dark)", fontSize: 24, fontWeight: 400,
            }}>+</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--pk-text-soft)", lineHeight: 1.4 }}>
            BU recolecta materiales · PI no disponible<br/>(en su hábitat)
          </div>
        </Block>
      </div>

      <FooterCTA
        primary="Crear obra"
        secondary="Guardar borrador"
        hint="3 / 4 materiales en stock · faltan 6 cristales y 3 lanas"
      />
    </SheetPaper>
  );
}

window.FlowBuild = FlowBuild;
