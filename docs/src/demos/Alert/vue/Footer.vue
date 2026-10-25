<script setup lang="ts">
import Alert from '@cypress-design/vue-alert'
import Button from '@cypress-design/vue-button'
</script>

<template>
  <Alert variant="clear">
    Angular component testing is available for this project
    <template #body>
      You can now use Cypress to develop and test individual components without
      running your whole application.
    </template>
    <template #footer>
      <div class="flex flex-wrap gap-4 p-4">
        <Button variant="outline-indigo" size="32">Quick setup</Button>
        <Button variant="link" size="32">Read our guides</Button>
      </div>
    </template>
  </Alert>
</template>
