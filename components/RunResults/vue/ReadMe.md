# RunResults

## Install

The RunResults component is contained in the `@cypress-design/vue-runresults` package — a single package per framework (types and class constants are bundled in; there is no separate `constants-runresults` to install).

```bash
npm install @cypress-design/vue-runresults
```

or with yarn

```bash
yarn add @cypress-design/vue-runresults
```

## Usage

```ts
import RunResults from '@cypress-design/vue-runresults'
```

```vue live
<script lang="ts" setup>
import RunResults from '@cypress-design/vue-runresults'
</script>

<template>
  <RunResults :passed="120" :failed="3" :skipped="2" :pending="1" :flaky="4" />
</template>
```

Override the pill background (e.g. to blend into a colored surface) with `pillClassName` — it is merged via `tailwind-merge`, so it wins over the theme background:

```vue live
<script lang="ts" setup>
import RunResults from '@cypress-design/vue-runresults'
</script>

<template>
  <div class="bg-gray-900 p-4 rounded">
    <RunResults
      theme="dark"
      pill-class-name="bg-gray-900"
      :passed="120"
      :failed="3"
      :skipped="2"
      :pending="1"
      :flaky="4"
    />
  </div>
</template>
```
