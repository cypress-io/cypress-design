<script lang="ts" setup>
import { ref } from 'vue'
import Modal from '@cypress-design/vue-modal'
import Button from '@cypress-design/vue-button'

const visible = ref(false)
</script>

<template>
  <Modal v-model:show="visible" title="Modal Title">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis hic
    ad minima ex recusandae autem incidunt, perferendis, illo voluptatum
    repudiandae iste voluptate reiciendis quam officiis voluptas laboriosam
    eligendi explicabo!
  </Modal>
  <Button @click="visible = true">Open Modal</Button>
</template>
