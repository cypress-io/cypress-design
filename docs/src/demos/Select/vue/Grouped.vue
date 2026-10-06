<script setup lang="ts">
import { ref } from 'vue'
import Select, { type SelectItem } from '@cypress-design/vue-select'
import {
  IconShapeLightningBolt,
  IconObjectGear,
} from '@cypress-design/vue-icon'

const value = ref<string | undefined>()
const items: SelectItem[] = [
  { type: 'headline', label: 'Recent' },
  {
    value: 'alpha',
    label: 'Default',
    tag: 'New',
    iconLeft: IconShapeLightningBolt,
  },
  { value: 'beta', label: 'Selected', iconLeft: IconShapeLightningBolt },
  { type: 'divider' },
  { type: 'headline', label: 'All content types' },
  {
    value: 'delta',
    label: 'With icon right',
    iconLeft: IconShapeLightningBolt,
    iconRight: IconObjectGear,
  },
  {
    value: 'epsilon',
    label: 'Disabled',
    disabled: true,
    iconLeft: IconShapeLightningBolt,
  },
]
</script>

<template>
  <Select
    v-model="value"
    :items="items"
    placeholder="Groups + tag + disabled"
    :min-width="240"
  />
</template>
