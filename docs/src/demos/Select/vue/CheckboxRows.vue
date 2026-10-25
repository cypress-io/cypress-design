<script setup lang="ts">
import { ref } from 'vue'
import Select, { type SelectItem } from '@cypress-design/vue-select'

// Checkbox rows are still single-select: clicking the checked row clears it.
const value = ref<string | undefined>()
const items: SelectItem[] = [
  {
    type: 'checkbox',
    value: 'a',
    label: 'Option A',
    subText: 'Secondary text',
  },
  {
    type: 'checkbox',
    value: 'b',
    label: 'Option B',
    subText: 'Secondary text',
  },
  {
    type: 'checkbox',
    value: 'c',
    label: 'Option C',
    subText: 'Secondary text',
  },
]
</script>

<template>
  <Select
    v-model="value"
    :items="items"
    placeholder="Checkbox rows"
    :min-width="240"
  />
</template>
