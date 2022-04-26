<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "@cypress-design/vue-checkbox"

const checked = ref(false)
</script>

<template>
  <div style="width:500px; text-align:center; margin: auto;">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <Checkbox v-model="checked" label="Checkbox" id="Sample" />
    <p v-if="checked">Checked</p>
  </div>
</template>
