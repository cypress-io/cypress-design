# Tooltip

## Summary

Use the tooltip component to display a message when the user hovers over an element.
For accessibility, it also triggers on focus.

To allow focus, one has to add `tabIndex="0"` to the Tooltip element.

```vue
<script setup>
import Tooltip from '@cypress-design/vue-tooltip'
</script>
<template>
  <Tooltip tabIndex="0">
    <span>Focus me</span>
    <template #popper> </template>
  </Tooltip>
</template>
```

## install

```bash
npm install @cypress-design/vue-tooltip
```

or with yarn

```bash
yarn add @cypress-design/vue-tooltip
```
