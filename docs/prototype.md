# Prototipo visual (Claude Design)

## Estado

⚠️ **Pendiente de acceso.** El URL compartido (`https://claude.ai/design/p/dd2936fc-6eb7-4b8f-848d-6e51ff39417e?file=Pokopia+Planner.html`) responde **403 Forbidden** desde herramientas externas — la URL solo funciona en una sesión autenticada de Claude.

Hasta que el prototipo sea accesible, **la fuente única de verdad visual** es `www.pocoapokemon.jp-DESIGN 2.md` (paleta, tipografía, componentes, espaciado) complementado con el PDF `daily-planner-en.pdf` para layout de cada sección.

## Cómo desbloquear

Cualquiera de estas opciones permite que la app se alinee con el prototipo:

1. **Exportar el HTML** desde Claude Design (botón "Download" o copy-paste) y commitearlo en `docs/prototype/pokopia-planner.html`.
2. **Publicar como `claude.site/...`** (share pública) y pegar el nuevo URL aquí — esos sí son accesibles sin sesión.
3. **Capturas de pantalla** anotadas en `docs/prototype/screens/*.png` con los componentes clave (header, daily planner, journal, modal de fecha…). Suficiente para alinear sin tener el código.

## Uso del prototipo (cuando esté disponible)

Cuando el HTML esté commiteado o las screens accesibles:

1. Comparar componente a componente contra `src/components/ui/*.astro`. Si hay desviación, **el prototipo gana** sobre las heurísticas que se hayan tomado del design system.
2. Si el prototipo introduce un componente nuevo no listado en el design system, añadirlo a `www.pocoapokemon.jp-DESIGN 2.md` con su token y especificación — esa es la fuente que vive a largo plazo.
3. Anotar diferencias intencionales (por ejemplo "el prototipo usa rounded-full en avatars; el design.md no lo especifica") en este mismo archivo bajo § "Desviaciones".

## Desviaciones (registrar conforme se descubran)

_Vacío por ahora._
