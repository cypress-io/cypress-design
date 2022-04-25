---
to: components/<%= h.inflection.camelize(name, false) %>/vue/<%= h.inflection.camelize(name, false) %>.vue
---
<template>
  <div :id="id">
    <label>{{ label }}</label>
    Template for <%= h.inflection.camelize(name, false) %>
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
