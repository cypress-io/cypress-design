<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@cypress-design/vue-modal'
import Button from '@cypress-design/vue-button'

const visible = ref(false)
</script>

<template>
  <!-- The `footer` slot renders below the body, separated by a full-width divider. -->
  <Modal v-model:show="visible" title="Delete project?" size="sm">
    This removes the project and its recorded runs. You can't undo this.
    <template #footer>
      <div class="flex gap-3">
        <Button variant="red-dark" @click="visible = false">Delete</Button>
        <Button variant="white" @click="visible = false">Cancel</Button>
      </div>
    </template>
  </Modal>
  <Button @click="visible = true">Open modal</Button>
</template>
