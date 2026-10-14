<script setup lang="ts">
import { ref } from 'vue'
import Textbox from '@cypress-design/vue-textbox'

const value = ref('')
</script>

<template>
  <Textbox v-model="value" placeholder="Default placeholder" />
</template>
