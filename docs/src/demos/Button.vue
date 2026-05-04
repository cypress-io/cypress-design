<script lang="ts" setup>
import Button from '@cypress-design/vue-button'
import { IconActionPlayLarge } from '@cypress-design/vue-icon'
</script>

<template>
  <div class="flex items-center gap-4">
    <Button>Submit Form</Button>
    <Button square>
      <IconActionPlayLarge fill-color="indigo-400" alt="Play" />
    </Button>
  </div>
</template>
