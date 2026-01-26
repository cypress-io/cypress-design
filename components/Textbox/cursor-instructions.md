# Textbox Component - Cursor Instructions

Instructions for implementing the Textbox component from Figma to code.

## Quick Start / Implementation Order

1. **Extract all colors/styles from Figma** - Light mode and dark mode designs
2. **Create constants file** - Map all theme/type/state/size combinations
3. **Implement React component** - Start with basic structure, then add states
4. **Implement Vue component** - Mirror React implementation
5. **Add accessibility** - ARIA attributes, keyboard navigation
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
  - **Icon colors are specified in Figma design and differ for light and dark modes**
  - Extract exact icon colors from Figma for each theme/state combination
  - Apply colors explicitly using icon props (e.g., `strokeColor`, `fillColor`) - do not rely on automatic inheritance
- **DividerLeft** (`divider?: boolean`)
  - Optional divider between IconLeft and input
  - Only shown when IconLeft is present
  - **Divider visual styles and colors are specified in Figma design and differ for light and dark modes**
  - Extract exact divider styles (width, height, color, etc.) from Figma for each theme
  - Apply styles explicitly via CSS classes - do not rely on automatic inheritance
- **IconRight** (`iconRight?: React.ComponentType | Vue Component`)
  - Reuse existing icon components from the design system
  - **Icon colors are specified in Figma design and differ for light and dark modes**
  - Extract exact icon colors from Figma for each theme/state combination
  - Apply colors explicitly using icon props (e.g., `strokeColor`, `fillColor`) - do not rely on automatic inheritance
- **LabelRight** (`labelRight?: string | ReactNode`)
  - Static text/element (no hover, active, or focus styles)
  - Positioned to the right of the input

## Constants & Styling

### File Structure

Create constants in `components/Textbox/constants/src/index.ts` following the pattern from Button/Tag components:

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

- Organize constants to map directly to visual states
- Minimize conditional logic in component files
- Use flat keys with naming convention: `theme-type-state` (e.g., `'light-default-hover'`)

**Constants structure should reflect:**

- Theme (`'light' | 'dark'`)
- Type/Variant (`'default' | 'valid' | 'invalid' | 'warning'`)
- State (`'placeholder' | 'default' | 'hover' | 'active' | 'focus-visible' | 'disabled'`)
- Size (`'32' | '40' | '48'`) - Separate table
- Rounded (`boolean`) - Separate table

**Important:** Not all state combinations may be needed. For example:

- `disabled` state typically overrides other states (disabled inputs don't hover)
- `placeholder` state is mutually exclusive with `default` (input is either empty or has value)
- Consider if `hover` + `active` + `focus-visible` combinations need separate constants or if CSS specificity handles it

**Example of state priority logic:**

```typescript
// In component, determine which state class to use:
// 1. Check disabled first (highest priority)
// 2. Check placeholder (if value is empty)
// 3. Check focus-visible (if keyboard focused)
// 4. Check active (if focused and typing)
// 5. Check hover (if mouse over)
// 6. Default state
```

### Icon Colors

Icon colors are specified in the Figma design and differ for light and dark modes. Create separate constants for icon colors:

```typescript
export const IconColors = {
  // Structure: theme-type-state
  'light-default-default': {
    strokeColor: 'gray-600',
    fillColor: 'transparent',
  },
  'light-default-hover': { strokeColor: 'gray-700', fillColor: 'transparent' },
  // ... etc for all combinations
  'dark-default-default': { strokeColor: 'gray-300', fillColor: 'transparent' },
  // ... etc
} as const
```

- Extract exact icon colors from Figma for each theme/type/state combination
- Apply these colors explicitly to icons via props (e.g., `strokeColor`, `fillColor`)
- Do NOT rely on CSS inheritance or automatic color mapping

### Divider Styles

Divider visual styles and colors are specified in the Figma design and differ for light and dark modes. Create separate constants for divider styles:

```typescript
export const DividerClasses = {
  // Structure: theme
  light: 'h-[16px] w-[1px] bg-gray-200', // Extract exact styles from Figma light mode
  dark: 'h-[16px] w-[1px] bg-gray-700', // Extract exact styles from Figma dark mode
} as const
```

- Extract exact divider styles (width, height, color, border-radius, etc.) from Figma for each theme
- Apply styles explicitly via CSS classes - do not rely on automatic inheritance
- Divider colors differ for light and dark modes - use explicit values from Figma

### TypeScript Types

Export proper TypeScript types:

```typescript
export type TextboxTheme = 'light' | 'dark'
export type TextboxVariant = 'default' | 'valid' | 'invalid' | 'warning'
export type TextboxState =
  | 'placeholder'
  | 'default'
  | 'hover'
  | 'active'
  | 'focus-visible'
  | 'disabled'
export type TextboxSize = '32' | '40' | '48'
export const DefaultTheme: TextboxTheme = 'light'
export const DefaultVariant: TextboxVariant = 'default'
export const DefaultSize: TextboxSize = '40'
```

## Borders & Interaction Model

**Visual border structure:**

Hover, active, and focus-visible states use two visual borders:

1. **Outside border** - The container's border (the main border of the wrapper)
2. **Inside border** - An inner border/ring effect (creates a layered look)

**Border implementation rules:**

- **Hover / Active states** → 1px inside border
  - Use CSS `border` property on the wrapper
  - Example: `hover:border-gray-300` or `focus:border-gray-300`
- **Focus-visible state** → 2px inside border
  - Use CSS `outline` property (NOT `border`) - this is important for accessibility
  - Example: `focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-0`
  - The `outline-offset-0` ensures the outline sits inside the border

**Why outline for focus-visible?**

- `outline` doesn't affect layout (unlike `border`)
- Better for accessibility - doesn't shift content
- Can be combined with border for the layered effect

**Wrapper state handling:**

The entire wrapper (including labels and icons) should respond to hover/focus states, not just the input element. This means:

```tsx
// ✅ Correct - wrapper handles states
<div className="hover:border-gray-300 focus-within:border-gray-400">
  <input />
</div>

// ❌ Wrong - only input handles states
<div>
  <input className="hover:border-gray-300" />
</div>
```

Use `focus-within` on the wrapper to detect when the input inside is focused.

## HTML & Behavior

- The component must support all standard `<input type="text">` attributes:

  - `value`, `defaultValue` (React) / `v-model` (Vue)
  - `readonly`, `disabled`
  - `maxlength`, `minlength`
  - `autofocus`, `placeholder`
  - `name`, `id`, `aria-*` attributes
  - `onChange`, `onInput`, `onFocus`, `onBlur` (React) / `@input`, `@focus`, `@blur` (Vue)

- Visual state mapping:

  - `disabled` prop → apply disabled styles from constants
  - Empty value + placeholder → apply placeholder styles from constants
  - `:hover` pseudo-class → apply hover styles
  - `:active` or `:focus` → apply active styles
  - `:focus-visible` → apply focus-visible styles

## State Detection Best Practices

### Placeholder State Detection

**Placeholder state is NOT a CSS pseudo-class** - it requires JavaScript detection:

```typescript
// React example
const isPlaceholder = !value || value.trim() === ''

// Vue example
const isPlaceholder = computed(
  () => !props.modelValue || String(props.modelValue).trim() === '',
)
```

**Best practices:**

- Check if value is empty/null/undefined/whitespace-only
- Only apply placeholder styles when value is empty AND placeholder attribute exists
- Apply placeholder styles conditionally via className/computed classes
- Use placeholder styles from constants: `CssVariantClasses['light-default-placeholder']`

**Example implementation:**

```tsx
// React
const stateClasses = isPlaceholder
  ? CssVariantClasses[`${theme}-${variant}-placeholder`]
  : CssVariantClasses[`${theme}-${variant}-default`]
```

### Active vs Focus-Visible States

**These states can be true simultaneously** - handle them correctly:

1. **`:active`** - CSS pseudo-class, applies when the input is focused and user is interacting (clicking or typing)

   - For text inputs, this means the input is currently focused and the user is clicking or typing inside it
   - Use in CSS: `active:border-gray-300` or `focus:border-gray-300` (for text inputs, `:focus` often represents the active/typing state)

2. **`:focus-visible`** - CSS pseudo-class, applies when element has keyboard focus

   - **Only for keyboard navigation** - Modern browsers only show focus-visible when focus was achieved via keyboard (Tab key, etc.)
   - Does NOT show for mouse clicks - this is intentional for accessibility
   - Use in CSS: `focus-visible:outline-2 focus-visible:outline-indigo-500`
   - **Important for accessibility** - ensures keyboard users see focus indicators

3. **`:focus`** - CSS pseudo-class, applies when element has focus (any method)
   - Includes both mouse clicks and keyboard navigation
   - Can be combined with `:focus-visible` for broader support

**Best practices:**

- Use CSS pseudo-classes in constants - let CSS handle state detection automatically
- Order matters in CSS - later rules override earlier ones
- For focus-visible, use `outline` property (not `border`) as per border rules
- Combine states when needed: `focus-visible:active:outline-2` (if both should apply)
- In constants, define separate classes for each state:
  ```typescript
  'light-default-active': 'active:border-gray-300',
  'light-default-focus-visible': 'focus-visible:outline-2 focus-visible:outline-indigo-500',
  ```
- CSS will automatically apply the correct styles based on the current state
- No JavaScript needed for active/focus-visible detection - CSS handles it

**State priority (when multiple states are active):**

- CSS specificity and order determine which styles apply
- Typically: `focus-visible` > `active` > `hover` > `default`
- Test with keyboard navigation (Tab) and mouse interaction to ensure correct behavior

- **Accessibility:**
  - Ensure proper `aria-label` or `aria-labelledby` when labelLeft/labelRight are used
  - For invalid/warning states, use `aria-invalid="true"` and `aria-describedby` for error messages
  - Ensure keyboard navigation works correctly (Tab, Enter, etc.)
  - The `focus-visible` outline is critical for keyboard users - never remove it
  - Test with keyboard-only navigation (no mouse) to verify focus indicators are visible

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
- Show with and without rounded

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

## Implementation Checklist

### Phase 1: Constants & Styling

- [ ] Extract all colors from Figma (light mode design)
- [ ] Extract all colors from Figma (dark mode design)
- [ ] Create constants file structure (`CssStaticClasses`, `CssSizeClasses`, `CssVariantClasses`, `CssRoundedClasses`)
- [ ] Create all theme/type/state combinations in `CssVariantClasses`
- [ ] Create `IconColors` constant with all theme/type/state combinations
- [ ] Create `DividerClasses` constant for all themes
- [ ] Export TypeScript types (`TextboxTheme`, `TextboxVariant`, `TextboxState`, `TextboxSize`)

### Phase 2: Component Implementation

- [ ] Implement React component with proper TypeScript types
- [ ] Implement Vue component with proper TypeScript types
- [ ] Ensure wrapper handles hover/focus states (not just input)
- [ ] Implement placeholder state detection (JavaScript)
- [ ] Implement state priority logic (disabled > placeholder > focus-visible > active > hover > default)
- [ ] Support all standard input attributes (`value`, `onChange`, `disabled`, `placeholder`, etc.)
- [ ] Apply icon colors explicitly via icon props (not CSS inheritance)
- [ ] Apply divider styles explicitly via CSS classes

### Phase 3: Accessibility & Polish

- [ ] Add proper accessibility attributes (`aria-label`, `aria-invalid`, `aria-describedby`)
- [ ] Ensure keyboard navigation works correctly (Tab, Enter, etc.)
- [ ] Verify `focus-visible` outline is visible for keyboard users
- [ ] Test with keyboard-only navigation (no mouse)

### Phase 4: Documentation & Testing

- [ ] Create VitePress documentation with all examples
- [ ] Test all states individually (placeholder, default, hover, active, focus-visible, disabled)
- [ ] Test all types (default, valid, invalid, warning)
- [ ] Test all sizes (32, 40, 48)
- [ ] Test all themes (light, dark)
- [ ] Test all optional elements (labelLeft, iconLeft, divider, iconRight, labelRight)
- [ ] Test state combinations (e.g., disabled + hover, placeholder + focus-visible)
- [ ] Test with rounded and non-rounded variants

## Common Pitfalls to Avoid

1. **Don't use Tailwind's automatic dark mode mapping** - Extract exact colors from Figma
2. **Don't apply states to input only** - Wrapper must handle hover/focus for entire control
3. **Don't use `border` for focus-visible** - Use `outline` property instead
4. **Don't rely on CSS inheritance for icon colors** - Apply explicitly via props
5. **Don't forget placeholder state detection** - Requires JavaScript, not just CSS
6. **Don't ignore state priority** - Disabled should override all other states
7. **Don't forget accessibility** - `focus-visible` outline is critical for keyboard users
8. **Don't assume all combinations are needed** - Some states may be mutually exclusive
