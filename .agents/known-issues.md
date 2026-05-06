# Known Issues

## Known Issues

### User Experience

### Security & Privacy

### Accessibility & Standards

- **[High] FrameworkTabs missing ARIA tab semantics** — The framework selector tab strip lacks `role="tablist"` on the container and `role="tab"` + `aria-selected` on each button, so screen readers cannot identify the active framework. `docs/src/components/FrameworkTabs.astro:49` _(PR #659, Copilot)_
- **[High] Mobile nav toggle missing aria-expanded** — The hamburger button has no `aria-expanded` or `aria-controls="sidebar"`, so assistive technology cannot report the sidebar open/closed state. `docs/src/layouts/BaseLayout.astro:79` _(PR #659, Copilot)_
- **[High] Off-canvas sidebar reachable via keyboard when hidden** — On mobile the sidebar is translated off-screen but remains in the accessibility tree and tab order; `aria-hidden` / `inert` should be toggled with the open/close state. `docs/src/layouts/BaseLayout.astro:116` _(PR #659, Copilot)_

### Developer Experience

### Code Quality
