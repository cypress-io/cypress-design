<script lang="ts" setup>
import Tooltip from '@cypress-design/vue-tooltip'
</script>

<template>
  <Tooltip tabIndex="0" class="inline-block py-2">
    <span>Focus me / light</span>
    <template #popper>Extra information</template>
  </Tooltip>
  <br />
  <Tooltip color="dark" tabIndex="0" class="inline-block py-2">
    <span>Focus me / dark</span>
    <template #popper>Extra information</template>
  </Tooltip>
</template>
