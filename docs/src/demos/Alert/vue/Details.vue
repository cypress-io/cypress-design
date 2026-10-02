<script setup lang="ts">
import Alert from '@cypress-design/vue-alert'
</script>

<template>
  <!-- #details renders behind a toggle labelled by detailsTitle. -->
  <Alert details-title="Additional details">
    This is an <code>info</code> message
    <template #body>
      <p>This is the body of the alert.</p>
    </template>
    <template #details>
      <p>This is the details of the alert.</p>
    </template>
  </Alert>
</template>
