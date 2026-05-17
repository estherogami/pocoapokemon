# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este proyecto

App web interactiva inspirada en el planner imprimible oficial de **Pokémon Pokopia** (juego de Koei Tecmo, 2026). Una vez recibido el prototipo de Claude Design, el alcance ha cambiado: ya **no es** un Daily Planner genérico, sino un **gestor de proyectos de construcción dentro del juego** con materiales, recetas, hábitats Pokémon, agenda y diario personal — todo con estética "libreta cosida" (papel, washi tape, sellos, fuente manuscrita en notas).

**Fuente de verdad visual y de flujo**: `docs/prototype/pokopia-planner/`. Ver `docs/prototype.md` para el modelo de dominio completo.

El plan original sigue en `C:\Users\Esther\.claude\plans\planeemos-un-diario-para-happy-shore.md` pero **el modelo de datos del prototipo lo extiende** — confiar antes en `docs/prototype.md` para entidades y pantallas.

## Stack y por qué

- **Astro + islas React**: la mayoría de páginas son server-render con SEO y carga instantánea; solo hidratamos las islas interactivas (`Checklist`, `JournalForm`, `DateNavigator`).
- **Tailwind con design tokens en `tailwind.config.mjs`**: los hex/rounded/sombras del design system se exponen como utilidades (`bg-brand-purple`, `rounded-playful`, `shadow-raised`). **No usar valores arbitrarios** — si falta un token, se añade al config primero.
- **Supabase**: Postgres + Auth + RLS. Cliente SSR vía `@supabase/ssr` para tener sesión en server-rendered Astro pages.
- **Vitest + Playwright**: ninguna iteración se cierra sin tests verdes. Ver `docs/testing.md`.
- **Vercel**: `@astrojs/vercel` adapter, deploy automático en cada push a `main` + previews por PR.

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
pnpm test:e2e tests/e2e/auth.spec.ts   # Un solo spec

pnpm lint              # ESLint sobre src/
pnpm db:reset          # supabase db reset (drop + migrations + seed)
pnpm db:types          # Regenera src/lib/supabase/types.ts
```

## Arquitectura clave

### Auth y middleware

`src/middleware.ts` corre en **cada request**. Usa `@supabase/ssr` con cookies de Astro para:

1. Refrescar la sesión si está caducada (escribe nuevas cookies en la response).
2. Si la ruta es `/planificador/*` o `/diario/*` y no hay sesión, redirige a `/login`.
3. Si la ruta es `/login` y ya hay sesión, redirige a `/planificador/{hoy}`.

El callback del magic link vive en `src/pages/api/auth/callback.ts` y hace `exchangeCodeForSession`. **Cualquier nueva ruta privada se gatea automáticamente** añadiendo su prefijo al matcher del middleware — no replicar la lógica.

### Server vs island

- **Servidor (`.astro`)**: lee datos vía `src/lib/supabase/server.ts` y los pasa como props a las islas. Pre-rellena el HTML.
- **Isla (`.tsx`, `client:load`)**: mutaciones (crear/editar/borrar). Usa `src/lib/supabase/browser.ts`. **Optimistic updates** + reconciliación con el resultado real para que la UI no se sienta lenta.

Regla: **toda mutación se persiste vía Supabase desde la isla**. Los `.astro` solo leen.

### Modelo "uno por fecha"

`daily_plans` y `journal_entries` están únicas por `(user_id, date)`. Si el usuario abre `/planificador/2026-05-17` sin datos, el `.astro` **no crea** el plan; se crea perezosamente cuando la isla `Checklist` añade el primer ítem (upsert). Esto evita filas vacías para días que el usuario nunca tocó.

### RLS

Todas las tablas con datos de usuario tienen `using (auth.uid() = user_id)`. `checklist_items` y `goals` **duplican `user_id`** (denormalización a propósito) para evitar joins en la policy. Las tablas catálogo (`pokemon`, `items`) tienen `using (true)` para lectura anónima.

### Datos Pokémon/items

No hay API pública de Pokopia. El flujo es:

1. `scripts/scrape-pokemon.ts` se ejecuta **una vez** (manualmente) y dumpea `seed/pokemon.json`.
2. `seed/pokemon.json` está **commiteado en el repo**.
3. `scripts/seed-pokemon.ts` lee ese JSON y hace upsert en Supabase, llamado desde `supabase db reset` o un job manual.
4. La app **nunca** consulta los wikis origen en runtime o en CI.

Origen: `pokopiamap.com/pokedex/{n}` (Pokémon), `pokopiadb.com/database/items/{slug}` (items/recetas/hábitats). Respetar rate-limit (1 req/s) y User-Agent identificable.

### Modelo de dominio (resumen — detalle en docs/prototype.md)

Entidades centrales del prototipo:

- **Build**: proyecto de construcción con name, type, location, recipe_id, status, progress, materials con have/need, subtasks reordenables, helpers Pokémon, note.
- **Recipe**: blueprint reutilizable (`{ id, name, tag, size, time, mats: [material_id, qty][] }`).
- **Material**: catálogo con `glyph` (uno de 10: wood/stone/wool/glass/cord/nails/berries/water/grass/cloth) y color.
- **Pokémon**: id de 2 letras (`BU`, `PI`…), name, where, when, tip, color, rarity ★.
- **Habitat**: vincula Pokémon objetivo + materiales + cebo recomendado. Crear un hábitat genera tareas en la agenda.
- **Inventory**: per-user `material_id → have`.
- **ScheduleEntry**: agenda diaria con tag (`rutina` / `build` / `captura` / `ocio`).
- **DiaryEntry**: per-day con mood, texto manuscrito ~500 chars, photos[], auto_summary[].
- **Activity**: 4 tipos (`recolectar` / `capturar` / `receta` / `evento`), feeds into ScheduleEntry.
- **WishlistItem**: ideas futuras con tag.

## Convenciones

- **Idioma UI**: español. Labels del PDF se traducen ("Daily Planner" → "Planificador Diario").
- **Idioma del código**: inglés. Nombres de variables, tablas, funciones, comentarios.
- **Fechas en URLs**: siempre `YYYY-MM-DD` ISO. Helpers en `src/lib/date.ts` — no usar `Date.prototype.toLocaleDateString` ni libs sin tree-shaking.
- **Sin valores arbitrarios de Tailwind**: si necesitas un color/espaciado no presente en el config, añádelo al config con nombre semántico.
- **Tipos generados**: `pnpm db:types` después de cualquier migration. No editar `src/lib/supabase/types.ts` a mano.
- **Migrations**: añadir nuevo archivo numerado en `supabase/migrations/`, nunca editar uno ya aplicado.
- **Tests son requisito**: cada PR de feature trae al menos 1 test Vitest + 1 happy path Playwright. Sin tests verdes la iteración no cierra.

## Lo que NO hacer

- **No** usar PokéAPI. El catálogo es Pokopia-específico (incluye `habitats`, lista filtrada). Si necesitas un Pokémon, está en la tabla `pokemon` de Supabase.
- **No** mockear Supabase en tests E2E — usar `supabase start` local o un proyecto Supabase de test. Los mocks ocultaron bugs de RLS en proyectos similares.
- **No** crear nuevas rutas privadas sin actualizar el matcher de `src/middleware.ts`.
- **No** consultar wikis externos en runtime ni en CI — todo viene de `seed/*.json`.
- **No** mover el `user_id` denormalizado de `checklist_items`/`goals` a un join policy "para limpiar". La duplicación es deliberada por rendimiento de RLS.

## Iteraciones (ver plan completo)

| # | Foco | Estado |
|---|---|---|
| 0 | Setup (scaffold + tests + deploy) | **en curso** |
| 1 | Auth magic link | pendiente |
| 2 | Daily Planner CRUD | pendiente |
| 3 | Journal con autosave | pendiente |
| 4 | Catálogo Pokémon + autocomplete | pendiente |

Cada iteración tiene sus tests definidos en el plan. Comprobar `docs/iteration-{N}-*.md` para el checklist de la actual.

## Recursos

- `daily-planner-en.pdf` — planner oficial de referencia (7 páginas).
- `www.pocoapokemon.jp-DESIGN 2.md` — design system con tokens exactos. **Fuente de verdad para cualquier decisión visual.**
- Web oficial del juego: https://www.pocoapokemon.jp/ja/
