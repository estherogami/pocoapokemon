# Iteración 0 — Setup

**Objetivo**: dejar el repo en estado "scaffold funcional" — toda la infraestructura instalada y un humo de extremo a extremo verde, sin aún features de producto. **Sin Supabase ni auth** — eso entra en iteraciones futuras (ver `CLAUDE.md` § "Iteraciones").

**Definición de hecho**:
- `pnpm dev` levanta Astro en `:4321` y muestra una página con el texto "Pokopia".
- `pnpm test:run` pasa (al menos un test sanity).
- `pnpm test:e2e` pasa (smoke E2E que carga `/`).
- Push a `main` despliega automáticamente a Vercel y la URL pública responde 200.

## Checklist ordenado

> Marca cada caja conforme avanzas. No saltes pasos — el orden importa.

### 1. Repo y git (ya hecho)

- [x] `git init` ejecutado.
- [x] Remote `origin` apuntando a `https://github.com/estherogami/pocoapokemon.git`.
- [x] `.gitignore` con `node_modules`, `dist`, `.env`, `.astro`, `.vercel`, `coverage`, `test-results`, `playwright-report`.
- [x] Commit inicial de documentación pusheado a `main`.

### 2. Astro scaffold

- [ ] `pnpm create astro@latest .` — elegir **Empty** template, **TypeScript strict**, **no** instalar integraciones aún. Decir "Y" a sobrescribir si pregunta (el repo ya tiene docs — verificar primero qué propone borrar).
- [ ] `pnpm astro add react` — confirma la integración + tsconfig.
- [ ] `pnpm astro add tailwind` — Tailwind 4 con Vite plugin.
- [ ] `pnpm astro add vercel` — adapter de Vercel para SSR.
- [ ] En `astro.config.mjs`: `output: 'server'`, `adapter: vercel()`. Si todo el MVP es estático y no usamos SSR, dejar `output: 'static'` y quitar el adapter de momento (decisión a confirmar al implementar).

### 3. Design tokens en Tailwind

- [ ] Crear `tailwind.config.mjs` con los tokens del design system **+ los extra del prototipo** (ver `docs/prototype.md` § "Sistema visual extendido"):
  - Paleta: `brand-purple`, `purple-dark`, `purple-soft`, `purple-tint`, `bright-blue`, `lime`, `cyan`, `paper`, `beige`, `beige-soft`, `beige-cream`, `brown`, `brown-dark`, `text`, `text-soft`, `error`.
  - `fontFamily.sans`: `['"Noto Sans JP"', 'system-ui', 'sans-serif']`.
  - `fontFamily.hand`: `['"Bradley Hand"', '"Marker Felt"', '"Segoe Script"', 'cursive']` (para diario/notas).
  - `borderRadius`: `friendly: 8px`, `rounded: 12px`, `playful: 15px`, `r2xl: 20px`, `r3xl: 28px`.
  - `boxShadow`: `raised`, `elevated`, `floating`, `lifted` (del design.md) + `paper` (del prototipo: `0 1px 0 rgba(255,255,255,0.6) inset, 0 2px 6px rgba(122,86,64,0.15), 0 12px 24px -12px rgba(122,86,64,0.20)`).
  - `spacing`: extender con `60`, `72`, `80` (si Tailwind no los trae ya).
- [ ] En `src/styles/global.css`: `@import "tailwindcss";` + `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;900&display=swap');` + base layer con `body { font-family: theme(fontFamily.sans); color: theme(colors.text); }`.
- [ ] Importar `global.css` desde `src/layouts/BaseLayout.astro`.

> Referencia exacta: `www.pocoapokemon.jp-DESIGN 2.md` §2-3 (base) y `docs/prototype.md` (extensiones del prototipo) y `docs/prototype/pokopia-planner/project/styles.css` (CSS exacto).

### 4. Página índice mínima

- [ ] Crear `src/layouts/BaseLayout.astro` con `<html lang="es">`, meta básicos, slot.
- [ ] Crear `src/pages/index.astro` que renderice un `<h1>Pokopia Planner</h1>` y un párrafo en Noto Sans JP color `--pk-text`, envuelto en `BaseLayout`.
- [ ] `pnpm dev` → abrir `http://localhost:4321` → ver el H1 con tipografía Noto Sans JP y color `#585858`.

### 5. Vitest

- [ ] `pnpm add -D vitest @vitest/coverage-v8`.
- [ ] Crear `vitest.config.ts` mínimo (`test: { environment: 'node' }`).
- [ ] Crear `src/lib/sanity.test.ts` con un único test: `expect(1 + 1).toBe(2)`.
- [ ] Añadir scripts: `"test": "vitest"`, `"test:run": "vitest run"`.
- [ ] `pnpm test:run` → 1 test verde.

### 6. Playwright

- [ ] `pnpm create playwright@latest --quiet` — elegir TypeScript, carpeta `tests/e2e`, no GitHub Actions (lo añadimos manualmente luego).
- [ ] `pnpm exec playwright install chromium` (local) o `pnpm exec playwright install --with-deps chromium` (CI).
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

### 7. ESLint (opcional pero recomendado)

- [ ] `pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-astro`.
- [ ] Crear `eslint.config.js` con la config recomendada de Astro + TS.
- [ ] Script: `"lint": "eslint src/ tests/"`.
- [ ] `pnpm lint` → sin errores.

### 8. CI con GitHub Actions

- [ ] Crear `.github/workflows/ci.yml` con tres jobs:
  1. **lint**: `pnpm install --frozen-lockfile` + `pnpm lint`.
  2. **unit**: `pnpm install --frozen-lockfile` + `pnpm test:run`.
  3. **e2e**: `pnpm install --frozen-lockfile` + `pnpm exec playwright install --with-deps chromium` + `pnpm test:e2e`.
- [ ] Push y comprobar que los 3 jobs pasan en el primer PR.

### 9. Vercel deploy

- [ ] En Vercel: New Project → import `estherogami/pocoapokemon` → framework auto-detected (Astro) → root `/`.
- [ ] Sin variables de entorno (el MVP no las necesita).
- [ ] Confirmar deploy automático en push a `main` y URL pública responde con el H1.

## Verificación end-to-end

Una vez todos los puntos están marcados:

```bash
# Local
pnpm install
pnpm test:run          # ✅ Vitest sanity
pnpm test:e2e          # ✅ Playwright smoke
pnpm dev               # ✅ http://localhost:4321 muestra H1

# Remoto
git push origin main
# → GitHub Actions: lint + unit + e2e en verde
# → Vercel deploy: URL pública responde 200 con el H1
```

Si los 4 pasos anteriores funcionan en orden y sin intervención manual: **Iteración 0 cerrada**. Crear nota en el changelog (futuro) y abrir la rama de Iteración 1 (design system).

## Decisiones pospuestas

- **Supabase, auth y RLS**: explícitamente fuera de MVP. Entran a partir de Iteración 4 cuando haya un caso de uso multi-user. Hasta entonces los datos viven en `localStorage` del navegador.
- **Self-host de Noto Sans JP**: por ahora desde Google Fonts (CDN). Si en producción medimos latencia, mover a `public/fonts/` con `font-display: swap`.
- **Tema `output: 'server'` vs `'static'`**: decidir en Iteración 1 según si necesitamos dynamic routes para fechas. Si todo se hace client-side (islas leen `localStorage`), `static` basta y simplifica el deploy.

## Bloqueos típicos

| Síntoma | Causa probable | Fix |
|---|---|---|
| `pnpm create astro` se queja de carpeta no vacía | Ya hay docs en el repo | Aceptar la opción de "merge" o crear en subcarpeta temporal y mover archivos |
| Playwright timeout en `webServer` | Otro proceso en `:4321` | `netstat -ano \| findstr :4321` (Windows), matar el PID |
| Vercel build falla con "missing adapter" | Olvidaste `astro add vercel` o el output es `server` sin adapter | Añadir adapter + commit `astro.config.mjs`, o cambiar a `output: 'static'` |
| Tests E2E pasan local pero fallan en CI | Falta `playwright install --with-deps` en el workflow | Añadir el step antes de `test:e2e` |
