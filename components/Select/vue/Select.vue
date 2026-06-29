<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import Button from '@cypress-design/vue-button'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import type { ButtonVariants } from '@cypress-design/constants-button'
import * as SelectConstants from '@cypress-design/constants-select'
import {
  filterAndCollapseHeadlines,
  getSelectableIndices,
} from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectAlignment,
  ButtonVariantLoose,
  SelectThemingProps,
  SelectHeaderProps,
  SelectSearchProps,
  SelectFooterProps,
  SelectSizingProps,
} from '@cypress-design/constants-select'
import SelectOptionList from './_SelectOptionList.vue'

// Public props are composed from the shared groups in `constants-select`
// so the surface stays in sync with SelectOptionList / SelectOptionItem.
// Select-only fields (model value, open state, trigger override, etc.)
// are intersected in directly below.
type SelectComponentProps = SelectThemingProps &
  SelectHeaderProps &
  SelectSearchProps &
  SelectFooterProps &
  SelectSizingProps & {
    align?: SelectAlignment
    triggerVariant?: ButtonVariantLoose
    items: SelectItem[]
    modelValue?: string
    value?: string
    placeholder?: string
    disabled?: boolean
    defaultOpen?: boolean
    open?: boolean
    id?: string
    popoverClass?: string
  }

const props = withDefaults(defineProps<SelectComponentProps>(), {
  theme: SelectConstants.DefaultTheme,
  size: SelectConstants.DefaultSize,
  align: SelectConstants.DefaultAlignment,
  triggerVariant: SelectConstants.DefaultTriggerVariant,
  searchable: false,
  // Vue 3 coerces an unset Boolean prop to `false`, so without an explicit
  // default here `searchable` alone wouldn't turn the filter on. Default
  // `true` so a consumer that omits `searchFilters` gets the filter
  // automatically; passing `searchFilters={false}` keeps the input visible
  // for showcase usage without filtering anything.
  searchFilters: true,
  disabled: false,
  defaultOpen: false,
})

// `value` is `undefined` when the selection is cleared — happens when a
// checkbox row is re-clicked (toggle off). Consumers must handle both cases.
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
  (e: 'update:open', open: boolean): void
  (e: 'change', value: string | undefined, item: SelectItem): void
  (e: 'header-tab-change', id: string): void
}>()

defineSlots<{
  trigger?: (ctx: {
    open: boolean
    selected: SelectItem | null
    toggle: () => void
    close: () => void
  }) => unknown
  footer?: () => unknown
}>()

// ---------- ids ----------
// Vue 3.5 introduces `useId`, but cypress-design pins Vue 3.4 — fall back
// to the per-instance `uid` exposed by `getCurrentInstance()`, which is
// what Vue's own `useId` is built on. Stable, monotonically increasing.
const vueUid = getCurrentInstance()?.uid ?? 0
const uid = `cy-select-${vueUid}`
const popoverId = computed(() =>
  props.id ? `${props.id}-popover` : `${uid}-popover`,
)
const itemIdPrefix = computed(() =>
  props.id ? `${props.id}-opt` : `${uid}-opt`,
)

// ---------- open state ----------
// Note: Vue normalizes absent Boolean props to `false`, so we can't reliably
// distinguish "consumer didn't pass `open`" from "consumer passed `open=false`".
// We use internal state as the single source of truth: `open` and `defaultOpen`
// both seed the initial value, and updates flow out via `update:open`. A
// consumer that wants to force-close the popover can re-key the component.
const internalOpen = ref(props.open || props.defaultOpen)
const open = computed(() => internalOpen.value)
function setOpen(next: boolean) {
  internalOpen.value = next
  emit('update:open', next)
}

// ---------- selected value ----------
// Sticky-toward-controlled: once we ever see a defined `value` or
// `modelValue` prop the component is "controlled" and stays that way.
// This is the only discriminator that handles every common pattern:
// pure uncontrolled (no v-model / `value`), pure controlled (initial
// defined), lazy controlled (v-model bound to a ref that starts
// `undefined` and is later set), controlled clear (parent sets the
// value back to `undefined`), and checkbox toggle-off (component
// emits `undefined`). In every case the prop wins once observed, so
// a clear correctly shows the placeholder instead of falling back to
// the last clicked row.
const wasControlled = ref(
  props.value !== undefined || props.modelValue !== undefined,
)
watch(
  () => [props.value, props.modelValue],
  ([v, m]) => {
    if (v !== undefined || m !== undefined) wasControlled.value = true
  },
)
const isValueControlled = computed(() => wasControlled.value)
const internalValue = ref<string | undefined>(props.value ?? props.modelValue)
const value = computed(() =>
  isValueControlled.value
    ? props.value ?? props.modelValue
    : internalValue.value,
)

const selected = computed<SelectItem | null>(() => {
  if (value.value === undefined) return null
  const found = props.items.find(
    (it) => SelectConstants.getItemValue(it) === value.value,
  )
  return found ?? null
})

const defaultTriggerLabel = computed(() => {
  if (selected.value && 'label' in selected.value) {
    return (selected.value as { label: string }).label
  }
  return props.placeholder ?? ''
})

// When the trigger has no label text (no selection AND no placeholder),
// render it as an icon-only square so the chevron alone doesn't sit in a
// stretched-out button. Matches Button's `square` rule: width === height.
const isTriggerIconOnly = computed(() => !defaultTriggerLabel.value)

// ---------- search ----------
// `searchValue` lives on Select (not OptionList) so the keyboard handler
// and the rendered popover work off the SAME filtered list. Before this,
// Select walked indices on the raw `items` while OptionList re-filtered
// internally — Enter could select rows hidden by the search filter.
const searchValue = ref('')
const displayItems = computed(() =>
  props.searchable && props.searchFilters
    ? filterAndCollapseHeadlines(props.items, searchValue.value)
    : props.items,
)

// ---------- focused index ----------
// -1 means "no row focused" — visual focus ring + aria-activedescendant are
// suppressed until the user actually navigates with an arrow key.
const focusedIndex = ref(-1)
const selectableIndices = computed(() =>
  getSelectableIndices(displayItems.value),
)

watch(open, (isOpen) => {
  if (!isOpen) return
  // Open with no row focused. First arrow keypress lands focus (see onKeyDown).
  focusedIndex.value = -1
})

// Reset focus when the displayed *content* changes — typing into search
// or the consumer swapping `items` (e.g., a header-tab change). Watching
// `displayItems` by reference would fire on every parent re-render that
// hands us a fresh inline array, dropping focus and aria-activedescendant
// on rerenders that didn't change what the user sees. Hash by type +
// key/value + label so identity churn over identical rows is a no-op.
const displayItemsSignature = computed(() =>
  displayItems.value
    .map((i) => {
      const it = i as {
        type?: string
        value?: string
        label?: string
        key?: string
      }
      return `${it.type ?? ''}|${it.key ?? it.value ?? ''}|${it.label ?? ''}`
    })
    .join('\n'),
)
watch(displayItemsSignature, () => {
  focusedIndex.value = -1
})

// ---------- click outside ----------
const wrapperRef = ref<HTMLElement | null>(null)
function onDocumentMouseDown(e: MouseEvent) {
  if (!open.value) return
  if (!wrapperRef.value) return
  if (e.target instanceof Node && wrapperRef.value.contains(e.target)) return
  setOpen(false)
}
onMounted(() => {
  document.addEventListener('mousedown', onDocumentMouseDown, true)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentMouseDown, true)
})

// ---------- keyboard ----------
const triggerRef = ref<HTMLElement | null>(null)
function onKeyDown(e: KeyboardEvent) {
  if (props.disabled) return
  if (!open.value) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
    }
    return
  }
  if (e.key === 'Escape') {
    e.preventDefault()
    setOpen(false)
    const btn = triggerRef.value?.querySelector(
      'button, [tabindex]',
    ) as HTMLElement | null
    btn?.focus()
    return
  }
  if (e.key === 'Tab') {
    setOpen(false)
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const n = selectableIndices.value.length
    if (n === 0) {
      focusedIndex.value = -1
    } else if (focusedIndex.value === -1) {
      // First arrow press lands on the first option.
      focusedIndex.value = 0
    } else {
      focusedIndex.value = (focusedIndex.value + 1) % n
    }
    return
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const n = selectableIndices.value.length
    if (n === 0) {
      focusedIndex.value = -1
    } else if (focusedIndex.value === -1) {
      // First arrow press from no-focus lands on the last option — wraps
      // symmetrically with ArrowDown-from-last.
      focusedIndex.value = n - 1
    } else {
      focusedIndex.value = (focusedIndex.value - 1 + n) % n
    }
    return
  }
  if (e.key === 'Enter' || e.key === ' ') {
    // Search input takes precedence regardless of row focus — bubbled
    // Enter/Space from the header `Textbox` must reach the input as a
    // character (Space) or submit (Enter), never activate a focused row.
    const target = e.target as HTMLElement | null
    const isTextInput =
      target instanceof HTMLInputElement &&
      (target.type === 'text' || target.type === 'search')
    if (isTextInput) return
    if (focusedIndex.value === -1) {
      // Nothing focused yet, key came from the trigger button → native
      // button activation would call `toggle()` and close the popover.
      // preventDefault so a second Enter/Space doesn't dismiss.
      e.preventDefault()
      return
    }
    const realIndex = selectableIndices.value[focusedIndex.value]
    if (realIndex === undefined) return
    // A row is focused. Both Enter and Space confirm. preventDefault
    // suppresses the native button-activation that would otherwise toggle
    // the popover closed without selecting.
    e.preventDefault()
    handleSelect(displayItems.value[realIndex])
  }
}

// ---------- selection ----------
function handleSelect(item: SelectItem) {
  const itemValue = SelectConstants.getItemValue(item)
  if (itemValue === undefined) return
  // Checkbox rows toggle: clicking an already-checked row unchecks it.
  // Default rows still use plain select semantics (re-click is a no-op).
  // Keep the popover open on checkbox toggle so multi-pick intent flows.
  const isCheckboxToggle = item.type === 'checkbox' && value.value === itemValue
  const nextValue = isCheckboxToggle ? undefined : itemValue
  // Uncontrolled consumers: track the selection internally. Controlled
  // consumers (v-model or `value`): the parent's prop drives the next
  // render; don't touch internalValue so a controlled clear (parent sets
  // `value`/`modelValue` to `undefined`) shows the placeholder instead
  // of falling back to the last clicked row.
  if (!isValueControlled.value) internalValue.value = nextValue
  emit('update:modelValue', nextValue)
  emit('change', nextValue, item)
  if (item.type !== 'checkbox') setOpen(false)
}

function toggle() {
  setOpen(!open.value)
}
function close() {
  setOpen(false)
}

const activeDescendantId = computed(() =>
  open.value && focusedIndex.value >= 0
    ? `${itemIdPrefix.value}-${selectableIndices.value[focusedIndex.value]}`
    : undefined,
)

const chevronClasses = computed(() => [
  SelectConstants.CssChevronClasses,
  open.value ? SelectConstants.CssChevronOpenClasses : '',
])
</script>

<template>
  <div
    ref="wrapperRef"
    :class="[SelectConstants.CssWrapperClasses]"
    @keydown="onKeyDown"
  >
    <div ref="triggerRef">
      <slot
        name="trigger"
        :open="open"
        :selected="selected"
        :toggle="toggle"
        :close="close"
      >
        <Button
          :variant="triggerVariant as ButtonVariants"
          :size="size"
          :square="isTriggerIconOnly"
          :disabled="disabled"
          type="button"
          aria-haspopup="listbox"
          :aria-expanded="open"
          :aria-controls="popoverId"
          :aria-activedescendant="activeDescendantId"
          :class="
            isTriggerIconOnly ? '' : SelectConstants.CssTriggerWidthClasses
          "
          @click="toggle"
        >
          <span
            v-if="isTriggerIconOnly"
            :class="SelectConstants.CssTriggerIconOnlyClasses"
          >
            <IconChevronDownSmall :class="chevronClasses" />
          </span>
          <span v-else :class="SelectConstants.CssTriggerContentClasses">
            <span class="truncate">{{ defaultTriggerLabel }}</span>
            <IconChevronDownSmall :class="chevronClasses" />
          </span>
        </Button>
      </slot>
    </div>

    <SelectOptionList
      v-if="open"
      :id="popoverId"
      :item-id-prefix="itemIdPrefix"
      :items="displayItems"
      :theme="theme"
      :size="size"
      :value="value"
      :header-title="headerTitle"
      :header-button="headerButton"
      :header-icon-left="headerIconLeft"
      :header-tag="headerTag"
      :header-icon-right="headerIconRight"
      :header-tabs="headerTabs"
      :header-active-tab="headerActiveTab"
      :searchable="searchable"
      :search-placeholder="searchPlaceholder"
      :search-value="searchValue"
      :footer-label="footerLabel"
      :footer-action="footerAction"
      :width="width"
      :min-width="minWidth"
      :max-width="maxWidth"
      :height="height"
      :max-height="maxHeight"
      :align="align"
      :focused-index="focusedIndex"
      :panel-class="popoverClass"
      @update:search-value="(v: string) => (searchValue = v)"
      @select="(it: SelectItem) => handleSelect(it)"
      @header-tab-change="(id: string) => emit('header-tab-change', id)"
    >
      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </SelectOptionList>
  </div>
</template>
