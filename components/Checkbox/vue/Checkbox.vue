<script lang="ts">
function uid() {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    '',
  )
}
</script>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { IconCheckmarkSmall } from '@cypress-design/vue-icon'
import {
  CssCheckboxColors,
  CssClasses,
} from '@cypress-design/constants-checkbox'

const props = withDefaults(
  defineProps<{
    /**
     * A unique identifier for the checkbox on the whole page.
     * It will be used to give match label with input for a11y.
     */
    id?: string
    /**
     * Name attribute of the <input type="checkbox"/>.
     */
    name?: string
    /**
     * Is the checkbox checked when it is first rendered.
     */
    checked?: boolean
    /**
     * The color of the background in the checkbox.
     * The checkmark will always be white.
     */
    color?: 'red' | 'indigo' | 'jade'
    /**
     * If the checkbox is disabled, it will not be clickable.
     */
    disabled?: boolean
    modelValue?: boolean | Array<string>
    /**
     * Label for the checkbox.
     * It is very important to set this to make the checkbox accessible.
     */
    label?: string
  }>(),
  {
    id: () => uid(),
    color: 'indigo',
  },
)

const localChecked = ref(
  (Array.isArray(props.modelValue)
    ? props.name
      ? props.modelValue.includes(props.name)
      : false
    : props.modelValue) || props.checked,
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean | Array<string>]
  change: [value: boolean]
}>()

function updated() {
  localChecked.value = !localChecked.value
  if (Array.isArray(props.modelValue)) {
    const arrayModelValue = [...props.modelValue]
    if (!props.name) {
      return
    }
    const index = arrayModelValue.indexOf(props.name)
    if (index === -1) {
      arrayModelValue.push(props.name)
    } else {
      arrayModelValue.splice(index, 1)
    }
    emit('update:modelValue', arrayModelValue)
  } else {
    emit('update:modelValue', localChecked.value)
  }
  emit('change', localChecked.value)
}

const checkboxClasses = computed(() =>
  props.disabled
    ? CssCheckboxColors.disabled
    : localChecked.value
      ? CssCheckboxColors[props.color]
      : CssCheckboxColors.empty,
)
</script>

<template>
  <span class="relative flex items-center">
    <input
      :id="id"
      :class="CssClasses.hiddenInput"
      :name="name || id"
      type="checkbox"
      :disabled="props.disabled"
      :checked="localChecked"
      @change="updated"
    />
    <label :class="CssClasses.labelTag" :for="id">
      <IconCheckmarkSmall
        v-if="localChecked"
        strokeColor="white"
        class="absolute"
      />
      <span :class="[checkboxClasses, CssClasses.visibleCheckbox]" />
      <slot name="label">
        <span
          v-if="label"
          :class="[
            CssClasses.trueLabel,
            disabled ? 'text-gray-500' : 'text-gray-800',
          ]"
        >
          {{ label }}
        </span>
      </slot>
    </label>
  </span>
</template>
