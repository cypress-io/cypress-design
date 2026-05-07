---
name: typography
description: Fetch when setting font family, size, weight, line-height, or letter-spacing. Skip for layout-only or color-only changes.
---

# Typography

> **TODO**: type tokens not yet published. Until they are, follow these interim rules.

- Use the type scale exposed by Tailwind defaults via `@cypress-design/tailwindcss`.
- Body copy: `text-base` (16px) on light surfaces; `text-sm` (14px) only for dense UI.
- Headings: prefer the existing `<h1>`–`<h4>` styles in `docs/`; do not introduce new sizes.
- Line-height stays on the 4px grid (`leading-5`, `leading-6`, `leading-7` — see [spacing.md](./spacing.md)).
- Never set `font-family` inline — the global stack is set on `:root`.
