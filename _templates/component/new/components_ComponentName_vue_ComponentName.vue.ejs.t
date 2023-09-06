---
to: components/<%= h.inflection.camelize(name, false) %>/vue/<%= h.inflection.camelize(name, false) %>.vue
---
<template>
  <div :id="id" class="bg-jade-100">
    <label>{{ label }}</label>
    Template for <%= h.inflection.camelize(name, false) %>
    <p>{{ SharedSettings.foo }}</p>
  </div>
</template>

<script lang="ts" setup>
import { SharedSettings } from '@cypress-design/constants-<%= name.toLowerCase() %>'

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
