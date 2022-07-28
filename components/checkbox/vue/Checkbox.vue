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
  (event: 'update:modelValue', value: boolean): void
}>()

function updated() {
  localChecked.value = !localChecked.value
  emit('update:modelValue', localChecked.value)
}

const checkboxClasses = computed(() => [
  'block border-1 rounded h-16px w-16px',
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
  <div class="relative flex items-center">
    <input :id="id" class="absolute inset-0 w-0 h-0 opacity-0" :name="name || id" type="checkbox" @change="updated"
      :disabled="props.disabled" :checked="localChecked" />
    <IconCheckmarkSmall v-if="localChecked" strokeColor="white" class="absolute" />
    <span :class="checkboxClasses" />
    <label class="block" :for="id">
      <slot name="label">
        <span v-if="label"
          :class="['ml-2 text-16px leading-normal font-light select-none', disabled ? 'text-gray-500' : 'text-gray-800']">
          {{ label }}
        </span>
      </slot>
    </label>
  </div>
</template>
