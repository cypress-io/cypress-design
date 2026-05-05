# Prod vs Local Page Comparison

Compared every page on `https://design.cypress.io` (prod, VitePress) against the
local Astro build (`http://localhost:4323`). Local site is the
`migrate-docs-to-astro` branch.

## Site-wide observations

### URL scheme changed (BREAKING for inbound links)

| Prod                               | Local                         |
| ---------------------------------- | ----------------------------- |
| `/Install.html`                    | `/install`                    |
| `/Colors.html`                     | `/colors`                     |
| `/Icons.html`                      | `/icons`                      |
| `/components/vue/Button.html`      | `/components/Button`          |
| `/components/vue/Icon.html`        | `/components/Icon`            |
| `/patterns/Card.html`              | `/patterns/card`              |
| `/patterns/Button-Bar.html`        | `/patterns/button-bar`        |
| `/patterns/Test-Results-List.html` | `/patterns/test-results-list` |

Two changes:

1. Lowercased URLs (top-level pages and patterns).
2. Dropped the `/vue/` framework segment from component routes — local pages
   are framework-agnostic with a Vue/React switcher.

**Needs a pair of eyes:** any links from `cypress.io`, blog posts, Cypress App
in-product help, or external docs pointing at the old `/components/vue/<Name>.html`
URLs will 404 after Astro ships. Worth adding redirects in `vercel.json`
(or equivalent) to map old → new.

### Sidebar: same set of sections

Local sidebar matches prod (16 components). **SpecListTestItem** was added in
development but is not a public component—it's an internal/private component
used only in Cypress App, not meant for external consumers. Removed from docs.

### New page: `/components` index

Local has a top-level component catalogue at `/components` (table with name,
description, frameworks). Prod has no equivalent — this is an improvement.

### Heading duplication on component pages

Every component page renders three tabs (Vue / React / Instructions) and each
tab contains its own `<h1>`. The page outline (e.g. Tooltip) lists `H1: Tooltip`
three times. Astro's tab UI hides inactive panes visually, but the headings
still appear in the DOM, in the page outline, and to screen readers. This was
not the case on prod, which only had one `<h1>` per page. Worth deciding
whether tab panes should use `<h2>` (or aria-hidden when inactive).

---

## Per-page review

### `/` Getting Started

- Content matches prod almost verbatim ("This documentation site… Figma files…
  Design tokens… Components…").
- No regressions, nothing missing. ✅

### `/install`

- **Better on local:** removed the deprecated WindiCSS section that was still
  on prod. Cleanup is correct given the WindiCSS plan in
  `.agents/architecture.md`.
- **Better on local:** added a new **Token CSS** section pointing at
  `https://design.cypress.io/colors.css` and the `build:colors-css` workspace
  script. Matches the hosted-styles strategy in architecture docs.
- React-first install example (`yarn add @cypress-design/react-button`) is the
  same on both.
- **Needs a pair of eyes:** prod's install page only documented Vue install
  examples in some sections; verify both Vue and React are reachable from the
  framework switcher on every install snippet.

### `/colors`

- All three palettes (Primary / Secondary / Tertiary) present with the same
  shade ramps and hex values as prod.
- **Better on local:** the implementation section is now three explicit code
  blocks — **JS Variables**, **CSS Custom Properties**, **Tailwind Classes** —
  instead of prod's prose summary. Each has a working snippet.
- **Better on local:** "Open colors in Figma" link at the bottom (not on prod).
- No regressions. ✅

### `/icons`

- Local renders **32 category groups** + an **Animated Icons** section
  (825 inline SVGs). Prod only had ~25 groups. Either the icon registry has
  grown since prod last built, or local is correctly picking up new categories.
- Legend (`s` / `f` / `f+` / `s+`) and "see the Icon component page" link both
  present.
- **Needs a pair of eyes:** verify all 32 groups actually contain icons (no
  empty headings) and that the per-icon copy-to-clipboard / size variants /
  framework code snippets shown on prod still render. The DOM has the icons,
  but I didn't visually verify the per-icon tooltips/code snippets.

---

### Components

All component pages exist on both sites. Notes are about content drift, not
missing pages.

#### `/components/Accordion`

Same H2 outline as prod (Install / Usage / Props / Events `update:open` / Slots).
Demos render. ✅

#### `/components/Alert`

Same coverage as prod (variants info/success/error/warning/neutral/clear,
dismissible, sizes, slots). ✅

#### `/components/Button`

Outline matches prod (Install / Usage / **Possible variants** / Props / Events
`click` / Slots). All variants and 20–48 sizes shown. ✅

#### `/components/Checkbox`

Same as prod (id / color / disabled / checked / label, both events). ✅

#### `/components/DocMenu`

Headings + demo match prod. Local Instructions tab adds `NavItemLink shape` and
`NavGroup shape` type docs — improvement. ✅

#### `/components/Icon`

**Needs a pair of eyes:** prod's Icon page had a longer Props section listing
`hover` / `focus` / `focusWithin` / `hocus` interactive variants and the
`interactiveColorsOnGroup` prop. Local's Vue/React tabs only show
Install / Usage / Import / Colors. The Instructions tab has a "Shared Props
(all icons)" section, but it's worth confirming all four interactive-color
prop families and `interactiveColorsOnGroup` are documented somewhere
discoverable.

#### `/components/Logo`

Matches prod (CypressMark / CypressLockUp / CypressWatermark sub-components,
each with its variant prop). ✅

#### `/components/Menu`

**Likely regression:** Vue and React tabs only show **Install** — no `Usage` H2,
no demo code snippet. Prod had a usage example with `items` and `activePath`.
The Instructions tab has the prop reference, but the framework tabs feel empty.
Check `components/Menu/{vue,react}/ReadMe.md` for missing Usage section.

#### `/components/Modal`

**Likely regression:** same as Menu — Vue and React tabs are Install-only, no
Usage demo. Prod showed a Vue setup binding `show` two-way and toggling from a
button. Re-add a usage snippet.

#### `/components/Spinner`

Matches prod (light/dark variant, manual-styles vs SFC import). ✅

#### `/components/SpecListTestItem` (NEW)

Only exists on local. Has an **Instructions** tab with Install / Props / Events
(`click`) / Slots, but **no Vue or React framework tab content** — only the
agent-facing instructions doc renders. Decide whether this component should
ship with consumer Vue/React docs and a live demo before launch, or whether
it's intentionally agent-only.

#### `/components/StatusIcon`

Matches prod (variants outline / simple / solid; sizes 4–24; full status enum).
Demos render. ✅

#### `/components/Tabs`

Matches prod (7 variants: default, indigo-light, dark-small/large,
underline-small/center/large; events `switch` and `update:activeId`; tab slot
bindings). Local additionally surfaces `Tab shape` type — improvement. ✅

#### `/components/Tag`

Matches prod (sizes 16/20/24/32; nine colors; outline + dark variants). ✅

#### `/components/TestResult`

Matches prod (statuses, badges, `#actions` and `#groups` slots, container
queries). ✅

#### `/components/Textbox`

Largest page on the site. Outline is enormous — Possible variants / Sizes /
Rounded / Options / Template Refs / Keyboard Event Handlers / Common Input
Attributes / Real-World Use Cases / Props.

- **Needs a pair of eyes — content asymmetry between framework tabs:**
  - Vue tab has `Template Refs`, no `Ref Forwarding`.
  - React tab has `Ref Forwarding`, no `Template Refs`.
  - React tab has a much longer per-prop H3 list (`onClick`, `onChange`,
    `onInput`, `onFocus`, `onBlur`, `className`, `iconLeft`, `iconRight`, `type`,
    `name`, `id`, `autoFocus`, `rounded`, `size`, `disabled`, `placeholder`,
    `value`, `defaultValue`, `theme`, `variant`, `labelLeft`, `divider`,
    `labelRight`) while the Vue tab collapses these into a single `Props`
    heading.
  - This is intentional in places (refs work differently per framework) but the
    inconsistency is jarring. Worth a pass to align section ordering and depth
    across the two tabs.
- The Instructions tab has the cleanest, most concise outline (What it is /
  Props / Events / Slots / States / Accessibility / Known limitations /
  References) — could be a model for trimming the framework tabs.

#### `/components/Tooltip`

Matches prod (color dark/light, 12 placements, disabled, interactive,
offsetOptions, shiftOptions, default + `popper` slots). ✅

---

### Patterns

#### `/patterns/card`

Matches prod. Shows the basic `card` class and the `shadow-marketing-card`
variant. Local adds an explicit sentence explaining
`shadow-marketing-card` — small improvement. ✅

#### `/patterns/button-bar`

Matches prod (lorem ipsum + flex/gap layout with Primary Action / Cancel /
Give feedback). ✅

#### `/patterns/test-results-list`

Matches prod (scrollable container of TestResult rows, `#actions` slot,
expandable `#groups` with chevron rotation, container queries). ✅

---

## Summary

**Worth a second pair of eyes**

- Icons page: spot-check a few categories to confirm per-icon code snippets
  and size variants still render.
- Textbox: align section depth/ordering between Vue and React tabs.
- Install page: confirm both Vue and React snippets are reachable from every
  framework switcher.
