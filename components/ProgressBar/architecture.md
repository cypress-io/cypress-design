---
name: components/ProgressBar/architecture
description: 'How ProgressBar is built — file layout, the shared view builder, clamping, constants keying, class merging, and the injected shimmer style. Fetch alongside instructions.md when changing ProgressBar; skip when only using it.'
---

# ProgressBar — architecture

For usage, see [instructions.md](https://design.cypress.io/agents/components/ProgressBar/instructions.md).

## File layout

```text
components/ProgressBar/
├── instructions.md        # Consumer-facing usage doc
├── architecture.md        # This file
├── assertions.ts          # Shared Cypress assertions (React + Vue)
├── a11y-assertions.ts     # Shared accessibility assertions
├── constants/src/index.ts # Classes, types, defaults, buildProgressBarView, shimmer style
├── react/ProgressBar.tsx
└── vue/ProgressBar.vue
```

## One view builder, two thin renderers

All logic lives in `buildProgressBarView` in the constants package: defaults, clamping, which fills render, their widths and class lists, and the ARIA values. The React and Vue files only call it, merge each class list with `tailwind-merge`, and render. A behavior change belongs in the builder so both frameworks get it; neither component file should grow its own conditionals.

A single `value` is treated as a one-item segment list, so single and stacked bars share one code path.

## Clamping

Segments are clamped cumulatively: each one takes at most what's left of `max`, so the fills never overflow, and anything past `max` is dropped. Non-finite and negative values count as `0`. Fills with a clamped amount of `0` don't render, so they leave no stray gap. `aria-valuenow` is the clamped total.

## Constants keying

- `CssSizeClasses`, keyed by `'6' | '8' | '12'`: the track height, as literal `[Npx]` values, for the cypress-services root font-size reason described in SpecResults' architecture.md.
- `CssTrackClasses`, keyed by theme: the track background.
- `CssFillColorClasses`, nested by theme and then color: the fill background. `ProgressBarColor` is derived from its light keys, so adding a preset means adding it to both themes.

All Tailwind classes live in constants, not the component files, which keeps them out of the ESLint arbitrary-value rule that covers `react/` and `vue/`.

## Class merging and overrides

Each fill's class list is ordered static → preset color → last-fill rounding → shimmer → caller's class, and merged with `twMerge`, so a caller's `bg-*` replaces the preset instead of fighting it in the cascade. The track does the same with `className` (React) or `class` (Vue). The Vue component sets `inheritAttrs: false` and binds the attributes itself for this reason: Vue's own fallthrough would append `class` without merging. It runs `class` through `normalizeClass` first, since twMerge drops object and array syntax, and reads `$attrs` in the template rather than in a computed: attrs aren't reactive, but the template re-renders whenever they change, including attributes added after mount.

Only the last visible fill gets `rounded-r-full`. The track's `rounded-full` plus `overflow-hidden` rounds the start, so the joins between segments stay square.

## Shimmer

The active shimmer is a gradient plus a `@keyframes` rule. `@cypress-design/css` has no keyframe for it, so `ensureActiveStyle` injects one global `<style id="cy-progress-bar-active-style">` the first time an active fill renders: from `useInsertionEffect` in React, so render stays pure, and from a `watchEffect` in Vue. The id check means a page with both the React and Vue packages injects it once. The rule sets only `background-image`, never `background-color`, so it layers over any fill color, including custom ones. It's turned off under `prefers-reduced-motion: reduce`, and Percy freezes animations globally (`.percy.yml`).

Fill widths are inline `style` widths, since they're computed at runtime; that's the one inline style in the component.
