<script lang="ts" setup>
import {
  computed,
  defineComponent,
  h,
  isVNode,
  type PropType,
  type VNode,
} from 'vue'
import Tabs from '@cypress-design/vue-tabs'
import type { Tab } from '@cypress-design/constants-tabs'
import Textbox from '@cypress-design/vue-textbox'
import Button from '@cypress-design/vue-button'
import Tag from '@cypress-design/vue-tag'
import {
  IconObjectMagnifyingGlass,
  IconActionInfoOutline,
} from '@cypress-design/vue-icon'
import * as SelectConstants from '@cypress-design/constants-select'
import {
  getInteractiveIndices,
  getSelectableIndices,
} from '@cypress-design/constants-select'
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

// `IconNode = unknown` — mirror React's two-shape dispatcher so a
// consumer that passes an already-rendered VNode (from `h()` or JSX) to
// `headerButton.iconLeft` / `headerIconLeft` / `headerIconRight` renders
// alongside consumers that pass a component reference. `<component :is>`
// alone can't handle both because Vue's dynamic-component runtime
// expects a component definition, not a rendered node.
const IconRender = defineComponent({
  props: {
    icon: { required: true },
    size: { type: String as PropType<'16' | '24'>, default: '16' },
    class: { type: [String, Array, Object], default: undefined },
  },
  setup(props) {
    return () => {
      const icon = props.icon
      if (!icon) return null
      if (isVNode(icon)) return h('span', { class: props.class as any }, [icon])
      if (typeof icon === 'function' || typeof icon === 'object') {
        return h(icon as any, {
          size: props.size,
          interactiveColorsOnGroup: true,
          class: props.class,
        })
      }
      return h('span', { class: props.class as any }, [icon as any])
    }
  },
})

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
  footer?: () => VNode[]
}>()

function onHeaderTabSwitch(tab: { id: string }) {
  emit('header-tab-change', tab.id)
}

// Two different "navigable" sets for the panel:
//   * `interactiveIndices` — rows the keyboard can land on (includes
//     in-list `button` rows so they're keyboard-reachable);
//   * `selectableIndices`  — rows the user can pick as a value (excludes
//     buttons). Used only to decide whether to show "No results" — when
//     search filters out every selectable row, the empty state still
//     fires even if a button (e.g. "+ Add new") survives the filter.
const interactiveIndices = computed(() => getInteractiveIndices(props.items))
const selectableIndices = computed(() => getSelectableIndices(props.items))
const focusedSelectableIndex = computed(() =>
  typeof props.focusedIndex === 'number'
    ? interactiveIndices.value[props.focusedIndex]
    : undefined,
)
// Set `aria-activedescendant` on the header search Textbox in addition
// to the trigger. WAI-ARIA combobox: the attribute must live on the
// element that has DOM focus — screen readers reading from the search
// input won't announce the highlighted option if only the trigger
// carries it. Clamp so a stale `focusedIndex` past a filter shrink
// doesn't emit `${itemIdPrefix}-undefined` for one frame.
const activeDescendantId = computed(() => {
  const i = props.focusedIndex
  if (typeof i !== 'number' || i < 0) return undefined
  if (i >= interactiveIndices.value.length) return undefined
  if (!props.itemIdPrefix) return undefined
  return `${props.itemIdPrefix}-${interactiveIndices.value[i]}`
})

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
  // Empty string is a valid `value` (selection treats it as such); use
  // `!== undefined` rather than a truthy check so a row with `value: ''`
  // doesn't fall back to the type-and-index key and unnecessarily remount
  // when items reorder.
  if (v !== undefined) return v
  return `${item.type ?? 'default'}-${index}`
}

function rowId(index: number): string | undefined {
  return props.itemIdPrefix ? `${props.itemIdPrefix}-${index}` : undefined
}

// The listbox role must wrap ONLY the option items — axe flags
// `role="listbox"` on a container that also holds non-option children
// (header buttons, tabs, search input, footer actions). Give the items
// container its own id (`${popoverId}-listbox`) so the trigger's
// `aria-controls` can point at it.
const listboxId = computed(() => (props.id ? `${props.id}-listbox` : undefined))
</script>

<template>
  <div :id="id" :style="panelStyle" :class="panelClasses">
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
          <IconRender :icon="headerButton.iconLeft" size="16" />
        </Button>
        <div :class="SelectConstants.CssHeaderTitleGroupClasses">
          <IconRender
            v-if="headerIconLeft"
            :icon="headerIconLeft"
            size="16"
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
        <IconRender
          v-if="headerIconRight"
          :icon="headerIconRight"
          size="16"
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
            :tabs="headerTabs as Tab[]"
            :active-id="headerActiveTab"
            @switch="onHeaderTabSwitch"
          />
        </div>
        <Textbox
          v-if="searchable"
          :model-value="searchValue"
          :theme="theme"
          size="32"
          :placeholder="searchPlaceholder"
          :icon-left="IconObjectMagnifyingGlass"
          :aria-label="searchPlaceholder"
          :aria-activedescendant="activeDescendantId"
          @update:model-value="(v: string) => emit('update:searchValue', v)"
        />
      </div>
    </div>

    <div
      :id="listboxId"
      role="listbox"
      :aria-label="headerTitle || 'Options'"
      :class="SelectConstants.CssItemsContainerClasses"
    >
      <!-- Show "No results" only when an active search filter left zero
           interactive rows (selectable rows + in-list action buttons).
           Gating on `searchValue` prevents the false-positive on
           purely-structural panels (headline + divider only, no search
           typed) where "No results" would read as an error. Gating on
           `interactiveIndices` rather than `selectableIndices` avoids
           the self-contradiction where a disabled row matched the query
           (kept by the filter — labels only) but is unselectable, so
           the banner would render alongside a visible row. -->
      <div
        v-if="searchValue && interactiveIndices.length === 0"
        :class="SelectConstants.CssEmptyStateClasses[theme]"
      >
        No results
      </div>
      <SelectOptionItem
        v-for="(item, index) in items"
        :id="rowId(index)"
        :key="itemKey(item, index)"
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
