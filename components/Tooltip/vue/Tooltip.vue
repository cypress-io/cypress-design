<template>
  <div :id="id" class="bg-jade-100" :class="class">
    <label>{{ label }}</label>
    Template for Tooltip
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    id: string;
    label?: string;
    class?: string;
  }>(),
  {
    label: undefined,
    class: undefined,
  }
);
</script>
