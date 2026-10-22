<script setup lang="ts">
import Tooltip from '@cypress-design/vue-tooltip'
</script>

<template>
  <!-- Tab from the trigger moves into the link; Escape closes and returns focus. -->
  <Tooltip interactive class="inline-block py-2">
    <template #default="{ describedBy }">
      <button type="button" :aria-describedby="describedBy">
        Focus me / interactive
      </button>
    </template>
    <template #popper>
      Extra information <a href="#" class="text-indigo-500">Learn more</a>
    </template>
  </Tooltip>
</template>
