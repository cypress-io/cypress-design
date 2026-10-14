<script setup lang="ts">
import Tooltip from '@cypress-design/vue-tooltip'
</script>

<template>
  <!-- tabIndex="0" lets keyboard focus open the tooltip, not only hover. -->
  <Tooltip tabIndex="0" class="inline-block py-2">
    <span>Focus me / light</span>
    <template #popper>Extra information</template>
  </Tooltip>
</template>
