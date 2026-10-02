<script setup lang="ts">
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="flex flex-col gap-4">
    <Textbox :rounded="false" value="Not rounded" />
    <Textbox rounded value="Rounded" />
  </div>
</template>
