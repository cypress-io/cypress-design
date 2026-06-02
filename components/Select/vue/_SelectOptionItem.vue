<script lang="ts" setup>
import { computed } from 'vue'
import Checkbox from '@cypress-design/vue-checkbox'
import Button from '@cypress-design/vue-button'
import Tag from '@cypress-design/vue-tag'
import * as SelectConstants from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectTheme,
  SelectSize,
} from '@cypress-design/constants-select'

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

  <!-- button row (action) -->
  <div
    v-else-if="item.type === 'button'"
    :class="SelectConstants.CssButtonRowClasses"
  >
    <Button
      :variant="(item.variant as never) ?? 'link'"
      :size="size"
      class="w-full justify-start"
      @click.stop="item.onClick()"
    >
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
    <component :is="(item.render as any)({ selected })" />
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
    :class="itemClasses"
    @click="onClick"
    @mousedown="onMouseDown"
  >
    <Checkbox
      :checked="selected"
      :disabled="isDisabled"
      @change="() => undefined"
    />
    <div :class="SelectConstants.CssCheckboxRowStackClasses">
      <span :class="SelectConstants.CssCheckboxRowLabelClasses">
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
      size="16"
      :interactive-colors-on-group="true"
      :class="iconColorClass"
    />
    <div :class="SelectConstants.CssUserRowStackClasses">
      <span :class="SelectConstants.CssUserRowLabelClasses">
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
    <span v-if="item.slotRight" class="ml-auto shrink-0">
      <component :is="item.slotRight" />
    </span>
  </div>
</template>
