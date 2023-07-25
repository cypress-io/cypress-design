# Modal

## Install

```bash
npm install @cypress-design/vue-modal
```

or with yarn

```bash
yarn add @cypress-design/vue-modal
```

```vue live
<script lang="ts" setup>
import { ref } from 'vue'
import Button from '@cypress-design/vue-button'
const visible = ref(false)
</script>

<template>
  <Modal v-model:show="visible" title="Modal Title">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis hic
    ad minima ex recusandae autem incidunt, perferendis, illo voluptatum
    repudiandae iste voluptate reiciendis quam officiis voluptas laboriosam
    eligendi explicabo!
  </Modal>
  <Button @click="visible = true">Open Modal</Button>
</template>
```
