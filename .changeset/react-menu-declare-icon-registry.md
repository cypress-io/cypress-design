---
'@cypress-design/react-menu': patch
---

Declare `@cypress-design/icon-registry` as a dependency. The published `Menu.d.ts` imports its `WindiColor` type, so TypeScript consumers on strict package managers (pnpm) couldn’t resolve the Menu prop types without installing it themselves.
