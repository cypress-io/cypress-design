# Icon

## Summary

Use the `<icon>` component to display an icon from the cypress figma library.

### Usage

2 methods exist to load this component:

The recommended:

- Tree shakable
- Complete proper TS validation of all props inline
- No auto-importation of the component in the template

```vue
<script setup>
import { IconBookCode } from @cypress-design/vue-icon
</script>
<template>
  <IconBookCode />
</template>
```

The simplest:

- Allows for quick browsing of the available icons right in the template
- Allows passing ids around and delegating color and size until the implementation.
- it prevents tree shaking.
- It use TypeScript to validate sizes and colors but with a twist:
  - If the size of the icon is not available for the icon selected and is available for another, the error will appear on the icon component instead of on the size prop.

```vue
<script setup>
import Icon from @cypress-design/vue-icon
</script>
<template>
  <Icon name="book-code" />
</template>
```

## install

```bash
npm install @cypress-design/vue-icon
```

or with yarn

```bash
yarn add @cypress-design/vue-icon
```
