# Icon

## Install

```bash
npm install @cypress-design/vue-icon
```

or with yarn

```bash
yarn add @cypress-design/vue-icon
```

## Usage

```ts
import Icon from '@cypress-design/vue-icon'
```

### Import

2 methods exist to load this component:

Use named imports of each icon you plan on using.
I **recommend** this method because:

- It's tree shakable: Only the icons you use will end up in your bundle
- You get TS validation of color props: if a color is not available, squigles will appear in your editor

```vue live
<script setup>
import { IconObjectBookCode } from '@cypress-design/vue-icon'
</script>

<template>
  <IconObjectBookCode />
</template>
```

Import the default `Icon` component and pass the name of the icon. It can be useful but you should avoid it in production unless you know what you are doing.

It has advantages:

- Allows for quick browsing of the available icons right in the template
- Allows passing ids around and delegating color and size until the implementation.

But drawbacks too:

- it prevents tree shaking.
- It uses TypeScript to check sizes and colors but with a twist:
  - If the size of the icon is not available for the icon selected and is available for another, the error will appear on the icon component instead of on the size prop.

```vue live
<script setup>
import Icon from '@cypress-design/vue-icon'
</script>

<template>
  <Icon name="object-book-code" />
</template>
```

### Colors

Should you need to change the color of the icon on `hover` or `focus` prefix the props with these words.

Here, the `strokeColor` will change on hover from indigo to jade

```vue live
<script setup>
import { IconObjectBook } from '@cypress-design/vue-icon'
</script>

<template>
  <button class="flex items-center gap-[8px]">
    <IconObjectBook
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

```vue live
<script setup>
import { IconObjectBook } from '@cypress-design/vue-icon'
</script>

<template>
  <button class="group hover:text-jade-800 flex items-center gap-[8px]">
    <IconObjectBook
      size="16"
      strokeColor="blue-600"
      hoverStrokeColor="jade-600"
      interactiveColorsOnGroup
    />Read
  </button>
</template>
```
