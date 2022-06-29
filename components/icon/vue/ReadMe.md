# Icon

## Summary

Use the `<icon>` component to display an icon from the cypress figma library.

## Usage

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

Should you need to change the color of the icon on `hover` or `focus` prefix the props with these words.

Here, the `strokeColor` will change on hover from indigo to jade

```vue
<script setup>
import { IconBook } from '@cypress-design/vue-icon'
</script>
<template>
  <button>
    <IconBook
      size="16"
      strokeColor="blue-600"
      hoverStrokeColor="jade-600"
    />Read
  </button>
</template>
```

If you need the `hover` or `focus` effect to be triggered on the parent group, use `interactiveColorsOnGroup`.
This prop will change all the pseudo prefixes to be group focused instead of triggered by the icon itself.

To achieve the same goal, in WindiCSS, we would use `group-hover:` instead of `hover:`.

```vue
<script setup>
import { IconBook } from '@cypress-design/vue-icon'
</script>
<template>
  <button class="group hover:text-jade-800">
    <IconBook
      size="16"
      strokeColor="blue-600"
      hoverStrokeColor="jade-600"
      interactiveColorsOnGroup
    />Read
  </button>
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
