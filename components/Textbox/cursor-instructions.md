# Textbox Component - Cursor Instructions

Instructions for implementing the Textbox component from Figma to code.

## Quick Start / Implementation Order

1. **Extract all colors/styles from Figma** - See global instructions for color extraction principles
2. **Create constants file** - Map all theme/type/state/size combinations
3. **Implement React component** - Start with basic structure, then add states
4. **Implement Vue component** - Mirror React implementation
5. **Add accessibility** - See global instructions for comprehensive accessibility guidelines
6. **Create documentation** - VitePress examples for all combinations
7. **Test thoroughly** - All states, themes, sizes, and combinations

**Estimated constants count:**

- 3 themes × 4 types × 6 states × 3 sizes × 2 rounded = 432 base combinations
- Plus icon colors and divider styles for each theme/state
- Consider if all combinations are needed or if some can share styles

## Figma references

- Light mode design: https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=911-826&t=An2ZPUUwTp1tjtET-11
- Dark mode design: https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=5752-24044&t=An2ZPUUwTp1tjtET-11

## Overview

This component is a Textbox with optional icons, labels, and dividers on both sides.

**Key complexity:** Hover, active, and focus-visible states apply to the entire control, including labels and icons—not just the input itself. This means the wrapper element must handle these states, not just the `<input>` element.

**Visual Layout:**

```
[LabelLeft] [IconLeft] [Divider] [Input Field] [IconRight] [LabelRight]
     ↓          ↓          ↓           ↓            ↓          ↓
  Static    Dynamic    Dynamic     Interactive   Dynamic    Static
```

All elements are horizontally aligned in a flex container. The wrapper responds to hover/focus, but only the input is interactive.

## Visual Structure & States

### Types (Variant/Kind)

- `'default'` (default)
- `'valid'`
- `'invalid'`
- `'warning'`

**Naming consideration:** Other components use `variant` prop (Button, Tag). Consider using `variant` instead of `kind` for consistency, or document why `kind` is preferred.

Each type supports the following states:

- `'placeholder'` - When input is empty and placeholder text is shown
- `'default'` - Normal state with value
- `'hover'` - Mouse hover
- `'active'` - Clicked and typing (input is focused and user is interacting)
- `'focus-visible'` - Keyboard navigation focus (use `:focus-visible` pseudo-class)
- `'disabled'` - Disabled state

### Sizes

- `'32'`
- `'40'` (default)
- `'48'`

### Rounded

- `false` (default) - Square corners
- `true` - Rounded corners

## Optional Elements

- **LabelLeft** (`labelLeft?: string | ReactNode`)
  - Static text/element (no hover, active, or focus styles)
  - Positioned to the left of the input
- **IconLeft** (`iconLeft?: React.ComponentType | Vue Component`)
  - Reuse existing icon components from `@cypress-design/react-icon` or `@cypress-design/vue-icon`
  - Icon colors differ for light and dark modes - see global instructions for icon color extraction and application
- **DividerLeft** (`divider?: boolean`)
  - Optional divider between IconLeft and input
  - Only shown when IconLeft is present
  - Divider visual styles and colors differ for light and dark modes - see global instructions for extracting exact styles from Figma
- **IconRight** (`iconRight?: React.ComponentType | Vue Component`)
  - Reuse existing icon components from the design system
  - Icon colors differ for light and dark modes - see global instructions for icon color extraction and application
- **LabelRight** (`labelRight?: string | ReactNode`)
  - Static text/element (no hover, active, or focus styles)
  - Positioned to the right of the input

## Constants & Styling

### File Structure

Create constants in `components/Textbox/constants/src/index.ts`. See global instructions for general constants structure patterns. Textbox-specific structure:

```typescript
export const CssStaticClasses = '...' // Base classes for all textboxes
export const CssSizeClasses = {
  '32': '...',
  '40': '...',
  '48': '...',
} as const
export const CssVariantClasses = {
  // Structure: theme-type-state
  'light-default-default': '...',
  'light-default-hover': '...',
  'light-default-active': '...',
  'light-default-focus-visible': '...',
  'light-default-disabled': '...',
  'light-default-placeholder': '...',
  'light-valid-default': '...',
  // ... etc for all combinations
  'dark-default-default': '...',
  // ... etc
} as const
export const CssRoundedClasses = {
  false: 'rounded-[4px]', // or whatever the default is
  true: 'rounded-full', // or whatever rounded means
} as const
```

### Constants Organization

See global instructions for state priority and naming (e.g. `theme-type-state`). Textbox uses flat keys like `'light-default-hover'`. Constants structure: Theme, Type/Variant, State, Size, Rounded (see Visual Structure above). Not all combinations may be needed—see global "Constants for multi-state components."

### Icon Colors

Create separate constants with keys `theme-type-state`. See global instructions for icon color extraction and application.

### Divider Styles

Create constants keyed by theme (e.g. `light`, `dark`). See global instructions for extracting exact styles from Figma.

## Borders & Interaction Model

See global instructions ("Form Controls / Input-like Components") for focus/outline and wrapper/focus-within. Textbox: hover/active via `border` on the wrapper; focus-visible via `outline`; wrapper uses `focus-within` so labels and icons react when the input is focused.

## HTML & Behavior

Support standard input attributes and events; see global instructions for input-like components. Map `disabled` and empty value + placeholder to state classes per state priority (see global). Placeholder and active/focus-visible: see global ("Form Controls").

**Accessibility (Textbox-specific):** Ensure `aria-label` or `aria-labelledby` when labelLeft/labelRight are used. For invalid/warning, use `aria-invalid="true"` and `aria-describedby` for error messages. Keep the focus-visible outline (see Borders above).

## Expected API

### React

```tsx
<Textbox
  theme="light" | "dark"
  variant="default" | "valid" | "invalid" | "warning"  // or "kind" if preferred
  size="32" | "40" | "48"
  rounded={boolean}
  labelLeft={string | ReactNode}
  iconLeft={React.ComponentType}
  divider={boolean}
  value={string}
  iconRight={React.ComponentType}
  labelRight={string | ReactNode}
  // ... all standard input props
/>
```

### Vue

```vue
<Textbox
  theme="light" | "dark"
  variant="default" | "valid" | "invalid" | "warning"
  size="32" | "40" | "48"
  :rounded="boolean"
  label-left="string"
  :icon-left="Component"
  :divider="boolean"
  v-model="value"
  label-right="string"
  :icon-right="Component"
  // ... all standard input props
/>
```

## Component Structure

### React Structure

```tsx
<div
  className={clsx(
    wrapperClasses, // Base wrapper styles + hover/focus states
    // Wrapper should have: flex items-center, focus-within states
  )}
>
  {labelLeft && <span className={labelLeftClasses}>{labelLeft}</span>}
  {iconLeft && (
    <IconLeft
      {...iconColors[`${theme}-${variant}-${currentState}`]}
      className={iconClasses}
    />
  )}
  {divider && iconLeft && <div className={DividerClasses[theme]} />}
  <input
    className={clsx(
      inputBaseClasses, // Base input styles
      sizeClasses, // Size-specific styles
      variantStateClasses, // Theme/variant/state styles
      roundedClasses, // Rounded styles
    )}
    {...inputProps} // All standard input props
  />
  {iconRight && (
    <IconRight
      {...iconColors[`${theme}-${variant}-${currentState}`]}
      className={iconClasses}
    />
  )}
  {labelRight && <span className={labelRightClasses}>{labelRight}</span>}
</div>
```

**Key implementation details:**

- **Wrapper**: Uses flexbox (`flex items-center`) for horizontal layout
- **Wrapper states**: Handles `hover:`, `focus-within:`, `focus-visible:` states
- **Input**: Receives all variant/state/size classes
- **Icons**: Get colors from `IconColors` constant based on current theme/variant/state
- **Labels**: Static styling, no interactive states
- **Divider**: Only shown when `divider={true}` AND `iconLeft` exists

### Vue Structure

Similar structure using Vue template syntax with computed properties for classes.

## VitePress Component Preview

Create the following sections in `docs/components/react/Textbox.md` and `docs/components/vue/Textbox.md`:

### Type

- All types (default, valid, invalid, warning)
- Light and dark themes
- Include:
  - Disabled state
  - Placeholder state
  - All interactive states (hover, active, focus-visible)

### Size

- All sizes (32, 40, 48)
- Light and dark themes

### Rounded

- Rounded vs non-rounded comparison
- Light and dark themes
- All sizes

### Options

Show combinations including:

- Value (with text)
- Label left
- Icon left
- Divider (with icon left)
- Icon right
- Label right

Display all combinations across:

- All sizes
- Light and dark themes
- All types (where applicable)

## Common Pitfalls

- **Wrapper must handle hover/focus** for the entire control (labels and icons), not just the input.
- **Don't assume all 432 combinations are needed**—some states override others or are mutually exclusive.

For outline vs border, placeholder JS, and state priority, see global instructions.

**Note:** For general design system principles (color extraction, icon handling, accessibility, etc.), see global instructions.
