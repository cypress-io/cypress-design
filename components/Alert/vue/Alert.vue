<template>
  <div v-if="!dismissed" class="overflow-hidden" :class="props.notRounded ? undefined : 'rounded'">
    <div class="flex p-16px" :class="typeClasses.headerClass">
      <component v-if="!props.noIcon && typeIcons.icon" :is="typeIcons.icon" class="my-4px mr-8px" />
      <div class="flex-1 font-medium">
        <slot />
      </div>
      <button class="m-4px ml-8px h-16px" @click="dismiss" aria-label="Dismiss">
        <IconActionDeleteLarge v-if="dismissible" />
      </button>
    </div>
    <div v-if="slots.body" class="p-16px" :class="typeClasses.bodyClass">
      <slot name="body" />
    </div>
    <div v-if="slots.details" class="p-16px border-t-1" :class="[typeClasses.bodyClass, typeClasses.borderClass]">
      <button class="flex font-medium" :class="typeClasses.detailsHeaderClass"
        @click="detailsExpanded = !detailsExpanded">
        <component :is="typeIcons.chevron" class="my-4px mr-8px"
          :class="!detailsExpanded ? 'transform -rotate-90' : ''" />
        {{ props.detailsTitle }}
      </button>
      <div v-if="detailsExpanded" class="mt-8px">
        <slot name="details" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots, h, type FunctionalComponent, ref, onMounted } from 'vue'
import {
  IconChevronDownSmall, IconActionDeleteLarge,
  IconWarningCircle, IconCheckmarkOutline,
} from '@cypress-design/vue-icon'
import { alertClasses, type AlertType } from '../constants'

const detailsExpanded = ref(false)
const dismissed = ref(false)

const slots = useSlots()

const props = withDefaults(defineProps<{
  type?: AlertType
  detailsTitle?: string
  dismissible?: boolean
  noIcon?: boolean
  notRounded?: boolean
  duration?: number
}>(), {
  type: 'info',
  detailsTitle: 'Additional details',
})

const typeClasses = computed(() => {
  return alertClasses[props.type]
})

let timeout: NodeJS.Timeout | undefined

onMounted(() => {
  if (props.duration) {
    timeout = setTimeout(dismiss, props.duration)
  }
})

function dismiss() {
  dismissed.value = true
  emit('dismiss')
  if (timeout) {
    clearTimeout(timeout)
    timeout = undefined
  }
}

const typeIcons = computed(() => {
  const icons = {
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
  const icon: {
    icon?: FunctionalComponent,
    chevron?: FunctionalComponent
  } = icons[props.type]
  icon.chevron = () => h(IconChevronDownSmall, alertClasses[props.type].iconChevronProps)

  return icon
})

const emit = defineEmits<{
  (event: 'dismiss'): void,
}>()
</script>
