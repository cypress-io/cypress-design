// Popover panel + header + footer classes, keyed by theme.
//
// Figma uses NO drop shadow on the panel. The chrome is a 1px inside border
// plus a 3px outside outline — light mode uses muted gray, dark mode uses
// indigo. Tokens come from Components/Inputs/Select/Option List/Card/Outline
// in Figma (light node 4980:25030, dark node 5116:122785).
export const CssPopoverClasses = {
  light:
    'bg-white border border-gray-400 rounded-[4px] outline outline-[3px] outline-offset-0 outline-gray-1000/[0.07]',
  dark: 'bg-gray-1000 border border-indigo-300 rounded-[4px] outline outline-[3px] outline-offset-0 outline-indigo-300/35',
} as const

// Bottom border on the header block — separates header (title row, tabs,
// search) from the items area. Light = gray-50, dark = gray-900/50, both
// pulled from Figma `Border/Secondary` for the header design.
export const CssHeaderClasses = {
  light: 'border-b border-gray-50',
  dark: 'border-b border-gray-900/50',
} as const

// Title row — the top row of the header. Contains (in order, all optional
// except title): back button · iconLeft · title · tag · spacer · iconRight.
// `min-h-[48px]` matches Figma's 48px header row height. Horizontal padding
// is applied by the renderer because it varies with content: 8px on the
// left when a back button is present (button hugs the edge), otherwise 16px
// so the iconLeft / title sits inset from the panel edge; 16px on the right
// when iconRight is present, otherwise 8px.
export const CssHeaderTitleRowClasses =
  'flex items-center min-h-[48px] py-[6px]'

// Title-row left group: iconLeft + title + tag, kept together so the
// optional right-side icon (sibling) sits flush at the row's edge thanks
// to the group's `flex-1`. 8px gap between the group's own children.
// The back button (if present) is a sibling of this group, NOT inside
// it — see CssHeaderBackButtonSpacingClasses for the button-to-group gap.
export const CssHeaderTitleGroupClasses =
  'flex-1 flex items-center gap-[8px] min-w-0'

// Extra right-margin on the back button so the gap between it and the
// iconLeft / title (the first member of the title group) is 12px instead
// of the 8px used between group members.
export const CssHeaderBackButtonSpacingClasses = 'mr-[12px]'

// Title text — Figma spec: gray-900 (light) / gray-300 (dark), regular
// weight (NOT medium, despite headline rows below being medium). Font-size
// scales with the popover size: 14/20 at size 32, 16/24 at size 40.
export const CssHeaderTitleSizeClasses = {
  '32': 'text-[14px] leading-[20px]',
  '40': 'text-[16px] leading-[24px]',
} as const

export const CssHeaderTitleClasses = {
  light: 'text-gray-900 truncate',
  dark: 'text-gray-300 truncate',
} as const

// Icon color for the optional `headerIconLeft` / `headerIconRight` slots.
// Muted gray-500 in both themes per Figma's header icon outline token.
export const CssHeaderIconColorClasses = {
  light: 'shrink-0 text-gray-500 icon-light-gray-50',
  dark: 'shrink-0 text-gray-500 icon-light-gray-900',
} as const

// Footer sits below the scrollable items area. It has its own subtle tint so
// the meta info (e.g. "Showing 3 of 12") reads as a footer band, not as part
// of the list.
export const CssFooterClasses = {
  light: 'bg-gray-25 border-t border-gray-100',
  dark: 'bg-gray-950 border-t border-gray-900',
} as const

// Footer left group: info icon + label, treated as one block so the right-
// side action (typically a link `Button`) stays pushed to the far right by
// the footer container's `justify-between`.
export const CssFooterLabelGroupClasses = 'flex items-center gap-[8px]'

export const CssFooterLabelClasses = {
  light: 'text-[14px] leading-[20px] text-gray-700',
  dark: 'text-[14px] leading-[20px] text-gray-400',
} as const

// Info icon next to the footer label — muted to match the label color.
export const CssFooterIconColorClasses = {
  light: 'text-gray-600 shrink-0',
  dark: 'text-gray-400 shrink-0',
} as const

// Empty-state message shown when search filtering returns no rows.
export const CssEmptyStateClasses = {
  light: 'text-[14px] leading-[20px] text-gray-500 text-center py-[12px]',
  dark: 'text-[14px] leading-[20px] text-gray-500 text-center py-[12px]',
} as const
