<script lang="ts" setup>
import { ref } from 'vue'
import Select from '@cypress-design/vue-select'
import { IconUserGeneralSolid } from '@cypress-design/vue-icon'

const v1 = ref<string | undefined>()
const v2 = ref<string | undefined>('beta')
const v3 = ref<string | undefined>()
const v4 = ref<string | undefined>()
const v5 = ref<string | undefined>()
const v6 = ref<string | undefined>('u2')
const v7 = ref<string | undefined>()
const v8 = ref<string | undefined>()
const tab = ref('all')

const simple = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
  { value: 'gamma', label: 'Gamma' },
]

const withGroups = [
  { type: 'headline' as const, label: 'Recent' },
  { value: 'alpha', label: 'Alpha', tag: 'New' },
  { value: 'beta', label: 'Beta' },
  { type: 'divider' as const },
  { type: 'headline' as const, label: 'All' },
  { value: 'gamma', label: 'Gamma' },
  { value: 'delta', label: 'Delta' },
  { value: 'epsilon', label: 'Epsilon', disabled: true },
]

const checkboxItems = [
  {
    type: 'checkbox' as const,
    value: 'a',
    label: 'Option A',
    subText: 'Secondary text',
  },
  {
    type: 'checkbox' as const,
    value: 'b',
    label: 'Option B',
    subText: 'Secondary text',
  },
  {
    type: 'checkbox' as const,
    value: 'c',
    label: 'Option C',
    subText: 'Secondary text',
  },
]

const userItems = [
  {
    type: 'user' as const,
    value: 'u1',
    label: 'Maya Patel',
    secondary: 'maya@example.com',
    iconLeft: IconUserGeneralSolid,
  },
  {
    type: 'user' as const,
    value: 'u2',
    label: 'Jordan Lee',
    secondary: 'jordan@example.com — Enterprise SSO',
    iconLeft: IconUserGeneralSolid,
  },
  {
    type: 'user' as const,
    value: 'u3',
    label: 'Sam Rivera',
    secondary: 'sam@example.com',
    iconLeft: IconUserGeneralSolid,
  },
]

const withButton = [
  ...simple,
  { type: 'divider' as const },
  {
    type: 'button' as const,
    key: 'add',
    label: '+ Add new',
    onClick: () => alert('Add new clicked'),
  },
]

const long = Array.from({ length: 24 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i + 1}`,
}))
</script>

<template>
  <!-- Default -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Default
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <div class="flex gap-6 flex-wrap">
      <Select v-model="v1" :items="simple" placeholder="Pick one" />
      <Select v-model="v2" :items="simple" placeholder="Pre-selected" />
      <Select :items="simple" placeholder="Disabled" disabled />
    </div>
  </div>

  <!-- Sizes -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Sizes
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <div class="flex gap-6 flex-wrap items-start">
      <Select :items="simple" size="32" placeholder="Size 32" />
      <Select :items="simple" size="40" placeholder="Size 40" />
    </div>
  </div>

  <!-- Content types -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Content types — default · headline · divider · disabled · tag
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <Select
      v-model="v3"
      :items="withGroups"
      placeholder="Groups + tag + disabled"
      :min-width="240"
    />
  </div>

  <!-- Checkbox row content type -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Content type — checkbox rows
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <Select
      v-model="v4"
      :items="checkboxItems"
      placeholder="Checkbox rows"
      :min-width="240"
    />
  </div>

  <!-- User rows -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Content type — user rows
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <Select
      v-model="v6"
      :items="userItems"
      placeholder="Assignee"
      :min-width="280"
    />
  </div>

  <!-- Button row -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Content type — button row
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <Select
      v-model="v5"
      :items="withButton"
      placeholder="Items + action"
      :min-width="240"
    />
  </div>

  <!-- Header / footer -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Header (title + tabs + search) and footer
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <Select
      v-model="v7"
      :items="withGroups"
      placeholder="With header + footer"
      header-title="Pick a value"
      :header-tabs="[
        { id: 'all', label: 'All' },
        { id: 'mine', label: 'Mine' },
      ]"
      :header-active-tab="tab"
      searchable
      footer-label="Showing 3 of 12"
      :footer-action="{ label: 'Manage', onClick: () => {} }"
      :max-height="320"
      :min-width="280"
      @header-tab-change="(id) => (tab = id)"
    />
  </div>

  <!-- Alignment + sizing -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Alignment (right) + maxHeight (scroll)
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <div class="flex justify-end">
      <Select
        v-model="v8"
        :items="long"
        placeholder="24 items, scroll"
        align="right"
        :max-height="240"
        :min-width="220"
      />
    </div>
  </div>

  <!-- Dark mode -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Dark mode
  </p>
  <div class="bg-gray-1000 p-4 rounded mb-4">
    <div class="flex gap-6 flex-wrap items-start">
      <Select
        theme="dark"
        :items="withGroups"
        placeholder="Dark — groups"
        trigger-variant="outline-dark"
        :min-width="240"
      />
      <Select
        theme="dark"
        :items="userItems"
        placeholder="Dark — users"
        trigger-variant="outline-dark"
        :min-width="280"
      />
      <Select
        theme="dark"
        :items="withGroups"
        placeholder="Dark — header/footer"
        trigger-variant="outline-dark"
        header-title="Pick a value"
        :header-tabs="[
          { id: 'all', label: 'All' },
          { id: 'mine', label: 'Mine' },
        ]"
        :header-active-tab="tab"
        searchable
        footer-label="Showing 3 of 12"
        :footer-action="{ label: 'Manage', onClick: () => {} }"
        :max-height="320"
        :min-width="280"
        @header-tab-change="(id) => (tab = id)"
      />
    </div>
  </div>
</template>
