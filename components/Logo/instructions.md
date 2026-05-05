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

| Prop   | Type      | Default | Description                                          |
| ------ | --------- | ------- | ---------------------------------------------------- |
| `dark` | `boolean` | `false` | Use dark-background tint instead of light-background |

---

## Events

_None._

## Slots

_None._
