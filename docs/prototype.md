# Prototipo visual (Claude Design)

## Estado

✅ **Bundle del prototipo en el repo** en `docs/prototype/pokopia-planner/`. Origen: handoff de Claude Design del 2026-05-16 (chat completo en `docs/prototype/pokopia-planner/chats/chat1.md`).

## Cómo reproducirlo

El bundle contiene **prototipos en HTML/CSS/JSX vanilla** (con Babel standalone). No los renderizamos — son la **fuente de verdad visual y de flujo**. Nuestro trabajo es replicarlos en Astro + React + Tailwind.

**Lectura obligada antes de tocar UI**:
1. `pokopia-planner/chats/chat1.md` — la conversación donde el usuario eligió V1 y pidió los 5 flujos.
2. `pokopia-planner/project/styles.css` — tokens CSS (variables `--pk-*`) y utilidades.
3. `pokopia-planner/project/common.jsx` — datos de ejemplo y átomos compartidos (`PokeAvatar`, `Check`, `MaterialBar`, `StatusPill`, `Mascot`, `MapDot`).
4. `pokopia-planner/project/v1-libreta.jsx` — variación elegida (página principal).
5. `pokopia-planner/project/flows-common.jsx` — sistema reutilizable de los flujos (`SheetPaper`, `FormField`, `MatTile`, `MatGlyph`, `Block`, `ChipBtn`, `FooterCTA`).
6. `pokopia-planner/project/flow-{diary,build,db-picker,agenda,habitat}.jsx` — cinco flujos.

**Ignorado en git**: `Pokopia Planner.html` (8.8MB de assets inlineados — los JSX son el original).

## Decisión del usuario (extraída del chat)

> "elegimos la version 1"
> "diseña como creariamos las notas del dia (seria mas bien diario personal)"
> "Tambien diseña como se crea un producto de construccion y la agenda de hoy. Los materiales y recetas se pueden seleccionar de un listado con imagenes de la db."
> "Actividades que aparecerian en la agenda de hoy: recolectar x materiales, capturar x pokemon, conseguir x materiales o receta, participar en x evento."
> "Para capturar un pokemon hace falta crear su habitat, añade los materiales necesarios y obtenidos para crear el habitat."

→ **Versión V1 "Libreta cosida"** como vista principal + 5 sheets de flujo.

## Modelo de dominio extraído del prototipo

Esto **reemplaza** la lista mínima Daily Planner + Journal del plan original. La app es un **gestor de construcciones y proyectos** dentro de Pokopia, con diario, agenda, hábitats y catálogo.

### Entidades

| Entidad | Campos clave (del prototipo) |
|---|---|
| **Build** (obra/construcción) | id, name, type (vivienda/anexo/…), location, recipe_id, status (`planeado` / `en curso` / `completado`), progress 0–1, start_date, target_date, materials[], subtasks[], assigned_pokemon_ids[], note |
| **Recipe** (receta) | id, name, tag, size, time, mats: `[material_id, quantity][]` |
| **Material** | id (slug), name, color, glyph (de 10: wood/stone/wool/glass/cord/nails/berries/water/grass/cloth) |
| **Pokémon** | id (iniciales `BU`/`PI`/`EE`/`PS`/`ZU`), name, where, when, tip, color, rarity (★ 1–5) |
| **Habitat** | id, pokemon_id, biome, location, best_moment, mats[], recommended_bait |
| **Inventory** | per user: `material_id → have` |
| **ScheduleEntry** (agenda) | date, time, text, tag (`rutina` / `build` / `captura` / `ocio`) |
| **WishlistItem** | text, tag (`estructura` / `cultivo` / `paisaje` / `evento`) |
| **DiaryEntry** | date, mood (5 estados), text (~500 chars), photos[], auto_summary[] |
| **Activity** | type (`recolectar` / `capturar` / `receta` / `evento`), payload type-specific, scheduled_time |

### Pantallas

| Sheet | Cubre |
|---|---|
| **V1 Libreta (home)** | header con fecha grande + clima + luna + día N, "Foco del día" (build destacada con progreso), agenda 6 entradas, 3 build cards activas, lista Pokémon por capturar, wishlist, notas a mano |
| **Flow A · Diario** | fecha + clima/luna/estación + streak, mood selector (5 caras), área manuscrita ~500 chars, tira de 3 recuerdos (fotos) + slot vacío, "Resumen de hoy" auto-generado |
| **Flow B · Nueva obra** | nombre, tipo, ubicación, fechas, **receta seleccionada** (tarjeta morada), grid 4 cols de materiales con have/need + slot añadir, pasos iniciales reordenables, ayudantes Pokémon (avatares + add slot) |
| **Flow C · Catálogo DB** | pestañas (Recetas / Materiales / Hábitats / Eventos), filtros, buscador, grid 6 recetas con SVG + pictogramas, librería de materiales con glyphs |
| **Flow D · Nueva actividad** | 4 tarjetas de tipo (Recolectar / Capturar / Receta / Evento), cuerpo cambia por tipo, preview en vivo de la agenda |
| **Flow E · Crear hábitat** | hero del Pokémon objetivo + rareza, tipo de hábitat + ubicación + mejor momento, materiales hábitat con have/need + barra de completitud global, cebo recomendado + consejos manuscritos, resumen de impacto en agenda |

## Sistema visual extendido (más allá del design.md)

El prototipo añade tokens y utilities **no presentes** en `www.pocoapokemon.jp-DESIGN 2.md`. Añadirlos a `tailwind.config.mjs`:

| Token nuevo | Valor |
|---|---|
| `--pk-purple-tint` | `#EFE3FF` |
| `--pk-beige-soft` | `#EBD7B5` |
| `--pk-beige-cream` | `#F6EBD3` |
| `--pk-paper` | `#FBF3E0` (fondo del cuaderno) |
| `--pk-brown-dark` | `#7A5640` |
| `--pk-text-soft` | `#8a8580` |
| Radius `r-3xl` | `28px` |
| Shadow `sh-paper` | `0 1px 0 rgba(255,255,255,0.6) inset, 0 2px 6px rgba(122,86,64,0.15), 0 12px 24px -12px rgba(122,86,64,0.20)` |

### Patrones visuales clave

- **Paper texture**: `pk-paper-bg` (puntos suaves marrones sobre `#FBF3E0`) y `pk-paper-ruled` (líneas horizontales tipo cuaderno).
- **Washi tape**: tiras decorativas con `background-image: repeating-linear-gradient(45deg, ...)` en colores lime/cyan/purple/beige, rotadas 6–10°, posicionadas absolute en esquinas.
- **Stamps**: `.pk-stamp` — borde 2.5px, font 900 uppercase letter-spacing 1px, rotación -6°. Variantes: lime ("Listo"), error.
- **Mascota neutral**: SVG genérico de "criatura" (no Pokémon real), oculta vía toggle `tweaks.showMascot`.
- **Avatares Pokémon**: círculo coloreado con 2 iniciales en blanco, `font-weight: 900`, inset shadow.
- **Material glyphs**: 10 SVGs propios (madera/piedra/lana/cristal/cuerda/clavos/bayas/agua/hierba/tela). Se renderizan en cuadrado coloreado con esquinas redondeadas.
- **Handwritten font** para notas: `"Bradley Hand", "Marker Felt", "Segoe Script", cursive`.
- **Tabular nums** en counts de materiales (`have/need`).

## Reconciliación con el plan original

El plan original (`C:\Users\Esther\.claude\plans\planeemos-un-diario-para-happy-shore.md`) definía MVP = Daily Planner + Journal con tablas `daily_plans`, `checklist_items`, `goals`, `journal_entries`. **El prototipo expande significativamente** ese MVP.

**Pendiente con el usuario**: confirmar si el MVP es:

- **Opción A**: solo la home V1 Libreta (read-only sobre datos seed, sin CRUD complejo) → MVP rápido para validar look-and-feel.
- **Opción B**: home V1 + Diary + Nueva obra → introduce CRUD básico de builds, sigue siendo acotado.
- **Opción C**: home V1 + los 5 flujos → cubre todo el prototipo, mucho más trabajo pero alineado con la visión.

Mientras no se confirme, la implementación **se basa en `docs/prototype/pokopia-planner/project/v1-libreta.jsx` + `styles.css` + `common.jsx`** como referencia primaria.

## Desviaciones registradas

_Vacío por ahora — añadir conforme aparezcan al implementar._
