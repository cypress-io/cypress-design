---
to: components/<%= h.capitalize(name) %>/vue/<%= h.capitalize(name) %>.vue
---
<template>
  <div :id="id">
    <label>{{ label }}</label>
    Template for <%= h.capitalize(name) %>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    id: string;
    label?: string;
  }>(),
  {
    label: undefined,
  }
);
</script>
