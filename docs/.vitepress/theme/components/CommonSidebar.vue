<script lang="ts" setup>
import DocMenu from '@cypress-design/vue-docmenu'

defineProps<{
  items: any[]
}>()
</script>

<template>
  <DocMenu :group="{ items }" />
</template>
