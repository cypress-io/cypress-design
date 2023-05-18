<script lang="ts" setup>
defineProps<{
  checked: boolean
}>()
</script>

<template>
  <button><slot /></button>
</template>
