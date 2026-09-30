<script lang="ts" setup>
import Alert from '@cypress-design/vue-alert'
</script>

<template>
  <Alert>
    This is an <code>info</code> message
    <template #body>
      <p>This is the body of the alert.</p>
    </template>
  </Alert>
</template>
