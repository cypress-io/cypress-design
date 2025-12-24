<script lang="ts">
import { PropType, computed, defineComponent, h, ref } from 'vue'
import Icon from '@cypress-design/vue-icon'
import {
  DefaultSize,
  DefaultVariant,
  CssSizeClassesTable,
  CssRoundedClasses,
  CssVariantClassesTableLight,
  CssVariantClassesTableDark,
  CssLabelClasses,
  CssLabelClassesDark,
} from '@cypress-design/constants-textbox'

import type {
  TextboxProps as TextboxPropsBase,
  TextboxSizes,
  TextboxVariants,
  TextboxRounded,
  TextboxStateStyles,
} from '@cypress-design/constants-textbox'

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    size: {
      type: String as PropType<NonNullable<TextboxPropsBase['size']>>,
      default: DefaultSize,
    },
    variant: {
      type: String as PropType<NonNullable<TextboxPropsBase['variant']>>,
      default: DefaultVariant,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    darkMode: {
      type: Boolean as PropType<TextboxPropsBase['darkMode']>,
      default: false,
    },
    labelLeft: {
      type: String as PropType<TextboxPropsBase['labelLeft']>,
    },
    labelRight: {
      type: String as PropType<TextboxPropsBase['labelRight']>,
    },
    iconLeft: {
      type: [Object, String] as PropType<TextboxPropsBase['iconLeft'] | string>,
    },
    iconRight: {
      type: [Object, String] as PropType<
        TextboxPropsBase['iconRight'] | string
      >,
    },
    disabled: {
      type: Boolean as PropType<TextboxPropsBase['disabled']>,
      default: false,
    },
    placeholder: {
      type: String as PropType<TextboxPropsBase['placeholder']>,
    },
    modelValue: {
      type: String as PropType<TextboxPropsBase['value']>,
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
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (value: string) => !!value,
    change: (event: Event) => !!event,
    focus: (event: FocusEvent) => !!event,
    blur: (event: FocusEvent) => !!event,
  },
  setup(props, { emit }) {
    // Track keyboard focus for CSS class (minimal JS needed to distinguish keyboard vs mouse)
    const isKeyboardFocus = ref(false)
    const isFocused = ref(false)

    // Use disabled variant if disabled prop is true OR variant is 'disabled'
    const finalVariant = computed<TextboxVariants>(() =>
      props.disabled || props.variant === 'disabled'
        ? 'disabled'
        : props.variant || DefaultVariant,
    )
    const isActuallyDisabled = computed(
      () => props.disabled || props.variant === 'disabled',
    )

    // Check if input is empty (showing placeholder)
    const isEmpty = computed(() => !props.modelValue || props.modelValue === '')

    // Determine the state style based on user interaction and input state
    // Default to 'default' style - only show 'placeholder' style when input is empty and has placeholder
    // Priority: focus (keyboard) > active (click) > hover > placeholder (if empty) > default
    const stateStyle = computed<TextboxStateStyles>(() => {
      if (!isActuallyDisabled.value && finalVariant.value !== 'disabled') {
        // Only show placeholder style if input is empty AND has placeholder attribute
        if (props.placeholder && isEmpty.value) {
          return 'placeholder'
        }
        // Otherwise, always use 'default' style (hover/active/focus handled by CSS)
      }
      return 'default'
    })

    // Get variant table based on dark mode
    const variantTable = computed(() =>
      props.darkMode ? CssVariantClassesTableDark : CssVariantClassesTableLight,
    )

    // Get the style classes for the current variant and state
    const stateVariant = computed(() =>
      finalVariant.value === 'disabled' ? 'disabled' : finalVariant.value,
    )
    const variantStyles = computed(() => variantTable.value[stateVariant.value])
    const baseStyleClasses = computed(() => {
      const styles = variantStyles.value
      return stateStyle.value in styles
        ? styles[stateStyle.value as keyof typeof styles]
        : styles.default
    })

    // Get hover, active, and focus classes for CSS (only if variant supports them)
    const hoverClasses = computed(() =>
      'hover' in variantStyles.value ? variantStyles.value.hover : null,
    )
    const activeClasses = computed(() =>
      'active' in variantStyles.value ? variantStyles.value.active : null,
    )
    const focusClasses = computed(() =>
      'focus' in variantStyles.value ? variantStyles.value.focus : null,
    )

    // Get label classes based on dark mode
    const labelTable = computed(() =>
      props.darkMode ? CssLabelClassesDark : CssLabelClasses,
    )

    // Convert boolean rounded to string key
    const roundedKey = computed<TextboxRounded>(() =>
      props.rounded ? 'true' : 'false',
    )

    // Build container classes
    const containerClasses = computed(() => [
      'relative',
      CssSizeClassesTable[props.size],
      CssRoundedClasses[roundedKey.value],
    ])

    // Build label classes
    const labelLeftClasses = computed(() =>
      props.labelLeft
        ? [
            'flex items-center h-full',
            labelTable.value.background,
            labelTable.value.stroke,
            labelTable.value.text,
            labelTable.value.padding,
            'border-r',
            labelTable.value.rounded[roundedKey.value],
          ]
        : null,
    )

    const labelRightClasses = computed(() =>
      props.labelRight
        ? [
            'flex items-center h-full',
            labelTable.value.background,
            labelTable.value.stroke,
            labelTable.value.text,
            labelTable.value.padding,
            'border-l',
            roundedKey.value === 'true'
              ? 'rounded-br-[28px] rounded-tr-[28px]'
              : 'rounded-br-[4px] rounded-tr-[4px]',
          ]
        : null,
    )

    // Icon wrapper classes
    const iconWrapperClasses =
      'flex items-center justify-center shrink-0 w-[16px] h-[16px]'

    // Placeholder classes
    const placeholderClasses = computed(() => {
      if (displayVariant.value === 'placeholder') {
        return props.darkMode
          ? 'placeholder:text-gray-400'
          : 'placeholder:text-[#5a5f7a]'
      }
      return props.darkMode
        ? 'placeholder:text-gray-400'
        : 'placeholder:text-gray-700'
    })

    // Check if icon is a string
    const isIconLeftString = computed(() => typeof props.iconLeft === 'string')
    const isIconRightString = computed(
      () => typeof props.iconRight === 'string',
    )

    function handleInput(event: Event) {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
      emit('change', event)
    }

    function handleMouseDown() {
      isKeyboardFocus.value = false
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Tab') {
        isKeyboardFocus.value = true
      }
    }

    function handleFocus(event: FocusEvent) {
      isFocused.value = true
      // If no keyboard flag was set, assume mouse (click)
      if (!isKeyboardFocus.value) {
        isKeyboardFocus.value = false
      }
      emit('focus', event)
    }

    function handleBlur(event: FocusEvent) {
      isFocused.value = false
      isKeyboardFocus.value = false
      emit('blur', event)
    }

    return {
      finalVariant,
      baseStyleClasses,
      hoverClasses,
      activeClasses,
      focusClasses,
      labelTable,
      containerClasses,
      labelLeftClasses,
      labelRightClasses,
      iconWrapperClasses,
      placeholderClasses,
      roundedKey,
      CssRoundedClasses,
      isActuallyDisabled,
      isKeyboardFocus,
      isFocused,
      Icon,
      isIconLeftString,
      isIconRightString,
      handleInput,
      handleMouseDown,
      handleKeyDown,
      handleFocus,
      handleBlur,
      stateStyle,
    }
  },
})
</script>

<template>
  <div class="relative w-full flex items-center">
    <!-- Left Label -->
    <div v-if="labelLeft" :class="labelLeftClasses">
      <span class="text-[14px] leading-[20px]">{{ labelLeft }}</span>
    </div>

    <!-- Input Container -->
    <div
      :class="[
        'relative flex-1 group',
        containerClasses,
        isKeyboardFocus ? 'textbox-keyboard-focus' : '',
      ]"
    >
      <!-- Outer border for hover state - CSS handles this -->
      <div
        v-if="
          !isActuallyDisabled &&
          finalVariant !== 'disabled' &&
          hoverClasses &&
          hoverClasses.strokeOutside
        "
        :class="[
          'absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity',
          hoverClasses.strokeOutside.includes('border-[3px]')
            ? '-inset-[1.5px]'
            : '-inset-[1px]',
          CssRoundedClasses[roundedKey],
          hoverClasses.strokeOutside,
          'z-0',
        ]"
      />

      <!-- Outer border for active state (mouse click) - CSS handles this -->
      <div
        v-if="
          !isActuallyDisabled &&
          finalVariant !== 'disabled' &&
          activeClasses &&
          activeClasses.strokeOutside
        "
        :class="[
          'absolute pointer-events-none opacity-0 transition-opacity',
          'group-focus-within:opacity-100',
          'group-focus-within.textbox-keyboard-focus:opacity-0',
          activeClasses.strokeOutside.includes('border-[3px]')
            ? '-inset-[1.5px]'
            : '-inset-[1px]',
          CssRoundedClasses[roundedKey],
          activeClasses.strokeOutside,
          'z-0',
        ]"
      />

      <!-- Outer border for focus state (keyboard Tab) - CSS handles this -->
      <div
        v-if="
          !isActuallyDisabled &&
          finalVariant !== 'disabled' &&
          focusClasses &&
          focusClasses.strokeOutside
        "
        :class="[
          'absolute pointer-events-none opacity-0 transition-opacity',
          'group-focus-within.textbox-keyboard-focus:opacity-100',
          focusClasses.strokeOutside.includes('border-[3px]')
            ? '-inset-[1.5px]'
            : '-inset-[1px]',
          CssRoundedClasses[roundedKey],
          focusClasses.strokeOutside,
          'z-0',
        ]"
      />

      <!-- Input Background with inner border - CSS handles state changes -->
      <div
        :class="[
          'absolute inset-0 pointer-events-none transition-colors',
          CssRoundedClasses[roundedKey],
          // Base state (default or placeholder)
          baseStyleClasses.background,
          // Base border width - only 1px when not focused
          !isFocused && 'border-[1px]',
          baseStyleClasses.stroke,
          // Hover state - only apply when not focused (using prefixed versions from constants)
          !isActuallyDisabled &&
            finalVariant !== 'disabled' &&
            !isFocused &&
            hoverClasses &&
            'groupHoverBackground' in hoverClasses &&
            'groupHoverStroke' in hoverClasses && [
              hoverClasses.groupHoverBackground,
              hoverClasses.groupHoverStroke,
            ],
          // Active state (mouse click) - CSS with class check (using prefixed versions from constants)
          // Only apply when actually focused (not keyboard focus) - uses 1px border
          !isActuallyDisabled &&
            finalVariant !== 'disabled' &&
            isFocused &&
            !isKeyboardFocus &&
            activeClasses &&
            'groupFocusWithinBackground' in activeClasses &&
            'groupFocusWithinStroke' in activeClasses && [
              'border-[1px]', // Explicitly set 1px border for active state
              activeClasses.groupFocusWithinBackground,
              activeClasses.groupFocusWithinStroke,
            ],
          // Focus state (keyboard Tab) - CSS with focus-visible for keyboard navigation - uses 2px border
          !isActuallyDisabled &&
            finalVariant !== 'disabled' &&
            focusClasses &&
            'groupFocusVisibleBackground' in focusClasses &&
            'groupFocusVisibleStroke' in focusClasses && [
              focusClasses.groupFocusVisibleBackground,
              // Split the stroke classes to ensure border-2 is applied correctly
              ...(focusClasses.groupFocusVisibleStroke as string).split(' '),
            ],
          // Ensure base border color is always applied when not focused (override any focus colors)
          !isFocused && baseStyleClasses.stroke,
          'z-10',
        ]"
      />

      <!-- Input Content -->
      <div class="relative flex items-center h-full z-20">
        <!-- Left Icon -->
        <div v-if="iconLeft" :class="[iconWrapperClasses, 'ml-[16px]']">
          <div
            :class="[
              'w-full h-full flex items-center justify-center transition-colors',
              baseStyleClasses.iconFill,
              baseStyleClasses.iconStroke,
              // Hover state - only apply when not focused (using prefixed versions from constants)
              !isActuallyDisabled &&
                finalVariant !== 'disabled' &&
                !isFocused &&
                hoverClasses &&
                'groupHoverIconFill' in hoverClasses &&
                'groupHoverIconStroke' in hoverClasses && [
                  hoverClasses.groupHoverIconFill,
                  hoverClasses.groupHoverIconStroke,
                ],
              // Active/Focus states (using prefixed versions from constants)
              !isActuallyDisabled &&
                finalVariant !== 'disabled' &&
                activeClasses &&
                'groupFocusWithinIconFill' in activeClasses &&
                'groupFocusWithinIconStroke' in activeClasses && [
                  activeClasses.groupFocusWithinIconFill,
                  activeClasses.groupFocusWithinIconStroke,
                ],
            ]"
          >
            <Icon v-if="isIconLeftString" :name="String(iconLeft)" size="16" />
            <component v-else :is="iconLeft" />
          </div>
        </div>

        <!-- Input Field -->
        <input
          :id="id"
          :name="name"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="isActuallyDisabled"
          :autofocus="autoFocus"
          :class="[
            'flex-1 bg-transparent border-0 outline-none relative z-20 h-full transition-colors',
            baseStyleClasses.text,
            'text-[14px] leading-[20px]',
            iconLeft ? 'pl-[12px]' : 'pl-[16px]',
            iconRight ? 'pr-[12px]' : 'pr-[16px]',
            placeholderClasses,
          ]"
          @input="handleInput"
          @mousedown="handleMouseDown"
          @keydown="handleKeyDown"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- Right Icon -->
        <div v-if="iconRight" :class="[iconWrapperClasses, 'mr-[16px]']">
          <div
            :class="[
              'w-full h-full flex items-center justify-center transition-colors',
              baseStyleClasses.iconFill,
              baseStyleClasses.iconStroke,
              // Hover state - only apply when not focused (using prefixed versions from constants)
              !isActuallyDisabled &&
                finalVariant !== 'disabled' &&
                !isFocused &&
                hoverClasses &&
                'groupHoverIconFill' in hoverClasses &&
                'groupHoverIconStroke' in hoverClasses && [
                  hoverClasses.groupHoverIconFill,
                  hoverClasses.groupHoverIconStroke,
                ],
              // Active/Focus states (using prefixed versions from constants)
              !isActuallyDisabled &&
                finalVariant !== 'disabled' &&
                activeClasses &&
                'groupFocusWithinIconFill' in activeClasses &&
                'groupFocusWithinIconStroke' in activeClasses && [
                  activeClasses.groupFocusWithinIconFill,
                  activeClasses.groupFocusWithinIconStroke,
                ],
            ]"
          >
            <Icon
              v-if="isIconRightString"
              :name="String(iconRight)"
              size="16"
            />
            <component v-else :is="iconRight" />
          </div>
        </div>

        <!-- Right Label (inside input) -->
        <div
          v-if="labelRight && !iconRight"
          :class="[
            'flex items-center h-full pr-[16px] pl-[16px]',
            'border-l',
            labelTable.stroke,
          ]"
        >
          <span :class="['text-[14px] leading-[20px]', labelTable.text]">
            {{ labelRight }}
          </span>
        </div>
      </div>
    </div>

    <!-- Right Label (outside input) -->
    <div v-if="labelRight && iconRight" :class="labelRightClasses">
      <span class="text-[14px] leading-[20px]">{{ labelRight }}</span>
    </div>
  </div>
</template>
