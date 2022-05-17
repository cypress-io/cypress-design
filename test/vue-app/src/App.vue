<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "@cypress-design/vue-checkbox"
import Icon, { IconObjectBookCode } from "@cypress-design/vue-icon"

const checked = ref(false)
</script>

<template>
  <div style="width:500px; text-align:center; margin: auto;">
    <Checkbox v-model="checked" label="Checkbox" id="Sample" />
    <p v-if="checked">Checked</p>
    <IconObjectBookCode size="48" fillColor="jade-300" strokeColor="jade-500" />
    <Icon name="object-book" strokeColor="jade-600" size="24" />
  </div>
</template>
