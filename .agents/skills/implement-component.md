---
name: implement-component
description: Use when implementing a new component (or a new variant, size, or state of an existing component) from Figma into the cypress-design repository. Covers the workflow (API first, then component, docs, tests, and accessibility in one PR), React + Vue parity, shared constants, mapping Figma to tokens, theme/state patterns, and form-control patterns.
---

# Implement a component

Build `{ComponentName}` in React and Vue from a Figma design, following the patterns the existing components use. Button, Tag, and Checkbox are good references.

If `components/{ComponentName}/instructions.md` already exists, read it first: it's the agreed API, and anything component-specific in it overrides this skill.

## What to get from Figma

- Variants (e.g. default, valid, invalid, warning), sizes (e.g. 32, 40, 48), and every state (default, hover, active, focus-visible, disabled, placeholder)
- Light and dark designs, and whether the component takes a `theme` prop (`'light' | 'dark'`)
- The Figma variable behind each color, not only its hex value — see [Map Figma to tokens](#map-figma-to-tokens)

## Workflow

Ship it as one PR, but agree the API before writing code.

1. **Agree the API.** Write `components/{ComponentName}/instructions.md`: every prop, variant, size, state, theme, slot, and event, with a usage example (`<Button type="submit" variant="indigo-dark" disabled>Submit</Button>`). Get the user's feedback before writing any code. An API mistake is cheapest to fix here.
2. **Scaffold.** Run `yarn new:component`. It generates the `constants/`, `react/`, and `vue/` packages (package.json, build config, entry points, ReadMes, test stubs) and a shared `assertions.ts`. It doesn't create `instructions.md` or `architecture.md`. The component-level `ReadMe.md` it creates isn't read by the docs site; leave it as generated.
3. **Build the component** — constants, React, and Vue. See the sections below.
4. **Write the docs.**
   - `react/ReadMe.md` and `vue/ReadMe.md`: install command, import path, and examples for that framework. They're also the npm READMEs, so no frontmatter and no spec tables.
   - `instructions.md`: the **usage** doc. An agent should be able to use the component from it without reading the source. Anything documented here is supported; anything missing isn't. No file layout or internals.
   - `architecture.md`: the **implementation** doc, required even when short. File layout, how constants are keyed, structural choices (e.g. "the wrapper is a `<label>` so clicking it focuses the input"), CSS vs. JavaScript state handling, and gotchas. Cover _why_ and _where_; link to source files for _how_ rather than copying class strings or code.
   - Give both frontmatter with a one-line `description` (see "Writing agent guidance" in `/AGENTS.md`), and add the component to the list in `/.agents/index.md`.
   - Demo tiles: follow "When adding component docs" in `/.agents/architecture.md`.
5. **Test** — see [Testing](#testing).
6. **Accessibility pass** — see [Accessibility](#accessibility).
7. **Add a changeset** — see [Release](#release).
8. **Before pushing:** delete working files (`plan.md`, decision logs, debug output, commented-out code) and any references to them, then run the checks `/AGENTS.md` names.

Source edits don't show in the docs site until the package's `dist/` rebuilds; see the gotcha in `/.agents/architecture.md` under "Building and running".

## React and Vue parity

The two frameworks must behave the same: same props, defaults, events, states, and DOM structure. Drift between them is a recurring source of bugs.

- Put everything visual and every type in `constants/` so both frameworks read one source.
- Write behavior tests once in `assertions.ts` and run them from both `{ComponentName}React.cy.tsx` and `{ComponentName}Vue.cy.tsx`. Framework-specific tests go in the framework's own file.
- Vue components use `<script lang="ts" setup>`. React components extend the native element's props where they render one.

## Constants and types

Shared styles and types live in `components/{ComponentName}/constants/src/index.ts`. Key constants to visual states so component files look classes up instead of branching:

```typescript
export const CssStaticClasses = '...'
export const CssSizeClasses = { '32': '...', '40': '...', '48': '...' } as const
export const CssVariantClasses = { 'light-default': '...' } as const

export type ComponentSize = keyof typeof CssSizeClasses
export type ComponentVariant = keyof typeof CssVariantClasses
export const DefaultSize: ComponentSize = '40'
```

Deriving types with `keyof typeof` keeps them in step with the constants. Export the prop types consumers need (`{ComponentName}Props`, `{ComponentName}Size`, …).

Combine classes with `clsx` in React and computed classes in Vue. Styling rules (Tailwind only, class order, arbitrary values) are in `/.agents/architecture.md` under "Styling".

## Map Figma to tokens

Figma gives you hex values; the code never uses them. Map each Figma color to a token, using the Figma variable name to find it (a `gray-700` variable → `text-gray-700`). If no token matches, ask the designer rather than adding an arbitrary value: a missing token is a design-system gap, not a one-off. Token and contrast rules are in [colors.md](https://design.cypress.io/agents/colors.md).

Map light and dark separately. Dark-mode colors don't follow from light-mode ones, so take each from its own Figma frame.

## Themes and states

**Themes.** With a `theme` prop, `'light'` applies only light classes and `'dark'` only dark classes. Tailwind uses class-based dark mode (`darkMode: 'class'` in `tailwind.config.mjs`).

**States.** Prefer CSS pseudo-classes (`:hover`, `:active`, `:focus-visible`, `:focus-within`) to JavaScript state. Decide which state wins when several apply, implement it, and record it in `architecture.md`. Disabled always wins, e.g. disabled > placeholder > focus-visible > active > hover > default. For multi-state components, key constants as `theme-variant-state` (`'light-default-hover'`); combinations the priority order makes unreachable don't need a key.

**Icons.** Use `@cypress-design/react-icon` / `@cypress-design/vue-icon` for every icon, and set its colors per theme and state through the icon's color props. Inline SVG is for shapes that aren't icons, like Spinner's ring or Tooltip's arrow.

## Form controls and input-like components

- **Focus ring: `outline`, not `border`.** Outline doesn't shift layout. E.g. `focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-0`.
- **Hover and active: `border` on the wrapper.** For composite controls (label + input + icon), put the states on the wrapper and use `focus-within` so the whole control responds to the inner input.
- **`:focus-visible` is for keyboard focus**; browsers skip it on mouse click. Use `:focus` / `:active` for "the user is typing here".
- **Placeholder isn't a pseudo-class.** Apply the placeholder classes from constants in JavaScript when the value is empty and a placeholder is set.
- **Support the native attributes**: `value` / `defaultValue` / `v-model`, `disabled`, `placeholder`, `aria-*`, and `onChange` / `onInput` / `onFocus` / `onBlur`.
- Use `onKeyDown` / `onKeyUp` (`@keydown` / `@keyup`), not the deprecated `keypress`.

## Testing

- Cover every variant, size, state, and theme in the Cypress component tests, through `assertions.ts` where behavior is shared.
- Take a Percy snapshot (`cy.percySnapshot()`) of each visual state. Existing components do this inside `assertions.ts`.
- Test keyboard behavior: Tab order, Enter / Space, and arrow keys where the pattern calls for them.

## Accessibility

Address every issue Cypress Accessibility reports on the component's tests. Then check the component against [accessibility.md](https://design.cypress.io/agents/accessibility.md) and the accessibility section of [review-checklist.md](https://design.cypress.io/agents/review-checklist.md). For components specifically:

- Use the semantic element (`<button>`, `<input>`, `<label>`) before reaching for ARIA.
- Wire `aria-invalid` to error states and `aria-describedby` to help and error text.
- Give icon-only controls an accessible name (`aria-label` or `aria-labelledby`).
- Keep the focus ring visible in both themes.

## Release

Add a `.changeset/*.md` file (`yarn changeset`); `/.agents/architecture.md` under "Publishing" covers how releases work and the `workspace:^` rule for internal dependencies.

For a brand-new component, mark all three packages `major`. From the scaffold's `0.0.1`, that makes the first publish `1.0.0`:

```md
---
'@cypress-design/constants-{component}': major
'@cypress-design/react-{component}': major
'@cypress-design/vue-{component}': major
---

Add {Component} — one sentence on what it does.
```

For changes to a published component: `major` for breaking API changes, `minor` for features, `patch` for fixes.
