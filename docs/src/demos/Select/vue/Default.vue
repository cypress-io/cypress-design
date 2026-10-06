<script setup lang="ts">
import { ref } from 'vue'
import Select from '@cypress-design/vue-select'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'

const value = ref<string | undefined>()
const items = [
  { value: 'alpha', label: 'Alpha', iconLeft: IconShapeLightningBolt },
  { value: 'beta', label: 'Beta', iconLeft: IconShapeLightningBolt },
  { value: 'gamma', label: 'Gamma', iconLeft: IconShapeLightningBolt },
]
</script>

<template>
  <Select v-model="value" :items="items" placeholder="Pick one" />
</template>
