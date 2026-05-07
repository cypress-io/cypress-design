---
name: typography
description: Fetch when setting font family, size, weight, line-height, or letter-spacing. Skip for layout-only or color-only changes.
---

# Typography

## Font families

Brand-heavy properties (marketing, docs, public-facing sites) use Google Fonts to ensure a consistent experience across all devices.

- **Poppins** — headings on marketing, docs, and brand-heavy properties
- **Roboto** — body copy on marketing, docs, and brand-heavy properties
- **Roboto Mono** — code on marketing, docs, and brand-heavy properties
- **System** — body copy for Cypress Cloud & Cypress App
- **System Mono** — code for Cypress Cloud & Cypress App

Never set `font-family` inline — the correct stack is applied by the global context.

## Scale & spacing

> **TODO**: type tokens not yet published. Until they are, follow these interim rules.

- Use the type scale exposed by Tailwind defaults via `@cypress-design/tailwindcss`.
- Body copy: `text-base` (16px) on light surfaces; `text-sm` (14px) only for dense UI.
- Headings: prefer the existing `<h1>`–`<h4>` styles in `docs/`; do not introduce new sizes.
- Line-height stays on the 4px grid (`leading-5`, `leading-6`, `leading-7` — see [spacing.md](./spacing.md)).
