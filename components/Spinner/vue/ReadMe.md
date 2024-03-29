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
import '@cypress-design/vue-spinner/styles.css'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-[12px] h-[20vh]">
    <Spinner />
    <h2 class="text-gray-700 text-size-16px leading-[24px]">
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
  <div class="flex flex-col items-center justify-center gap-[12px] h-[20vh]">
    <Spinner />
    <h2 class="text-gray-700 text-size-16px leading-[24px]">
      Initializing something really important...
    </h2>
  </div>
</template>
```
