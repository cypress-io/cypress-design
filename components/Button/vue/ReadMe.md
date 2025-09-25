# Button

## Install

The button component is contained in the `@cypress-design/react-button` package. You'll also want to install `@cypress-design/constants-button` to get proper types for TypeScript.

```bash
npm install @cypress-design/vue-button @cypress-design/constants-button
```

or with yarn

```bash
yarn add @cypress-design/vue-button @cypress-design/constants-button
```

## Usage

```ts
import Button from '@cypress-design/vue-button'
```

```vue live
<script lang="ts" setup>
import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'
</script>

<template>
  <Button>
    <IconActionQuestionMarkCircle class="mr-2" fill-color="indigo-400" />
    Button
  </Button>
</template>
```

Square buttons

```vue live
<script lang="ts" setup>
import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'
</script>

<template>
  <div class="flex gap-4 items-center">
    <Button v-for="size of [20, 24, 32, 40, 48]" :size="`${size}`" square>
      <IconActionQuestionMarkCircle
        fill-color="indigo-400"
        :style="{ width: `${size / 2}px`, height: `${size / 2}px` }"
      />
    </Button>
  </div>
</template>
```

## Possible variants

Variants and their available sizes plus styles when `disabled` is set to `true` (represented as 🚫).

```vue live
<script lang="ts" setup>
import {
  default as Button,
  VariantClassesTable,
  SizeClassesTable,
} from '@cypress-design/vue-button'
</script>

<template>
  <div class="flex flex-wrap justify-stretch gap-[8px]">
    <div
      v-for="(_, variant) in VariantClassesTable"
      class="p-[8px] py-[12px] flex flex-col items-center gap-[16px] rounded min-w-[180px]"
      :class="{
        'bg-gray-1000 text-white':
          variant === 'outline-dark' ||
          variant === 'outline-red-dark-mode' ||
          variant === 'outline-jade-dark-mode' ||
          variant === 'outline-indigo-dark-mode' ||
          variant === 'outline-purple-dark-mode' ||
          variant === 'red-dark-mode' ||
          variant === 'indigo-dark-mode' ||
          variant === 'disabled-dark-mode',
        'bg-white text-gray-900': ![
          'outline-dark',
          'outline-red-dark-mode',
          'outline-jade-dark-mode',
          'outline-indigo-dark-mode',
          'outline-purple-dark-mode',
          'red-dark-mode',
          'indigo-dark-mode',
          'disabled-dark-mode',
        ].includes(variant),
      }"
    >
      {{ variant }}
      <div
        class="flex gap-[8px] items-center"
        v-for="(_, size) in SizeClassesTable"
      >
        {{ size }}
        <Button :variant="variant" :size="size"> Button </Button>
      </div>
      <div class="flex gap-[8px] items-center">
        🚫
        <Button :variant="variant" :size="48" disabled="true"> Button </Button>
      </div>
    </div>
  </div>
</template>
```
