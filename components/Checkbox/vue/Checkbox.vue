<script lang="ts">
function uid() {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ''
  )
}
</script>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { IconCheckmarkSmall } from '@cypress-design/vue-icon'
import { CheckboxColors, Classes } from '@cypress-design/constants-checkbox'

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
    modelValue?: boolean
    /**
     * Label for the checkbox.
     * It is very important to set this to make the checkbox accessible.
     */
    label?: string
  }>(),
  {
    id: () => uid(),
    color: 'indigo',
  }
)

const localChecked = ref(props.modelValue || props.checked)

const emit = defineEmits<{
  /**
   * Fired when the checkbox changes value
   * @arg value - The next value of the checkbox
   */
  (event: 'update:modelValue', value: boolean): void
}>()

function updated() {
  localChecked.value = !localChecked.value
  emit('update:modelValue', localChecked.value)
}

const checkboxClasses = computed(() =>
  props.disabled
    ? CheckboxColors.disabled
    : localChecked.value
    ? CheckboxColors[props.color]
    : CheckboxColors.empty
)
</script>

<template>
  <span class="relative flex items-center">
    <input
      :id="id"
      :class="Classes.hiddenInput"
      :name="name || id"
      type="checkbox"
      @change="updated"
      :disabled="props.disabled"
      :checked="localChecked"
    />
    <label :class="Classes.labelTag" :for="id">
      <IconCheckmarkSmall
        v-if="localChecked"
        strokeColor="white"
        class="absolute"
      />
      <span :class="[checkboxClasses, Classes.visibleCheckbox]" />
      <slot name="label">
        <span
          v-if="label"
          :class="[
            Classes.trueLabel,
            disabled ? 'text-gray-500' : 'text-gray-800 dark:text-gray-200',
          ]"
        >
          {{ label }}
        </span>
      </slot>
    </label>
  </span>
</template>