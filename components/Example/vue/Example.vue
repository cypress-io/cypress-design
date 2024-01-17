<template>
  <div :id="id" class="bg-jade-100">
    <label>{{ label }}</label>
    Template for Example
    <p>{{ SharedSettings.foo }}</p>
  </div>
</template>

<script lang="ts" setup>
import { SharedSettings } from '@cypress-design/constants-example'

withDefaults(
  defineProps<{
    id: string
    label?: string
  }>(),
  {
    label: undefined,
  },
)
</script>
