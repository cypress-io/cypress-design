---
'@cypress-design/css': minor
---

Add brand font system with Tailwind utilities and CSS custom property tokens.

**New Tailwind font utilities**

| Class | Font |
| --- | --- |
| `font-brand-heading` | Poppins |
| `font-brand` | Roboto |
| `font-brand-mono` | Roboto Mono |
| `font-system` | System sans-serif stack |
| `font-system-mono` | System monospace stack |
| `font-mono` | System monospace stack (alias for `font-system-mono`) |

Load the brand fonts via Google Fonts before using them:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Roboto:ital,wght@0,400;0,500;0,700;1,400&family=Roboto+Mono:wght@400;500;600;700&display=swap"
/>
```

**New CSS custom property tokens** (`tokens.css`)

Font stacks are now published as CSS variables alongside color tokens:

```css
--cy-font-brand-heading: Poppins, sans-serif;
--cy-font-brand: Roboto, sans-serif;
--cy-font-brand-mono: "Roboto Mono", monospace;
--cy-font-system: ui-sans-serif, system-ui, ...;
--cy-font-system-mono: ui-monospace, SFMono-Regular, ...;
--cy-font-mono: ui-monospace, SFMono-Regular, ...;
```

**`font-mono` published alongside `font-system-mono`**

`font-mono` is a convenience alias for `font-system-mono` — both resolve to the same system monospace stack and are published as `--cy-font-mono` / `--cy-font-system-mono` CSS tokens.
