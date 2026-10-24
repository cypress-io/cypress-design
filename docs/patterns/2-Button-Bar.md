<script lang="ts" setup>
  const components$ = { }
</script>

# Button Bar

## Usage

If you have to make a button bar, you can use the `flex` and `gap` classes to make it look nice.

```vue live
<script setup lang="ts">
import Button from '@cypress-design/vue-button'
</script>

<template>
  <div class="rounded bg-white">
    <div class="p-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
      Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
    </div>
    <div
      class="flex flex-wrap gap-4 overflow-x-hidden border-t border-t-gray-50 p-4"
    >
      <Button variant="outline-indigo" size="32">Primary Action</Button>
      <Button variant="link" size="32">Cancel</Button>
      <div class="md:flex-grow md:grow" />
      <Button variant="link" size="32">Give feedback</Button>
    </div>
  </div>
</template>
```
