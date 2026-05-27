<script lang="ts" setup>
import { computed, ref } from 'vue'
import Tabs from '@cypress-design/vue-tabs'
import Textbox from '@cypress-design/vue-textbox'
import Button from '@cypress-design/vue-button'
import { IconObjectMagnifyingGlass } from '@cypress-design/vue-icon'
import * as SelectConstants from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectTheme,
  SelectSize,
  SelectAlignment,
  SelectHeaderTab,
  CssLength,
} from '@cypress-design/constants-select'
import SelectOptionItem from './_SelectOptionItem.vue'
import {
  filterAndCollapseHeadlines,
  getSelectableIndices,
} from './filter-items'

const props = withDefaults(
  defineProps<{
    items: SelectItem[]
    theme?: SelectTheme
    size?: SelectSize
    value?: string
    headerTitle?: string
    headerTabs?: SelectHeaderTab[]
    headerActiveTab?: string
    searchable?: boolean
    searchPlaceholder?: string
    footerLabel?: string
    footerAction?: { label: string; onClick: () => void }
    width?: CssLength
    minWidth?: CssLength
    maxWidth?: CssLength
    height?: CssLength
    maxHeight?: CssLength
    align?: SelectAlignment
    id?: string
    panelClass?: string
    focusedIndex?: number
    itemIdPrefix?: string
  }>(),
  {
    theme: SelectConstants.DefaultTheme,
    size: SelectConstants.DefaultSize,
    align: SelectConstants.DefaultAlignment,
    searchable: false,
    searchPlaceholder: SelectConstants.DefaultSearchPlaceholder,
  },
)

const emit = defineEmits<{
  (e: 'select', item: SelectItem): void
  (e: 'header-tab-change', id: string): void
}>()

defineSlots<{
  footer?: () => unknown
}>()

const searchValue = ref('')

const filteredItems = computed(() =>
  props.searchable
    ? filterAndCollapseHeadlines(props.items, searchValue.value)
    : props.items,
)

const selectableIndices = computed(() =>
  getSelectableIndices(filteredItems.value),
)
const focusedSelectableIndex = computed(() =>
  typeof props.focusedIndex === 'number'
    ? selectableIndices.value[props.focusedIndex]
    : undefined,
)

const hasHeader = computed(
  () =>
    !!props.headerTitle ||
    (props.headerTabs && props.headerTabs.length > 0) ||
    props.searchable,
)
const hasFooter = computed(() => !!props.footerLabel || !!props.footerAction)

const panelStyle = computed(() =>
  SelectConstants.buildSizingStyle({
    width: props.width,
    minWidth: props.minWidth,
    maxWidth: props.maxWidth,
    height: props.height,
    maxHeight: props.maxHeight,
  }),
)

const panelClasses = computed(() => [
  SelectConstants.CssPopoverLayoutClasses,
  SelectConstants.CssAlignmentClasses[props.align],
  SelectConstants.CssPopoverClasses[props.theme],
  SelectConstants.CssPopoverSizeClasses[props.size],
  props.panelClass,
])

function itemValueOf(item: SelectItem): string | undefined {
  return SelectConstants.getItemValue(item)
}

function itemKey(item: SelectItem, index: number): string {
  if ('key' in item && (item as { key?: string }).key) {
    return (item as { key: string }).key
  }
  const v = itemValueOf(item)
  if (v) return v
  return `${item.type ?? 'default'}-${index}`
}

function rowId(index: number): string | undefined {
  return props.itemIdPrefix ? `${props.itemIdPrefix}-${index}` : undefined
}
</script>

<template>
  <div :id="id" role="listbox" :style="panelStyle" :class="panelClasses">
    <div
      v-if="hasHeader"
      :class="[
        SelectConstants.CssHeaderContainerClasses,
        SelectConstants.CssHeaderClasses[theme],
      ]"
    >
      <div
        v-if="headerTitle"
        :class="SelectConstants.CssHeaderTitleClasses[theme]"
      >
        {{ headerTitle }}
      </div>
      <Tabs
        v-if="headerTabs && headerTabs.length > 0"
        :tabs="headerTabs as never"
        :active-id="headerActiveTab"
        @switch="(tab: { id: string }) => emit('header-tab-change', tab.id)"
      />
      <Textbox
        v-if="searchable"
        :theme="theme"
        size="32"
        :placeholder="searchPlaceholder"
        :icon-left="IconObjectMagnifyingGlass"
        :model-value="searchValue"
        :aria-label="searchPlaceholder"
        @update:model-value="(v: string) => (searchValue = v)"
      />
    </div>

    <div :class="SelectConstants.CssItemsContainerClasses">
      <div
        v-if="filteredItems.length === 0"
        :class="SelectConstants.CssEmptyStateClasses[theme]"
      >
        No results
      </div>
      <SelectOptionItem
        v-for="(item, index) in filteredItems"
        :key="itemKey(item, index)"
        :id="rowId(index)"
        :item="item"
        :theme="theme"
        :size="size"
        :selected="
          itemValueOf(item) !== undefined &&
          itemValueOf(item) === value &&
          itemValueOf(item) !== ''
        "
        :focused="index === focusedSelectableIndex"
        @select="(it: SelectItem) => emit('select', it)"
      />
    </div>

    <div
      v-if="hasFooter || $slots.footer"
      :class="[
        SelectConstants.CssFooterContainerClasses,
        SelectConstants.CssFooterClasses[theme],
      ]"
    >
      <slot name="footer">
        <span
          v-if="footerLabel"
          :class="SelectConstants.CssFooterLabelClasses[theme]"
        >
          {{ footerLabel }}
        </span>
        <Button
          v-if="footerAction"
          size="32"
          variant="link"
          @click="footerAction.onClick()"
        >
          {{ footerAction.label }}
        </Button>
      </slot>
    </div>
  </div>
</template>
