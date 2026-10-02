<script setup lang="ts">
import { ref } from 'vue'
import Accordion from '@cypress-design/vue-accordion'

const isOpen = ref(false)
</script>

<template>
  <!-- `onToggle` receives the new open state after each toggle. -->
  <Accordion title="Accordion title" :on-toggle="(open) => (isOpen = open)">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </Accordion>
  <p class="mt-4 text-sm text-gray-700">{{ isOpen ? 'Open' : 'Closed' }}</p>
</template>
