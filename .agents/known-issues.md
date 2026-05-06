# Known Issues

## User Experience

- **[Medium] Clipboard false-positive Copied overlay** — The copy-to-clipboard handler was not awaiting `navigator.clipboard.writeText()`, so the "Copied" overlay could show even when the write failed or clipboard was unavailable. Fixed in `2d35a4a4`. `docs/src/pages/colors/components/ColorPalette.astro:148` _(PR #660, Copilot)_

## Security & Privacy

## Accessibility & Standards

## Developer Experience

- **[High] acceptance-criteria.md publicly routable** — File lived under `src/pages/` so Astro exposed it as `/colors/acceptance-criteria`. Moved to `.agents/` in `2d35a4a4`. `docs/src/pages/colors/acceptance-criteria.md:4` _(PR #660, Copilot)_
- **[Low] palette-data.json duplicates canonical token values** — Hex values in `palette-data.json` are duplicated from `@cypress-design/css` (color-constants.ts / colors.css), creating drift risk if tokens change. Consider sourcing from the package or generating at build time. `docs/src/pages/colors/palette-data.json:6` _(PR #660, Copilot)_

## Code Quality
