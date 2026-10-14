<script setup lang="ts">
import Tooltip from '@cypress-design/vue-tooltip'
</script>

<template>
  <Tooltip color="dark" tabIndex="0" class="inline-block py-2">
    <span>Focus me / dark</span>
    <template #popper>Extra information</template>
  </Tooltip>
</template>
