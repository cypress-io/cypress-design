<script lang="ts" setup>
import { WindiColor } from '@cypress-design/vue-icon'
const emit = defineEmits<{
  (event: 'update:modelValue', value: WindiColor): void
}>()

defineProps<{
  modelValue?: WindiColor
}>()

function emitValue(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value as WindiColor)
}
</script>

<template>
  <div class="relative">
    <select
      class="absolute opacity-0 left-0 right-0 top-0 bottom-0 cursor-pointer"
      @change="emitValue"
    >
      <option value="indigo-500">indigo</option>
      <option value="jade-500">jade</option>
      <option value="red-500">red</option>
      <option value="purple-500">purple</option>
      <option value="white">white</option>
      <option value="black">black</option>
    </select>
    <div><slot /></div>
  </div>
</template>
