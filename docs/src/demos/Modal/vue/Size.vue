<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@cypress-design/vue-modal'
import Button from '@cypress-design/vue-button'

const visible = ref(false)
</script>

<template>
  <!-- `size` sets a fixed width: sm (480px), md (592px), lg (720px) or xl (840px). -->
  <Modal v-model:show="visible" title="Modal title" size="md">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis hic
    ad minima ex recusandae autem incidunt, perferendis, illo voluptatum
    repudiandae iste voluptate reiciendis quam officiis voluptas laboriosam
    eligendi explicabo!
  </Modal>
  <Button @click="visible = true">Open modal</Button>
</template>
