<template>
  <div v-if="!dismissed" class="overflow-hidden" :class="props.notRounded ? undefined : 'rounded'">
    <div class="flex p-16px" :class="typeClasses.headerClass">
      <!-- @slot replace the default left icon here -->
      <slot name="icon" v-bind="computedIconProps">
        <component v-if="!props.noIcon && typeIcons.icon" :is="typeIcons.icon" v-bind="computedIconProps" />
      </slot>
      <div class="flex-1 font-medium">
        <!-- @slot title of the alert -->
        <slot />
      </div>
      <button class="m-4px ml-8px h-16px" @click="dismiss" aria-label="Dismiss">
        <IconActionDeleteLarge v-if="dismissible" />
      </button>
    </div>
    <div v-if="slots.body" class="p-16px" :class="typeClasses.bodyClass">
      <!-- @slot body/details of the alert -->
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
        <!--@slot Togglable additional details-->
        <slot name="details" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots, h, type FunctionalComponent, ref, onMounted, onUnmounted } from 'vue'
import {
  IconChevronDownSmall, IconActionDeleteLarge,
  IconWarningCircle, IconCheckmarkOutline,
} from '@cypress-design/vue-icon'
import type { AlertType } from '../constants'
import { alertClasses } from '../constants'

const detailsExpanded = ref(false)
const dismissed = ref(false)

const slots = useSlots()

const emit = defineEmits<{
  /**
   * Clicking on the dismiss button or dismissed after a timeout
   */
  (event: 'dismiss'): void,
}>()

const props = withDefaults(defineProps<{
  /**
   * Color scheme
   */
  type?: AlertType
  /**
   * If details are provided,text used in the toggle button
   */
  detailsTitle?: string
  /**
   * Show the dismiss button
   */
  dismissible?: boolean
  /**
   * When an icon is displayed by default, use this to remove it
   */
  noIcon?: boolean
  /**
   * If you need square corners
   */
  notRounded?: boolean
  /**
   * Dismiss the alert after a delay (in ms)
   */
  duration?: number
}>(), {
  type: 'info',
  detailsTitle: 'Additional details',
})

const typeClasses = computed(() => {
  return alertClasses[props.type]
})

let timeout: number | undefined

onMounted(() => {
  if (props.duration) {
    timeout = setTimeout(dismiss, props.duration) as any
  }
})

onUnmounted(() => {
  if (timeout) {
    clearTimeout(timeout)
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

const computedIconProps = computed(() => {
  return {
    ...alertClasses[props.type].iconProps,
    class: 'my-4px mr-8px'
  }
})

const typeIcons = computed(() => {
  const icons = {
    info: {},
    error: {
      icon: () => h(IconWarningCircle, computedIconProps.value),
    },
    warning: {
      icon: () => h(IconWarningCircle, computedIconProps.value),
    },
    success: {
      icon: () => h(IconCheckmarkOutline, computedIconProps.value),
    },
  }
  const icon: {
    icon?: FunctionalComponent,
    chevron?: FunctionalComponent
  } = icons[props.type]
  icon.chevron = () => h(IconChevronDownSmall, alertClasses[props.type].iconChevronProps)

  return icon
})
</script>
