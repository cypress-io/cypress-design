# Spinner

## Summary

Spinner/loader branded to cypress colors.

## install

```bash
npm install @cypress-design/vue-spinner
```

or with yarn

```bash
yarn add @cypress-design/vue-spinner
```

## Usage

```vue
<script setup>
import Spinner from '@cypress-design/vue-spinner';
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-12px h-100vh">
    <Spinner />
    <h2 class="text-gray-700 text-size-16px leading-24px">
      Initializing something really important...
    </h2>
  </div>
</template>
```
