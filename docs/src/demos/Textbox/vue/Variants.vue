<script setup lang="ts">
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="flex flex-col gap-4">
    <Textbox variant="default" placeholder="Default placeholder" />
    <Textbox variant="valid" placeholder="Valid placeholder" />
    <Textbox variant="invalid" placeholder="Invalid placeholder" />
    <Textbox variant="warning" placeholder="Warning placeholder" />
  </div>
</template>
