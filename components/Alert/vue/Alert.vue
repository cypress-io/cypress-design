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
  CssAlertSizesClasses,
  AlertVariant,
  defaultAlertSize,
  defaultAlertTitle,
  defaultAlertVariant,
  CssAlertClasses,
} from '@cypress-design/constants-alert'

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
    variant?: AlertVariant
    /**
     * Color scheme
     * @deprecated use `variant` instead
     */
    type?: AlertVariant
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
    size?: typeof defaultAlertSize | AlertSize
  }>(),
  {
    variant: undefined,
    type: defaultAlertVariant,
    detailsTitle: defaultAlertTitle,
    size: defaultAlertSize,
  },
)

const variant = computed(() => {
  return props.variant ?? props.type
})

const detailsRef = ref(null)
const contentRef = ref(null)

const variantClasses = computed(() => {
  return CssAlertClasses[variant.value] ?? {}
})

let timeout: number | undefined

onMounted(() => {
  if (props.duration) {
    timeout = setTimeout(dismiss, props.duration)
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
    strokeColor: variantClasses.value.iconColor,
    class: 'my-[4px] mr-[8px]',
  }
})

const icon: ComputedRef<FunctionalComponent | null> = computed(() => {
  switch (variant.value) {
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
  return CssAlertSizesClasses[props.size] ?? {}
})
</script>

<template>
  <div
    v-if="!dismissed"
    class="overflow-hidden text-left"
    :class="[variantClasses.wrapperClass, { rounded: !props.notRounded }]"
  >
    <div class="flex" :class="[variantClasses.headerClass, sizeClasses]">
      <!--
        @slot replace the default left icon here
        @binding strokeColor - a windicolor that to be passed to `strokeColor`
        @binding class - the class this icon should have (for utility css purposes)
			-->
      <slot name="icon" v-bind="computedIconProps">
        <component
          :is="icon"
          v-if="!props.noIcon && icon"
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
        aria-label="Dismiss"
        @click="dismiss"
      >
        <IconActionDeleteLarge :stroke-color="variantClasses.iconCloseColor" />
      </button>
    </div>
    <div v-if="slots.body" class="p-[16px]" :class="variantClasses.bodyClass">
      <!-- @slot body/details of the alert -->
      <slot name="body" />
    </div>
    <details
      v-if="slots.details"
      ref="detailsRef"
      class="p-[16px] border-t border-t-1"
      :class="[variantClasses.bodyClass, variantClasses.borderClass]"
    >
      <summary
        class="flex font-medium cursor-pointer details-none"
        :class="variantClasses.detailsHeaderClass"
      >
        <IconChevronDownSmall
          :strokeColor="variantClasses.iconChevronColor"
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
    <template v-if="$slots.footer">
      <div :class="variantClasses.bodyClass">
        <!--@slot A box to add buttons or additional content -->
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>
