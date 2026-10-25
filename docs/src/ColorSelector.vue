<script lang="ts" setup>
const emit = defineEmits<{
  (event: 'update:modelValue', value?: string): void
}>()

defineProps<{
  modelValue?: string
  label: string
}>()

function emitValue(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  if (value === 'default') {
    emit('update:modelValue', undefined)
  } else {
    emit('update:modelValue', value)
  }
}
</script>

<template>
  <div class="relative h-[20px] leading-[20px]">
    <select
      :aria-label="label"
      class="absolute bottom-0 left-0 right-0 top-0 cursor-pointer opacity-0"
      @change="emitValue"
    >
      <option></option>
      <option value="default">default</option>
      <option value="transparent">transparent</option>
      <option value="indigo-300">indigo</option>
      <option value="jade-300">jade</option>
      <option value="red-300">red</option>
      <option value="purple-300">purple</option>
      <option value="white">white</option>
      <option value="gray-1000">black</option>
    </select>
    <div class="whitespace-nowrap">
      <slot /><span
        class="ml-1 inline-block h-2 w-2"
        :class="`bg-${modelValue}`"
      >
      </span>
    </div>
  </div>
</template>
