---
'@cypress-design/react-runresults': minor
'@cypress-design/vue-runresults': minor
---

RunResults: draw the border as an inset `::after` overlay (fixes the 26px height back to 24px, keeps the border visible on stat hover, and renders without Tailwind preflight), keep link text gray with no underline on hover, and expose the link `className` to `renderLink` so router links match the default anchor. The pill `<ul>` is now the root element (the vestigial wrapper `<div>` is gone), and `className` lands on it merged via `tailwind-merge` — so a consumer can override the pill background (e.g. `bg-gray-900` / `bg-transparent`) and win the Tailwind source-order conflict. The self-healed stat now uses the native 12px `general-sparkle-single` icon. The `constants-runresults` package is bundled into the React and Vue packages — consumers install a single package.
