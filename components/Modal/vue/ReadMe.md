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

## Size, footer and dismissal

`size` sets a fixed width, the `footer` slot adds a bar below the body, and `close-on-backdrop-click` / `close-on-escape` keep a stray click or Escape from discarding a form. The close button always closes the modal.

```vue live
<script lang="ts" setup>
import { ref } from 'vue'
import Button from '@cypress-design/vue-button'
const visible = ref(false)
</script>

<template>
  <Modal
    v-model:show="visible"
    title="Send feedback"
    size="md"
    :close-on-backdrop-click="false"
    :close-on-escape="false"
  >
    Tell us what we could do better.
    <template #footer>
      <div class="flex gap-3">
        <Button @click="visible = false">Send</Button>
        <Button variant="white" @click="visible = false">Cancel</Button>
      </div>
    </template>
  </Modal>
  <Button @click="visible = true">Open Modal</Button>
</template>
```
