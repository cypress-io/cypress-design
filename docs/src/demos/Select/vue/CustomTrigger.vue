<script setup lang="ts">
import { ref } from 'vue'
import Select from '@cypress-design/vue-select'
import Button from '@cypress-design/vue-button'
import {
  IconActionAddSmall,
  IconShapeLightningBolt,
} from '@cypress-design/vue-icon'

const value = ref<string | undefined>()
const items = [
  { value: 'alpha', label: 'Alpha', iconLeft: IconShapeLightningBolt },
  { value: 'beta', label: 'Beta', iconLeft: IconShapeLightningBolt },
  { value: 'gamma', label: 'Gamma', iconLeft: IconShapeLightningBolt },
]
</script>

<template>
  <Select v-model="value" :items="items" :min-width="200">
    <!-- The slot owns the trigger; call toggle() to open the popover. -->
    <template #trigger="{ open, toggle }">
      <Button :aria-expanded="open" @click="toggle">
        <IconActionAddSmall size="16" :interactive-colors-on-group="true" />
        Add new
      </Button>
    </template>
  </Select>
</template>
