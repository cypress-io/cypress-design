# StatusIcon

## Summary

The icons that get displayed to represent run, spec, group, and test result statuses.

## Install

```bash
npm install @cypress-design/vue-statusicon
```

or with yarn

```bash
yarn add @cypress-design/vue-statusicon
```

## Usage

The simple way of using the StatusIcon component

```vue
<script setup>
import { StatusIcon } from '@cypress-design/vue-statusicon'
</script>

<template>
  <StatusIcon size="16" status="failed" variant="solid" />
</template>
```

The tree-shakable way (more optimized)

```vue
<script setup>
import { SolidStatusIcon } from '@cypress-design/vue-statusicon'
</script>

<template>
  <SolidStatusIcon size="16" status="failed" />
</template>
```
