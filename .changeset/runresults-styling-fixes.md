---
'@cypress-design/react-runresults': minor
'@cypress-design/vue-runresults': minor
---

RunResults: draw the border as an inset overlay (fixes the 26px height back to 24px, keeps the border visible on stat hover, and renders without Tailwind preflight), keep link text gray with no underline on hover, expose the link `className` to `renderLink` so router links match the default anchor, and add a `bgClassName` prop to override the pill background. The self-healed stat now uses the native 12px `general-sparkle-single` icon. The `constants-runresults` package is now bundled into the React and Vue packages — consumers install a single package.
