# Pokopia Planner

Aplicación web interactiva para gestionar las actividades dentro del juego **Pokémon Pokopia**. Digitaliza el planner imprimible oficial (checklist diaria, objetivos, diario personal) siguiendo la estética del juego.

> Estado: **pre-MVP — Iteración 0 (Setup)**. Ver `docs/iteration-0-setup.md`.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | [Astro](https://astro.build) con **islas React** |
| Estilos | [Tailwind CSS](https://tailwindcss.com) + design tokens propios |
| Backend / DB | [Supabase](https://supabase.com) (Postgres + Auth) |
| Auth | Magic link por email |
| Tests unit | [Vitest](https://vitest.dev) |
| Tests E2E | [Playwright](https://playwright.dev) |
| Deploy | [Vercel](https://vercel.com) (adapter `@astrojs/vercel`) |

## Requisitos

- Node.js ≥ 20 LTS
- pnpm ≥ 9 (`npm i -g pnpm`)
- Docker Desktop (para `supabase start` local)
- Supabase CLI (`brew install supabase/tap/supabase` o equivalente Windows)
- Cuenta gratuita en Supabase y Vercel para el despliegue

## Primeros pasos

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con SUPABASE_URL y SUPABASE_ANON_KEY (locales o del proyecto remoto)

# 3. Levantar Supabase local + aplicar migraciones
supabase start
supabase db reset    # aplica migrations + seed

# 4. Generar tipos de Supabase para TypeScript
pnpm db:types

# 5. Arrancar dev server
pnpm dev             # → http://localhost:4321
```

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
| `pnpm db:types` | Regenera `src/lib/supabase/types.ts` desde Supabase |
| `pnpm db:reset` | `supabase db reset` (drop + migrations + seed) |

## Estructura del repo (objetivo)

```
.
├── astro.config.mjs
├── tailwind.config.mjs
├── src/
│   ├── pages/                  # rutas (planificador, diario, login, api/auth)
│   ├── layouts/                # BaseLayout
│   ├── components/
│   │   ├── ui/                 # Button, Card, Input, Checkbox (primitivos)
│   │   └── islands/            # Componentes React hidratados
│   ├── lib/
│   │   ├── supabase/           # clientes server/browser + tipos generados
│   │   ├── date.ts             # helpers de fecha
│   │   └── api/                # wrappers Supabase usados por islas
│   ├── styles/global.css
│   └── middleware.ts           # auth gate
├── supabase/migrations/        # SQL versionado
├── seed/                       # JSON pre-scrapeado (pokemon.json, items.json)
├── scripts/                    # scrape-pokemon.ts, seed-pokemon.ts, ...
├── tests/e2e/                  # Playwright
└── docs/
    ├── iteration-0-setup.md
    └── testing.md
```

## Documentación

- **[CLAUDE.md](./CLAUDE.md)** — guía para sesiones de Claude Code.
- **[docs/iteration-0-setup.md](./docs/iteration-0-setup.md)** — checklist de la iteración actual.
- **[docs/testing.md](./docs/testing.md)** — cómo se organizan y ejecutan los tests.
- **[www.pocoapokemon.jp-DESIGN 2.md](./www.pocoapokemon.jp-DESIGN%202.md)** — sistema de diseño (paleta, tipografía, componentes).
- **[daily-planner-en.pdf](./daily-planner-en.pdf)** — planner oficial del juego que digitalizamos.

## Roadmap

| Iteración | Funcionalidad |
|---|---|
| **0** | Setup: scaffold + Tailwind + Vitest + Playwright + Supabase + deploy Vercel |
| **1** | Auth magic link + middleware |
| **2** | Daily Planner (checklist + goals + navegación por fechas) |
| **3** | Journal (formulario fechado con autosave) |
| **4** | Catálogo Pokémon Pokopia (scrape + autocomplete en Journal) |
| 5+ | Space Organizer, Recipes, Storage Containers, Longer-Term Planning |

Plan completo: `C:\Users\Esther\.claude\plans\planeemos-un-diario-para-happy-shore.md`.

## Origen de datos Pokémon / items

**No existe API pública de Pokopia.** El catálogo se construye scrapeando una vez ([pokopiamap.com](https://pokopiamap.com) para Pokémon, [pokopiadb.com](https://pokopiadb.com) para items) → JSON commiteado en `seed/` → cargado en Supabase. La app **no** consulta wikis en runtime. Ver `docs/iteration-0-setup.md` § "Datos".

## Licencia y atribución

Proyecto personal sin fines comerciales. Pokémon, Pokopia y todos los nombres relacionados son marcas de Nintendo / Creatures Inc. / GAME FREAK inc. / KOEI TECMO GAMES. Datos scrapeados se atribuyen al wiki origen.
