<script setup lang="ts">
import { ref } from 'vue'
import Alert from '@cypress-design/vue-alert'

const dismissed = ref(false)
</script>

<template>
  <!-- The alert hides itself; use @dismiss to update the rest of the page. -->
  <Alert dismissible @dismiss="dismissed = true">This is an info message</Alert>
  <p v-if="dismissed">Alert dismissed</p>
</template>
