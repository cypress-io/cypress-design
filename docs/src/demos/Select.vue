<script lang="ts" setup>
import { ref } from 'vue'
import Select, { SelectOptionList } from '@cypress-design/vue-select'
import Button from '@cypress-design/vue-button'
import {
  IconUserGeneralOutline,
  IconShapeLightningBolt,
  IconActionInfoOutline,
  IconArrowLeft,
  IconObjectGear,
  IconActionAddSmall,
} from '@cypress-design/vue-icon'

// Bind values for the interactive trigger demos at the bottom.
const v1 = ref<string | undefined>()
const v2 = ref<string | undefined>('beta')
const v3 = ref<string | undefined>()
const v4 = ref<string | undefined>()
const v5 = ref<string | undefined>()
const v6 = ref<string | undefined>('u2')
const v7 = ref<string | undefined>()
const v8 = ref<string | undefined>()
const v9 = ref<string | undefined>()
const tab = ref('all')

// Items for the expanded preview grid.
const simple = [
  { value: 'alpha', label: 'Alpha', iconLeft: IconShapeLightningBolt },
  { value: 'beta', label: 'Beta', iconLeft: IconShapeLightningBolt },
  { value: 'gamma', label: 'Gamma', iconLeft: IconShapeLightningBolt },
]

const withGroups = [
  { type: 'headline' as const, label: 'Recent' },
  {
    value: 'alpha',
    label: 'Default',
    tag: 'New',
    iconLeft: IconShapeLightningBolt,
  },
  { value: 'beta', label: 'Selected', iconLeft: IconShapeLightningBolt },
  { type: 'divider' as const },
  { type: 'headline' as const, label: 'All content types' },
  // `iconRight` mirrors `iconLeft`'s state-aware coloring (gray default →
  // indigo on hover/focus/active/selected → muted on disabled).
  {
    value: 'delta',
    label: 'With icon right',
    iconLeft: IconShapeLightningBolt,
    iconRight: IconObjectGear,
  },
  {
    value: 'epsilon',
    label: 'Disabled',
    disabled: true,
    iconLeft: IconShapeLightningBolt,
  },
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
    iconLeft: IconUserGeneralOutline,
  },
  {
    type: 'user' as const,
    value: 'u2',
    label: 'Jordan Lee',
    secondary: 'jordan@example.com — Enterprise SSO',
    iconLeft: IconUserGeneralOutline,
  },
  {
    type: 'user' as const,
    value: 'u3',
    label: 'Sam Rivera',
    secondary: 'sam@example.com',
    iconLeft: IconUserGeneralOutline,
  },
]

// Mixed content: groups + checkbox rows + user rows + button row in a
// single list, separated by dividers. Powers the all-types tile so a
// single panel demonstrates every content type in context.
const withMixedContent = [
  ...withGroups,
  { type: 'divider' as const },
  ...checkboxItems,
  { type: 'divider' as const },
  ...userItems,
  { type: 'divider' as const },
  {
    type: 'button' as const,
    key: 'add',
    label: 'Add new',
    iconLeft: IconActionAddSmall,
    onClick: () => {},
  },
]

const withButton = [
  ...simple,
  { type: 'divider' as const },
  {
    type: 'button' as const,
    key: 'add',
    label: 'Add new',
    iconLeft: IconActionAddSmall,
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

// Interactive state for the mixed-content tile, so clicking a checkbox
// row actually toggles the row's selected/unchecked state. Default rows
// still select normally; checkbox rows toggle off when re-clicked.
const mixedSelected = ref<string | undefined>('beta')
function onMixedSelect(item: { type?: string; value?: string }): void {
  if (item.value === undefined) return
  if (item.type === 'checkbox' && mixedSelected.value === item.value) {
    mixedSelected.value = undefined
  } else {
    mixedSelected.value = item.value
  }
}
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
      <!--
        All content types in one panel: groups, divider, tag, disabled,
        checkbox rows, user rows, button row — plus a custom #footer slot
        (multi-line info) so every content type is visible at once.
        Takes 2 grid columns so it matches the width of the header+footer
        tile below. On narrow screens (2-col grid) it stacks naturally.
      -->
      <div class="col-span-2">
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          all content types + footer
        </p>
        <SelectOptionList
          :items="withMixedContent"
          :value="mixedSelected"
          @select="onMixedSelect"
          :header-button="{
            iconLeft: IconArrowLeft,
            onClick: () => {},
            ariaLabel: 'Go back',
          }"
          :header-icon-left="IconShapeLightningBolt"
          header-title="Header headline"
          header-tag="New"
          :header-tabs="[
            { id: 'all', label: 'All' },
            { id: 'mine', label: 'Mine' },
          ]"
          :header-active-tab="tab"
          searchable
          :search-filters="false"
          :panel-class="PREVIEW_PANEL"
          @header-tab-change="(id: string) => (tab = id)"
        >
          <template #footer>
            <span class="flex items-start gap-[8px]">
              <IconActionInfoOutline
                size="16"
                class="text-gray-600 shrink-0 mt-[2px]"
              />
              <span class="text-[14px] leading-[20px] text-gray-700">
                Selecting
                <span class="font-medium text-gray-900">“All Projects”</span>
                ensures all future projects are assigned to this team.
              </span>
            </span>
          </template>
        </SelectOptionList>
      </div>
      <!-- Size-40 mirrors: same data + props as the size-32 tiles above,
           just with `size="40"` so consumers can compare row heights.
           `md:col-start-1` forces this tile to start on a new grid row so
           it sits next to the size-40 all-content-types tile, not glued to
           the last column of the row above. -->
      <div class="md:col-start-1">
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          default — size 40
        </p>
        <SelectOptionList
          :items="simple"
          size="40"
          :value="previewSelected"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div class="col-span-2">
        <p class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          all content types + footer — size 40
        </p>
        <SelectOptionList
          :items="withMixedContent"
          size="40"
          :value="mixedSelected"
          @select="onMixedSelect"
          :header-button="{
            iconLeft: IconArrowLeft,
            onClick: () => {},
            ariaLabel: 'Go back',
          }"
          :header-icon-left="IconShapeLightningBolt"
          header-title="Header headline"
          header-tag="New"
          :header-tabs="[
            { id: 'all', label: 'All' },
            { id: 'mine', label: 'Mine' },
          ]"
          :header-active-tab="tab"
          searchable
          :search-filters="false"
          :panel-class="PREVIEW_PANEL"
          @header-tab-change="(id: string) => (tab = id)"
        >
          <template #footer>
            <span class="flex items-start gap-[8px]">
              <IconActionInfoOutline
                size="16"
                class="text-gray-600 shrink-0 mt-[2px]"
              />
              <span class="text-[14px] leading-[20px] text-gray-700">
                Selecting
                <span class="font-medium text-gray-900">“All Projects”</span>
                ensures all future projects are assigned to this team.
              </span>
            </span>
          </template>
        </SelectOptionList>
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
      <div class="col-span-2">
        <p class="text-[11px] uppercase tracking-wide text-gray-600 mb-1">
          all content types + footer
        </p>
        <SelectOptionList
          theme="dark"
          :items="withMixedContent"
          :value="mixedSelected"
          @select="onMixedSelect"
          :header-button="{
            iconLeft: IconArrowLeft,
            onClick: () => {},
            ariaLabel: 'Go back',
          }"
          :header-icon-left="IconShapeLightningBolt"
          header-title="Header headline"
          header-tag="New"
          :header-tabs="[
            { id: 'all', label: 'All' },
            { id: 'mine', label: 'Mine' },
          ]"
          :header-active-tab="tab"
          searchable
          :search-filters="false"
          :panel-class="PREVIEW_PANEL"
          @header-tab-change="(id: string) => (tab = id)"
        >
          <template #footer>
            <span class="flex items-start gap-[8px]">
              <IconActionInfoOutline
                size="16"
                class="text-gray-400 shrink-0 mt-[2px]"
              />
              <span class="text-[14px] leading-[20px] text-gray-400">
                Selecting
                <span class="font-medium text-gray-100">“All Projects”</span>
                ensures all future projects are assigned to this team.
              </span>
            </span>
          </template>
        </SelectOptionList>
      </div>
      <!-- Size-40 mirrors so the dark grid offers the same size comparison.
           See the light-mode counterpart for why `md:col-start-1` is here. -->
      <div class="md:col-start-1">
        <p class="text-[11px] uppercase tracking-wide text-gray-600 mb-1">
          default — size 40
        </p>
        <SelectOptionList
          theme="dark"
          :items="simple"
          size="40"
          :value="previewSelected"
          :panel-class="PREVIEW_PANEL"
        />
      </div>
      <div class="col-span-2">
        <p class="text-[11px] uppercase tracking-wide text-gray-600 mb-1">
          all content types + footer — size 40
        </p>
        <SelectOptionList
          theme="dark"
          :items="withMixedContent"
          size="40"
          :value="mixedSelected"
          @select="onMixedSelect"
          :header-button="{
            iconLeft: IconArrowLeft,
            onClick: () => {},
            ariaLabel: 'Go back',
          }"
          :header-icon-left="IconShapeLightningBolt"
          header-title="Header headline"
          header-tag="New"
          :header-tabs="[
            { id: 'all', label: 'All' },
            { id: 'mine', label: 'Mine' },
          ]"
          :header-active-tab="tab"
          searchable
          :search-filters="false"
          :panel-class="PREVIEW_PANEL"
          @header-tab-change="(id: string) => (tab = id)"
        >
          <template #footer>
            <span class="flex items-start gap-[8px]">
              <IconActionInfoOutline
                size="16"
                class="text-gray-400 shrink-0 mt-[2px]"
              />
              <span class="text-[14px] leading-[20px] text-gray-400">
                Selecting
                <span class="font-medium text-gray-100">“All Projects”</span>
                ensures all future projects are assigned to this team.
              </span>
            </span>
          </template>
        </SelectOptionList>
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
        header-title="Header headline"
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
      <!--
        Custom trigger: instead of the default chevron Button, render an
        "Add new" Button with a leading plus icon. The `#trigger` slot
        receives `{ open, selected, toggle, close }` — we wire `toggle`
        to the Button's click.
      -->
      <Select v-model="v9" :items="simple" :min-width="200">
        <template #trigger="{ toggle }">
          <Button @click="toggle">
            <IconActionAddSmall size="16" :interactive-colors-on-group="true" />
            Add new
          </Button>
        </template>
      </Select>
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
