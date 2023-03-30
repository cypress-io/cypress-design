# Accordion

## Summary

Collapsible component with a header and a body.

## Install

```bash
npm install @cypress-design/vue-accordion
```

or with yarn

```bash
yarn add @cypress-design/vue-accordion
```

## Usage

```tsx
import Accordion from '@cypress-design/vue-accordion'
```

```vue live
<script lang="ts" setup>
import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'
</script>

<template>
  <Accordion
    :icon="IconActionQuestionMarkCircle"
    title="Accordion Title"
    description="Vestibulum id ligula porta felis euismod semper. Nulla... "
    separator
    open
    fullWidthContent
  >
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio dolore omnis
    nemo minus, sapiente magni ...
  </Accordion>
</template>
```
