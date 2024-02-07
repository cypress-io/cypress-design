<template>
  <div class="bg-jade-100"></div>
</template>

<script lang="ts" setup>
import { NavMenuProps } from '@cypress-design/constants-menu'

withDefaults(defineProps<NavMenuProps>(), {
  items: () => [],
})
</script>
