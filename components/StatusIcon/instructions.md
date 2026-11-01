---
name: components/StatusIcon/instructions
description: 'StatusIcon API — run/spec/group/test-result status indicator: props, events, slots, and how to choose a status, color, and variant. Fetch when using, reviewing, or referencing StatusIcon in a Vue or React project.'
---

# StatusIcon — Props, Events & Slots

Also install `@cypress-design/constants-statusicon` alongside the framework package ([React](https://design.cypress.io/agents/components/StatusIcon/react/ReadMe.md), [Vue](https://design.cypress.io/agents/components/StatusIcon/vue/ReadMe.md)). The `status`, `size` and `variant` prop types come from it, so TypeScript can't check those props without it. Both framework packages re-export the status union as the `StatusType` type. React also exports `StatusIconProps`.

Vue has no default export: `import { StatusIcon } from '@cypress-design/vue-statusicon'`. React has both a default and a named `StatusIcon` export.

## Props

| Prop      | Type                                                                                                                                                                                                  | Default     | Description                                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`  | `"running" \| "failing" \| "passed" \| "failed" \| "unclaimed" \| "placeholder" \| "cancelled" \| "noTests" \| "errored" \| "timedOut" \| "overLimit" \| "skipped" \| "pending" \| null \| undefined` | `undefined` | Status to represent. `null`/`undefined` renders the `placeholder` icon. In Vue the type doesn't include `null`, and the default is `"placeholder"`. |
| `variant` | `"simple" \| "outline" \| "solid"`                                                                                                                                                                    | `"simple"`  | Visual style of the icon. Every variant renders an icon for every status; where a status has no artwork in that style, another style's is used.     |
| `size`    | `"4" \| "8" \| "12" \| "16" \| "24"`                                                                                                                                                                  | `"24"`      | Icon canvas size in px. At `4`, `8` and `12` every variant uses the same artwork, so `variant` has no visible effect at those sizes.                |

The tree-shakable `SolidStatusIcon`, `OutlineStatusIcon` and `SimpleStatusIcon` take the same `size` and `status` props with the same defaults. In Vue, a `size`/`status` pair with no icon asset (an unknown status or a size outside the list) renders nothing instead of throwing.

Other SVG attributes (`aria-*`, `data-*`, …) reach the `<svg>`: React spreads its remaining SVG props onto it and appends `className` to the component's classes; Vue passes them through as fallthrough attributes.

## Events

_None._

## Slots

_None._

## Choosing a status

| Status        | Color token                    | Use                               |
| ------------- | ------------------------------ | --------------------------------- |
| `running`     | `indigo-400` (fill `gray-100`) | Runs, specs, groups, test results |
| `failing`     | `red-400` (fill `gray-100`)    | Runs, specs, groups, test results |
| `passed`      | `jade-400`                     | Runs, specs, groups, test results |
| `failed`      | `red-400`                      | Runs, specs, groups, test results |
| `unclaimed`   | `gray-100`                     | Specs                             |
| `placeholder` | `gray-300`                     | Placeholder                       |
| `cancelled`   | `gray-300`                     | Runs, specs, groups, test results |
| `noTests`     | `orange-400`                   | Runs, specs, groups               |
| `errored`     | `orange-400`                   | Runs, specs, groups, test results |
| `timedOut`    | `orange-400`                   | Runs, specs, groups, test results |
| `overLimit`   | `orange-400`                   | Runs, specs, groups               |
| `skipped`     | `gray-400`                     | Test results                      |
| `pending`     | `gray-300`                     | Test results                      |

- Pick a status whose `use` covers the object you're showing (Run, Spec, Group, or Test result) — e.g. `skipped` and `pending` are test-result-only, `unclaimed` is spec-only, `noTests` and `overLimit` don't apply to test results.
- `running` and `failing` are in-progress states (`failing` = at least one failure so far); their icons animate via SVG `<animate>` at every size. At `4`, `8` and `12`, `failing` uses the `running` artwork, so only color (red vs indigo) tells them apart; the failing X appears only at `16` and `24`.
- The queued state is `status="unclaimed"` (its icon assets are named `cyStatusQueued*`). `"queued"` isn't a valid value.
- `noTests`, `errored`, `timedOut` and `overLimit` share one color and one icon at every size; the icon alone doesn't distinguish them, so show the cause in text.
- There is no `flaky` status. For a flaky indicator use `IconStatusFlaky` from `@cypress-design/react-icon` / `@cypress-design/vue-icon` (see [Icon](https://design.cypress.io/agents/components/Icon/instructions.md)).

**Color reservations:** `indigo` = running/in-progress, `red` = failed/failing, `jade` = passed, `orange` = the errored/timedOut/overLimit/noTests family, `gray` shades = neutral/inactive states (`unclaimed`, `placeholder`, `cancelled`, `skipped`, `pending`). Don't show a status in a hue outside this mapping; see [colors.md](https://design.cypress.io/agents/colors.md).

## Accessibility

- StatusIcon renders a bare `<svg>` with no `<title>`, `role`, or `aria-label`, so it has no accessible name. Always pair it with visible text naming the status; when that text is adjacent, hide the icon with `aria-hidden="true"`.
- Status is conveyed by color and shape only, and several statuses share an icon (see above) — never use the icon as the sole indicator.
- The `running` and `failing` animations are SVG `<animate>` loops that don't respond to `prefers-reduced-motion`.
