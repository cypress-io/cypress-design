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
- **Theme support** - If applicable, specify if component supports `'light'` or `'dark'` themes (Note: `'auto'` theme for automatic system preference detection is not currently implemented but may be a future consideration)

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

### Branching Strategy

To make the code easier for review by developers and catch API issues early, split the implementation into 4 branches:

- **`{component-name}-instructions`** (step 1): AI instructions and plan
- **`{component-name}-component`** (step 2): Component creation
- **`{component-name}-tests`** (step 3): Cypress test generation
- **`{component-name}-accessibility`** (step 4): Accessibility optimization

Each branch should be reviewed and merged before starting the next branch.

1. **AI Instructions and Plan**

   - Create or update `components/{ComponentName}/cursor-instructions.md` with component-specific requirements
   - Document the component API with all props, variants, and usage examples
   - List all possible variants and expectations of how to use the component
   - Example: `<Button type="Submit" variant="indigo-dark" disabled>Submit</Button>`
   - Document any deviations from global patterns or special considerations
   - Define component-specific constants structure, prop types, and styling patterns
   - **Get feedback on API design before any code is written** - this helps catch API issues much easier in the AI instructions first

2. **Component Creation**

   - **2a) Core Components:**
     - Create shared visual styles in `components/{ComponentName}/constants/src/index.ts`
     - Implement React component in `components/{ComponentName}/react/{ComponentName}.tsx`
     - Implement Vue component in `components/{ComponentName}/vue/{ComponentName}.vue`
     - Create component overview in `components/{ComponentName}/ReadMe.md`
   - **2b) VitePress Documentation:**
     - Create `docs/components/react/{ComponentName}.md` with all variants, sizes, and states
     - Create `docs/components/vue/{ComponentName}.md` with all variants, sizes, and states
     - Include interactive code examples using ``jsx live` and ``vue live` blocks
     - **Documentation structure:**
       - Component description
       - All variants/types
       - All sizes
       - All states (with examples)
       - Props API reference
       - Usage examples
     - Follow the same structure as existing component documentation

3. **Generate Cypress Tests**

   - Create component test file `components/{ComponentName}/react/{ComponentName}React.cy.tsx`
   - Create component test file `components/{ComponentName}/vue/{ComponentName}Vue.cy.tsx`
   - Test all states, sizes, variants, and accessibility features
   - Include visual regression tests with `cy.percySnapshot()` (via Percy) - capture snapshots for each component state (default, hover, active, focus-visible, disabled, placeholder, etc.)
   - Test keyboard navigation and accessibility features

4. **Optimize Component for Accessibility**

   - **Automated testing** - Use feedback from Cypress Accessibility to make accessibility improvements - address all issues identified by Cypress Accessibility. We rely on Cypress Accessibility for automated accessibility testing, which provides automatic feedback on accessibility issues during test runs.
   - **WCAG 2.1 compliance** - Review and implement WCAG 2.1 Level AA compliance requirements
   - **Keyboard navigation** - Ensure keyboard navigation works correctly (Tab, Enter, Space, Arrow keys as appropriate). All interactive elements must be keyboard accessible.
   - **Focus management** - Verify focus management and focus-visible indicators. Use `focus-visible` for keyboard focus indicators (not mouse clicks).
   - **ARIA attributes** - Add appropriate `aria-*` attributes:
     - `aria-label` or `aria-labelledby` for labeled elements
     - `aria-invalid` for error states
     - `aria-describedby` for help text or error messages
     - `aria-disabled` when appropriate
   - **Semantic HTML** - Ensure semantic HTML is used appropriately (e.g., `<button>`, `<input>`, etc.)
   - **Testing** - Test with keyboard-only navigation to verify focus indicators are visible. Verify screen reader compatibility.

For detailed requirements on each stage, refer to the relevant sections in this document (e.g., "Documentation", "Testing").

## Styling & Tokens

### Design Tokens

- **Never use hex values** - Always use design tokens from `@cypress-design/css`
- Use Tailwind color classes (e.g., `bg-indigo-500`, `text-gray-800`)
- Extract exact colors from Figma for both light and dark modes - don't assume Tailwind will automatically map light mode colors to dark mode colors

### Constants Structure

- **Shared styles live in `components/{ComponentName}/constants/src/index.ts`**
- Styles in constants must be reusable by both React and Vue
- Organize constants to map directly to visual states
- Minimize conditional logic in component files - use constant lookups instead

**Common constant patterns:**

```typescript
export const CssStaticClasses = '...' // Base classes for all variants
export const CssSizeClasses = { '32': '...', '40': '...' } as const
export const CssVariantClasses = { 'light-default': '...' } as const
export type ComponentSize = keyof typeof CssSizeClasses
export type ComponentVariant = keyof typeof CssVariantClasses
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

### Type Derivation Pattern

Derive types from constants using `keyof typeof` to ensure types stay in sync with constants:

```typescript
export const CssSizeClasses = {
  '32': '...',
  '40': '...',
  '48': '...',
} as const

// Derive type from constants - types automatically stay in sync
export type ComponentSize = keyof typeof CssSizeClasses

// Export defaults with proper typing
export const DefaultSize: ComponentSize = '40'
export const DefaultVariant: ComponentVariant = 'default'
```

**Benefits:**

- Types stay in sync with constants automatically (single source of truth)
- Type safety - can't use invalid values
- Prevents type drift when constants change

- **Avoid deprecated APIs**: Do not use deprecated event handlers like `onKeyPress` (React) or `@keypress` (Vue). Use `onKeyDown` or `onKeyUp` instead. Reference [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event) for deprecated properties.

## Testing

- **Cypress component tests** - Test all states, sizes, and variants
- **Visual regression** - Capture Percy snapshots (`cy.percySnapshot()`) for each component state (default, hover, active, focus-visible, disabled, placeholder, etc.) to ensure all states match Figma designs
- **Accessibility testing** - We use Cypress Accessibility for automated accessibility testing, in addition to manual testing with keyboard navigation and screen readers

## Common Patterns

### Theme Support

If component supports themes (`'light' | 'dark'`):

- `'light'` - Only light mode classes (no `dark:` variants)
- `'dark'` - Only dark mode classes
- Use Tailwind's class-based dark mode (`darkMode: 'class'`)
- Extract exact colors from Figma for both light and dark modes separately - don't rely on Tailwind's automatic dark mode color mapping

**Note:** Automatic theme switching based on system/user preference (`'auto'` theme) is not currently implemented. If this feature is needed in the future, it would combine both: base classes (light) + `dark:` classes (explicit dark colors from Figma), where the parent/root element controls which is active via the `dark` class.

### State Management

- Use CSS pseudo-classes where possible (`:hover`, `:focus`, `:active`, `:focus-visible`)
- For JavaScript-detected states (e.g., placeholder), use conditional class application
- Define state priority logic (e.g., disabled overrides all other states)
- Minimize JavaScript state detection - prefer CSS when possible
