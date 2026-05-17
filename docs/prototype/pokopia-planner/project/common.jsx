// Pokopia planner — shared data + helpers (mascot, avatars, bars, tweaks)

/* ─────────────────────────────────────────────────────────────
 * Tweak context — single tweak: mostrar mascota decorativa.
 * Provided at app root; consumed by every variation.
 * ───────────────────────────────────────────────────────────── */
const PKTweaksCtx = React.createContext({ showMascot: true });
const usePKTweaks = () => React.useContext(PKTweaksCtx);

/* ─────────────────────────────────────────────────────────────
 * Common data
 * ───────────────────────────────────────────────────────────── */
const TODAY = { weekday: "Lunes", day: 18, month: "Mayo", year: 2026, weather: "Soleado · 22°", moon: "🌒" };

const BUILDS = [
  {
    id: "b1",
    name: "Ampliación 2º piso · Casa principal",
    location: "Prado del Inicio",
    status: "en curso",
    progress: 0.62,
    materials: [
      { name: "Madera", have: 24, need: 40 },
      { name: "Piedra", have: 8,  need: 15 },
      { name: "Lana",   have: 3,  need: 6  },
    ],
    subtasks: [
      { t: "Talar 4 árboles en el bosque", done: true },
      { t: "Hablar con el carpintero",      done: true },
      { t: "Colocar ventanas y tejas",      done: false },
      { t: "Pintar el balcón",              done: false },
    ],
    note: "Falta una pieza de cristal templado · pedir al mercader del jueves",
  },
  {
    id: "b2",
    name: "Establo para Pokémon ayudantes",
    location: "Pradera del Norte",
    status: "en curso",
    progress: 0.35,
    materials: [
      { name: "Madera", have: 12, need: 25 },
      { name: "Heno",   have: 5,  need: 10 },
      { name: "Cubo",   have: 0,  need: 2  },
    ],
    subtasks: [
      { t: "Marcar el terreno con estacas", done: true },
      { t: "Levantar paredes",              done: false },
      { t: "Instalar comederos",            done: false },
    ],
    note: "PI y EE ya esperan mudarse aquí",
  },
  {
    id: "b3",
    name: "Puente de madera al lago",
    location: "Río Rumoroso",
    status: "planeado",
    progress: 0.05,
    materials: [
      { name: "Madera",  have: 0,  need: 30 },
      { name: "Cuerda",  have: 0,  need: 8  },
      { name: "Clavos",  have: 6,  need: 20 },
    ],
    subtasks: [
      { t: "Limpiar maleza de la orilla", done: false },
      { t: "Tallar 12 tablones largos",   done: false },
    ],
    note: "Esperar a que baje el caudal de las lluvias",
  },
  {
    id: "b4",
    name: "Cabaña en el árbol",
    location: "Bosque Susurrante",
    status: "completado",
    progress: 1,
    materials: [{ name: "Madera", have: 20, need: 20 }],
    subtasks: [],
    note: "¡Lista! Ideal para meriendas con PI",
  },
];

const POKES = [
  { id: "BU", name: "Bulbasaur", where: "Prado del Inicio",   when: "mañana",        tip: "Aparece junto a las flores moradas", color: "#7BC36A" },
  { id: "PI", name: "Pikachu",   where: "Bosque Susurrante",  when: "tarde · lluvia",tip: "Solo bajo la lluvia",                color: "#F5C84B" },
  { id: "EE", name: "Eevee",     where: "Pradera del Norte",  when: "atardecer",     tip: "Cerca del establo en construcción",   color: "#C49968" },
  { id: "PS", name: "Psyduck",   where: "Orilla del Lago",    when: "cualquier hora",tip: "Le gustan las bayas dulces",          color: "#F7CF6B" },
  { id: "ZU", name: "Zubat",     where: "Cueva Brillante",    when: "noche",         tip: "Llevar linterna y bayas",             color: "#7E6FB6" },
];

const WISHLIST = [
  { t: "Molino de viento",          tag: "estructura" },
  { t: "Invernadero de cristal",    tag: "cultivo"   },
  { t: "Estanque con cascada",      tag: "paisaje"   },
  { t: "Faro en la colina del este",tag: "estructura" },
  { t: "Mercadillo de fin de semana", tag: "evento"  },
  { t: "Pista de baile para festivales", tag: "evento" },
];

const SCHEDULE = [
  { time: "07:00", t: "Regar el huerto · revisar bayas",     tag: "rutina" },
  { time: "09:30", t: "Reunir madera con BU en el bosque",   tag: "build"  },
  { time: "12:00", t: "Visitar al carpintero por el cristal",tag: "build"  },
  { time: "15:00", t: "Pescar en la orilla del lago",        tag: "ocio"   },
  { time: "18:30", t: "Esperar la lluvia para encontrar PI", tag: "captura"},
  { time: "21:00", t: "Anotar el diario y planear mañana",   tag: "rutina" },
];

/* ─────────────────────────────────────────────────────────────
 * Atoms
 * ───────────────────────────────────────────────────────────── */
function PokeAvatar({ id, color, size = 44, ring }) {
  return (
    <div className="pk-poke" style={{
      width: size, height: size, fontSize: size * 0.36,
      background: color || "var(--pk-purple)",
      boxShadow: ring
        ? `0 0 0 3px ${ring}, inset 0 -3px 0 rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.5)`
        : undefined,
    }}>{id}</div>
  );
}

function Check({ on, color = "var(--pk-purple)" }) {
  return (
    <span className={"pk-check" + (on ? " pk-check--on" : "")}
      style={{ borderColor: color, background: on ? color : "#fff" }} />
  );
}

function MaterialBar({ have, need, variant = "" }) {
  const pct = Math.min(1, have / need);
  return (
    <div className={"pk-bar " + variant}><i style={{ width: (pct * 100).toFixed(1) + "%" }} /></div>
  );
}

function StatusPill({ status }) {
  if (status === "completado") return <span className="pk-pill pk-pill--lime">✓ Completado</span>;
  if (status === "en curso")   return <span className="pk-pill pk-pill--purple">En curso</span>;
  if (status === "planeado")   return <span className="pk-pill pk-pill--ghost">Planeado</span>;
  return <span className="pk-pill pk-pill--beige">{status}</span>;
}

function SubtaskRow({ t, done, big = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: big ? "10px 0" : "6px 0" }}>
      <Check on={done} />
      <span style={{
        fontSize: big ? 16 : 14, fontWeight: 600,
        color: done ? "var(--pk-text-soft)" : "var(--pk-text)",
        textDecoration: done ? "line-through" : "none",
        textDecorationColor: "rgba(128,87,158,0.6)",
        textDecorationThickness: 2,
      }}>{t}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Mascot — neutral creature silhouette, no real Pokémon.
 * Hidden by tweak toggle.
 * ───────────────────────────────────────────────────────────── */
function Mascot({ size = 120, color = "var(--pk-purple-soft)", style }) {
  const { showMascot } = usePKTweaks();
  if (!showMascot) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={style} aria-hidden="true">
      {/* shadow */}
      <ellipse cx="60" cy="108" rx="32" ry="5" fill="rgba(0,0,0,0.10)" />
      {/* ears */}
      <path d="M30 50 Q22 22 38 30 Q44 38 42 52 Z" fill={color} />
      <path d="M90 50 Q98 22 82 30 Q76 38 78 52 Z" fill={color} />
      {/* body */}
      <ellipse cx="60" cy="68" rx="34" ry="32" fill={color} />
      {/* belly */}
      <ellipse cx="60" cy="78" rx="20" ry="16" fill="rgba(255,255,255,0.45)" />
      {/* eyes */}
      <circle cx="50" cy="62" r="3.5" fill="#2a251f" />
      <circle cx="70" cy="62" r="3.5" fill="#2a251f" />
      <circle cx="51" cy="61" r="1.1" fill="#fff" />
      <circle cx="71" cy="61" r="1.1" fill="#fff" />
      {/* cheeks */}
      <circle cx="42" cy="72" r="3.5" fill="rgba(230,0,18,0.30)" />
      <circle cx="78" cy="72" r="3.5" fill="rgba(230,0,18,0.30)" />
      {/* mouth */}
      <path d="M55 72 Q60 76 65 72" stroke="#2a251f" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Map dot — small location marker
 * ───────────────────────────────────────────────────────────── */
function MapDot({ where, color = "var(--pk-brown)" }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: "var(--pk-brown-dark)" }}>
      <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
        <path d="M5.5 0.7c2.6 0 4.7 2 4.7 4.6 0 3.2-4.7 7.0-4.7 7.0S0.8 8.5 0.8 5.3C0.8 2.7 2.9 0.7 5.5 0.7Z"
          fill={color} />
        <circle cx="5.5" cy="5.0" r="1.6" fill="#fff" />
      </svg>
      {where}
    </span>
  );
}

Object.assign(window, {
  PKTweaksCtx, usePKTweaks,
  TODAY, BUILDS, POKES, WISHLIST, SCHEDULE,
  PokeAvatar, Check, MaterialBar, StatusPill, SubtaskRow, Mascot, MapDot,
});
