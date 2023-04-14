# Button

## Install

```bash
npm install @cypress-design/vue-button
```

or with yarn

```bash
yarn add @cypress-design/vue-button
```

```vue live
<script lang="ts" setup>
import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'
</script>

<template>
  <Button>
    <IconActionQuestionMarkCircle class="mr-2" />
    Button
  </Button>
</template>
```

```vue live
<script lang="ts" setup>
import {
  default as Button,
  VariantClassesTable,
  SizeClassesTable,
} from '@cypress-design/vue-button'
</script>

<template>
  <div class="flex flex-wrap justify-center gap-[16px]">
    <div
      v-for="(_, variant) in VariantClassesTable"
      class="p-[16px] flex flex-col items-center gap-[16px]"
      :class="{ 'bg-gray-900 text-white': variant === 'outline-dark' }"
    >
      <div
        class="flex gap-[8px] items-center"
        v-for="(_, size) in SizeClassesTable"
      >
        {{ size }}
        <Button :variant="variant" :size="size">
          {{ variant }}
        </Button>
      </div>
    </div>
  </div>
</template>
```
