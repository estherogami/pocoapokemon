# Pokopia Planner

Aplicación web interactiva inspirada en el planner imprimible oficial de **Pokémon Pokopia** (juego de Koei Tecmo, 2026). El MVP digitaliza el Daily Planner y el Journal del PDF original, ya en la estética V1 "Libreta cosida" del prototipo de Claude Design. Iteraciones futuras incorporan el resto del prototipo: construcciones, materiales, hábitats Pokémon, agenda y catálogo.

> Estado: **pre-MVP — Iteración 0 (Setup)**. Ver `docs/iteration-0-setup.md`.

## Stack

| Capa | Tecnología MVP | Iteraciones futuras |
|---|---|---|
| Framework | [Astro](https://astro.build) con **islas React** | — |
| Estilos | [Tailwind CSS](https://tailwindcss.com) + design tokens del prototipo | — |
| Storage | **`localStorage`** del navegador (single-user) | Migrar a [Supabase](https://supabase.com) + Auth |
| Tests unit | [Vitest](https://vitest.dev) | — |
| Tests E2E | [Playwright](https://playwright.dev) | — |
| Deploy | [Vercel](https://vercel.com) (adapter `@astrojs/vercel`) | — |

> El MVP **no requiere backend**: todo persiste en `localStorage` del usuario. Esto simplifica enormemente Iteración 0 (sin Docker, sin Supabase CLI, sin cuenta Supabase). Cuando llegue el momento de multi-usuario / multi-dispositivo migraremos a Supabase con auth magic link.

## Requisitos

- Node.js ≥ 20 LTS
- pnpm ≥ 9 (`npm i -g pnpm`)
- Cuenta gratuita en Vercel para el despliegue (opcional para desarrollo local)

## Primeros pasos

```bash
# 1. Instalar dependencias
pnpm install

# 2. Arrancar dev server
pnpm dev             # → http://localhost:4321
```

No hace falta `.env` ni levantar servicios externos para el MVP.

## Scripts

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Astro dev server en `:4321` |
| `pnpm build` | Build de producción |
| `pnpm preview` | Sirve el build localmente |
| `pnpm test` | Vitest en modo watch |
| `pnpm test:run` | Vitest una sola pasada (CI) |
| `pnpm test:e2e` | Playwright E2E (levanta servidor automáticamente) |
| `pnpm test:e2e:ui` | Playwright con UI interactiva para debug |
| `pnpm lint` | ESLint sobre `src/` |

## Estructura del repo (objetivo MVP)

```
.
├── astro.config.mjs
├── tailwind.config.mjs
├── src/
│   ├── pages/                  # rutas (planificador, diario, index)
│   ├── layouts/                # BaseLayout
│   ├── components/
│   │   ├── ui/                 # SheetPaper, Card, Check, Pill, Stamp, WashiTape, Mascot, ...
│   │   └── islands/            # Componentes React hidratados (Checklist, Journal, ...)
│   ├── lib/
│   │   ├── storage/            # wrappers de localStorage tipados
│   │   └── date.ts             # helpers de fecha
│   └── styles/global.css
├── seed/                       # datos seed copiados del prototipo (builds, pokemon, recipes, mats)
├── tests/e2e/                  # Playwright
└── docs/
    ├── iteration-0-setup.md
    ├── testing.md
    └── prototype.md
```

## Documentación

- **[CLAUDE.md](./CLAUDE.md)** — guía para sesiones de Claude Code (arquitectura, convenciones, qué NO hacer).
- **[docs/iteration-0-setup.md](./docs/iteration-0-setup.md)** — checklist paso a paso de la iteración actual.
- **[docs/testing.md](./docs/testing.md)** — estrategia Vitest + Playwright y tests por iteración.
- **[docs/prototype.md](./docs/prototype.md)** — modelo de dominio extraído del prototipo de Claude Design + cómo reproducirlo.
- **[docs/prototype/pokopia-planner/](./docs/prototype/pokopia-planner/)** — bundle completo del prototipo (HTML/JSX/CSS).
- **[www.pocoapokemon.jp-DESIGN 2.md](./www.pocoapokemon.jp-DESIGN%202.md)** — sistema de diseño base (paleta, tipografía).

## Roadmap

| Iteración | Funcionalidad | Storage |
|---|---|---|
| **0** | Setup: scaffold Astro + Tailwind + Vitest + Playwright + deploy Vercel | — |
| **1** | Design system: tokens, fuentes y primitivos UI del prototipo (`SheetPaper`, `WashiTape`, `Stamp`, `Mascot`, `Pill`, `Check`, `MaterialBar`, `PokeAvatar`, `MapDot`) | — |
| **2** | Daily Planner (checklist + goals + navegación por fechas) con estética V1 | `localStorage` |
| **3** | Journal (formulario fechado con autosave) con estética V1 | `localStorage` |
| **4+** | Backend Supabase + auth + Builds + materiales + hábitats + agenda + catálogo DB. Ver `docs/prototype.md` para el modelo de dominio extendido. | Supabase |

## Origen de datos

- **MVP**: datos seed copiados directamente del prototipo (`docs/prototype/pokopia-planner/project/common.jsx`) → `seed/*.json` en el repo. 4 builds de ejemplo, 5 Pokémon, recetas y materiales con sus glyphs.
- **Iteraciones futuras**: ampliar el catálogo scrapeando una vez [pokopiamap.com](https://pokopiamap.com) y [pokopiadb.com](https://pokopiadb.com) (no hay API pública de Pokopia). Dumps a `seed/` también. La app **no** consulta wikis en runtime.

## Licencia y atribución

Proyecto personal sin fines comerciales. Pokémon, Pokopia y todos los nombres relacionados son marcas de Nintendo / Creatures Inc. / GAME FREAK inc. / KOEI TECMO GAMES. Datos scrapeados se atribuyen al wiki origen.
