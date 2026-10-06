<script setup lang="ts">
import { h, ref } from 'vue'
import Select, { type SelectItem } from '@cypress-design/vue-select'

const value = ref<string | undefined>()
// `render` draws the row's interior; `label` is what the trigger shows once selected.
const items: SelectItem[] = ['Alpha', 'Beta', 'Gamma'].map((label) => ({
  type: 'custom',
  value: label.toLowerCase(),
  label,
  render: ({ selected }) =>
    h('span', { class: 'flex w-full justify-between gap-4' }, [
      h('span', label),
      h('span', { class: 'text-gray-500' }, selected ? 'Selected' : ''),
    ]),
}))
</script>

<template>
  <Select
    v-model="value"
    :items="items"
    placeholder="Pick one"
    :min-width="200"
  />
</template>
