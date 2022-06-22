<template>
  <div class="rounded overflow-hidden">
    <div class="flex p-16px" :class="classes.headerClass">
      <component v-if="!props.noIcon && classes.icon" :is="classes.icon" class="m-4px mr-8px" />
      <div class="flex-1">
        <slot />
      </div>
      <IconActionDeleteLarge v-if="dismissible" class="m-4px ml-8px" @click="emit('dismiss')" />
    </div>
    <div v-if="slots.body" class="p-16px" :class="computedBodyClass">
      <slot name="body" />
    </div>
    <div v-if="slots.details" class="p-16px border-t-1" :class="[computedBodyClass, classes.borderClass]">
      <div class="flex cursor-pointer" @click="detailsCollapsed = !detailsCollapsed">
        <component :is="classes.chevron" class="m-4px mr-8px" :class="detailsCollapsed ? 'transform -rotate-90' : ''" />
        Additional details
      </div>
      <slot v-if="!detailsCollapsed" name="details" />
    </div>
  </div>
</template>

<script lang="ts">
export type AlertStatus = 'error' | 'warning' | 'info' | 'success'

export type AlertClasses = {
  icon?: FunctionalComponent
  headerClass: string
  bodyClass: string
  borderClass: string
  chevron: FunctionalComponent
}

</script>

<script lang="ts" setup>
import { computed, useSlots, h, type FunctionalComponent, ref } from 'vue'
import {
  IconChevronDownSmall, IconActionDeleteLarge,
  IconWarningCircle, IconCheckmarkOutline,
} from '@cypress-design/vue-icon'

const alertStyles: Record<AlertStatus, AlertClasses> = {
  info: {
    headerClass: 'text-indigo-700 bg-indigo-100',
    bodyClass: 'bg-indigo-50 text-indigo-500',
    borderClass: 'border-indigo-100',
    chevron: () => h(IconChevronDownSmall, { strokeColor: 'indigo-500' }),
  },
  warning: {
    icon: () => h(IconWarningCircle, { strokeColor: 'orange-500' }),
    headerClass: 'text-orange-600 bg-orange-100',
    bodyClass: 'bg-orange-50 text-orange-500',
    borderClass: 'border-orange-100',
    chevron: () => h(IconChevronDownSmall, { strokeColor: 'orange-300' }),
  },
  error: {
    icon: () => h(IconWarningCircle, { strokeColor: 'red-500' }),
    headerClass: 'text-red-600 bg-red-100',
    bodyClass: 'bg-red-50 text-red-500',
    borderClass: 'border-red-100',
    chevron: () => h(IconChevronDownSmall, { strokeColor: 'red-300' }),
  },
  success: {
    icon: () => h(IconCheckmarkOutline, { strokeColor: 'jade-500' }),
    headerClass: 'text-jade-600 bg-jade-100',
    bodyClass: 'bg-jade-50 text-jade-500',
    borderClass: 'border-jade-100',
    chevron: () => h(IconChevronDownSmall, {
      strokeColor: 'jade-300',
    }),
  }
}

const detailsCollapsed = ref(true)

const slots = useSlots()

const props = withDefaults(defineProps<{
  type?: AlertStatus
  headerClass?: string
  bodyClass?: string
  dismissible?: boolean
  noIcon?: boolean
}>(), {
  type: 'info',
})

const classes = computed(() => {
  return {
    ...alertStyles[props.type],
    bodyClass: props.bodyClass ?? alertStyles[props.type].bodyClass,
    headerClass: props.headerClass ?? alertStyles[props.type].headerClass,
  }
})

const emit = defineEmits<{
  (event: 'dismiss'): void,
}>()

const computedBodyClass = computed(() => {
  return `${classes.value.bodyClass} ${props.bodyClass}`
})
</script>
