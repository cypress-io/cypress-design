<script setup lang="ts">
import Tooltip from '@cypress-design/vue-tooltip'
</script>

<template>
  <!-- Flips to the opposite side when there isn't room, unless force-placement is set. -->
  <Tooltip placement="right" tabIndex="0" class="inline-block py-2">
    <span>Focus me / right</span>
    <template #popper>Extra information</template>
  </Tooltip>
</template>
