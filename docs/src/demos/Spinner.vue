<script lang="ts" setup>
import Spinner from '@cypress-design/vue-spinner/sfc'
</script>

<template>
  <div class="bg-gray-50 p-6 mb-4">
    <Spinner />
  </div>
  <div class="bg-gray-1000 p-6">
    <Spinner variant="dark" />
  </div>
</template>
