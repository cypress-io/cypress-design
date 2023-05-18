<script lang="ts" setup>
import {
  InputProps,
  DefaultSize,
  DefaultVariant,
  SizeClassesTable,
  VariantClassesTable,
  IconStaticClasses,
  ResetStaticClasses,
  ResultStaticClass,
  StaticClasses,
  inputClasses,
  StaticInputClasses,
} from '@cypress-design/constants-input'
import {
  IconObjectMagnifyingGlass,
  IconActionDeleteLarge,
} from '@cypress-design/vue-icon'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: InputProps['variant']
    disabled?: boolean
    value?: string
    size?: InputProps['size']
    placeholder?: string
    customIcon?: any
    isSearch?: boolean
    searchResults?: InputProps['searchResults']
    clearable?: boolean
  }>(),
  {
    variant: DefaultVariant,
    disabled: false,
    value: '',
    size: DefaultSize,
    isSearch: false,
  }
)

const finalIsDisabled = computed(() => {
  return props.disabled || props.variant === 'disabled'
})

const finalVariant = computed(() => {
  return finalIsDisabled.value ? 'disabled' : props.variant
})

const emit = defineEmits<{
  (event: 'change', value: string): void
  (event: 'reset'): void
}>()

const Icon = computed(() =>
  props.customIcon ?? props.isSearch ? IconObjectMagnifyingGlass : null
) as any
</script>

<template>
  <div
    :class="[
      StaticClasses,
      VariantClassesTable[finalVariant],
      SizeClassesTable[size],
      'group',
    ]"
  >
    <Icon
      v-if="Icon"
      :class="IconStaticClasses"
      :strokeColor="inputClasses[finalVariant].icon"
      :focus-within-stroke-color="
        finalVariant === 'default' ? inputClasses.active.icon : undefined
      "
      data-cy="text-input--search-icon"
      interactive-colors-on-group
    />
    <input
      type="text"
      :value="value"
      :disabled="finalIsDisabled"
      :class="StaticInputClasses"
      v-bind="$attrs"
    />

    <button
      v-if="clearable && value"
      type="button"
      :class="ResetStaticClasses"
      @click="emit('reset')"
    >
      <IconActionDeleteLarge
        :strokeColor="inputClasses.default.icon"
        :focus-within-stroke-color="inputClasses[finalVariant].icon"
        interactive-colors-on-group
      />
    </button>

    <p
      v-if="searchResults"
      data-cy="text-input--search-results"
      :class="ResultStaticClass"
    >
      {{ searchResults.match }} of {{ searchResults.total }}
      {{ searchResults.entity }}
    </p>
  </div>
</template>
