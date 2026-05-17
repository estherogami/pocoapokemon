# Testing

Cada iteración cierra solo con **Vitest + Playwright en verde**. Esta doc define qué se testea, dónde vive cada tipo de test y cómo correrlos.

## Pirámide de tests

```
        ┌──────────────────┐
        │  Playwright E2E  │   ← flujos de usuario completos, navegador real
        ├──────────────────┤
        │  Vitest (jsdom)  │   ← componentes React aislados (opcional)
        ├──────────────────┤
        │  Vitest (node)   │   ← lógica pura: date helpers, parsers, reducers
        └──────────────────┘
```

**Regla**: la lógica pura va a Vitest. El comportamiento integrado de páginas (auth + DB + UI) va a Playwright. Si algo se puede testear con Vitest, **no** se duplica en Playwright.

## Estructura de carpetas

```
src/
├── lib/
│   ├── date.ts
│   ├── date.test.ts            ← Vitest (node)
│   └── api/
│       ├── checklist.ts
│       └── checklist.test.ts   ← Vitest, mock del cliente Supabase
└── components/islands/
    ├── Checklist.tsx
    └── Checklist.test.tsx      ← Vitest (jsdom) + RTL — opcional

tests/
└── e2e/
    ├── smoke.spec.ts
    ├── auth.spec.ts
    ├── planner.spec.ts
    ├── journal.spec.ts
    └── autocomplete.spec.ts    ← iteración 4

vitest.config.ts
playwright.config.ts
```

## Vitest

### Configuración

`vitest.config.ts` con dos entornos según necesidad:

- **node** (default): para lógica pura. Rápido, sin DOM.
- **jsdom**: para componentes React con `@testing-library/react` (instalar `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`).

Override por archivo con `// @vitest-environment jsdom` en la primera línea.

### Convenciones

- **Co-located**: `foo.ts` + `foo.test.ts` en la misma carpeta. Facilita encontrarlos y mover los dos juntos.
- **Naming**: `describe('toISODate')` para la unidad, `it('formats a date to YYYY-MM-DD')` para el caso. En español si la rama UI lo justifica, en inglés para utilidades técnicas.
- **Sin mocks de Supabase en lógica de datos pura**: extraer la lógica que se quiere testear a una función pura que recibe un cliente como parámetro, e inyectar un cliente fake en el test. Evita `vi.mock` cuando se puede.
- **Coverage**: no enforced en MVP. A partir de iteración 4 considerar threshold `lines > 70%` en `src/lib/`.

### Cuándo usar Vitest

| Sí | No |
|---|---|
| `toISODate`, `addDays`, `formatRelative` | "El usuario puede añadir un ítem" → E2E |
| Reducer de checklist (estado optimista) | "El magic link redirige tras click" → E2E |
| Parser HTML del scrape (con fixture) | "El header se ve bien" → visual regression aparte |
| Validación de email en input | "El form persiste tras recarga" → E2E |

### Comandos

```bash
pnpm test              # watch mode (default Vitest)
pnpm test:run          # una pasada, CI-friendly
pnpm test -- date      # solo tests cuyo path matchea 'date'
pnpm test -- --reporter=verbose
pnpm vitest run --coverage   # con cobertura HTML en coverage/
```

## Playwright

### Configuración

`playwright.config.ts`:

- `testDir: 'tests/e2e'`
- `webServer: { command: 'pnpm dev', url: 'http://localhost:4321', reuseExistingServer: !process.env.CI }`
- `projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]` — añadir Firefox/Safari solo si descubrimos bugs cross-browser.
- `use.baseURL: 'http://localhost:4321'`
- `use.trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`.

### Datos y aislamiento (MVP — solo `localStorage`)

- **Sin DB, sin auth**: el MVP persiste todo en `localStorage`. Los tests E2E no necesitan Supabase ni global setup.
- **Limpieza entre tests**: cada test empieza desde `localStorage` vacío. Playwright crea un contexto nuevo por test por defecto, lo que ya garantiza un origen sin storage. Si dentro de un test necesitas sembrar datos, usa `page.addInitScript()` antes del primer `page.goto()`.
- **Helper de sembrado**: `tests/e2e/fixtures/seedStorage.ts` con utilidades tipo `await seedPlan(page, '2026-05-17', { items: [...] })` que internamente hacen `addInitScript` con la key `pk:plan:2026-05-17`.
- **Cada test es independiente**: no asume orden, no comparte datos con otros tests del mismo archivo.

### Cuando entre Supabase (iteración 4+)

- Crear `tests/e2e/fixtures/users.ts` con email/password hardcoded para `signInWithPassword`.
- `globalSetup` ejecuta `supabase db reset` antes de la suite.
- Helper `loginAs(page, user)` que setea las cookies de Supabase antes del primer navigate.

Hasta entonces, ignorar esta sección.

### Convenciones

- Un archivo `.spec.ts` por feature (`auth`, `planner`, `journal`).
- Selectores: **role + name** (`page.getByRole('button', { name: 'Añadir' })`) sobre `getByTestId`. Solo añadir `data-testid` cuando no haya un rol semántico claro.
- **Espera explícita** con `expect(...).toBeVisible()` o `toHaveText`, **nunca** `page.waitForTimeout`.
- Helpers compartidos en `tests/e2e/fixtures/` (login, factory de fechas, factory de planner).

### Comandos

```bash
pnpm test:e2e                          # headless, todos los specs
pnpm test:e2e:ui                       # UI mode para debug visual
pnpm test:e2e tests/e2e/auth.spec.ts   # un archivo
pnpm test:e2e -g "magic link"          # un test por nombre
pnpm test:e2e --debug                  # paso a paso con inspector
pnpm exec playwright show-report       # abre el report HTML del último run
```

## Tests por iteración (definición de hecho)

| Iter | Vitest | Playwright |
|---|---|---|
| **0** | `src/lib/sanity.test.ts` (1 expect) | `tests/e2e/smoke.spec.ts` (`/` muestra "Pokopia") |
| **1** | snapshot tests de primitivos UI (`Pill`, `WashiTape`, `Stamp`) renderizados con clases correctas; `src/lib/date.test.ts` (toISODate, addDays) | `design-system.spec.ts`: smoke por ruta `/dev/components` (storybook ad-hoc) verifica que cada primitivo se renderiza |
| **2** | reducer/optimistic update de checklist; `PlannerRepo` con `localStorage` fake (de `jest-environment-jsdom`) | `planner.spec.ts`: añadir 3 ítems, marcar 1, recargar → persiste; navegar día siguiente → vacío; volver → datos previos; añadir/marcar 2 goals |
| **3** | hook `useDebouncedSave` (debounce + cleanup); `DiaryRepo` | `journal.spec.ts`: escribir en "Dear Planner", esperar autosave, recargar → texto persiste; cambiar fecha → en blanco; volver → reaparece |
| **4+** | migración localStorage → Supabase: tests de `SupabaseRepo` con cliente mock + tests de migración de datos existentes | `auth.spec.ts`: redirect sin sesión; magic-link login; signout. `migration.spec.ts`: usuario con datos en localStorage entra a la app post-migración y ve sus planes/diary sincronizados |

## CI

Workflow en `.github/workflows/ci.yml` con tres jobs en paralelo:

1. **lint**: `pnpm install --frozen-lockfile` + `pnpm lint`.
2. **unit**: `pnpm install --frozen-lockfile` + `pnpm test:run`.
3. **e2e**: `pnpm install --frozen-lockfile` + `pnpm exec playwright install --with-deps chromium` + `pnpm test:e2e`. **No** requiere Supabase en MVP.

PR no se mergea si cualquiera falla. Vercel deploy preview se publica en cada PR automáticamente.

Cuando entre Supabase (iteración 4+), el job `e2e` añadirá: `supabase start` (vía action `supabase/setup-cli`) + `pnpm db:reset` antes de `pnpm test:e2e`.

## Debug rápido

| Problema | Acción |
|---|---|
| Playwright "Locator not found" | `pnpm test:e2e --debug` → step through con inspector. Verificar selector con `page.pause()`. |
| Vitest cuelga en jsdom | Falta `@vitest-environment jsdom` o no se importó `@testing-library/jest-dom/vitest`. |
| Tests E2E flaky | Buscar `waitForTimeout`, reemplazar por `toBeVisible` o `toHaveCount`. |
| "Cannot find module 'msw'" | No usar MSW por ahora — los tests E2E usan Supabase real, los unit usan cliente fake inyectado. |
| Cookies de sesión no se setean en test (iteración 4+) | Verificar que `loginAs` use `page.context().addCookies(...)` con `domain: 'localhost'` y `httpOnly: true` para las cookies de Supabase. |
| Tests E2E ven datos de tests previos | `localStorage` no se está limpiando entre tests. Por defecto Playwright crea contexto nuevo por test; revisar `playwright.config.ts` no comparta contexto. Si usas `test.describe.serial`, añade `await page.context().clearCookies(); await page.evaluate(() => localStorage.clear())` en `beforeEach`. |
