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
import { RadioColors, Classes } from '@cypress-design/constants-radio'

const props = withDefaults(
  defineProps<{
    /**
     * A unique identifier for the radio on the whole page.
     * It will be used to give match label with input for a11y.
     */
    id?: string
    /**
     * Name attribute of the <input type="radio"/>.
     */
    name?: string
    /**
     * Is the radio checked when it is first rendered.
     */
    checked?: boolean
    /**
     * The color of the background in the radio.
     */
    color?: 'red' | 'indigo' | 'jade'
    /**
     * If the radio is disabled, it will not be clickable.
     */
    disabled?: boolean
    modelValue?: boolean | Array<string>
    /**
     * Label for the radio.
     * It is very important to set this to make the radio accessible.
     */
    label?: string
    /**
     * Body content for the radio (for example, description text for the Radio field)
     */
    // body?: string
  }>(),
  {
    id: uid(),
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
  /**
   * Fired when the radio changes value
   * @arg value - The next value of the radio
   */
  (event: 'update:modelValue', value: boolean | Array<string>): void
  (event: 'change', value: boolean): void
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

const radioClasses = computed(() =>
  props.disabled
    ? RadioColors.disabled
    : localChecked.value
      ? RadioColors[props.color]
      : RadioColors.empty,
)
</script>

<template>
  <span class="relative flex items-center">
    <input
      :id="id"
      :class="Classes.hiddenInput"
      :name="name || id"
      type="radio"
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
      <span :class="[radioClasses, Classes.visibleCheckbox]" />
      <slot name="label">
        <span
          v-if="label"
          :class="[
            Classes.trueLabel,
            disabled ? 'text-gray-500' : 'text-gray-800',
          ]"
        >
          {{ label }}
        </span>
      </slot>
    </label>
  </span>
</template>
