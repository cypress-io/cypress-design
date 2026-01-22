<script lang="ts">
import { PropType, computed, defineComponent } from 'vue'
import * as TextboxConstants from '@cypress-design/constants-textbox'
import type {
  TextboxTheme,
  TextboxVariant,
  TextboxSize,
} from '@cypress-design/constants-textbox'

export default defineComponent({
  name: 'Textbox',
  inheritAttrs: false,
  props: {
    theme: {
      type: String as PropType<TextboxTheme>,
      default: TextboxConstants.DefaultTheme,
    },
    variant: {
      type: String as PropType<TextboxVariant>,
      default: TextboxConstants.DefaultVariant,
    },
    size: {
      type: String as PropType<TextboxSize>,
      default: TextboxConstants.DefaultSize,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    labelLeft: {
      type: [String, Object] as PropType<string | unknown>,
      // Can be a string or Vue component/VNode
    },
    iconLeft: {
      type: [Object, Function] as PropType<unknown>,
      // Can be a Vue component or icon component from @cypress-design/vue-icon
    },
    divider: {
      type: Boolean,
      default: false,
    },
    iconRight: {
      type: [Object, Function] as PropType<unknown>,
      // Can be a Vue component or icon component from @cypress-design/vue-icon
    },
    labelRight: {
      type: [String, Object] as PropType<string | unknown>,
      // Can be a string or Vue component/VNode
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
    value: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    'aria-invalid': {
      type: [Boolean, String] as PropType<
        boolean | 'false' | 'true' | 'grammar' | 'spelling'
      >,
    },
  },
  emits: {
    'update:modelValue': (value: string) => typeof value === 'string',
    input: (event: Event) => event instanceof Event,
    focus: (event: FocusEvent) => event instanceof FocusEvent,
    blur: (event: FocusEvent) => event instanceof FocusEvent,
    keydown: (event: KeyboardEvent) => event instanceof KeyboardEvent,
    keyup: (event: KeyboardEvent) => event instanceof KeyboardEvent,
  },
  setup(props, { emit }) {
    // Build variant class key: theme-variant-default
    // Disabled state is handled by CSS has-[:disabled]: pseudo-class
    const variantKey = computed(() => {
      return `${props.theme}-${props.variant}-default` as keyof typeof TextboxConstants.CssVariantClassesTable
    })

    // Get variant classes
    const variantClasses = computed(() => {
      return TextboxConstants.CssVariantClassesTable[variantKey.value] || ''
    })

    // Get rounded classes
    const roundedClasses = computed(() => {
      return TextboxConstants.CssRoundedClasses[
        props.rounded as unknown as keyof typeof TextboxConstants.CssRoundedClasses
      ]
    })

    // Build wrapper classes
    // Use label element for click-to-focus behavior (no JS needed)
    const wrapperClasses = computed(() => {
      return [
        TextboxConstants.CssStaticClasses,
        variantClasses.value,
        roundedClasses.value,
        TextboxConstants.CssWrapperHeightClassesTable[props.size],
      ]
    })

    // Build input container classes
    const inputContainerClasses = computed(() => {
      return [
        TextboxConstants.CssInputContainerBaseClasses,
        TextboxConstants.CssInputContainerPaddingClassesTable[props.size],
      ]
    })

    // Get input size classes (font size and line height)
    const inputSizeClasses = computed(() => {
      return TextboxConstants.CssInputSizeClassesTable[props.size]
    })

    // Build input classes
    const inputClasses = computed(() => {
      return [
        TextboxConstants.CssInputClassesTable[props.theme],
        inputSizeClasses.value,
      ]
    })

    // Get icon color classes
    // Disabled state is handled by CSS has-[:disabled]: pseudo-class
    const iconColorKey = computed(() => {
      return `${props.theme}-${props.variant}-default` as keyof typeof TextboxConstants.CssIconColorClassesTable
    })

    const iconColorClasses = computed(() => {
      return TextboxConstants.CssIconColorClassesTable[iconColorKey.value]
    })

    // Get divider classes
    const dividerClasses = computed(() => {
      return TextboxConstants.DividerClasses[props.theme]
    })

    // Determine aria-invalid value
    const ariaInvalidValue = computed(() => {
      if (props['aria-invalid'] !== undefined) {
        return props['aria-invalid']
      }
      return props.variant === 'invalid' ? true : undefined
    })

    // Compute input value: use value prop if provided (uncontrolled), otherwise use modelValue (controlled)
    const inputValue = computed(() => {
      return props.value ?? props.modelValue ?? ''
    })

    // Handle input event
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      const newValue = target.value
      emit('update:modelValue', newValue)
      emit('input', event)
      // Value is automatically tracked via modelValue prop in Vue
    }

    const handleFocus = (event: FocusEvent) => {
      emit('focus', event)
    }

    const handleBlur = (event: FocusEvent) => {
      emit('blur', event)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      emit('keydown', event)
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      emit('keyup', event)
    }

    return {
      wrapperClasses,
      inputContainerClasses,
      inputClasses,
      iconColorClasses,
      dividerClasses,
      ariaInvalidValue,
      inputValue,
      handleInput,
      handleFocus,
      handleBlur,
      handleKeyDown,
      handleKeyUp,
      // Label constants for template
      TextboxConstants,
    }
  },
})
</script>

<template>
  <label :class="wrapperClasses">
    <!-- Label Left -->
    <span
      v-if="labelLeft"
      :class="[
        TextboxConstants.CssLabelBaseClasses,
        TextboxConstants.CssLabelSizeClassesTable[size],
        TextboxConstants.CssLabelThemeClassesTable[theme],
        TextboxConstants.CssLabelBorderClassesTable.left[theme],
        TextboxConstants.CssLabelRoundedClassesTable.left[
          rounded ? 'rounded' : 'notRounded'
        ],
      ]"
    >
      {{ labelLeft }}
    </span>

    <!-- Input Container -->
    <div :class="inputContainerClasses">
      <!-- Icon Left -->
      <component
        :is="iconLeft"
        v-if="iconLeft"
        size="16"
        :interactive-colors-on-group="true"
        :class="iconColorClasses"
      />

      <!-- Divider -->
      <div v-if="divider && iconLeft" :class="dividerClasses" />

      <!-- Input -->
      <input
        v-bind="$attrs"
        :type="type"
        :class="inputClasses"
        :value="inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :aria-invalid="ariaInvalidValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeyDown"
        @keyup="handleKeyUp"
      />

      <!-- Icon Right -->
      <component
        :is="iconRight"
        v-if="iconRight"
        size="16"
        :interactive-colors-on-group="true"
        :class="iconColorClasses"
      />
    </div>

    <!-- Label Right -->
    <span
      v-if="labelRight"
      :class="[
        TextboxConstants.CssLabelBaseClasses,
        TextboxConstants.CssLabelSizeClassesTable[size],
        TextboxConstants.CssLabelThemeClassesTable[theme],
        TextboxConstants.CssLabelBorderClassesTable.right[theme],
        TextboxConstants.CssLabelRoundedClassesTable.right[
          rounded ? 'rounded' : 'notRounded'
        ],
      ]"
    >
      {{ labelRight }}
    </span>
  </label>
</template>
