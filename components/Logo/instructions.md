# Logo — Props, Events & Slots

The Logo package exports three separate components. Import the one you need.

## Install

```bash
yarn add @cypress-design/vue-logo        # Vue
yarn add @cypress-design/react-logo      # React
```

---

## `CypressMark`

The Cypress logomark (icon only, no wordmark).

### Props

| Prop      | Type                                         | Default     | Description                 |
| --------- | -------------------------------------------- | ----------- | --------------------------- |
| `variant` | `"default" \| "color-dark" \| "color-white"` | `"default"` | Which color asset to render |

---

## `CypressLockUp`

The full Cypress logo (icon + wordmark).

### Props

| Prop      | Type                                                    | Default     | Description                 |
| --------- | ------------------------------------------------------- | ----------- | --------------------------- |
| `variant` | `"default" \| "color-dark" \| "color-white" \| "white"` | `"default"` | Which color asset to render |

---

## `CypressWatermark`

A faded, decorative version of `CypressMark` used as a background element.

### Props

| Prop   | Type      | Default                          | Description                                                                                                                              |
| ------ | --------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `dark` | `boolean` | `false` (Vue) / required (React) | Renders a dark watermark (gray at 40% opacity) for light surfaces. When `false`, renders a translucent white watermark for dark surfaces |

---

All three components render an `<svg>` sized from the asset's `viewBox`. Extra attributes such as `class`/`className`, `width`, and `height` are passed through to it.

---

## Events

_None._

## Slots

_None._
