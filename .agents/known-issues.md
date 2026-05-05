# Known Issues

## Known Issues

### User Experience

- **[Medium] FrameworkTabs mutates state on no-framework pages** — `initTabs()` calls `applyFw()` even when `.framework-tabs` element is not rendered, clobbering the user's stored framework preference and rewriting the URL unnecessarily. `docs/src/components/FrameworkTabs.astro:81` _(PR #659, Copilot)_

### Security & Privacy

### Accessibility & Standards

### Developer Experience

### Code Quality
