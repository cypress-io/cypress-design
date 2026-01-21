# Global Cursor Instructions - Design System Components

## Goal

Implement `{component}` from Figma into the cypress-design repository, following existing design system patterns.

**Note:** Check for component-specific instructions in `components/{ComponentName}/cursor-instructions.md` for detailed implementation guidance.

## Figma

Figma design should be provided with the following specifications:

- **Component types/variants** (e.g., default, valid, invalid, warning)
- **Component states** (e.g., default, hover, active, focus-visible, disabled, placeholder)
- **Component size variants** (e.g., 32, 40, 48)
- **Light and dark mode designs** - Separate designs for each mode
- **Theme support** - If applicable, specify if component supports `'auto'`, `'light'`, or `'dark'` themes

**Important:** Extract exact color values from Figma designs. Light and dark mode colors do NOT map 1:1 with Tailwind's automatic dark mode mapping - use explicit values from Figma.

## Code Structure

### Component Organization

- Use the existing structure in the cypress-design repo. Check other components (Button, Tag, Checkbox) for reference.
- Components are implemented in both React and Vue
- Each component follows this structure:
  ```
  components/{ComponentName}/
    ├── constants/          # Shared styles (used by both React and Vue)
    ├── react/             # React implementation
    ├── vue/               # Vue implementation
    ├── ReadMe.md          # Component overview
    └── cursor-instructions.md  # Component-specific instructions (if needed)
  ```

### Implementation Requirements

Each component must include:

- **TypeScript types** - Proper interfaces for props, exported from constants
- **Cypress tests** - Component tests in `{ComponentName}.cy.tsx` files
- **Visual documentation** - VitePress documentation showing all states, sizes, and variants
- **Accessibility** - WCAG 2.1 compliant with proper ARIA attributes

### Component-Specific Instructions

- If a component has complex requirements, create `components/{ComponentName}/cursor-instructions.md`
- Component-specific instructions override or supplement these global instructions
- Always check for component-specific instructions first

## Execution Workflow

Component implementation should follow a staged approach. Complete each stage before moving to the next:

1. **Plan Mode: Refine Component Instructions**

   - Create or update `components/{ComponentName}/cursor-instructions.md` with component-specific requirements
   - Document any deviations from global patterns or special considerations
   - Define component-specific constants structure, prop types, and styling patterns

2. **Create Components and Previews**

   - **2a) Core Components:**
     - Create shared visual styles in `components/{ComponentName}/constants/src/index.ts`
     - Implement React component in `components/{ComponentName}/react/{ComponentName}.tsx`
     - Implement Vue component in `components/{ComponentName}/vue/{ComponentName}.vue`
     - Create component overview in `components/{ComponentName}/ReadMe.md`
   - **2b) VitePress Documentation:**
     - Create `docs/components/react/{ComponentName}.md` with all variants, sizes, and states
     - Create `docs/components/vue/{ComponentName}.md` with all variants, sizes, and states
     - Include interactive code examples using ``jsx live` and ``vue live` blocks

3. **Optimize Component for Accessibility**

   - Review and implement WCAG 2.1 Level AA compliance requirements
   - Add appropriate ARIA attributes (`aria-label`, `aria-invalid`, `aria-describedby`, `aria-disabled`, etc.)
   - Ensure keyboard navigation works correctly (Tab, Enter, Space, Arrow keys as appropriate)
   - Verify focus management and focus-visible indicators
   - Test with keyboard-only navigation
   - Ensure semantic HTML is used appropriately
   - Verify screen reader compatibility

4. **Generate Cypress Tests**

   - Create component test file `components/{ComponentName}/react/{ComponentName}React.cy.tsx`
   - Create component test file `components/{ComponentName}/vue/{ComponentName}Vue.cy.tsx`
   - Test all states, sizes, variants, and accessibility features
   - Include visual regression tests with `cy.percySnapshot()`
   - Test keyboard navigation and accessibility features

For detailed requirements on each stage, refer to the relevant sections in this document (e.g., "Documentation", "Testing", "Accessibility").

## Styling & Tokens

### Design Tokens

- **Never use hex values** - Always use design tokens from `@cypress-design/css`
- Use Tailwind color classes (e.g., `bg-indigo-500`, `text-gray-800`)
- Extract exact colors from Figma - don't assume Tailwind's automatic mapping

### Constants Structure

- **Shared styles live in `components/{ComponentName}/constants/src/index.ts`**
- Styles in constants must be reusable by both React and Vue
- Organize constants to map directly to visual states
- Minimize conditional logic in component files - use constant lookups instead

**Common constant patterns:**

```typescript
export const CssStaticClasses = '...' // Base classes for all variants
export const CssSizeClassesTable = { '32': '...', '40': '...' } as const
export const CssVariantClassesTable = { 'light-default': '...' } as const
export type ComponentSize = keyof typeof CssSizeClassesTable
export type ComponentVariant = keyof typeof CssVariantClassesTable
```

### Styling Guidelines

- **Use Tailwind CSS only** - No inline styles, no CSS modules, no styled-components
- **Do not use inline styles** in `/react` or `/vue` component files
- Use `clsx` (React) or computed classes (Vue) to combine class strings
- Components' visual styles should be easy to extend and modify by humans
- For theme support, use Tailwind's `dark:` variant with explicit colors from Figma

## Icons

- **Reuse existing Icon components** - Use `@cypress-design/react-icon` or `@cypress-design/vue-icon`
- **Do not hardcode icons** - Always use the Icon component from the design system
- **Icon colors** - Extract exact icon colors from Figma for each theme/state combination
- Apply icon colors explicitly via props (e.g., `strokeColor`, `fillColor`) - do not rely on CSS inheritance

## TypeScript

- Define prop interfaces in the constants file (shared between React and Vue)
- React components extend HTML element props where appropriate
- Vue components use `defineComponent` with proper TypeScript types
- Export types for consumers: `export type {ComponentName}Props`, `export type {ComponentName}Size`, etc.

## Testing

- **Cypress component tests** - Test all states, sizes, and variants
- **Visual regression** - Ensure all states match Figma designs
- **Accessibility testing** - Test with keyboard navigation, screen readers
- **Cross-browser** - Test in major browsers

## Documentation

- **VitePress documentation** - Create `docs/components/react/{ComponentName}.md` and `docs/components/vue/{ComponentName}.md`
- **Documentation structure:**
  - Component description
  - All variants/types
  - All sizes
  - All states (with examples)
  - Props API reference
  - Usage examples
- Follow the same structure as existing component documentation

## Accessibility

- **WCAG 2.1 compliance** - Ensure component meets Level AA standards
- **Keyboard navigation** - All interactive elements must be keyboard accessible
- **Focus management** - Use `focus-visible` for keyboard focus indicators (not mouse clicks)
- **ARIA attributes** - Use appropriate `aria-*` attributes:
  - `aria-label` or `aria-labelledby` for labeled elements
  - `aria-invalid` for error states
  - `aria-describedby` for help text or error messages
  - `aria-disabled` when appropriate
- **Semantic HTML** - Use appropriate HTML elements (`<button>`, `<input>`, etc.)
- **Test with keyboard-only navigation** - Verify focus indicators are visible

## Common Patterns

### Theme Support

If component supports themes (`'auto' | 'light' | 'dark'`):

- `'light'` - Only light mode classes (no `dark:` variants)
- `'dark'` - Only dark mode classes
- `'auto'` - Combine both: base classes (light) + `dark:` classes (explicit dark colors from Figma)
- Use Tailwind's class-based dark mode (`darkMode: 'class'`)
- Extract exact colors from Figma for both modes - don't rely on automatic mapping

### State Management

- Use CSS pseudo-classes where possible (`:hover`, `:focus`, `:active`, `:focus-visible`)
- For JavaScript-detected states (e.g., placeholder), use conditional class application
- Define state priority logic (e.g., disabled overrides all other states)
- Minimize JavaScript state detection - prefer CSS when possible
