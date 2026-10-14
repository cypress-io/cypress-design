<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
</script>

<template>
  <!-- Variants — placeholders -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Variants — placeholder
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <div class="flex flex-col gap-4">
      <Textbox variant="default" placeholder="Default placeholder" />
      <Textbox variant="valid" placeholder="Valid placeholder" />
      <Textbox variant="invalid" placeholder="Invalid placeholder" />
      <Textbox variant="warning" placeholder="Warning placeholder" />
    </div>
  </div>

  <!-- Variants — values -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Variants — value
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <div class="flex flex-col gap-4">
      <Textbox variant="default" value="Default" />
      <Textbox variant="valid" value="Valid" />
      <Textbox variant="invalid" value="Invalid" />
      <Textbox variant="warning" value="Warning" />
      <Textbox disabled value="Disabled" />
    </div>
  </div>

  <!-- Dark mode — placeholders -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Dark mode — placeholder
  </p>
  <div class="bg-gray-1000 p-4 rounded mb-4">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" variant="default" placeholder="Default" />
      <Textbox theme="dark" variant="valid" placeholder="Valid" />
      <Textbox theme="dark" variant="invalid" placeholder="Invalid" />
      <Textbox theme="dark" variant="warning" placeholder="Warning" />
    </div>
  </div>

  <!-- Dark mode — values -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Dark mode — value
  </p>
  <div class="bg-gray-1000 p-4 rounded mb-4">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" variant="default" value="Default" />
      <Textbox theme="dark" variant="valid" value="Valid" />
      <Textbox theme="dark" variant="invalid" value="Invalid" />
      <Textbox theme="dark" variant="warning" value="Warning" />
      <Textbox theme="dark" disabled value="Disabled" />
    </div>
  </div>

  <!-- Sizes -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Sizes
  </p>
  <div class="bg-white p-4 rounded mb-2">
    <div class="flex flex-col gap-4">
      <Textbox size="32" value="Size 32" />
      <Textbox size="40" value="Size 40" />
      <Textbox size="48" value="Size 48" />
    </div>
  </div>
  <div class="bg-gray-1000 p-4 rounded mb-4">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" size="32" value="Size 32" />
      <Textbox theme="dark" size="40" value="Size 40" />
      <Textbox theme="dark" size="48" value="Size 48" />
    </div>
  </div>

  <!-- Rounded -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Rounded
  </p>
  <div class="bg-white p-4 rounded mb-2">
    <div class="flex flex-col gap-4">
      <Textbox size="40" :rounded="false" value="Not rounded" />
      <Textbox size="40" :rounded="true" value="Rounded" />
    </div>
  </div>
  <div class="bg-gray-1000 p-4 rounded mb-4">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" size="40" :rounded="false" value="Not rounded" />
      <Textbox theme="dark" size="40" :rounded="true" value="Rounded" />
    </div>
  </div>

  <!-- Options: icons, labels, divider -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Options — icons · labels · divider
  </p>
  <div class="bg-white p-4 rounded mb-2">
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
      <Textbox
        disabled
        :divider="true"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Disabled"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :rounded="true"
        :divider="true"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Rounded"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
    </div>
  </div>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox
        :divider="true"
        theme="dark"
        size="32"
        label-left="Label left"
        label-right="Label right"
        value="Size 32"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        size="40"
        label-left="Label left"
        label-right="Label right"
        value="Size 40"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
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
        theme="dark"
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
        theme="dark"
        variant="warning"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        disabled
        :divider="true"
        theme="dark"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Disabled"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :rounded="true"
        theme="dark"
        :divider="true"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Rounded"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
    </div>
  </div>
</template>
