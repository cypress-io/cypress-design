<script setup lang="ts">
import Alert from '@cypress-design/vue-alert'
</script>

<template>
  <!-- The default slot is the title; #body holds the content below it. -->
  <Alert>
    This is an <code>info</code> message
    <template #body>
      <p>This is the body of the alert.</p>
    </template>
  </Alert>
</template>
