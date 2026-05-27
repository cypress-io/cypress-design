<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Button from '@cypress-design/vue-button'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import * as SelectConstants from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectTheme,
  SelectSize,
  SelectAlignment,
  SelectHeaderTab,
  ButtonVariantLoose,
  CssLength,
} from '@cypress-design/constants-select'
import SelectOptionList from './_SelectOptionList.vue'
import { getSelectableIndices } from './filter-items'

const props = withDefaults(
  defineProps<{
    theme?: SelectTheme
    size?: SelectSize
    align?: SelectAlignment
    triggerVariant?: ButtonVariantLoose
    items: SelectItem[]
    modelValue?: string
    value?: string
    placeholder?: string
    disabled?: boolean
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
    defaultOpen?: boolean
    open?: boolean
    id?: string
    popoverClass?: string
  }>(),
  {
    theme: SelectConstants.DefaultTheme,
    size: SelectConstants.DefaultSize,
    align: SelectConstants.DefaultAlignment,
    triggerVariant: SelectConstants.DefaultTriggerVariant,
    searchable: false,
    disabled: false,
    defaultOpen: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:open', open: boolean): void
  (e: 'change', value: string, item: SelectItem): void
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
let uidCounter = 0
const uid = `cy-select-${++uidCounter}`
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
const internalValue = ref<string | undefined>(props.value ?? props.modelValue)
const isValueControlled = computed(
  () => props.value !== undefined || props.modelValue !== undefined,
)
const value = computed(() =>
  isValueControlled.value
    ? props.value ?? props.modelValue
    : internalValue.value,
)
watch(
  () => [props.value, props.modelValue],
  () => {
    if (props.value !== undefined) internalValue.value = props.value
    else if (props.modelValue !== undefined)
      internalValue.value = props.modelValue
  },
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

// ---------- focused index ----------
const focusedIndex = ref(0)
const selectableIndices = computed(() => getSelectableIndices(props.items))

watch(open, (isOpen) => {
  if (!isOpen) return
  if (value.value === undefined) {
    focusedIndex.value = 0
    return
  }
  const idx = selectableIndices.value.findIndex(
    (i) => SelectConstants.getItemValue(props.items[i]) === value.value,
  )
  focusedIndex.value = idx >= 0 ? idx : 0
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
    focusedIndex.value = n === 0 ? 0 : (focusedIndex.value + 1) % n
    return
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const n = selectableIndices.value.length
    focusedIndex.value = n === 0 ? 0 : (focusedIndex.value - 1 + n) % n
    return
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    const realIndex = selectableIndices.value[focusedIndex.value]
    if (realIndex === undefined) return
    handleSelect(props.items[realIndex])
  }
}

// ---------- selection ----------
function handleSelect(item: SelectItem) {
  const itemValue = SelectConstants.getItemValue(item)
  if (itemValue === undefined) return
  if (!isValueControlled.value) internalValue.value = itemValue
  emit('update:modelValue', itemValue)
  emit('change', itemValue, item)
  setOpen(false)
}

function toggle() {
  setOpen(!open.value)
}
function close() {
  setOpen(false)
}

const activeDescendantId = computed(() =>
  open.value
    ? `${itemIdPrefix.value}-${selectableIndices.value[focusedIndex.value] ?? 0}`
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
          :variant="triggerVariant as never"
          :size="size"
          :disabled="disabled"
          type="button"
          aria-haspopup="listbox"
          :aria-expanded="open"
          :aria-controls="popoverId"
          :aria-activedescendant="activeDescendantId"
          :class="SelectConstants.CssTriggerWidthClasses"
          @click="toggle"
        >
          <span :class="SelectConstants.CssTriggerContentClasses">
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
      :items="items"
      :theme="theme"
      :size="size"
      :value="value"
      :header-title="headerTitle"
      :header-tabs="headerTabs"
      :header-active-tab="headerActiveTab"
      :searchable="searchable"
      :search-placeholder="searchPlaceholder"
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
      @select="(it: SelectItem) => handleSelect(it)"
      @header-tab-change="(id: string) => emit('header-tab-change', id)"
    >
      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </SelectOptionList>
  </div>
</template>
