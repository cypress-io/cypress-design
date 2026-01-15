# Textbox

## Install

The textbox component is contained in the `@cypress-design/vue-textbox` package. You'll also want to install `@cypress-design/constants-textbox` to get proper types for TypeScript.

```bash
npm install @cypress-design/vue-textbox @cypress-design/constants-textbox
```

or with yarn

```bash
yarn add @cypress-design/vue-textbox @cypress-design/constants-textbox
```

## Usage

```ts
import Textbox from '@cypress-design/vue-textbox'
```

```vue
<script lang="ts" setup>
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <Textbox :icon-left="IconShapeLightningBolt" placeholder="Search..." />
</template>
```

## Possible variants

The Textbox component supports four variants: `default`, `valid`, `invalid`, and `warning`. Each variant has different visual styling to indicate the input state.

### Placeholders

All variants with placeholder text:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-white p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox variant="default" placeholder="Default placeholder" />
      <Textbox variant="valid" placeholder="Valid placeholder" />
      <Textbox variant="invalid" placeholder="Invalid placeholder" />
      <Textbox variant="warning" placeholder="Warning placeholder" />
    </div>
  </div>
</template>
```

### Types

All variants with values:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-white p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox variant="default" value="Default" />
      <Textbox variant="valid" value="Valid" />
      <Textbox variant="invalid" value="Invalid" />
      <Textbox variant="warning" value="Warning" />
    </div>
  </div>
</template>
```

### Dark mode

All variants in dark mode with placeholders:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" variant="default" placeholder="Default" />
      <Textbox theme="dark" variant="valid" placeholder="Valid" />
      <Textbox theme="dark" variant="invalid" placeholder="Invalid" />
      <Textbox theme="dark" variant="warning" placeholder="Warning" />
    </div>
  </div>
</template>
```

All variants in dark mode with values:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" variant="default" value="Default" />
      <Textbox theme="dark" variant="valid" value="Valid" />
      <Textbox theme="dark" variant="invalid" value="Invalid" />
      <Textbox theme="dark" variant="warning" value="Warning" />
    </div>
  </div>
</template>
```

## Sizes

The Textbox supports three sizes: `32`, `40` (default), and `48`.

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-white p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox size="32" value="Size 32" />
      <Textbox size="40" value="Size 40" />
      <Textbox size="48" value="Size 48" />
    </div>
  </div>
</template>
```

Dark mode:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" size="32" value="Size 32" />
      <Textbox theme="dark" size="40" value="Size 40" />
      <Textbox theme="dark" size="48" value="Size 48" />
    </div>
  </div>
</template>
```

## Rounded

The Textbox supports a `rounded` prop to toggle between rounded and square corners. Shown here with size 40px:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-white p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox size="40" :rounded="false" value="Not rounded" />
      <Textbox size="40" :rounded="true" value="Rounded" />
    </div>
  </div>
</template>
```

Dark mode:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" size="40" :rounded="false" value="Not rounded" />
      <Textbox theme="dark" size="40" :rounded="true" value="Rounded" />
    </div>
  </div>
</template>
```

## Options

The Textbox supports various combinations of optional elements. All sizes with labels on the left and right:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
</script>

<template>
  <div class="bg-white p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox
        :divider="true"
        size="32"
        label-left="Label left"
        label-right="Label right"
        value="Size 32"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        size="40"
        label-left="Label left"
        label-right="Label right"
        value="Size 40"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        variant="valid"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        variant="invalid"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        variant="warning"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :rounded="true"
        :divider="true"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
    </div>
  </div>
</template>
```

Dark mode:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
</script>

<template>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox
        :divider="true"
        theme="dark"
        size="32"
        label-left="Label left"
        label-right="Label right"
        value="Size 32"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        size="40"
        label-left="Label left"
        label-right="Label right"
        value="Size 40"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        variant="valid"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        variant="invalid"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        variant="warning"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :rounded="true"
        theme="dark"
        :divider="true"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
    </div>
  </div>
</template>
```

## Props

(Props section will be auto-generated by vue-docgen-cli)
