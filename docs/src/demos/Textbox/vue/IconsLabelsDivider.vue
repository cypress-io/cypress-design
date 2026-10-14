<script setup lang="ts">
import Textbox from '@cypress-design/vue-textbox'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
</script>

<template>
  <!-- The divider only renders when there is a left icon to separate. -->
  <Textbox
    label-left="Label left"
    label-right="Label right"
    :icon-left="IconShapeLightningBolt"
    :icon-right="IconShapeLightningBolt"
    divider
    value="Size 40"
  />
</template>
