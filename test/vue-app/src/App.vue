<script setup lang="ts">
import { ref } from 'vue'
import Checkbox from '@cypress-design/vue-checkbox'
import Icon, { IconObjectBookCode } from '@cypress-design/vue-icon'
import Spinner from '@cypress-design/vue-spinner/sfc'

const checked = ref(false)
</script>

<template>
  <div style="width: 500px; text-align: center; margin: auto">
    <Checkbox v-model="checked" label="Checkbox" id="Sample" />
    <p v-if="checked">Checked</p>
    <IconObjectBookCode size="48" :strokeColor="checked ? 'indigo-600' : 'red-300'" fillColor="indigo-300" />
    <Icon name="object-book" strokeColor="jade-500" size="24" />
    <Spinner />
  </div>
</template>
