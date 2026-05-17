// Flow E — Crear hábitat de Pokémon (paso previo a la captura).

function FlowHabitat() {
  const h = HABITAT_DB.find(x => x.id === "pika"); // Pikachu habitat
  const poke = POKES.find(p => p.id === h.pokeId);
  // synthetic inventory
  const inv = { wood: 6, stone: 8, wool: 3, hay: 5, leaf: 4, water: 1, berry: 12 };

  return (
    <SheetPaper
      label="Nuevo hábitat"
      idx="31" total="56"
      stamp={{ text: "Para capturar" }}
      tapes={[
        { color: "cyan",   top: 26, left: -22, rot: -7 },
        { color: "purple", top: 32, right: -28, rot: 6 },
      ]}
      mascotPos={{ position: "absolute", bottom: 84, left: 28, transform: "rotate(-10deg)" }}
      mascotColor="#95E1F3"
    >
      {/* Top: Pokémon target hero */}
      <div style={{
        background: "linear-gradient(135deg, var(--pk-purple) 0%, var(--pk-purple-soft) 100%)",
        borderRadius: 18, padding: "18px 20px", color: "#fff",
        marginBottom: 18, position: "relative", overflow: "hidden",
      }}>
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ position: "absolute", right: -30, top: -40, opacity: 0.15 }} aria-hidden="true">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 8" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <PokeAvatar id={poke.id} color={poke.color} size={72} ring="#fff" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 2, opacity: 0.75 }}>POKÉMON OBJETIVO</div>
            <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.1, marginTop: 2 }}>{poke.name}</div>
            <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.95, marginTop: 4 }}>{poke.tip}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, fontWeight: 900, opacity: 0.75, textTransform: "uppercase", letterSpacing: 1 }}>Rareza</div>
            <div style={{ fontSize: 18, fontWeight: 900, marginTop: 2 }}>★★★☆☆</div>
          </div>
        </div>
      </div>

      {/* Habitat type + biome */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
        <FormField label="Tipo de hábitat" icon="🌿">
          {h.biome}
        </FormField>
        <FormField label="Ubicar en" icon="📍">
          Pradera del Norte
        </FormField>
        <FormField label="Mejor momento" icon="🕒">
          Atardecer · con lluvia
        </FormField>
      </div>

      {/* Materials for habitat — have/need with progress */}
      <Block title="Materiales del hábitat" count={h.mats.length} accent="purple" style={{ marginBottom: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
          {h.mats.map(([mid, need]) => {
            const m = MAT_DB.find(x => x.id === mid);
            const have = inv[mid] || 0;
            return <MatTile key={mid} mat={m} have={have} need={need} size="lg" />;
          })}
        </div>
        {/* Progress bar of habitat completion */}
        {(() => {
          const total = h.mats.reduce((a, [, n]) => a + n, 0);
          const got   = h.mats.reduce((a, [id, n]) => a + Math.min(inv[id] || 0, n), 0);
          const pct = got / total;
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 900, marginBottom: 4 }}>
                <span style={{ color: "var(--pk-text-soft)", textTransform: "uppercase", letterSpacing: 1 }}>Hábitat completo</span>
                <span style={{ color: "var(--pk-purple)" }}>{got} / {total} unidades · {Math.round(pct * 100)}%</span>
              </div>
              <div className="pk-bar"><i style={{ width: (pct * 100) + "%" }} /></div>
            </div>
          );
        })()}
      </Block>

      {/* Tip + bait */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14, marginBottom: 14 }}>
        <Block title="Cebo recomendado" accent="lime">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <MatTile mat={MAT_DB.find(m => m.id === "berry")} size="sm" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 900 }}>Bayas Pecha ×3</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--pk-text-soft)", lineHeight: 1.5, marginTop: 4 }}>
                Pikachu se acerca al rastro dulce.<br />
                Colocar al amanecer junto al hábitat.
              </div>
            </div>
          </div>
        </Block>

        <Block title="Consejos del cuaderno" accent="cyan">
          <div style={{ fontFamily: '"Bradley Hand", "Marker Felt", "Segoe Script", cursive', fontSize: 14, lineHeight: 1.6, color: "var(--pk-brown-dark)" }}>
            ✦ Esperar a la lluvia<br />
            ✦ No acercarse hasta que coma<br />
            ✦ Llevar paraguas, BU se moja
          </div>
        </Block>
      </div>

      {/* Status footer */}
      <div style={{
        background: "var(--pk-beige-cream)", borderRadius: 12, padding: "10px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        marginBottom: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>🛠</span>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--pk-brown-dark)", lineHeight: 1.3 }}>
            Tienes 3 de 5 materiales únicos. <b>Faltan 4 maderas y 1 cubo de agua.</b><br/>
            Crear este hábitat añadirá una obra y 2 tareas de recolección a tu agenda.
          </div>
        </div>
      </div>

      <FooterCTA
        primary="Crear hábitat de Pikachu"
        secondary="Solo guardar como wishlist"
        hint="Se vinculará automáticamente a la pista de captura de PI"
      />
    </SheetPaper>
  );
}

window.FlowHabitat = FlowHabitat;
