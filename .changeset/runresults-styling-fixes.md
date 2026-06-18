---
'@cypress-design/react-runresults': minor
'@cypress-design/vue-runresults': minor
---

RunResults: draw the border as an inset `::after` overlay (fixes the 26px height back to 24px, keeps the border visible on stat hover, and renders without Tailwind preflight), keep link text gray with no underline on hover, and expose the link `className` to `renderLink` so router links match the default anchor. `className` applies to the root wrapper (DS convention); a new `pillClassName` applies to the `<ul>` and is merged via `tailwind-merge`, so a consumer can override the pill background (e.g. `bg-gray-900` / `bg-transparent`) and win the Tailwind source-order conflict. The self-healed stat now uses the native 12px `general-sparkle-single` icon. The `constants-runresults` package is bundled into the React and Vue packages — consumers install a single package.
