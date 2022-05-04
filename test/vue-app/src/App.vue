<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "@cypress-design/vue-checkbox"
import Icon from "@cypress-design/vue-icon"

const checked = ref(false)
</script>

<template>
  <div style="width:500px; text-align:center; margin: auto;">
    <Checkbox v-model="checked" label="Checkbox" id="Sample" />
    <p v-if="checked">Checked</p>
    <Icon iconId="book" darkColor="amber-500" size="24" />
  </div>
</template>
