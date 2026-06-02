<script lang="ts" setup>
import { ref } from 'vue'
import Select, { SelectOptionList } from '@cypress-design/vue-select'
import { IconUserGeneralSolid } from '@cypress-design/vue-icon'

// Bind values for the interactive trigger demos at the bottom.
const v1 = ref<string | undefined>()
const v2 = ref<string | undefined>('beta')
const v3 = ref<string | undefined>()
const v4 = ref<string | undefined>()
const v5 = ref<string | undefined>()
const v6 = ref<string | undefined>('u2')
const v7 = ref<string | undefined>()
const v8 = ref<string | undefined>()
const tab = ref('all')

// Items for the expanded preview grid.
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
    onClick: () => {},
  },
]

const long = Array.from({ length: 24 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i + 1}`,
}))

// `panelClass` is appended to the popover root after the default classes.
// `!static !mt-0 !z-auto` overrides the absolute positioning so the panels
// flow inline for this preview grid. Real usage doesn't need this — the
// trigger-based examples below use the default absolute popover.
const PREVIEW_PANEL = '!static !mt-0 !z-auto'

// Tracked selected values for the preview panels (read-only is fine; the
// `value` prop highlights the corresponding row without managing state).
const previewSelected = 'beta'
const previewSelectedUser = 'u2'
const previewSelectedCheckbox = 'b'
</script>

<template>
  <!-- Expanded panels — see every content type at a glance, no clicks. -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Expanded panels — content types
  </p>
  <div class="bg-white p-4 rounded mb-2">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          default
        </p>
        <SelectOptionList
          :items="simple"
          :value="previewSelected"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          headline · divider · tag · disabled
        </p>
        <SelectOptionList
          :items="withGroups"
          :value="previewSelected"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          checkbox rows
        </p>
        <SelectOptionList
          :items="checkboxItems"
          :value="previewSelectedCheckbox"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          user rows
        </p>
        <SelectOptionList
          :items="userItems"
          :value="previewSelectedUser"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          button row (action)
        </p>
        <SelectOptionList :items="withButton" :panel-class="PREVIEW_PANEL" />
      </div>
      <div class="col-span-2">
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          header (title · tabs · search) + footer
        </p>
        <SelectOptionList
          :items="withGroups"
          :value="previewSelected"
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
          :panel-class="PREVIEW_PANEL"
          @header-tab-change="(id: string) => (tab = id)"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          size 40
        </p>
        <SelectOptionList
          :items="simple"
          size="40"
          :value="previewSelected"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          size 40 — groups
        </p>
        <SelectOptionList
          :items="withGroups"
          size="40"
          :value="previewSelected"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          size 40 — checkbox rows
        </p>
        <SelectOptionList
          :items="checkboxItems"
          size="40"
          :value="previewSelectedCheckbox"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          size 40 — user rows
        </p>
        <SelectOptionList
          :items="userItems"
          size="40"
          :value="previewSelectedUser"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
    </div>
  </div>

  <!-- Dark expanded preview -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Expanded panels — dark mode
  </p>
  <div class="bg-gray-1000 p-4 rounded mb-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-600 mb-1">
          default
        </p>
        <SelectOptionList
          theme="dark"
          :items="simple"
          :value="previewSelected"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-600 mb-1">
          groups
        </p>
        <SelectOptionList
          theme="dark"
          :items="withGroups"
          :value="previewSelected"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-600 mb-1">
          checkbox rows
        </p>
        <SelectOptionList
          theme="dark"
          :items="checkboxItems"
          :value="previewSelectedCheckbox"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-gray-600 mb-1">
          user rows
        </p>
        <SelectOptionList
          theme="dark"
          :items="userItems"
          :value="previewSelectedUser"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div class="col-span-2">
        <p class="text-[11px] uppercase tracking-wide text-gray-600 mb-1">
          header + footer
        </p>
        <SelectOptionList
          theme="dark"
          :items="withGroups"
          :value="previewSelected"
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
          :panel-class="PREVIEW_PANEL"
          @header-tab-change="(id: string) => (tab = id)"
        />
      </div>
    </div>
  </div>

  <!-- Interactive triggers below — confirm the popover-anchored behavior. -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Interactive triggers
  </p>
  <div class="bg-white p-4 rounded mb-4">
    <div class="flex gap-6 flex-wrap items-start">
      <Select v-model="v1" :items="simple" placeholder="Pick one" />
      <Select v-model="v2" :items="simple" placeholder="Pre-selected" />
      <Select :items="simple" placeholder="Disabled" disabled />
      <Select :items="simple" size="32" placeholder="Size 32" />
      <Select :items="simple" size="40" placeholder="Size 40" />
      <Select
        v-model="v3"
        :items="withGroups"
        placeholder="Groups + tag + disabled"
        :min-width="240"
      />
      <Select
        v-model="v4"
        :items="checkboxItems"
        placeholder="Checkbox rows"
        :min-width="240"
      />
      <Select
        v-model="v6"
        :items="userItems"
        placeholder="Assignee"
        :min-width="280"
      />
      <Select
        v-model="v5"
        :items="withButton"
        placeholder="Items + action"
        :min-width="240"
      />
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

  <!-- Dark interactive triggers -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Dark mode — interactive triggers
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
    </div>
  </div>
</template>
