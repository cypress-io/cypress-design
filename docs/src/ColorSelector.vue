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
      <option></option>
      <option value="indigo-300">indigo</option>
      <option value="jade-300">jade</option>
      <option value="red-300">red</option>
      <option value="purple-300">purple</option>
      <option value="white">white</option>
      <option value="gray-1000">black</option>
    </select>
    <div>
      <slot /><span
        class="ml-1 w-2 h-2 inline-block"
        :class="`bg-${modelValue}`"
      >
      </span>
    </div>
  </div>
</template>
