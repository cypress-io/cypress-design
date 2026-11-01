---
name: components/Tabs/instructions
description: 'Tabs API — tab bar: props, events, and slots. Fetch when using, reviewing, or referencing Tabs in a Vue or React project.'
---

# Tabs — Props, Events & Slots

Install and import commands: [React ReadMe](https://design.cypress.io/agents/components/Tabs/react/ReadMe.md) and [Vue ReadMe](https://design.cypress.io/agents/components/Tabs/vue/ReadMe.md).

The `Tab` type and `SwitchEvent` class are not re-exported by either framework package; import them from `@cypress-design/constants-tabs`. That package is a runtime dependency of `@cypress-design/react-tabs` and `@cypress-design/vue-tabs`, so the import resolves when it is hoisted but fails under pnpm (strict) or Yarn Plug'n'Play. If you import from it, add `@cypress-design/constants-tabs` to your own `dependencies`.

## Props

| Prop        | Type                                                                                                                          | Default     | Description                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `tabs`      | `Tab[]`                                                                                                                       | required    | Array of tab descriptor objects                                                                  |
| `activeId`  | `string`                                                                                                                      | —           | ID of the active tab. Not fully controlled; always pass it — see below.                          |
| `variant`   | `"default" \| "indigo-light" \| "dark-small" \| "dark-large" \| "underline-small" \| "underline-center" \| "underline-large"` | `"default"` | Tab strip visual style                                                                           |
| `onSwitch`  | `(tab: Tab, evt: SwitchEvent) => void`                                                                                        | —           | **React only.** Called before the active tab changes. Call `evt.preventDefault()` to cancel.     |
| `renderTab` | `(tab: Tab) => ReactNode`                                                                                                     | —           | **React only.** Replaces each tab's content (icons, label, tag) inside the `role="tab"` element. |

Without `activeId`, the active tab falls back to the first tab with the deprecated `active: true`. With neither, no tab is active and every tab gets `tabindex="-1"`, so keyboard users can't reach the tab bar.

`activeId` is not fully controlled. Tabs copies it into internal state and only resyncs when the prop value changes. A click or arrow key switches the visible tab even if the parent never updates `activeId`, and the parent's value goes stale. Keep them in sync:

- React: set your state from `onSwitch` (`onSwitch={(tab) => setActiveId(tab.id)}`).
- Vue: use `v-model:active-id`.
- To block a switch, call `evt.preventDefault()` in `onSwitch` (React) or the `switch` handler (Vue). Not updating `activeId` does not block it.

React: `className` and any other `<div>` props go on the `role="tablist"` wrapper. Vue: `class` and other non-prop attributes fall through to the same wrapper.

### `Tab` shape

Exported from `@cypress-design/constants-tabs`.

```ts
interface Tab {
  id: string
  label: string
  'aria-controls': string // id of the associated tab panel (required)
  href?: string // renders an <a>; see "Links" below
  icon?: Component // icon before the label
  iconBefore?: Component // icon before the label; overrides `icon`
  iconAfter?: Component // icon after the label
  tag?: string // small badge text rendered after the label
  active?: boolean // deprecated: use the `activeId` prop
  [key: `data-${string}`]: any // passed through to the tab element
}
```

Icons are framework components (a React component in React, a Vue component in Vue).

### Links

A tab with `href` renders as `<a href>`. Tabs only intercepts the `click` event: a plain or Shift click is `preventDefault`ed and switches tabs instead of navigating. Ctrl/Cmd-click, middle-click, and the context menu behave like a normal link (for example, open in a new tab) and do not switch tabs or fire `switch`. To navigate on switch, do it in your `switch` handler.

## Events

| Event             | Payload                        | Description                                                                                                                                                  |
| ----------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `switch`          | `(tab: Tab, evt: SwitchEvent)` | Emitted before the active tab changes. Call `evt.preventDefault()` to cancel. React: use the `onSwitch` prop.                                                |
| `update:activeId` | `string`                       | **Vue only.** Emitted with the new active tab id after a switch by click or arrow key. Not emitted when `switch` is cancelled. Supports `v-model:active-id`. |

```vue
<Tabs
  @switch="(tab: Tab, evt: SwitchEvent) => {
    // your code here
  }"
/>
```

## Slots

**Vue only.** A scoped `tab` slot replaces each tab's content (icons, label, tag) inside the `role="tab"` element. Its props are the `Tab` fields (`id`, `label`, `href`, `tag`, `icon`, `iconBefore`, `iconAfter`, plus any other keys on the tab). Compare `id` with your `activeId` (bound with `v-model:active-id` so it stays current) to style the active tab. React uses the `renderTab` prop instead.

Tab panels are not rendered by Tabs; the consumer renders them and links them via `aria-controls`.

## Accessibility

- Renders `role="tablist"` with one `role="tab"` element (`<button>`, or `<a>` when `href` is set) per tab; the tab's `id` is the `Tab.id`, and the active tab has `aria-selected="true"`.
- Only the active tab is in the tab order; inactive tabs get `tabindex="-1"`. Pass `activeId` so one tab is always focusable.
- Keyboard: ArrowLeft / ArrowRight (on `keyup`) move to the previous / next tab, wrapping at the ends, and focus it. Home / End are not supported.
- The consumer must render each panel with `role="tabpanel"`, an `id` matching the tab's `aria-controls`, and `aria-labelledby` set to the tab's `id`.
- The tablist has no accessible name; add `aria-label` (or `aria-labelledby`) to `Tabs` when the page has more than one tab bar or the purpose isn't obvious.

## Stacking

The tab list is positioned with `z-index: 1` and forms its own stacking context, so the layers inside it never rise above the rest of the page. To place an overlay, dropdown, or sticky header over `Tabs`, give it `z-10` or higher. Don't wrap `Tabs` in a `relative z-0` element: the underline variants' active marker overhangs the bottom edge by 1.5px, and content positioned right after the wrapper would cover it.
