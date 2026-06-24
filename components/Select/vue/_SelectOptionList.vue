<script lang="ts" setup>
import { computed } from 'vue'
import Tabs from '@cypress-design/vue-tabs'
import Textbox from '@cypress-design/vue-textbox'
import Button from '@cypress-design/vue-button'
import Tag from '@cypress-design/vue-tag'
import {
  IconObjectMagnifyingGlass,
  IconActionInfoOutline,
} from '@cypress-design/vue-icon'
import * as SelectConstants from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectAlignment,
  SelectThemingProps,
  SelectHeaderProps,
  SelectSearchProps,
  SelectFooterProps,
  SelectSizingProps,
} from '@cypress-design/constants-select'
import SelectOptionItem from './_SelectOptionItem.vue'
import { getSelectableIndices } from './filter-items'

// Props share the same named groups as Select.vue so adding a header /
// search / footer / sizing field happens in one place
// (@cypress-design/constants-select). `items` arrives ALREADY FILTERED —
// Select owns `searchValue` and applies `filterAndCollapseHeadlines`
// before passing the list down, so keyboard nav and rendering agree on
// which rows exist.
type OptionListProps = SelectThemingProps &
  SelectHeaderProps &
  Omit<SelectSearchProps, 'searchFilters'> &
  SelectFooterProps &
  SelectSizingProps & {
    items: SelectItem[]
    value?: string
    // Controlled search input value — Select owns the state and the filter.
    searchValue?: string
    align?: SelectAlignment
    id?: string
    panelClass?: string
    focusedIndex?: number
    itemIdPrefix?: string
  }

const props = withDefaults(defineProps<OptionListProps>(), {
  theme: SelectConstants.DefaultTheme,
  size: SelectConstants.DefaultSize,
  align: SelectConstants.DefaultAlignment,
  searchable: false,
  searchPlaceholder: SelectConstants.DefaultSearchPlaceholder,
  searchValue: '',
})

const emit = defineEmits<{
  (e: 'select', item: SelectItem): void
  (e: 'header-tab-change', id: string): void
  (e: 'update:searchValue', value: string): void
}>()

defineSlots<{
  footer?: () => unknown
}>()

function onHeaderTabSwitch(tab: { id: string }) {
  emit('header-tab-change', tab.id)
}

const selectableIndices = computed(() => getSelectableIndices(props.items))
const focusedSelectableIndex = computed(() =>
  typeof props.focusedIndex === 'number'
    ? selectableIndices.value[props.focusedIndex]
    : undefined,
)

const hasTitleRow = computed(
  () =>
    !!props.headerTitle ||
    !!props.headerButton ||
    !!props.headerIconLeft ||
    !!props.headerTag ||
    !!props.headerIconRight,
)
const hasTabsOrSearch = computed(
  () => (props.headerTabs && props.headerTabs.length > 0) || props.searchable,
)
const hasHeader = computed(() => hasTitleRow.value || hasTabsOrSearch.value)
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
    <div v-if="hasHeader" :class="SelectConstants.CssHeaderContainerClasses">
      <!-- Title row: button · iconLeft · title · tag · (spacer) · iconRight.
           Carries its own bottom border so a separator appears between the
           title row and whatever follows it (tabs/search bundle, or the
           items area when there's nothing else in the header).
           Horizontal padding varies with content — see comments next to the
           inline `pl-*` / `pr-*` classes below. -->
      <div
        v-if="hasTitleRow"
        :class="[
          SelectConstants.CssHeaderTitleRowClasses,
          SelectConstants.CssHeaderClasses[theme],
          headerButton ? 'pl-[8px]' : 'pl-[16px]',
          headerIconRight ? 'pr-[16px]' : 'pr-[8px]',
        ]"
      >
        <Button
          v-if="headerButton"
          size="32"
          square
          :variant="theme === 'dark' ? 'outline-dark' : 'white'"
          :aria-label="headerButton.ariaLabel"
          :class="SelectConstants.CssHeaderBackButtonSpacingClasses"
          @click="headerButton.onClick()"
        >
          <component
            :is="headerButton.iconLeft"
            size="16"
            :interactive-colors-on-group="true"
          />
        </Button>
        <div :class="SelectConstants.CssHeaderTitleGroupClasses">
          <component
            :is="headerIconLeft"
            v-if="headerIconLeft"
            size="16"
            :interactive-colors-on-group="true"
            :class="SelectConstants.CssHeaderIconColorClasses[theme]"
          />
          <span
            v-if="headerTitle"
            :class="[
              SelectConstants.CssHeaderTitleSizeClasses[size],
              SelectConstants.CssHeaderTitleClasses[theme],
            ]"
          >
            {{ headerTitle }}
          </span>
          <Tag v-if="headerTag" size="16" color="gray" :dark="theme === 'dark'">
            {{ headerTag }}
          </Tag>
        </div>
        <component
          :is="headerIconRight"
          v-if="headerIconRight"
          size="16"
          :interactive-colors-on-group="true"
          :class="SelectConstants.CssHeaderIconColorClasses[theme]"
        />
      </div>
      <!-- Tabs + search bundle: their own padding context below the title row.
           Bottom border separates the bundle from the items area below. -->
      <div
        v-if="hasTabsOrSearch"
        :class="[
          SelectConstants.CssHeaderTabsSearchWrapperClasses,
          SelectConstants.CssHeaderClasses[theme],
        ]"
      >
        <!-- Wrapper keeps Tabs at content width — flex-col parents otherwise
             stretch every child to the full cross-axis (panel width).
             Dark: `dark-small` at size 32 / `dark-large` at size 40 so the
             tabs scale with the row height. Light has no `*-small` pill
             variant yet, so it stays on `default` for both sizes. -->
        <div v-if="headerTabs && headerTabs.length > 0" class="self-start">
          <Tabs
            :variant="
              theme === 'dark'
                ? size === '40'
                  ? 'dark-large'
                  : 'dark-small'
                : 'default'
            "
            :tabs="headerTabs as never"
            :active-id="headerActiveTab"
            @switch="onHeaderTabSwitch"
          />
        </div>
        <Textbox
          v-if="searchable"
          :theme="theme"
          size="32"
          :placeholder="searchPlaceholder"
          :icon-left="IconObjectMagnifyingGlass"
          :model-value="searchValue"
          :aria-label="searchPlaceholder"
          @update:model-value="(v: string) => emit('update:searchValue', v)"
        />
      </div>
    </div>

    <div :class="SelectConstants.CssItemsContainerClasses">
      <div
        v-if="items.length === 0"
        :class="SelectConstants.CssEmptyStateClasses[theme]"
      >
        No results
      </div>
      <SelectOptionItem
        v-for="(item, index) in items"
        :key="itemKey(item, index)"
        :id="rowId(index)"
        :item="item"
        :theme="theme"
        :size="size"
        :selected="
          itemValueOf(item) !== undefined && itemValueOf(item) === value
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
          :class="SelectConstants.CssFooterLabelGroupClasses"
        >
          <IconActionInfoOutline
            size="16"
            :interactive-colors-on-group="true"
            :class="SelectConstants.CssFooterIconColorClasses[theme]"
          />
          <span :class="SelectConstants.CssFooterLabelClasses[theme]">
            {{ footerLabel }}
          </span>
        </span>
        <Button
          v-if="footerAction"
          size="24"
          :variant="theme === 'dark' ? 'outline-dark' : 'link'"
          @click="footerAction.onClick()"
        >
          {{ footerAction.label }}
        </Button>
      </slot>
    </div>
  </div>
</template>
