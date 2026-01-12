<script lang="ts">
import { PropType, computed, defineComponent, ref } from 'vue'
import {
  DefaultTheme,
  DefaultVariant,
  DefaultSize,
  CssStaticClasses,
  CssVariantClassesTable,
  CssRoundedClasses,
  IconColors,
  DividerClasses,
  LabelClasses,
  type TextboxTheme,
  type TextboxVariant,
  type TextboxSize,
} from '@cypress-design/constants-textbox'

export default defineComponent({
  name: 'Textbox',
  props: {
    theme: {
      type: String as PropType<TextboxTheme>,
      default: DefaultTheme,
    },
    variant: {
      type: String as PropType<TextboxVariant>,
      default: DefaultVariant,
    },
    size: {
      type: String as PropType<TextboxSize>,
      default: DefaultSize,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    labelLeft: {
      type: [String, Object] as PropType<string | unknown>,
    },
    iconLeft: {
      type: [Object, Function] as PropType<unknown>,
    },
    divider: {
      type: Boolean,
      default: false,
    },
    iconRight: {
      type: [Object, Function] as PropType<unknown>,
    },
    labelRight: {
      type: [String, Object] as PropType<string | unknown>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<
        'text' | 'password' | 'email' | 'search' | 'tel' | 'url'
      >,
      default: 'text',
    },
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    'aria-label': {
      type: String,
    },
    'aria-invalid': {
      type: [Boolean, String] as PropType<
        boolean | 'false' | 'true' | 'grammar' | 'spelling'
      >,
    },
    'aria-describedby': {
      type: String,
    },
  },
  emits: {
    'update:modelValue': (value: string) => typeof value === 'string',
    input: (event: Event) => event instanceof Event,
    focus: (event: FocusEvent) => event instanceof FocusEvent,
    blur: (event: FocusEvent) => event instanceof FocusEvent,
  },
  setup(props, { emit }) {
    // Track focus state to switch from placeholder to default when focused
    const isFocused = ref(false)

    // Determine current state based on priority
    // Once any value is typed, use default state (not placeholder)
    const hasValue = computed(() => {
      const value = props.modelValue ?? ''
      return value && String(value).trim() !== ''
    })
    const isPlaceholder = computed(() => !hasValue.value)

    const stateKey = computed<'placeholder' | 'default' | 'disabled'>(() => {
      if (props.disabled) return 'disabled'
      // Priority: placeholder (only if empty AND not focused) > default
      // When focused OR has value, use default state (so active styles show)
      if (isPlaceholder.value && props.placeholder && !isFocused.value)
        return 'placeholder'
      return 'default'
    })

    // Build variant class key
    const variantKey = computed(() => {
      return `${props.theme}-${props.variant}-${stateKey.value}` as keyof typeof CssVariantClassesTable
    })

    // Get variant classes
    const variantClasses = computed(() => {
      return CssVariantClassesTable[variantKey.value] || ''
    })

    // Extract padding and height from size
    const paddingClass = computed(() => {
      return props.size === '32' ? 'px-[12px]' : 'px-[16px]'
    })

    const heightClass = computed(() => {
      return props.size === '32'
        ? 'h-[32px]'
        : props.size === '40'
          ? 'h-[40px]'
          : 'h-[48px]'
    })

    // Get rounded classes
    const roundedClasses = computed(() => {
      return CssRoundedClasses[
        props.rounded as unknown as keyof typeof CssRoundedClasses
      ]
    })

    // Build wrapper classes
    const wrapperClasses = computed(() => {
      return [
        CssStaticClasses,
        variantClasses.value,
        roundedClasses.value,
        heightClass.value,
        'group',
      ]
    })

    // Build input container classes
    const inputContainerClasses = computed(() => {
      return ['flex-1 flex items-center gap-[12px] min-w-0', paddingClass.value]
    })

    // Build input classes
    const inputClasses = computed(() => {
      return [
        'flex-1 min-w-0 outline-none bg-transparent border-0',
        'text-[14px] leading-[20px]',
        'placeholder:text-gray-500 dark:placeholder:text-gray-400',
      ]
    })

    // Get icon colors
    const iconColorKey = computed(() => {
      return `${props.theme}-${props.variant}-${stateKey.value}` as keyof typeof IconColors
    })

    const iconColors = computed(() => {
      return (
        IconColors[iconColorKey.value] || {
          strokeColor: 'gray-600',
          fillColor: 'transparent',
        }
      )
    })

    // Get divider classes
    const dividerClasses = computed(() => {
      return DividerClasses[props.theme]
    })

    // Get label classes
    const labelClasses = computed(() => {
      return LabelClasses[props.theme]
    })

    // Determine aria-invalid value
    const ariaInvalidValue = computed(() => {
      if (props['aria-invalid'] !== undefined) {
        return props['aria-invalid']
      }
      return props.variant === 'invalid' ? true : undefined
    })

    // Get aria-label and aria-describedby from props
    const ariaLabel = computed(() => props['aria-label'])
    const ariaDescribedBy = computed(() => props['aria-describedby'])

    // Handle input event
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      const newValue = target.value
      emit('update:modelValue', newValue)
      emit('input', event)
      // Value is automatically tracked via modelValue prop in Vue
    }

    // Icon props for left and right icons
    const iconLeftProps = computed(() => {
      if (!props.iconLeft) return null
      return {
        size: '16',
        strokeColor: iconColors.value.strokeColor,
        fillColor: iconColors.value.fillColor,
        class: 'shrink-0',
      }
    })

    const iconRightProps = computed(() => {
      if (!props.iconRight) return null
      return {
        size: '16',
        strokeColor: iconColors.value.strokeColor,
        fillColor: iconColors.value.fillColor,
        class: 'shrink-0',
      }
    })

    const handleFocus = (event: FocusEvent) => {
      isFocused.value = true
      emit('focus', event)
    }

    const handleBlur = (event: FocusEvent) => {
      isFocused.value = false
      emit('blur', event)
    }

    return {
      isPlaceholder,
      stateKey,
      wrapperClasses,
      inputContainerClasses,
      inputClasses,
      iconColors,
      dividerClasses,
      labelClasses,
      ariaInvalidValue,
      ariaLabel,
      ariaDescribedBy,
      handleInput,
      handleFocus,
      handleBlur,
      iconLeftProps,
      iconRightProps,
    }
  },
})
</script>

<template>
  <div :class="wrapperClasses">
    <!-- Label Left -->
    <span
      v-if="labelLeft"
      :class="[
        labelClasses,
        'px-[16px] shrink-0',
        rounded
          ? 'rounded-bl-[38px] rounded-tl-[38px]'
          : 'rounded-bl-[4px] rounded-tl-[4px]',
      ]"
    >
      {{ labelLeft }}
    </span>

    <!-- Input Container -->
    <div :class="inputContainerClasses">
      <!-- Icon Left -->
      <component :is="iconLeft" v-if="iconLeft" v-bind="iconLeftProps" />

      <!-- Divider -->
      <div v-if="divider && iconLeft" :class="[dividerClasses, 'shrink-0']" />

      <!-- Input -->
      <input
        :id="id"
        :type="type"
        :class="inputClasses"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :name="name"
        :autofocus="autofocus"
        :aria-label="ariaLabel"
        :aria-invalid="ariaInvalidValue"
        :aria-describedby="ariaDescribedBy"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Icon Right -->
      <component :is="iconRight" v-if="iconRight" v-bind="iconRightProps" />
    </div>

    <!-- Label Right -->
    <span
      v-if="labelRight"
      :class="[
        labelClasses,
        'px-[16px] shrink-0',
        rounded
          ? 'rounded-br-[38px] rounded-tr-[38px]'
          : 'rounded-br-[4px] rounded-tr-[4px]',
      ]"
    >
      {{ labelRight }}
    </span>
  </div>
</template>
