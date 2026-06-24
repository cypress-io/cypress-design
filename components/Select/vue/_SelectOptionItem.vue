<script lang="ts" setup>
import { computed, defineComponent } from 'vue'
import Checkbox from '@cypress-design/vue-checkbox'
import Button from '@cypress-design/vue-button'
import Tag from '@cypress-design/vue-tag'
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
      type: Function as unknown as () => (ctx: {
        selected: boolean
      }) => unknown,
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
  props: { node: { required: true, type: null as unknown as () => unknown } },
  setup(props) {
    return () => (typeof props.node === 'function' ? props.node() : props.node)
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
  if (t === 'default' || t === undefined || t === 'checkbox') {
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
       stark white pill against the gray-1000 panel. -->
  <div
    v-else-if="item.type === 'button'"
    :class="[
      SelectConstants.CssButtonRowClasses,
      SelectConstants.CssOptionItemHeightClasses[size],
      SelectConstants.CssOptionItemPaddingClasses[size],
    ]"
  >
    <Button
      :variant="
        (item.variant as never) ?? (theme === 'dark' ? 'outline-dark' : 'white')
      "
      :size="size === '40' ? '32' : '24'"
      @click.stop="item.onClick()"
    >
      <component
        :is="item.iconLeft"
        v-if="item.iconLeft"
        size="16"
        :interactive-colors-on-group="true"
      />
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
    <span :class="SelectConstants.CssCheckboxRowCheckboxWrapperClasses">
      <!-- The Checkbox component owns its own `localChecked` state and
           doesn't watch the `:checked` prop for changes. Keying it on
           `selected` forces a remount whenever the row toggles, so the
           visual stays in sync with the externally-managed value. -->
      <Checkbox
        :key="selected ? 'on' : 'off'"
        :checked="selected"
        :disabled="isDisabled"
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
    :data-selected="selected || undefined"
    :data-focused="focused || undefined"
    :class="itemClasses"
    @click="onClick"
    @mousedown="onMouseDown"
  >
    <component
      :is="item.iconLeft"
      v-if="item.iconLeft"
      size="24"
      :interactive-colors-on-group="true"
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
    <component
      :is="item.iconLeft"
      v-if="item.iconLeft"
      size="16"
      :interactive-colors-on-group="true"
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
    <component
      :is="item.iconRight"
      v-if="item.iconRight"
      size="16"
      :interactive-colors-on-group="true"
      :class="['ml-auto', iconColorClass]"
    />
    <span v-if="item.slotRight" class="ml-auto shrink-0">
      <NodeRender :node="item.slotRight" />
    </span>
  </div>
</template>
