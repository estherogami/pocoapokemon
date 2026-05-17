# Iteración 0 — Setup

**Objetivo**: dejar el repo en estado "scaffold funcional" — toda la infraestructura instalada y un humo de extremo a extremo verde, sin aún features de producto.

**Definición de hecho**:
- `pnpm dev` levanta Astro en `:4321` y muestra una página con el texto "Pokopia".
- `pnpm test:run` pasa (al menos un test sanity).
- `pnpm test:e2e` pasa (smoke E2E que carga `/`).
- Push a `main` despliega automáticamente a Vercel y la URL pública responde 200.
- Supabase local (`supabase start`) arranca y `supabase db reset` aplica una migración placeholder sin error.

## Checklist ordenado

> Marca cada caja conforme avanzas. No saltes pasos — el orden importa.

### 1. Repo y git

- [ ] `git init` (si aún no está).
- [ ] `git remote add origin https://github.com/estherogami/pocoapokemon.git`.
- [ ] Crear `.gitignore` con: `node_modules`, `dist`, `.env`, `.env.local`, `.astro`, `.vercel`, `coverage`, `test-results`, `playwright-report`, `.supabase`.
- [ ] Commit inicial con la documentación ya escrita (README, CLAUDE.md, docs/).

### 2. Astro scaffold

- [ ] `pnpm create astro@latest .` — elegir **Empty** template, **TypeScript strict**, **no** instalar integraciones aún.
- [ ] `pnpm astro add react` — confirma la integración + tsconfig.
- [ ] `pnpm astro add tailwind` — Tailwind 4 con Vite plugin.
- [ ] `pnpm astro add vercel` — adapter de Vercel para SSR.
- [ ] En `astro.config.mjs`: `output: 'server'`, `adapter: vercel()`.

### 3. Design tokens en Tailwind

- [ ] Crear `tailwind.config.mjs` con los tokens del design system (paleta Pokopia, fontFamily Noto Sans JP, borderRadius `friendly/rounded/playful`, boxShadow `raised/elevated/floating/lifted`, spacing extendido `60/72/80`).
- [ ] En `src/styles/global.css`: `@import "tailwindcss";` + `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600;700;900&display=swap');` + clase base `body { font-family: theme(fontFamily.sans); color: theme(colors.text-gray); }`.
- [ ] Importar `global.css` desde `src/layouts/BaseLayout.astro`.

> Referencia exacta: ver tabla de colores y tipografía en `www.pocoapokemon.jp-DESIGN 2.md` §2 y §3.

### 4. Página índice mínima

- [ ] Crear `src/layouts/BaseLayout.astro` con `<html lang="es">`, meta básicos, slot.
- [ ] Crear `src/pages/index.astro` que renderice un `<h1>Pokopia Planner</h1>` y un párrafo cualquiera, envuelto en `BaseLayout`.
- [ ] `pnpm dev` → abrir `http://localhost:4321` → ver el H1 con tipografía Noto Sans JP y color `#585858`.

### 5. Vitest

- [ ] `pnpm add -D vitest @vitest/coverage-v8`.
- [ ] Crear `vitest.config.ts` mínimo (`test: { environment: 'node' }`).
- [ ] Crear `src/lib/sanity.test.ts` con un único test: `expect(1 + 1).toBe(2)`.
- [ ] Añadir scripts: `"test": "vitest"`, `"test:run": "vitest run"`.
- [ ] `pnpm test:run` → 1 test verde.

### 6. Playwright

- [ ] `pnpm create playwright@latest --quiet` — elegir TypeScript, carpeta `tests/e2e`, no GitHub Actions (lo añadimos manualmente luego).
- [ ] `pnpm exec playwright install --with-deps chromium` (Linux/CI) o `pnpm exec playwright install chromium` (local).
- [ ] En `playwright.config.ts`: `webServer: { command: 'pnpm dev', url: 'http://localhost:4321', reuseExistingServer: !process.env.CI }`.
- [ ] Crear `tests/e2e/smoke.spec.ts`:
  ```ts
  import { test, expect } from '@playwright/test';
  test('home loads and shows Pokopia', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Pokopia');
  });
  ```
- [ ] Añadir scripts: `"test:e2e": "playwright test"`, `"test:e2e:ui": "playwright test --ui"`.
- [ ] `pnpm test:e2e` → 1 test verde.

### 7. Supabase local

- [ ] Verificar Docker Desktop corriendo.
- [ ] `supabase init` — confirma `supabase/config.toml`.
- [ ] Crear `supabase/migrations/0001_placeholder.sql`:
  ```sql
  -- Placeholder para que `supabase db reset` no falle.
  create table if not exists _meta (
    key text primary key,
    value text
  );
  insert into _meta (key, value) values ('schema_version', '0.0.0')
  on conflict (key) do nothing;
  ```
- [ ] `supabase start` — anota `API URL` y `anon key` que imprime al final.
- [ ] Crear `.env.example`:
  ```
  PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
  PUBLIC_SUPABASE_ANON_KEY=<paste anon key>
  ```
- [ ] `cp .env.example .env` y rellenar valores reales.
- [ ] `supabase db reset` → "Database reset successfully" sin errores.
- [ ] Añadir script: `"db:reset": "supabase db reset"`, `"db:types": "supabase gen types typescript --local > src/lib/supabase/types.ts"`.

### 8. ESLint (opcional pero recomendado)

- [ ] `pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-astro`.
- [ ] Crear `eslint.config.js` con la config recomendada de Astro + TS.
- [ ] Script: `"lint": "eslint src/ tests/"`.
- [ ] `pnpm lint` → sin errores.

### 9. CI con GitHub Actions

- [ ] Crear `.github/workflows/ci.yml` con tres jobs:
  1. **lint**: `pnpm install` + `pnpm lint`.
  2. **unit**: `pnpm install` + `pnpm test:run`.
  3. **e2e**: `pnpm install` + `pnpm exec playwright install --with-deps chromium` + `pnpm test:e2e`.
- [ ] Push y comprobar que los 3 jobs pasan en el primer PR.

### 10. Vercel deploy

- [ ] En Vercel: New Project → import `estherogami/pocoapokemon` → framework auto-detected (Astro) → root `/`.
- [ ] Variables de entorno en Vercel: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` (de Supabase Cloud, **no** locales).
- [ ] Crear proyecto Supabase remoto (free tier) → aplicar las migrations con `supabase link` + `supabase db push`.
- [ ] Confirmar deploy automático en push a `main` y URL pública responde con el H1.

## Verificación end-to-end

Una vez todos los puntos están marcados:

```bash
# Local
pnpm install
supabase start
pnpm db:reset
pnpm test:run          # ✅ Vitest sanity
pnpm test:e2e          # ✅ Playwright smoke
pnpm dev               # ✅ http://localhost:4321 muestra H1

# Remoto
git push origin main
# → GitHub Actions: lint + unit + e2e en verde
# → Vercel deploy: URL pública responde 200 con el H1
```

Si los 5 pasos anteriores funcionan en orden y sin intervención manual: **Iteración 0 cerrada**. Crear nota en el changelog (futuro) y abrir la rama de Iteración 1.

## Decisiones pendientes / pospuestas

- **Self-host de Noto Sans JP**: por ahora desde Google Fonts (CDN). Si en producción medimos latencia, mover a `public/fonts/` con `font-display: swap`.
- **Prototipo Claude Design**: el URL compartido (`https://claude.ai/design/p/...`) devuelve 403 (requiere sesión del autor). Reproducir visuales se basa **solo** en `www.pocoapokemon.jp-DESIGN 2.md` hasta que el prototipo sea accesible. Ver `docs/prototype.md`.
- **Plantilla de PR**: a añadir cuando entremos en Iteración 2 (CRUD real).

## Bloqueos típicos

| Síntoma | Causa probable | Fix |
|---|---|---|
| `supabase start` cuelga | Docker no arrancado o puertos 54321/54322 ocupados | `supabase stop`, reiniciar Docker, reintentar |
| Playwright timeout en `webServer` | Otro proceso en `:4321` | `lsof -i :4321` (Mac/Linux) o `netstat -ano \| findstr :4321` (Windows), matar el PID |
| Vercel build falla con "missing adapter" | Olvidaste `astro add vercel` | Añadirlo + commit `astro.config.mjs` |
| Tests E2E pasan local pero fallan en CI | Falta `playwright install --with-deps` en el workflow | Añadir el step antes de `test:e2e` |
