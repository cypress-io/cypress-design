---
'@cypress-design/react-select': minor
'@cypress-design/vue-select': minor
---

Add the Select component: a single-select dropdown with a Button trigger (swappable via the `#trigger` slot / render prop) and a popover panel that supports headline / divider / default / checkbox / user / button / custom rows, optional header (title, back button, iconLeft / tag / iconRight, tabs, search) and footer (label + action or arbitrary content), theme-aware light/dark styling, size `32` / `40`, configurable width / minWidth / maxWidth / height / maxHeight, and left/right alignment. Selection is controlled or uncontrolled; open state is controlled or uncontrolled. Keyboard navigation walks selectable rows and in-list `button` rows via `aria-activedescendant`, with Enter/Space to commit, Escape/Tab to dismiss. Case-insensitive search filters items by label and collapses orphaned headline groups. `type: 'button'` rows fire their own `onClick` without changing the value.

The `constants-select` package is bundled into the React and Vue packages — consumers install a single package.
