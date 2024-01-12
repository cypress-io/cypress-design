<template>
  <div :id="id" class="bg-jade-100">
    <label>{{ label }}</label>
    Template for SpecListTestItem
    <p>{{ SharedSettings.foo }}</p>
  </div>
</template>

<script lang="ts" setup>
import { SharedSettings } from '@cypress-design/constants-speclisttestitem'

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
