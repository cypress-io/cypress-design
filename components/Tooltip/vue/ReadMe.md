# Tooltip

## Install

```bash
npm install @cypress-design/vue-tooltip
```

or with yarn

```bash
yarn add @cypress-design/vue-tooltip
```

## Usage

```ts
import Tooltip from '@cypress-design/vue-tooltip'
```

> tip: To allow focus, one has to add `tabIndex="0"` to the Tooltip element, or put a focusable element (a `<button>` or `<a href>`) in the default slot.

```vue live
<Tooltip class="inline-block" tabIndex="0">
	<span>Focus me</span>
	<template #popper>More info</template>
</Tooltip>
```

## Keyboard and screen readers

Keyboard focus on the trigger opens the tooltip, and Escape closes it. A mouse click doesn't pin it open.

With `interactive`, Tab from the open trigger moves into the tooltip's links and buttons. Shift+Tab from the first one returns to the trigger, and Tab from the last one continues to the next control on the page.

The default slot passes `describedBy`, the id of the tooltip content. Bind it to the trigger so screen readers read the tooltip as its description. When the Tooltip has a `tabIndex`, it sets `aria-describedby` on itself.

```vue
<Tooltip interactive>
  <template #default="{ describedBy }">
    <button type="button" :aria-describedby="describedBy">Plan limits</button>
  </template>
  <template #popper>
    Usage resets every month. <a href="/pricing">Learn more</a>
  </template>
</Tooltip>
```
