---
name: iconography
description: Fetch when creating, modifying, or styling icons. Skip for purely structural or text-only changes.
---

# Iconography

- **All line icons use a 2px stroke** ("flat icon" style). Avoid 1px or 1.5px strokes — they read too thin at small sizes.
- Apply this to `strokeWidth="2"` on every `<svg>` line icon. SVGs should use `stroke="currentColor"`, `fill="none"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- Brand logos are exempt — leave them as-is.
