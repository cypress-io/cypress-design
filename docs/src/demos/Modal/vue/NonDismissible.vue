<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@cypress-design/vue-modal'
import Button from '@cypress-design/vue-button'

const visible = ref(false)
</script>

<template>
  <!--
    `close-on-backdrop-click` and `close-on-escape` set to false keep a stray
    click or Escape from discarding the user's input. The close button still
    closes the modal.
  -->
  <Modal
    v-model:show="visible"
    title="Send feedback"
    :close-on-backdrop-click="false"
    :close-on-escape="false"
  >
    Only the close button closes this modal.
  </Modal>
  <Button @click="visible = true">Open modal</Button>
</template>
