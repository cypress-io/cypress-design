// Option Item per-state classes, keyed by `${theme}-default`.
// Each string includes :hover, data-[focused=true]:, data-[selected=true]:,
// aria-[disabled=true]: modifiers so the same key covers every visual state.
//
// Light- and dark-mode colors are extracted explicitly from the Figma spec
// rather than relying on `dark:` auto-mapping.

export const CssOptionItemBaseClasses = [
  // Base layout
  'flex items-center w-full',
  'rounded-[4px] cursor-pointer select-none',
  // `relative` opts every row into its own stacking context so `z-10` on
  // focused / active rows (see CssOptionItemClasses) actually lifts them
  // above their siblings. Without this, the row's 3px outer outline gets
  // clipped behind a neighbour's background (notably the selected row's
  // indigo-50 fill).
  'relative',
  // `group` exposes the row's hover / focus / active / selected / disabled
  // state to descendants (the iconLeft container uses `group-*` modifiers
  // to swap its outline + fill colors per state — see CssOptionItemIconColorClasses).
  'group',
  // NOTE: text color comes from the per-theme `CssOptionItemClasses` below.
  // Don't reintroduce a default `text-gray-*` here — Tailwind orders text-gray
  // utilities by ascending shade in the generated CSS, so a darker shade in
  // the base would silently override a lighter theme color (this is what was
  // happening to dark mode's `text-gray-100`).
  'font-normal',
  'transition-colors duration-100',
].join(' ')

// Per-state styling, keyed by `${theme}-default`. Mapped from the Figma
// `Components/Inputs/Select/Option List/...` variable set.
//
// Layout-safety: inside borders use `ring-* ring-inset` (box-shadow, no
// layout shift) and outside rings use `outline-* outline-offset-0`. Row
// dimensions stay constant across states.
//
// State → modifier:
//   Default       → no modifier
//   Hover         → `hover:` (mouse only)
//   Focus         → `data-[focused=true]:` (keyboard arrow navigation)
//   Active        → `active:` (mouse-down)
//   Selected      → `data-[selected=true]:`
//   Disabled      → `aria-[disabled=true]:`
export const CssOptionItemClasses = {
  // ───────────── Light mode ─────────────
  'light-default': [
    // Default — text only
    'text-gray-900',
    // Hover: bg-gray-25, 1px gray-50 inset ring, indigo-500 text
    'hover:bg-gray-25 hover:ring-1 hover:ring-gray-50 hover:ring-inset hover:text-indigo-500',
    // Focus (keyboard): bg-indigo-50, 2px indigo-300 inset ring + 3px
    // indigo-300/35 outer ring, indigo-700 text. `z-10` lifts the row so
    // its outer outline paints over any selected sibling's background.
    'data-[focused=true]:z-10 data-[focused=true]:bg-indigo-50 data-[focused=true]:ring-2 data-[focused=true]:ring-indigo-300 data-[focused=true]:ring-inset data-[focused=true]:outline data-[focused=true]:outline-[3px] data-[focused=true]:outline-indigo-300/35 data-[focused=true]:outline-offset-0 data-[focused=true]:text-indigo-700',
    // Active (mouse-down): bg-indigo-50, 1px indigo-300 inset ring + 2px
    // indigo-300/35 outer ring, indigo-700 text. `z-10` for the same
    // outline-vs-sibling-background reason as Focus above.
    'active:z-10 active:bg-indigo-50 active:ring-1 active:ring-indigo-300 active:ring-inset active:outline active:outline-2 active:outline-indigo-300/35 active:outline-offset-0 active:text-indigo-700',
    // Selected: bg-indigo-50, indigo-700 text. Hovering a selected row is a
    // no-op visually — the selection is the dominant state. Keyboard focus
    // on a selected row still bumps the bg so the focus ring reads clearly.
    'data-[selected=true]:bg-indigo-50 data-[selected=true]:text-indigo-700',
    'data-[selected=true]:data-[focused=true]:bg-indigo-100',
    // Focus-visible (rare — arrows use data-focused, but cover direct
    // keyboard focus on the row itself)
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300/35 focus-visible:outline-offset-[-2px]',
    // Disabled: gray-500 text, no hover/focus visual feedback
    'aria-[disabled=true]:text-gray-500 aria-[disabled=true]:cursor-not-allowed',
    'aria-[disabled=true]:hover:bg-transparent aria-[disabled=true]:hover:ring-0 aria-[disabled=true]:data-[focused=true]:bg-transparent aria-[disabled=true]:data-[focused=true]:ring-0',
  ].join(' '),

  // ───────────── Dark mode ─────────────
  // Note: default text uses gray-100 (override per user) — Figma spec is
  // gray-400 (#bfc2d4); we explicitly chose the lighter shade for legibility.
  'dark-default': [
    'text-gray-100',
    // Hover: bg-gray-950, 1px gray-900 inset ring, indigo-300 text
    'hover:bg-gray-950 hover:ring-1 hover:ring-gray-900 hover:ring-inset hover:text-indigo-300',
    // Focus (keyboard): bg-gray-950, 2px indigo-300 inset ring + 3px
    // indigo-300/35 outer ring, indigo-300 text. `z-10` lifts the row so
    // its outer outline paints over any selected sibling's background.
    'data-[focused=true]:z-10 data-[focused=true]:bg-gray-950 data-[focused=true]:ring-2 data-[focused=true]:ring-indigo-300 data-[focused=true]:ring-inset data-[focused=true]:outline data-[focused=true]:outline-[3px] data-[focused=true]:outline-indigo-300/35 data-[focused=true]:outline-offset-0 data-[focused=true]:text-indigo-300',
    // Active (mouse-down): bg-gray-950, 1px indigo-300 inset ring + 2px
    // indigo-300/35 outer ring, indigo-300 text. `z-10` for the same
    // outline-vs-sibling-background reason as Focus above.
    'active:z-10 active:bg-gray-950 active:ring-1 active:ring-indigo-300 active:ring-inset active:outline active:outline-2 active:outline-indigo-300/35 active:outline-offset-0 active:text-indigo-300',
    // Selected: bg-gray-950, indigo-300 text. Hovering a selected row is a
    // no-op visually. Keyboard focus on a selected row still tints so the
    // focus ring reads clearly against the gray-950 base.
    'data-[selected=true]:bg-gray-950 data-[selected=true]:text-indigo-300',
    'data-[selected=true]:data-[focused=true]:bg-indigo-500/30',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300/35 focus-visible:outline-offset-[-2px]',
    // Disabled: gray-700 text, no hover/focus visual feedback
    'aria-[disabled=true]:text-gray-700 aria-[disabled=true]:cursor-not-allowed',
    'aria-[disabled=true]:hover:bg-transparent aria-[disabled=true]:hover:ring-0 aria-[disabled=true]:data-[focused=true]:bg-transparent aria-[disabled=true]:data-[focused=true]:ring-0',
  ].join(' '),
} as const

// Focus indicator for `button` row wrappers. Default rows pull the same
// ring in through `CssOptionItemClasses` (alongside hover/selected/etc.);
// button rows are presentational wrappers around an actual Button so we
// only need the keyboard-focus ring — hover/active fire on the inner
// Button directly. `rounded-[4px]` matches the default row chrome so the
// ring sits flush against the row corners.
export const CssButtonRowFocusClasses = {
  light:
    'rounded-[4px] data-[focused=true]:z-10 data-[focused=true]:bg-indigo-50 data-[focused=true]:ring-2 data-[focused=true]:ring-indigo-300 data-[focused=true]:ring-inset data-[focused=true]:outline data-[focused=true]:outline-[3px] data-[focused=true]:outline-indigo-300/35 data-[focused=true]:outline-offset-0',
  dark: 'rounded-[4px] data-[focused=true]:z-10 data-[focused=true]:bg-gray-950 data-[focused=true]:ring-2 data-[focused=true]:ring-indigo-300 data-[focused=true]:ring-inset data-[focused=true]:outline data-[focused=true]:outline-[3px] data-[focused=true]:outline-indigo-300/35 data-[focused=true]:outline-offset-0',
} as const

// Icon (iconLeft) color per theme and per row state. Mapped from the Figma
// `Components/Inputs/Select/Option List/.../Icon/{Fill,Outline}` variables.
//
// The cypress icon system uses TWO classes on the parent:
//   `text-*`        → flows into `currentColor`, which paints `.icon-dark`
//                     paths (typically the outline / stroke)
//   `icon-light-*`  → matched by global CSS rules to paint `.icon-light`
//                     paths (typically the fill)
//
// Because the icon's color must react to the *row's* state (hover, focus,
// active, selected, disabled), we use Tailwind `group-*` modifiers — the row
// container has `group` (see CssOptionItemBaseClasses), so the icon container
// can subscribe to the row's state changes from a nested element.
//
// Light disabled outline is gray-300 (#bfc2d4 — matches Figma's
// `Disabled/Icon/Outline`), not gray-400.
export const CssOptionItemIconColorClasses = {
  light: [
    'shrink-0',
    // Default
    'text-gray-500 icon-light-gray-50',
    // Hover
    'group-hover:text-indigo-500 group-hover:icon-light-indigo-100',
    // Focus (keyboard)
    'group-data-[focused=true]:text-indigo-500 group-data-[focused=true]:icon-light-indigo-100',
    // Active (mouse-down)
    'group-active:text-indigo-500 group-active:icon-light-indigo-100',
    // Selected
    'group-data-[selected=true]:text-indigo-500 group-data-[selected=true]:icon-light-indigo-100',
    // Disabled
    'group-aria-[disabled=true]:text-gray-300 group-aria-[disabled=true]:icon-light-gray-50',
  ].join(' '),
  dark: [
    'shrink-0',
    'text-gray-500 icon-light-gray-900',
    'group-hover:text-indigo-300 group-hover:icon-light-indigo-600',
    'group-data-[focused=true]:text-indigo-300 group-data-[focused=true]:icon-light-indigo-600',
    'group-active:text-indigo-300 group-active:icon-light-indigo-600',
    'group-data-[selected=true]:text-indigo-300 group-data-[selected=true]:icon-light-indigo-600',
    'group-aria-[disabled=true]:text-gray-800 group-aria-[disabled=true]:icon-light-gray-1000',
  ].join(' '),
} as const

// Label is content-width by default — anything visually following it
// (a `tag`) sits inline immediately after the label, as per Figma. The
// optional `slotRight` is pushed to the row's right edge via `ml-auto`.
// `min-w-0 truncate` lets the label shrink + ellipsize when the row is
// too narrow to fit everything.
export const CssOptionItemLabelClasses = 'min-w-0 truncate'

// Sub-text on two-line rows (`checkbox`, `user`). Always 14/20 regardless of
// popover size — only the primary line above it scales with size. Muted gray.
export const CssOptionItemSubTextClasses = {
  light: 'text-[14px] leading-[20px] text-gray-700',
  dark: 'text-[14px] leading-[20px] text-gray-500',
} as const

// Headline row — non-interactive section heading.
// Font size + line-height inherit from the popover root, so headlines
// follow the size of the surrounding option items:
//   size 32 → 14/20  ·  size 40 → 16/24
// Headlines are always font-weight 500 (medium) regardless of size.
// Rendered in the case the consumer passes — no uppercase transform.
// Padding is NOT included here — render code applies the per-size
// `CssOptionItemPaddingClasses` so the headline lines up horizontally
// and vertically with the surrounding option rows.
export const CssOptionHeadlineClasses = {
  light: 'font-medium text-gray-600',
  dark: 'font-medium text-gray-500',
} as const

// Divider row — horizontal rule. 6px top + 6px bottom margin so the line
// reads as a section break rather than blending into row gaps.
export const CssOptionDividerClasses = {
  light: 'h-[1px] bg-gray-100 my-[6px]',
  dark: 'h-[1px] bg-gray-800 my-[6px]',
} as const
