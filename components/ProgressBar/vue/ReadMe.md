# ProgressBar

## Install

```bash
npm install @cypress-design/vue-progressbar
```

or with yarn

```bash
yarn add @cypress-design/vue-progressbar
```

## Usage

```ts
import ProgressBar from '@cypress-design/vue-progressbar'
```

```vue live
<script lang="ts" setup>
import ProgressBar from '@cypress-design/vue-progressbar'
</script>

<template>
  <ProgressBar :value="36" aria-label="Included tests used" />
</template>
```

Stack several values in one bar with `segments`:

```vue live
<script lang="ts" setup>
import ProgressBar from '@cypress-design/vue-progressbar'
</script>

<template>
  <ProgressBar
    :max="412"
    aria-label="Test runs by mode"
    :segments="[
      { value: 233, label: 'Open mode' },
      { value: 179, label: 'Run mode', color: 'teal' },
    ]"
  />
</template>
```
