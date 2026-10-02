<script setup lang="ts">
import { ref } from 'vue'
import Select, { type SelectItem } from '@cypress-design/vue-select'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'

const value = ref<string | undefined>()
const tab = ref('all')
const items: SelectItem[] = [
  { type: 'headline', label: 'Recent' },
  {
    value: 'alpha',
    label: 'Default',
    tag: 'New',
    iconLeft: IconShapeLightningBolt,
  },
  { value: 'beta', label: 'Selected', iconLeft: IconShapeLightningBolt },
]
</script>

<template>
  <Select
    v-model="value"
    :items="items"
    placeholder="With header + footer"
    header-title="Header headline"
    :header-tabs="[
      { id: 'all', label: 'All' },
      { id: 'mine', label: 'Mine' },
    ]"
    :header-active-tab="tab"
    searchable
    footer-label="Showing 3 of 12"
    :footer-action="{ label: 'Manage', onClick: () => {} }"
    :max-height="320"
    :min-width="280"
    @header-tab-change="(id: string) => (tab = id)"
  />
</template>
