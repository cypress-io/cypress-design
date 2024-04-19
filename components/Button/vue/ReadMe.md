# Button

## Install

```bash
npm install @cypress-design/vue-button
```

or with yarn

```bash
yarn add @cypress-design/vue-button
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
  <Button square>
    <IconActionQuestionMarkCircle class="mr-2" fill-color="indigo-400" />
  </Button>
</template>
```

## Possible variants

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
        'bg-gray-1000 text-white': variant === 'outline-dark',
        'bg-white text-gray-900': variant !== 'outline-dark',
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
    </div>
  </div>
</template>
```
