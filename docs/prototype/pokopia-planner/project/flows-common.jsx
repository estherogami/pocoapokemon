// Pokopia flows — shared atoms for V1-style "tear-out sheet" screens.
// All flows live inside SheetPaper, share FormField, MatTile, RecipeTile, ChipBtn.

/* ─────────────────────────────────────────────────────────────
 * DB seed: materials + recipes + habitats. Used by every flow.
 * Each material has a tiny inline SVG glyph (no Pokémon imagery).
 * ───────────────────────────────────────────────────────────── */
const MAT_DB = [
  { id: "wood",  name: "Madera",        color: "#A17458", glyph: "log",     rarity: "común"   },
  { id: "stone", name: "Piedra",        color: "#8a8580", glyph: "stone",   rarity: "común"   },
  { id: "wool",  name: "Lana",          color: "#EBD7B5", glyph: "wool",    rarity: "común"   },
  { id: "hay",   name: "Heno",          color: "#C1E36C", glyph: "wool",    rarity: "común"   },
  { id: "cloth", name: "Tela",          color: "#C59BFF", glyph: "wool",    rarity: "común"   },
  { id: "glass", name: "Cristal",       color: "#95E1F3", glyph: "gem",     rarity: "raro"    },
  { id: "rope",  name: "Cuerda",        color: "#DCB680", glyph: "rope",    rarity: "común"   },
  { id: "nail",  name: "Clavos",        color: "#7A5640", glyph: "nail",    rarity: "común"   },
  { id: "iron",  name: "Hierro",        color: "#585858", glyph: "stone",   rarity: "raro"    },
  { id: "berry", name: "Bayas",         color: "#E08AB4", glyph: "berry",   rarity: "común"   },
  { id: "water", name: "Cubo de agua",  color: "#7BBFE3", glyph: "bucket",  rarity: "común"   },
  { id: "leaf",  name: "Hierba mística",color: "#7BC36A", glyph: "leaf",    rarity: "raro"    },
];

const RECIPE_DB = [
  { id: "cottage",  name: "Casa pequeña",          tag: "vivienda",  size: "M", time: "2 días",   mats: [["wood",30],["stone",8],["wool",4]] },
  { id: "expand",   name: "Ampliación 2º piso",    tag: "vivienda",  size: "L", time: "3 días",   mats: [["wood",40],["stone",15],["glass",6],["wool",6]] },
  { id: "stable",   name: "Establo",               tag: "anexo",     size: "M", time: "2 días",   mats: [["wood",25],["hay",10],["water",2]] },
  { id: "bridge",   name: "Puente de madera",      tag: "estructura",size: "L", time: "1 día",    mats: [["wood",30],["rope",8],["nail",20]] },
  { id: "treehut",  name: "Cabaña en árbol",       tag: "vivienda",  size: "S", time: "1 día",    mats: [["wood",20],["rope",4]] },
  { id: "mill",     name: "Molino",                tag: "estructura",size: "L", time: "3 días",   mats: [["wood",35],["stone",20],["cloth",8],["iron",4]] },
  { id: "green",    name: "Invernadero",           tag: "cultivo",   size: "M", time: "2 días",   mats: [["wood",18],["glass",16],["iron",2]] },
  { id: "pond",     name: "Estanque con cascada",  tag: "paisaje",   size: "M", time: "2 días",   mats: [["stone",24],["water",6],["leaf",4]] },
  { id: "fire",     name: "Fogata de campamento",  tag: "anexo",     size: "S", time: "horas",    mats: [["wood",8],["stone",6]] },
];

const HABITAT_DB = [
  { id: "pika",  pokeId: "PI", pokeName: "Pikachu",   biome: "Bosque eléctrico",  mats: [["wood",10],["leaf",4],["water",2]],   tips: "Solo bajo la lluvia · atrae con bayas Pecha" },
  { id: "eve",   pokeId: "EE", pokeName: "Eevee",     biome: "Pradera cómoda",    mats: [["wool",6],["wood",8],["berry",4]],     tips: "Cama acolchada cerca del establo" },
  { id: "psy",   pokeId: "PS", pokeName: "Psyduck",   biome: "Estanque sereno",   mats: [["stone",12],["water",4],["leaf",3]],   tips: "Le calman las flores acuáticas" },
  { id: "zub",   pokeId: "ZU", pokeName: "Zubat",     biome: "Cueva tenue",       mats: [["stone",16],["wood",4],["berry",6]],   tips: "Llevar linterna · sale al anochecer" },
  { id: "bul",   pokeId: "BU", pokeName: "Bulbasaur", biome: "Jardín de bayas",   mats: [["leaf",8],["berry",6],["water",3]],    tips: "Cerca de flores moradas del Prado" },
];

const LOCATIONS = ["Prado del Inicio", "Pradera del Norte", "Bosque Susurrante", "Río Rumoroso", "Orilla del Lago", "Cueva Brillante", "Colina del Este"];

const MOODS = [
  { id: "happy",  label: "Contento",  color: "#C1E36C", face: "ʕ•ᴥ•ʔ" },
  { id: "calm",   label: "Sereno",    color: "#95E1F3", face: "˘ᴗ˘"   },
  { id: "tired",  label: "Cansado",   color: "#DCB680", face: "•_•"    },
  { id: "excited",label: "Emocionado",color: "#C59BFF", face: "✧◡✧"   },
  { id: "rainy",  label: "Melancólico",color: "#7BBFE3",face: "•︵•"   },
];

/* ─────────────────────────────────────────────────────────────
 * Sheet — paper page used by every flow.
 * ───────────────────────────────────────────────────────────── */
function SheetPaper({ children, label, idx, total, tapes = [], stamp, mascotColor = "#C59BFF", mascotPos }) {
  const defaultTapes = tapes.length ? tapes : [
    { color: "purple", top: 28,  left: -22, rot: -7 },
    { color: "lime",   top: 36,  right: -28, rot: 6 },
  ];
  return (
    <div className="pk pk-paper-bg" style={{
      width: 920, height: 1240, position: "relative", overflow: "hidden",
      padding: "60px 60px 64px",
    }}>
      {defaultTapes.map((t, i) => (
        <div key={i} className={"pk-tape pk-tape--" + t.color} style={{
          top: t.top, bottom: t.bottom, left: t.left, right: t.right,
          transform: `rotate(${t.rot}deg)`, width: t.w || 110, height: 22,
        }} />
      ))}
      {mascotPos && <div style={mascotPos}><Mascot size={92} color={mascotColor} /></div>}

      {/* Page header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 2, color: "var(--pk-brown)", textTransform: "uppercase" }}>
            Cuaderno de Pokopia · página {idx ?? "—"}{total ? " / " + total : ""}
          </div>
          <h1 style={{ margin: "6px 0 0", fontSize: 36, fontWeight: 900, color: "var(--pk-text)", letterSpacing: -0.5, lineHeight: 1.05 }}>
            {label}
          </h1>
        </div>
        {stamp && <span className={"pk-stamp " + (stamp.kind === "lime" ? "pk-stamp--lime" : "")}>{stamp.text}</span>}
      </header>

      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Form field — labeled box with dashed border, value inside.
 * ───────────────────────────────────────────────────────────── */
function FormField({ label, hint, value, placeholder, multiline, icon, accent = "var(--pk-purple)", children }) {
  const hasValue = !!value || !!children;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <label style={{
          fontSize: 12, fontWeight: 900, color: "var(--pk-brown)",
          letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
          {label}
        </label>
        {hint && <span style={{ fontSize: 11, fontWeight: 700, color: "var(--pk-text-soft)" }}>{hint}</span>}
      </div>
      <div style={{
        background: "var(--pk-white)",
        borderRadius: 10,
        border: `2px solid ${hasValue ? accent : "rgba(161,116,88,0.35)"}`,
        borderStyle: hasValue ? "solid" : "dashed",
        padding: multiline ? "14px 18px" : "12px 16px",
        minHeight: multiline ? 110 : 48,
        display: "flex",
        alignItems: multiline ? "flex-start" : "center",
        gap: 10,
        fontSize: 16,
        fontWeight: 700,
        color: hasValue ? "var(--pk-text)" : "rgba(149,225,243,0.95)",
      }}>
        {children || value || placeholder}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Material glyph — tiny SVG icon by `kind`. Kept simple so we
 * never accidentally suggest a real Pokémon asset.
 * ───────────────────────────────────────────────────────────── */
function MatGlyph({ kind, size = 22, color = "var(--pk-text)" }) {
  const p = { fill: color, stroke: color };
  const s = size;
  if (kind === "log")    return <svg width={s} height={s} viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="3" fill={color}/><circle cx="6" cy="12" r="1.6" fill="#fff"/><circle cx="6" cy="12" r="0.6" fill={color}/></svg>;
  if (kind === "stone")  return <svg width={s} height={s} viewBox="0 0 24 24"><path d="M5 14 Q6 7 12 6 Q19 7 19 14 Q18 18 12 18 Q6 18 5 14 Z" fill={color}/><path d="M9 11 L11 13 L13 12" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>;
  if (kind === "wool")   return <svg width={s} height={s} viewBox="0 0 24 24"><circle cx="9" cy="13" r="5" fill={color}/><circle cx="15" cy="11" r="4" fill={color}/><circle cx="13" cy="15" r="3.5" fill={color}/></svg>;
  if (kind === "gem")    return <svg width={s} height={s} viewBox="0 0 24 24"><path d="M12 4 L20 11 L12 20 L4 11 Z" fill={color}/><path d="M8 11 L12 4 L16 11 M12 4 L12 20" stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.6"/></svg>;
  if (kind === "rope")   return <svg width={s} height={s} viewBox="0 0 24 24"><path d="M4 14 Q8 8 12 14 Q16 20 20 14" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M4 10 Q8 4 12 10 Q16 16 20 10" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/></svg>;
  if (kind === "nail")   return <svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" fill={color}/><path d="M11 9 L11 20 L13 20 L13 9 Z" fill={color}/></svg>;
  if (kind === "berry")  return <svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="15" r="6" fill={color}/><path d="M12 9 L12 3 M9 5 L12 9 L15 5" stroke="#6FA420" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>;
  if (kind === "bucket") return <svg width={s} height={s} viewBox="0 0 24 24"><path d="M5 8 L19 8 L17 20 L7 20 Z" fill={color}/><path d="M5 7 Q5 4 12 4 Q19 4 19 7" stroke={color} strokeWidth="1.8" fill="none"/><ellipse cx="12" cy="10" rx="5" ry="1.2" fill="#fff" opacity="0.6"/></svg>;
  if (kind === "leaf")   return <svg width={s} height={s} viewBox="0 0 24 24"><path d="M5 19 Q5 7 19 5 Q17 17 5 19 Z" fill={color}/><path d="M5 19 Q11 13 19 5" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6"/></svg>;
  return <circle cx="12" cy="12" r="6" fill={color} />;
}

/* ─────────────────────────────────────────────────────────────
 * MatTile — material chip with image, name, qty (have/need).
 * Two sizes: "lg" for grids, "sm" for inline rows.
 * ───────────────────────────────────────────────────────────── */
function MatTile({ mat, have, need, size = "lg", selected, status }) {
  const done = have != null && need != null && have >= need;
  const w = size === "lg" ? 116 : 72;
  return (
    <div style={{
      width: w,
      background: "var(--pk-white)",
      borderRadius: 12,
      padding: size === "lg" ? "10px 8px" : "6px 4px",
      border: selected
        ? "2px solid var(--pk-purple)"
        : done ? "2px solid var(--pk-lime)" : "2px solid rgba(161,116,88,0.25)",
      boxShadow: "var(--sh-raised)",
      textAlign: "center",
      position: "relative",
    }}>
      {selected && (
        <span style={{
          position: "absolute", top: -8, right: -8,
          width: 22, height: 22, borderRadius: 11, background: "var(--pk-purple)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900,
          boxShadow: "var(--sh-raised)",
        }}>✓</span>
      )}
      <div style={{
        width: size === "lg" ? 56 : 36, height: size === "lg" ? 56 : 36,
        borderRadius: size === "lg" ? 14 : 10,
        background: mat.color,
        margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.4)",
      }}>
        <MatGlyph kind={mat.glyph} size={size === "lg" ? 32 : 22} color="#fff" />
      </div>
      <div style={{ marginTop: 6, fontSize: size === "lg" ? 12 : 10, fontWeight: 900, color: "var(--pk-text)", lineHeight: 1.1 }}>
        {mat.name}
      </div>
      {have != null && need != null && (
        <div style={{ marginTop: 4, fontSize: size === "lg" ? 11 : 10, fontWeight: 900, fontVariantNumeric: "tabular-nums", color: done ? "#5a8e1a" : "var(--pk-purple)" }}>
          {have} / {need}
        </div>
      )}
      {status && (
        <div style={{ marginTop: 3, fontSize: 9, fontWeight: 700, color: "var(--pk-text-soft)", textTransform: "uppercase", letterSpacing: 0.5 }}>{status}</div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ChipBtn — pill button (filter / type selector).
 * ───────────────────────────────────────────────────────────── */
function ChipBtn({ label, icon, active, color = "var(--pk-purple)", sub }) {
  return (
    <div style={{
      padding: "10px 14px",
      borderRadius: 12,
      background: active ? color : "var(--pk-white)",
      color: active ? "#fff" : "var(--pk-text)",
      border: `2px solid ${active ? color : "rgba(161,116,88,0.3)"}`,
      fontSize: 13, fontWeight: 900,
      display: "inline-flex", alignItems: "center", gap: 8,
      cursor: "default",
      boxShadow: active ? "var(--sh-raised)" : "none",
    }}>
      {icon && <span style={{ fontSize: 16 }}>{icon}</span>}
      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.15 }}>
        <span>{label}</span>
        {sub && <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.8, marginTop: 1 }}>{sub}</span>}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * FooterCTA — purple "save" bar at bottom of sheet
 * ───────────────────────────────────────────────────────────── */
function FooterCTA({ primary, secondary, hint }) {
  return (
    <div style={{
      position: "absolute", left: 60, right: 60, bottom: 28,
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      paddingTop: 14, borderTop: "2px dashed rgba(161,116,88,0.4)",
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--pk-text-soft)" }}>{hint}</div>
      <div style={{ display: "flex", gap: 10 }}>
        {secondary && (
          <button style={{
            border: "2px solid var(--pk-purple)", background: "transparent", color: "var(--pk-purple)",
            fontSize: 14, fontWeight: 900, padding: "10px 18px", borderRadius: 15, fontFamily: "inherit",
          }}>{secondary}</button>
        )}
        <button style={{
          border: "none", background: "var(--pk-purple)", color: "#fff",
          fontSize: 15, fontWeight: 900, padding: "12px 22px", borderRadius: 15, fontFamily: "inherit",
          boxShadow: "var(--sh-raised)",
        }}>{primary}</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Block — dashed-bordered section card (re-used a lot).
 * ───────────────────────────────────────────────────────────── */
function Block({ title, count, accent = "purple", children, style }) {
  return (
    <section style={{
      background: "rgba(255,255,255,0.55)",
      border: "1.5px dashed rgba(161,116,88,0.4)",
      borderRadius: 14,
      padding: "16px 18px",
      ...style,
    }}>
      {title && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 900, color: "var(--pk-text)", letterSpacing: 1.2, textTransform: "uppercase" }}>{title}</h3>
          {count != null && (
            <span style={{
              minWidth: 22, height: 22, borderRadius: 11, padding: "0 7px",
              background: { purple: "var(--pk-purple)", lime: "var(--pk-lime)", cyan: "var(--pk-cyan)", beige: "var(--pk-beige)" }[accent],
              color: accent === "lime" ? "var(--pk-text)" : "#fff",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 900,
            }}>{count}</span>
          )}
          <div style={{ flex: 1, height: 0, borderTop: "1.5px dashed rgba(161,116,88,0.35)" }} />
        </div>
      )}
      {children}
    </section>
  );
}

Object.assign(window, {
  MAT_DB, RECIPE_DB, HABITAT_DB, LOCATIONS, MOODS,
  SheetPaper, FormField, MatTile, MatGlyph, ChipBtn, FooterCTA, Block,
});
