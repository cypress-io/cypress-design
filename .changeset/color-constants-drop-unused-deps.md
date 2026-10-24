---
'@cypress-design/color-constants': patch
---

Drop runtime dependencies the package never imports (`tailwindcss`, `@tailwindcss/container-queries`, `tailwindcss-hocus`, `lodash`, `resolve-pkg`). Installing `@cypress-design/color-constants` no longer pulls them in.
