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
import {
  RadioColors,
  Classes,
  RadioProps,
} from '@cypress-design/constants-radio'

const props = withDefaults(
  defineProps<
    RadioProps & {
      /**
       * Label for the checkbox.
       * It is very important to set this to make the checkbox accessible.
       */
      label?: string
    }
  >(),
  {
    id: () => uid(),
    color: 'indigo',
  },
)

const localChecked = ref(props.checked)

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
  emit('change', localChecked.value)
}

const checkboxClasses = computed(() =>
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
      @click="updated"
      :disabled="props.disabled"
      :checked="localChecked"
    />
    <label :class="Classes.labelTag" :for="id">
      <div :class="[Classes.wrapper]">
        <span :class="[Classes.visibleRadio]" />
        <span
          v-if="localChecked"
          :class="[checkboxClasses, Classes.visibleRadioIndicator]"
        />
      </div>
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
