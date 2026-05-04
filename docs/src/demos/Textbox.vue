<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
</script>

<template>
  <div class="flex flex-col gap-4">
    <Textbox
      :divider="true"
      size="32"
      label-left="Label left"
      label-right="Label right"
      value="Size 32"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
    <Textbox
      :divider="true"
      size="40"
      label-left="Label left"
      label-right="Label right"
      value="Size 40"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
    <Textbox
      :divider="true"
      size="48"
      label-left="Label left"
      label-right="Label right"
      value="Size 48"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
    <Textbox
      :divider="true"
      variant="valid"
      size="48"
      label-left="Label left"
      label-right="Label right"
      value="Size 48"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
    <Textbox
      :divider="true"
      variant="invalid"
      size="48"
      label-left="Label left"
      label-right="Label right"
      value="Size 48"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
    <Textbox
      :divider="true"
      variant="warning"
      size="48"
      label-left="Label left"
      label-right="Label right"
      value="Size 48"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
  </div>
</template>
