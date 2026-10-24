# Spinner

## Install

```bash
npm install @cypress-design/vue-spinner
```

or with yarn

```bash
yarn add @cypress-design/vue-spinner
```

## Usage

```ts
import Spinner from '@cypress-design/vue-spinner'
```

You can either use the default spinner and import the styles manually.

```vue live
<script setup>
import Spinner from '@cypress-design/vue-spinner'
import '@cypress-design/vue-spinner/style.css'
</script>

<template>
  <div class="flex h-[20vh] flex-col items-center justify-center gap-[12px]">
    <Spinner />
    <h2 class="text-size-16px leading-[24px] text-gray-700">
      Initializing something really important...
    </h2>
  </div>
</template>
```

...or directly import the Spinner SFC and use it as a component.

- Note the `/sfc` at the end of import line

```vue live
<script setup>
import Spinner from '@cypress-design/vue-spinner/sfc'
</script>

<template>
  <div class="flex h-[20vh] flex-col items-center justify-center gap-[12px]">
    <Spinner />
    <h2 class="text-size-16px leading-[24px] text-gray-700">
      Initializing something really important...
    </h2>
  </div>
</template>
```
