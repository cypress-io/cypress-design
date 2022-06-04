<script lang="ts" setup>
import { ref, computed } from 'vue'
import { IconCheckmarkSmall } from '@cypress-design/vue-icon'
type CheckboxColor = 'red' | 'indigo' | 'jade'

const props = withDefaults(
  defineProps<{
    id?: string
    modelValue?: boolean
    color?: CheckboxColor
    label?: string
    disabled?: boolean
    checked?: boolean
  }>(),
  {
    id: crypto.randomUUID(),
    color: 'indigo',
  }
)

const localChecked = ref(props.modelValue || props.checked)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

function updated() {
  localChecked.value = !localChecked.value
  emit('update:modelValue', localChecked.value)
}

const checkboxClasses = computed(() => [
  'block border-1 rounded h-16px w-16px flex items-center text-white',
  props.disabled
    ? 'border-gray-200 bg-gray-100'
    : localChecked.value
      ? {
        'border-indigo-500 bg-indigo-400': props.color === 'indigo',
        'border-jade-500 bg-jade-400': props.color === 'jade',
        'border-red-500 bg-red-400': props.color === 'red',
      }
      : 'border-gray-200 bg-white']
)

</script>

<template>
  <label class="relative flex items-center">
    <input :id="id" class="absolute inset-0 w-0 h-0 opacity-0" :name="id" type="checkbox" @change="updated"
      :disabled="props.disabled" :checked="localChecked" />
    <span :class="checkboxClasses">
      <IconCheckmarkSmall v-if="localChecked" strokeColor="white" class="-m-1px" />
    </span>
    <slot name="label">
      <span v-if="label"
        :class="['block ml-2 text-16px leading-normal font-light select-none', disabled ? 'text-gray-500' : 'text-gray-800']">
        {{ label }}
      </span>
    </slot>
  </label>
</template>
