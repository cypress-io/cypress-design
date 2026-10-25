<script setup lang="ts">
import { ref } from 'vue'
import Checkbox from '@cypress-design/vue-checkbox'

const option1 = ref(false)
const option2 = ref(false)
</script>

<template>
  <Checkbox v-model="option1" label="Option #1" name="example" />
  <Checkbox v-model="option2" label="Option #2" name="example" />
</template>
