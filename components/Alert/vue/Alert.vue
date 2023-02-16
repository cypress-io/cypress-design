<script lang="ts" setup>
import type { FunctionalComponent, ComputedRef } from 'vue'
import { computed, useSlots, h, ref, onMounted, onUnmounted } from 'vue'
import {
  IconChevronDownSmall,
  IconActionDeleteLarge,
  IconWarningCircle,
  IconCheckmarkOutline,
} from '@cypress-design/vue-icon'
import { DetailsAnimation } from '@cypress-design/details-animation'
import {
  AlertSize,
  alertSizesClasses,
  AlertType,
  defaultAlertSize,
  defaultAlertTitle,
  defaultAlertType,
} from '../constants'
import { alertClasses } from '../constants'

const dismissed = ref(false)

const slots = useSlots()

const emit = defineEmits<{
  /**
   * Clicking on the dismiss button or dismissed after a timeout
   */
  (event: 'dismiss'): void
}>()

const props = withDefaults(
  defineProps<{
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
    /**
     * Size of the alert
     */
    size?: AlertSize
  }>(),
  {
    type: defaultAlertType,
    detailsTitle: defaultAlertTitle,
    size: defaultAlertSize,
  }
)

const detailsRef = ref(null)
const contentRef = ref(null)

const typeClasses = computed(() => {
  return alertClasses[props.type]
})

let timeout: number | undefined

onMounted(() => {
  if (props.duration) {
    timeout = setTimeout(dismiss, props.duration) as any
  }
})

onMounted(() => {
  if (detailsRef.value && contentRef.value) {
    new DetailsAnimation(detailsRef.value, contentRef.value)
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
    strokeColor: alertClasses[props.type].iconColor,
    class: 'my-[4px] mr-[8px]',
  }
})

const icon: ComputedRef<FunctionalComponent | null> = computed(() => {
  switch (props.type) {
    case 'info':
      return null
    case 'success':
      return () => h(IconCheckmarkOutline, computedIconProps.value)
    case 'warning':
      return () => h(IconWarningCircle, computedIconProps.value)
    case 'error':
      return () => h(IconWarningCircle, computedIconProps.value)
    default:
      return null
  }
})

const sizeClasses = computed(() => {
  return alertSizesClasses[props.size]
})
</script>

<template>
  <div
    v-if="!dismissed"
    class="overflow-hidden text-left"
    :class="props.notRounded ? undefined : 'rounded'"
  >
    <div class="flex" :class="[typeClasses.headerClass, sizeClasses]">
      <!-- @slot replace the default left icon here -->
      <slot name="icon" v-bind="computedIconProps">
        <component
          v-if="!props.noIcon && icon"
          :is="icon"
          v-bind="computedIconProps"
        />
      </slot>
      <div class="flex-1 font-medium">
        <!-- @slot title of the alert -->
        <slot />
      </div>
      <button
        v-if="dismissible"
        class="m-[4px] ml-[8px] h-[16px]"
        @click="dismiss"
        aria-label="Dismiss"
      >
        <IconActionDeleteLarge :stroke-color="typeClasses.iconCloseColor" />
      </button>
    </div>
    <div v-if="slots.body" class="p-[16px]" :class="typeClasses.bodyClass">
      <!-- @slot body/details of the alert -->
      <slot name="body" />
    </div>
    <details
      v-if="slots.details"
      class="p-[16px] border-t-1"
      ref="detailsRef"
      :class="[typeClasses.bodyClass, typeClasses.borderClass]"
    >
      <summary
        class="flex font-medium cursor-pointer details-none"
        :class="typeClasses.detailsHeaderClass"
      >
        <IconChevronDownSmall
          :strokeColor="typeClasses.iconChevronColor"
          class="icon my-[4px] mr-[8px] transition transform -rotate-90 open:rotate-0"
        />
        {{ props.detailsTitle }}
      </summary>
      <div ref="contentRef">
        <div>
          <!--@slot Togglable additional details-->
          <slot name="details" />
        </div>
      </div>
    </details>
  </div>
</template>
