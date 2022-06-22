<template>
  <div class="overflow-hidden" :class="props.notRounded ? undefined : 'rounded'">
    <div class="flex p-16px" :class="typeClasses.headerClass">
      <component v-if="!props.noIcon && typeIcons.icon" :is="typeIcons.icon" class="m-4px mr-8px" />
      <div class="flex-1">
        <slot />
      </div>
      <button class="m-4px ml-8px h-16px" @click="emit('dismiss')" aria-label="Dismiss">
        <IconActionDeleteLarge v-if="dismissible" />
      </button>
    </div>
    <div v-if="slots.body" class="p-16px" :class="typeClasses.bodyClass">
      <slot name="body" />
    </div>
    <div v-if="slots.details" class="p-16px border-t-1" :class="[typeClasses.bodyClass, typeClasses.borderClass]">
      <button class="flex" :class="typeClasses.detailsHeaderClass" @click="detailsExpanded = !detailsExpanded">
        <component :is="typeIcons.chevron" class="m-4px ml-0" :class="!detailsExpanded ? 'transform -rotate-90' : ''" />
        {{ props.detailsTitle }}
      </button>
      <div v-if="detailsExpanded" class="mt-8px">
        <slot name="details" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots, h, type FunctionalComponent, ref } from 'vue'
import {
  IconChevronDownSmall, IconActionDeleteLarge,
  IconWarningCircle, IconCheckmarkOutline,
} from '@cypress-design/vue-icon'
import { alertClasses, type AlertStatus } from '../constants'

const detailsExpanded = ref(false)

const slots = useSlots()

const props = withDefaults(defineProps<{
  type?: AlertStatus
  detailsTitle?: string
  dismissible?: boolean
  noIcon?: boolean
  notRounded?: boolean
}>(), {
  type: 'info',
  detailsTitle: 'Additional details',
})

const typeClasses = computed(() => {
  return alertClasses[props.type]
})

const typeIcons = computed(() => {
  const icons: Record<AlertStatus, {
    icon?: FunctionalComponent,
    chevron?: FunctionalComponent
  }> = {
    info: {},
    error: {
      icon: () => h(IconWarningCircle, alertClasses[props.type].iconProps),
    },
    warning: {
      icon: () => h(IconWarningCircle, alertClasses[props.type].iconProps),
    },
    success: {
      icon: () => h(IconCheckmarkOutline, alertClasses[props.type].iconProps),
    },
  }
  const icon = icons[props.type]
  icon.chevron = () => h(IconChevronDownSmall, alertClasses[props.type].iconChevronProps)

  return icon
})

const emit = defineEmits<{
  (event: 'dismiss'): void,
}>()
</script>
