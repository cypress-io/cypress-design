---
name: components/ProgressBar/instructions
description: 'ProgressBar API — a fully rounded horizontal bar showing one value or several stacked segments against a max: props, sizes, colors, the animated active state, theming, and accessibility. Fetch when using, reviewing, or referencing ProgressBar in a Vue or React project.'
---

# ProgressBar — usage

## What it is

A horizontal bar that fills to show how much of a total is done or used: upload progress, plan usage ("3,600 of 10,000"), or a breakdown of one total into parts ("Open mode 233, Run mode 179"). Both ends of the track are fully rounded, and the bar fills the width of its container.

Use [SpecResults](https://design.cypress.io/agents/components/SpecResults/instructions.md) for a run's spec status breakdown instead. Use [Spinner](https://design.cypress.io/agents/components/Spinner/instructions.md) when there's no value to show at all.

```tsx
<ProgressBar value={36} aria-label="Included tests used" />

<ProgressBar
  max={412}
  aria-label="Test runs by mode"
  segments={[
    { value: 233, label: 'Open mode' },
    { value: 179, label: 'Run mode', color: 'teal' },
  ]}
/>
```

## Props

All props are optional. Vue takes the same names in kebab-case (`fill-class-name`, `value-text`).

- **`value`** — `number`, default `0`. How much is filled, from `0` to `max`. Ignored when `segments` is non-empty.
- **`max`** — `number`, default `100`. The total. A `max` of `0` or less falls back to `100`.
- **`segments`** — `ProgressBarSegment[]`. Stacked fills, drawn left to right with a 2px gap between them. Each segment takes:
  - `value` (`number`, required): its amount, in the same units as `max`.
  - `color` (`ProgressBarColor`): a preset. Defaults to the bar's `color`.
  - `className` (`string`): extra classes for this fill, merged last.
  - `label` (`string`): its name in the default `aria-valuetext`. Label every segment or none.
  - `active` (`boolean`): animates this segment only. Defaults to the bar's `active`.
- **`size`** — `'6' | '8' | '12'`, default `'6'`. Height in px.
- **`color`** — `ProgressBarColor`, default `'indigo'`. Preset fill color (see below).
- **`theme`** — `'light' | 'dark'`, default `'light'`. Use `'dark'` on dark surfaces. The component doesn't follow the system color scheme.
- **`active`** — `boolean`, default `false`. Animates the fill with a shimmer to show the work is still going (see States).
- **`fillClassName`** — `string`. Extra classes for the fill, merged last with `tailwind-merge`, so a `bg-*` class here replaces the preset color. Single-value bars only; give each segment its own `className` instead.
- **`valueText`** — `string`. Overrides what screen readers announce for the value (sets `aria-valuetext`).

Other attributes (`aria-label`, `aria-labelledby`, `id`, `data-*`, event handlers) go to the root `<div>`.

- **React** — `className` is merged onto the track with `tailwind-merge`, so a `bg-*` class recolors the track. The `ProgressBarProps`, `ProgressBarSegment`, `ProgressBarColor`, `ProgressBarSize`, and `ProgressBarTheme` types are exported.
- **Vue** — `class` is merged the same way, in any form Vue accepts (string, object, or array). The same types are exported.

## Colors

| `color`        | Light fill   | Dark fill    | Typical use                                |
| -------------- | ------------ | ------------ | ------------------------------------------ |
| `indigo`       | `indigo-500` | `indigo-400` | Default. Progress and usage                |
| `indigo-light` | `indigo-300` | `indigo-300` | A secondary share next to `indigo`         |
| `purple`       | `purple-500` | `purple-400` | A third share in a usage breakdown         |
| `teal`         | `teal-400`   | `teal-300`   | A second share, e.g. Run mode vs Open mode |
| `jade`         | `jade-500`   | `jade-300`   | Passed or healthy                          |
| `red`          | `red-400`    | `red-300`    | Failed or over limit                       |
| `orange`       | `orange-500` | `orange-400` | Errored or close to limit                  |
| `gray`         | `gray-600`   | `gray-500`   | Skipped or inactive                        |

The track is `gray-50` on light and `gray-900` on dark. For a color outside the presets, pass a design-token class (`fillClassName="bg-teal-600"`), never a hex value. Status colors keep the meanings in [colors.md](https://design.cypress.io/agents/colors.md): don't use `red` or `jade` for a share that isn't a failure or a pass.

## States

- **Default** — static fill.
- **Active** — `active` adds a light shimmer that sweeps across the fill, the same one SpecResults uses for running specs. Use it while the value is still changing (an upload, a running job), and turn it off when the work stops. The shimmer doesn't run for users with `prefers-reduced-motion: reduce`.
- **Empty** — `value` is `0`, or every segment is `0`: only the track shows.

Width changes animate over 500ms, so updating `value` moves the fill smoothly.

## Accessibility

- The root has `role="progressbar"` with `aria-valuemin="0"`, `aria-valuemax` set to `max`, and `aria-valuenow` set to the filled total (the sum of the segments, capped at `max`).
- **Always name the bar** with `aria-label` or `aria-labelledby`. The component renders no text, and a progressbar without a name fails Cypress Accessibility.
- When every segment has a `label`, `aria-valuetext` defaults to each label and its value ("Open mode 233, Run mode 179"), using the same capped amounts the bar draws. If any segment has no label, the default is left off so screen readers read the numeric value instead. Pass `valueText` (or `aria-valuetext`) when another phrasing reads better ("3,600 of 10,000 used"); `valueText` wins if both are set.
- Color alone can't carry meaning. Show the numbers in text next to the bar, the way the usage legends do. Every preset fill holds 3:1 against its track except `indigo-light` (2.1:1 on light), which needs that text beside it. Check a custom `fillClassName` color against the track yourself.

## Known limitations

- No indeterminate mode: a bar always shows a value. Use `active` with your best estimate, or a Spinner when there's none.
- No built-in label, value text, or legend. Render those yourself next to the bar.
- The 2px gaps between segments add to the fills rather than coming out of them. Below 100%, a bar with `n` segments ends `2px × (n - 1)` past its value. At 100%, the overflow shrinks every fill in proportion to its width. Either way, segment edges are a few pixels off their exact share.
