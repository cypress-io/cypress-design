<script lang="ts" setup>
import { computed, defineComponent, h, isVNode, type PropType } from 'vue'
import Checkbox from '@cypress-design/vue-checkbox'
import Button from '@cypress-design/vue-button'
import Tag from '@cypress-design/vue-tag'
import type { ButtonVariants } from '@cypress-design/constants-button'
import * as SelectConstants from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectTheme,
  SelectSize,
} from '@cypress-design/constants-select'

// Vue's `<component :is>` expects a component definition, not arbitrary
// render output (VNodes, strings, fragments). Wrapping the consumer's
// `render` function in a minimal functional component lets us render
// whatever it returns — h() output, strings, fragments, or null.
const CustomRender = defineComponent({
  props: {
    render: {
      type: Function as PropType<(ctx: { selected: boolean }) => unknown>,
      required: true,
    },
    selected: { type: Boolean, required: true },
  },
  setup(props) {
    return () => props.render({ selected: props.selected })
  },
})

// Same trick for `slotRight` on default rows. `<component :is>` only works
// when the value is a component definition; with this helper Vue happily
// renders VNodes, strings, fragments, or anything the consumer hands in.
const NodeRender = defineComponent({
  props: { node: { required: true } },
  setup(props) {
    return () => (typeof props.node === 'function' ? props.node() : props.node)
  },
})

// `IconNode = unknown` — the API accepts both component references (a
// cypress-design Icon component) AND already-rendered VNodes (from `h()`
// or JSX). React's `renderIcon` two-shape dispatcher lives in
// SelectOptionItem.tsx; this is the Vue mirror. Rendering a VNode
// through `<component :is="vnode">` fails because Vue's dynamic-component
// runtime expects a component definition, not a rendered node.
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

const props = defineProps<{
  item: SelectItem
  theme: SelectTheme
  size: SelectSize
  selected: boolean
  focused: boolean
  id?: string
}>()

const emit = defineEmits<{
  (e: 'select', item: SelectItem): void
}>()

const itemClasses = computed(() => [
  SelectConstants.CssOptionItemBaseClasses,
  SelectConstants.CssOptionItemClasses[`${props.theme}-default`],
  SelectConstants.CssOptionItemHeightClasses[props.size],
  SelectConstants.CssOptionItemPaddingClasses[props.size],
  SelectConstants.CssOptionItemGapClasses,
])

const iconColorClass = computed(
  () => SelectConstants.CssOptionItemIconColorClasses[props.theme],
)

const isDisabled = computed(() => {
  const t = props.item.type
  if (t === 'default' || t === undefined || t === 'checkbox' || t === 'user') {
    return (props.item as { disabled?: boolean }).disabled === true
  }
  return false
})

const isCustomSelectable = computed(
  () =>
    props.item.type === 'custom' &&
    typeof (props.item as { value?: string }).value === 'string',
)

function onClick(e: MouseEvent) {
  if (isDisabled.value) return
  e.stopPropagation()
  emit('select', props.item)
}

function onMouseDown(e: MouseEvent) {
  e.preventDefault()
}
</script>

<template>
  <!-- headline (non-interactive) -->
  <div
    v-if="item.type === 'headline'"
    :id="id"
    role="presentation"
    :class="[
      SelectConstants.CssOptionHeadlineClasses[theme],
      SelectConstants.CssOptionItemPaddingClasses[size],
    ]"
  >
    {{ item.label }}
  </div>

  <!-- divider -->
  <div
    v-else-if="item.type === 'divider'"
    role="presentation"
    aria-hidden="true"
  >
    <div :class="SelectConstants.CssOptionDividerClasses[theme]" />
  </div>

  <!-- button row (action). Theme-aware default variant: `white` on light /
       `outline-dark` on dark so the in-list action button doesn't sit as a
       stark white pill against the gray-1000 panel.
       Roles are split so both goals hold at once:
       - The wrapper stays purely presentational but is the STYLING
         surface for the focus ring — `CssButtonRowFocusClasses` uses
         `data-[focused=true]:*` selectors, so `data-focused` MUST live
         here for the indigo bg / ring / outline to render.
       - The inner Button is the interactive control AND the option: it
         carries `role="option"` (so the listbox sees a valid child per
         aria-required-children), `id` (so the trigger's
         aria-activedescendant can point at it), and `tabindex="-1"` (so
         native tab doesn't land on the pill while the trigger owns
         focus).
       The pill is still the sole click target — the wrapper has no
       @click, so the row's negative space does not fire `onClick`. -->
  <div
    v-else-if="item.type === 'button'"
    role="presentation"
    :data-focused="focused || undefined"
    :class="[
      SelectConstants.CssButtonRowClasses,
      SelectConstants.CssOptionItemHeightClasses[size],
      SelectConstants.CssOptionItemPaddingClasses[size],
      SelectConstants.CssButtonRowFocusClasses[theme],
    ]"
  >
    <Button
      :id="id"
      role="option"
      :tabindex="-1"
      :variant="
        (item.variant as ButtonVariants) ??
        (theme === 'dark' ? 'outline-dark' : 'white')
      "
      :size="size === '40' ? '32' : '24'"
      @click.stop="item.onClick()"
    >
      <IconRender v-if="item.iconLeft" :icon="item.iconLeft" size="16" />
      {{ item.label }}
    </Button>
  </div>

  <!-- custom row -->
  <div
    v-else-if="item.type === 'custom'"
    :id="id"
    :role="isCustomSelectable ? 'option' : 'presentation'"
    :aria-selected="isCustomSelectable ? selected : undefined"
    :data-selected="selected || undefined"
    :data-focused="focused || undefined"
    :class="itemClasses"
    @click="isCustomSelectable ? onClick($event) : undefined"
    @mousedown="onMouseDown"
  >
    <CustomRender :render="item.render" :selected="selected" />
  </div>

  <!-- checkbox row -->
  <div
    v-else-if="item.type === 'checkbox'"
    :id="id"
    role="option"
    :aria-selected="selected"
    :aria-disabled="isDisabled || undefined"
    :data-selected="selected || undefined"
    :data-focused="focused || undefined"
    :class="[itemClasses, SelectConstants.CssCheckboxRowClasses]"
    @click="onClick"
    @mousedown="onMouseDown"
  >
    <!-- The row itself owns interactivity (role="option", aria-selected,
         click handler, keyboard nav). The visual checkbox is a decorative
         affordance — hide it from assistive tech so axe's `label` /
         `nested-interactive` rules don't fire. -->
    <span
      :class="SelectConstants.CssCheckboxRowCheckboxWrapperClasses"
      aria-hidden="true"
    >
      <!-- The Checkbox component owns its own `localChecked` state and
           doesn't watch the `:checked` prop for changes. Keying it on
           `selected` forces a remount whenever the row toggles, so the
           visual stays in sync with the externally-managed value.
           `hide-input` removes the real <input> from layout via
           display:none — axe's `nested-interactive` rule flags a
           focusable input inside a clickable row even when the input is
           tabindex=-1 + aria-hidden, so we take it out of the DOM's
           interactive path entirely. -->
      <Checkbox
        :key="selected ? 'on' : 'off'"
        :checked="selected"
        :disabled="isDisabled"
        :input-tab-index="-1"
        :hide-input="true"
        @change="() => undefined"
      />
    </span>
    <div :class="SelectConstants.CssCheckboxRowStackClasses">
      <span :class="SelectConstants.CssCheckboxRowLabelClasses[size]">
        {{ item.label }}
      </span>
      <span
        v-if="item.subText"
        :class="SelectConstants.CssOptionItemSubTextClasses[theme]"
      >
        {{ item.subText }}
      </span>
    </div>
  </div>

  <!-- user row -->
  <div
    v-else-if="item.type === 'user'"
    :id="id"
    role="option"
    :aria-selected="selected"
    :aria-disabled="isDisabled || undefined"
    :data-selected="selected || undefined"
    :data-focused="focused || undefined"
    :class="itemClasses"
    @click="onClick"
    @mousedown="onMouseDown"
  >
    <IconRender
      v-if="item.iconLeft"
      :icon="item.iconLeft"
      size="24"
      :class="iconColorClass"
    />
    <div :class="SelectConstants.CssUserRowStackClasses">
      <span :class="SelectConstants.CssUserRowLabelClasses[size]">
        {{ item.label }}
      </span>
      <span
        v-if="item.secondary"
        :class="SelectConstants.CssUserRowSecondaryClasses[theme]"
      >
        {{ item.secondary }}
      </span>
    </div>
  </div>

  <!-- default row (type === 'default' or undefined) -->
  <div
    v-else
    :id="id"
    role="option"
    :aria-selected="selected"
    :aria-disabled="isDisabled || undefined"
    :data-selected="selected || undefined"
    :data-focused="focused || undefined"
    :class="itemClasses"
    @click="onClick"
    @mousedown="onMouseDown"
  >
    <IconRender
      v-if="item.iconLeft"
      :icon="item.iconLeft"
      size="16"
      :class="iconColorClass"
    />
    <span :class="SelectConstants.CssOptionItemLabelClasses">
      {{ item.label }}
    </span>
    <Tag v-if="item.tag" size="16" color="gray" :dark="theme === 'dark'">
      {{ item.tag }}
    </Tag>
    <!-- iconRight: hugs the right edge via `ml-auto`, picks up the same
         state-aware coloring as iconLeft. -->
    <IconRender
      v-if="item.iconRight"
      :icon="item.iconRight"
      size="16"
      :class="['ml-auto', iconColorClass]"
    />
    <!-- `!== undefined` (not truthy) so consumers can render `slotRight: 0`
         (zero-count badge), `slotRight: ''` (empty placeholder), or
         `slotRight: false` (a boolean rendered by a function child).
         Matches React's `item.slotRight !== undefined && ...` gate. -->
    <span v-if="item.slotRight !== undefined" class="ml-auto shrink-0">
      <NodeRender :node="item.slotRight" />
    </span>
  </div>
</template>
