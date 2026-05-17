# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este proyecto

App web interactiva inspirada en el planner imprimible oficial de **Pokémon Pokopia** (juego de Koei Tecmo, 2026). El **MVP** digitaliza solo el Daily Planner y el Journal del PDF original, con la estética V1 "Libreta cosida" del prototipo de Claude Design. **Iteraciones posteriores** extenderán el alcance al gestor completo de proyectos de construcción del prototipo (builds, materiales, hábitats Pokémon, agenda, catálogo).

**Fuente de verdad visual y de flujo**: `docs/prototype/pokopia-planner/`. Ver `docs/prototype.md` para modelo de dominio extendido y screens del prototipo.

El plan inicial en `C:\Users\Esther\.claude\plans\planeemos-un-diario-para-happy-shore.md` está parcialmente desactualizado — confiar antes en este CLAUDE.md y en `docs/prototype.md` para las decisiones vigentes.

## Stack y por qué

| Capa | MVP | Diferido |
|---|---|---|
| Framework | **Astro + islas React** | — |
| Estilos | **Tailwind** con design tokens del prototipo en `tailwind.config.mjs` | — |
| Storage | **`localStorage`** del navegador, single-user | **Supabase** (Postgres + Auth + RLS) cuando entren multi-user / multi-dispositivo |
| Tests | **Vitest** (unit) + **Playwright** (E2E) | — |
| Deploy | **Vercel** (adapter `@astrojs/vercel`) | — |

**Por qué `localStorage` en MVP**: el prototipo se valida más rápido sin backend (sin Docker, sin Supabase CLI, sin cuenta cloud, sin RLS, sin auth, sin middleware de sesión). El primer demo en Vercel es estático/SSR con todo el estado en el cliente. Cuando un usuario quiera multi-dispositivo, migramos el store de `localStorage` a Supabase sin rediseñar componentes — las islas leen/escriben vía un módulo `src/lib/storage/` que abstrae el destino.

**Sin valores arbitrarios de Tailwind**: los hex/rounded/sombras del design system y del prototipo se exponen como utilidades (`bg-brand-purple`, `bg-paper`, `rounded-r2xl`, `shadow-paper`). Si falta un token, se añade al config antes de usarlo.

## Comandos

```bash
pnpm dev               # Astro dev en :4321
pnpm build             # Build producción
pnpm preview           # Sirve el build local

pnpm test              # Vitest watch
pnpm test:run          # Vitest una pasada (CI)
pnpm test -- path      # Un solo archivo o pattern
pnpm test:e2e          # Playwright (levanta dev server)
pnpm test:e2e:ui       # Playwright modo UI para debug
pnpm test:e2e tests/e2e/planner.spec.ts   # Un solo spec

pnpm lint              # ESLint sobre src/
```

No hay comandos de Supabase en el MVP. Cuando entren se documentarán aparte.

## Arquitectura clave

### Sin auth en MVP

Single-user, datos en `localStorage`. El usuario abre la app y todo lo que escribe queda en su navegador. No hay `/login`, no hay middleware de sesión, no hay rutas privadas. Cuando lleguen Supabase + auth (iteración 4+), `src/middleware.ts` aparece para gatear las rutas que pasen a multi-user.

### Server vs island

- **Servidor (`.astro`)**: render del shell estático y datos seed (`seed/*.json`). No accede a `localStorage` (no existe en server).
- **Isla (`.tsx`, `client:load`)**: toda la lectura/escritura de datos del usuario. Hidrata leyendo de `localStorage` vía `src/lib/storage/`.

Regla: **los `.astro` solo entregan shell + seed data**; las islas son la única vía a `localStorage`.

### Capa de storage abstraída

`src/lib/storage/` expone un API tipado equivalente a "repositorio":

```ts
// src/lib/storage/planner.ts (boceto)
export interface PlannerRepo {
  getDay(date: string): Promise<DailyPlan | null>;
  upsertDay(date: string, plan: DailyPlan): Promise<void>;
  // ...
}
```

Implementación inicial: `LocalStoragePlannerRepo`. Cuando llegue Supabase, añadimos `SupabasePlannerRepo` con la misma firma y conmutamos vía DI o feature flag. **No usar `window.localStorage` directamente** desde componentes — siempre vía el repo.

### Modelo "uno por fecha"

`DailyPlan` y `DiaryEntry` están indexadas por `date` (string `YYYY-MM-DD`) en `localStorage` con prefijo (`pk:plan:2026-05-17`, `pk:diary:2026-05-17`). Si abrir un día no tiene datos, el repo devuelve `null` y la isla muestra estado vacío. Se persiste perezosamente al primer cambio.

### Datos seed (Pokémon, recetas, materiales)

Para el MVP, los datos seed están copiados del prototipo a `seed/*.json`:

- `seed/pokemon.json` — 5 Pokémon de ejemplo del prototipo (BU, PI, EE, PS, ZU).
- `seed/materials.json` — 10 materiales con su glyph y color (madera, piedra, lana, cristal, cuerda, clavos, bayas, agua, hierba, tela).
- `seed/recipes.json` — recetas de ejemplo del `RECIPE_DB` del prototipo.
- `seed/habitats.json` — `HABITAT_DB` del prototipo.

Estos no cambian en runtime — se importan estáticamente en los `.astro`. Cuando entre el catálogo completo (iteración 5+) scrapearemos [pokopiamap.com](https://pokopiamap.com) y [pokopiadb.com](https://pokopiadb.com) (no hay API pública de Pokopia), dumps en los mismos archivos, app sigue funcionando igual.

### Modelo de dominio (resumen — detalle en docs/prototype.md)

| Entidad | MVP | Después |
|---|---|---|
| `DailyPlan` (checklist + goals por día) | ✅ Iteración 2 | — |
| `DiaryEntry` (texto + mood + memoria por día) | ✅ Iteración 3 | extender con flow-diary del prototipo |
| `Pokemon`, `Material`, `Recipe`, `Habitat` | datos seed read-only del prototipo | Catálogo CRUD con scrape |
| `Build`, `Activity`, `ScheduleEntry`, `WishlistItem`, `Inventory` | ❌ no en MVP | iteraciones 5+ |

## Convenciones

- **Idioma UI**: español. Labels del PDF se traducen ("Daily Planner" → "Planificador Diario").
- **Idioma del código**: inglés. Nombres de variables, tipos, funciones, comentarios.
- **Fechas en URLs**: siempre `YYYY-MM-DD` ISO. Helpers en `src/lib/date.ts` — no usar `Date.prototype.toLocaleDateString` ni libs sin tree-shaking (`date-fns/esm` o `dayjs` mínimos si hace falta).
- **localStorage keys**: con prefijo `pk:` para no colisionar con otras apps (`pk:plan:YYYY-MM-DD`, `pk:diary:YYYY-MM-DD`, `pk:settings`).
- **Sin valores arbitrarios de Tailwind**: token primero, uso después.
- **Tests son requisito**: cada PR de feature trae al menos 1 test Vitest + 1 happy path Playwright. Sin tests verdes la iteración no cierra.

## Lo que NO hacer

- **No** introducir Supabase, Docker o auth en el MVP — están explícitamente diferidos a iteraciones 4+.
- **No** acceder a `window.localStorage` directamente desde un componente — usar `src/lib/storage/`.
- **No** usar PokéAPI. El catálogo es Pokopia-específico (incluye `habitats`, glyphs, rareza, lista filtrada). Datos viven en `seed/*.json`.
- **No** consultar wikis externos en runtime ni en CI — todo viene de `seed/*.json`.
- **No** introducir SSR de datos del usuario (los datos del usuario solo existen en su navegador en MVP) — los `.astro` solo entregan seed estática.
- **No** romper el shape de los datos seed copiados del prototipo sin actualizar `docs/prototype.md` y los componentes que los consumen.

## Iteraciones

| # | Foco | Storage | Estado |
|---|---|---|---|
| **0** | Setup: scaffold Astro + Tailwind + Vitest + Playwright + Vercel | — | **en curso** |
| **1** | Design system: tokens del prototipo + primitivos UI (`SheetPaper`, `WashiTape`, `Stamp`, `Mascot`, `Pill`, `Check`, `MaterialBar`, `PokeAvatar`, `MapDot`) | — | pendiente |
| **2** | Daily Planner: checklist + goals + navegación por fechas, estética V1 | `localStorage` | pendiente |
| **3** | Journal: form fechado con autosave, estética V1 + handwritten font | `localStorage` | pendiente |
| **4** | Migración a Supabase + auth magic link (cuando lo pida el caso de uso multi-user) | Supabase | diferido |
| **5+** | Builds, materiales, hábitats, agenda, catálogo DB (los 5 flows del prototipo) | Supabase | diferido |

Cada iteración tiene sus tests definidos en `docs/testing.md` y un checklist propio en `docs/iteration-{N}-*.md` cuando se abre.

## Recursos

- `docs/prototype/pokopia-planner/` — bundle completo del prototipo (HTML/JSX/CSS). **Fuente de verdad** para look-and-feel y flujo.
- `docs/prototype.md` — modelo de dominio extraído + tokens visuales extra.
- `www.pocoapokemon.jp-DESIGN 2.md` — design system base (paleta, tipografía, espaciado).
- Web oficial del juego: https://www.pocoapokemon.jp/ja/
