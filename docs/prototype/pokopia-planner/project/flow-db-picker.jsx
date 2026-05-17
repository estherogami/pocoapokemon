// Flow C — DB picker. Material/recipe library, browse + pick.

function FlowDBPicker() {
  // Currently filtering recipes; the screen is split between recipe browser
  // (top) and material library (bottom) so the user sees both DBs.
  const selectedRecipe = "expand";

  return (
    <SheetPaper
      label="Catálogo del cuaderno"
      idx="03" total="56"
      stamp={{ text: "Pokopedia", kind: "lime" }}
      tapes={[
        { color: "purple", top: 28,  left: -22, rot: -7 },
        { color: "cyan",   top: 36,  right: -28, rot: 6 },
      ]}
      mascotPos={{ position: "absolute", bottom: 86, right: 22, transform: "rotate(6deg)" }}
      mascotColor="#95E1F3"
    >
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <Tab label="Recetas" count={RECIPE_DB.length} active />
        <Tab label="Materiales" count={MAT_DB.length} />
        <Tab label="Hábitats" count={HABITAT_DB.length} />
        <Tab label="Eventos" count="3" />
        <div style={{ flex: 1 }} />
        <SearchBox value="balcón" />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        <ChipBtn label="Todo" active />
        <ChipBtn label="Vivienda" icon="🏠" />
        <ChipBtn label="Estructura" icon="🌉" />
        <ChipBtn label="Anexo" icon="📦" />
        <ChipBtn label="Cultivo" icon="🌱" />
        <ChipBtn label="Paisaje" icon="🌊" />
        <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center", fontSize: 11, fontWeight: 700, color: "var(--pk-text-soft)" }}>
          Ordenar:
          <span className="pk-pill pk-pill--ghost" style={{ fontSize: 11 }}>Materiales que tengo ↓</span>
        </div>
      </div>

      {/* Recipe grid */}
      <Block title="Recetas de construcción" count={RECIPE_DB.length} accent="purple" style={{ marginBottom: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {RECIPE_DB.slice(0, 6).map((r) => {
            const selected = r.id === selectedRecipe;
            return <RecipeCard key={r.id} r={r} selected={selected} />;
          })}
        </div>
      </Block>

      {/* Material library */}
      <Block title="Materiales del juego" count={MAT_DB.length} accent="lime">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 10 }}>
          {MAT_DB.map((m) => (
            <MatTile key={m.id} mat={m} size="sm" />
          ))}
        </div>
        <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, background: "var(--pk-beige-cream)", fontSize: 11, fontWeight: 700, color: "var(--pk-brown-dark)" }}>
          💡 Toca un material para ver dónde se encuentra, qué Pokémon ayuda a recolectarlo y en qué recetas se usa.
        </div>
      </Block>

      <FooterCTA
        primary={`Usar receta "${RECIPE_DB.find(r => r.id === selectedRecipe).name}"`}
        secondary="Cerrar"
        hint="6 recetas mostradas · filtro: todo"
      />
    </SheetPaper>
  );
}

function Tab({ label, count, active }) {
  return (
    <div style={{
      padding: "10px 14px", borderRadius: 12,
      background: active ? "var(--pk-purple)" : "var(--pk-white)",
      color: active ? "#fff" : "var(--pk-text)",
      fontSize: 13, fontWeight: 900,
      border: active ? "2px solid var(--pk-purple)" : "2px solid rgba(161,116,88,0.3)",
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: active ? "var(--sh-raised)" : "none",
    }}>
      {label}
      <span style={{
        minWidth: 22, height: 20, padding: "0 6px", borderRadius: 10,
        background: active ? "rgba(255,255,255,0.25)" : "var(--pk-beige-cream)",
        color: active ? "#fff" : "var(--pk-brown-dark)",
        fontSize: 11, fontWeight: 900,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>{count}</span>
    </div>
  );
}

function SearchBox({ value }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: "var(--pk-white)", borderRadius: 12,
      border: "2px solid var(--pk-purple)",
      padding: "8px 14px",
      fontSize: 13, fontWeight: 700,
      minWidth: 260,
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--pk-purple)" strokeWidth="2" strokeLinecap="round">
        <circle cx="6" cy="6" r="4.5" />
        <path d="M9.5 9.5 L13 13" />
      </svg>
      <span style={{ color: "var(--pk-text)" }}>{value}</span>
      <span style={{ flex: 1 }} />
      <span style={{ color: "var(--pk-text-soft)", fontSize: 11 }}>⌘ K</span>
    </div>
  );
}

function RecipeCard({ r, selected }) {
  return (
    <div style={{
      background: selected ? "var(--pk-purple-soft)" : "var(--pk-white)",
      borderRadius: 14,
      padding: 12,
      border: selected ? "2px solid var(--pk-purple)" : "2px solid rgba(161,116,88,0.2)",
      boxShadow: "var(--sh-raised)",
      position: "relative",
    }}>
      {selected && (
        <span style={{
          position: "absolute", top: -10, right: -10,
          background: "var(--pk-purple)", color: "#fff",
          width: 26, height: 26, borderRadius: 13,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 900,
          boxShadow: "var(--sh-raised)",
        }}>✓</span>
      )}
      {/* Illustration */}
      <div style={{
        background: "var(--pk-beige-cream)", borderRadius: 10,
        height: 88, display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 10, position: "relative", overflow: "hidden",
      }}>
        <RecipeIcon id={r.id} />
        <span className="pk-pill pk-pill--ghost" style={{ position: "absolute", top: 6, left: 6, fontSize: 9, padding: "2px 6px" }}>{r.tag}</span>
        <span style={{
          position: "absolute", bottom: 6, right: 6,
          background: "var(--pk-purple)", color: "#fff",
          fontSize: 9, fontWeight: 900, padding: "2px 6px", borderRadius: 6,
        }}>tamaño {r.size}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 900, color: "var(--pk-text)", lineHeight: 1.2 }}>{r.name}</div>
      <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: -2 }}>
          {r.mats.slice(0, 4).map(([mid], i) => {
            const m = MAT_DB.find(x => x.id === mid);
            return (
              <span key={mid} style={{
                width: 22, height: 22, borderRadius: 11, background: m.color,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginLeft: i ? -6 : 0, border: "2px solid #fff",
              }}>
                <MatGlyph kind={m.glyph} size={14} color="#fff" />
              </span>
            );
          })}
          {r.mats.length > 4 && (
            <span style={{ fontSize: 10, fontWeight: 900, color: "var(--pk-text-soft)", marginLeft: 4, alignSelf: "center" }}>
              +{r.mats.length - 4}
            </span>
          )}
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: "var(--pk-text-soft)" }}>~{r.time}</span>
      </div>
    </div>
  );
}

function RecipeIcon({ id }) {
  // Tiny iconographic illustrations per recipe
  const P = "var(--pk-purple)", B = "var(--pk-brown)", L = "var(--pk-lime)", C = "var(--pk-cyan)";
  if (id === "cottage" || id === "expand") return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M8 35 L30 14 L52 35 L52 50 Q52 52 50 52 L10 52 Q8 52 8 50 Z" fill={P} />
      <rect x="25" y="38" width="10" height="14" fill="#fff" />
      <rect x="14" y="28" width="6" height="6" fill="#fff" />
      <rect x="40" y="28" width="6" height="6" fill="#fff" />
    </svg>
  );
  if (id === "stable") return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M6 50 L6 28 L30 12 L54 28 L54 50 Z" fill={B} />
      <rect x="22" y="34" width="16" height="16" fill="#fff" />
      <path d="M22 50 L30 42 L38 50" stroke={B} strokeWidth="2" fill="none" />
    </svg>
  );
  if (id === "bridge") return (
    <svg width="68" height="60" viewBox="0 0 68 60" fill="none">
      <path d="M2 30 Q34 12 66 30" stroke={B} strokeWidth="4" fill="none" />
      <rect x="2" y="30" width="64" height="6" fill={B} />
      <path d="M10 36 L10 50 M22 36 L22 50 M34 36 L34 50 M46 36 L46 50 M58 36 L58 50" stroke={B} strokeWidth="3" />
    </svg>
  );
  if (id === "treehut") return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <rect x="26" y="30" width="8" height="22" fill={B} />
      <circle cx="30" cy="22" r="14" fill={L} />
      <rect x="22" y="18" width="16" height="10" fill={B} />
      <path d="M22 18 L30 10 L38 18" fill={B} />
    </svg>
  );
  if (id === "mill") return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <rect x="22" y="22" width="16" height="30" fill={B} />
      <path d="M22 22 L30 14 L38 22" fill={B} />
      <circle cx="30" cy="26" r="4" fill="#fff" />
      <path d="M30 22 L46 12 M30 22 L14 12 M30 26 L48 36 M30 26 L12 36" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
  if (id === "green") return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M6 50 L6 26 L30 12 L54 26 L54 50 Z" fill={C} opacity="0.8" />
      <path d="M30 14 L30 50 M6 26 L54 26 M18 19 L18 50 M42 19 L42 50" stroke="#fff" strokeWidth="1.5" />
      <circle cx="30" cy="40" r="6" fill={L} />
    </svg>
  );
  if (id === "pond") return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <ellipse cx="30" cy="38" rx="22" ry="10" fill={C} />
      <path d="M14 30 Q14 20 26 18 Q24 26 26 30 Z" fill={B} />
      <ellipse cx="34" cy="38" rx="2" ry="0.8" fill="#fff" opacity="0.7" />
      <ellipse cx="22" cy="40" rx="2" ry="0.8" fill="#fff" opacity="0.7" />
    </svg>
  );
  if (id === "fire") return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M30 14 Q22 22 24 32 Q22 38 30 44 Q38 38 36 32 Q38 22 30 14 Z" fill="#E08AB4" />
      <path d="M30 20 Q26 28 30 36 Q34 28 30 20 Z" fill={L} />
      <rect x="14" y="46" width="32" height="4" fill={B} />
    </svg>
  );
  return null;
}

Object.assign(window, { FlowDBPicker, Tab, SearchBox, RecipeCard, RecipeIcon });
