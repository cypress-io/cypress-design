export * from './base-classes'
export * from './option-item-classes'
export * from './option-list-classes'
export * from './content-type-classes'

import { CssOptionItemHeightClasses } from './base-classes'

// ---------- Public types ----------

export type SelectTheme = 'light' | 'dark'
export type SelectVariant = 'default' | 'valid' | 'invalid' | 'warning'
export type SelectSize = keyof typeof CssOptionItemHeightClasses // '32' | '40'
export type SelectAlignment = 'left' | 'right'

// `IconNode` accepts any consumer-renderable node. Constants are framework-
// agnostic, so the type is intentionally loose — both React (functional
// components, JSX nodes) and Vue (`DefineSetupFnComponent`-flavored shapes
// from `@cypress-design/vue-icon`) need to fit through. Each framework's
// renderer does its own runtime dispatch (`<component :is>` in Vue,
// `React.createElement` in React), so the type is just a passthrough.
export type IconNode = unknown

// Sub-shapes for each row content type.

export interface SelectItemDefault {
  type?: 'default'
  value: string
  label: string
  iconLeft?: IconNode
  // Trailing 16px icon, rendered after the tag with `ml-auto` so it hugs the
  // right edge. Picks up the same state-aware coloring as `iconLeft` (gray
  // outline → indigo on hover/focus/active/selected, muted on disabled).
  iconRight?: IconNode
  // Generic escape-hatch for arbitrary trailing content (badges, counts,
  // etc.). Sits right of `iconRight` if both are provided; consumers are
  // responsible for any state-aware styling on `slotRight`.
  slotRight?: IconNode
  tag?: string
  disabled?: boolean
}

export interface SelectItemHeadline {
  type: 'headline'
  label: string
  key?: string
}

export interface SelectItemDivider {
  type: 'divider'
  key?: string
}

export interface SelectItemCheckbox {
  type: 'checkbox'
  value: string
  label: string
  subText?: string
  disabled?: boolean
}

export interface SelectItemUser {
  type: 'user'
  value: string
  label: string
  secondary?: string
  iconLeft?: IconNode
}

export type ButtonVariantLoose = string // loose to avoid pulling in Button types

export interface SelectItemButton {
  type: 'button'
  key: string
  label: string
  onClick: () => void
  variant?: ButtonVariantLoose
  // Optional leading icon, rendered inside the Button before the label.
  iconLeft?: IconNode
}

export interface SelectItemCustom {
  type: 'custom'
  value?: string
  key?: string
  render: (ctx: { selected: boolean }) => IconNode
}

export type SelectItem =
  | SelectItemDefault
  | SelectItemHeadline
  | SelectItemDivider
  | SelectItemCheckbox
  | SelectItemUser
  | SelectItemButton
  | SelectItemCustom

// Subset of items that participate in selection / keyboard traversal.
export type SelectableItem =
  | SelectItemDefault
  | SelectItemCheckbox
  | SelectItemUser
  | (SelectItemCustom & { value: string })

// Helpers used by both React and Vue implementations to filter or classify items.
export function isSelectable(item: SelectItem): item is SelectableItem {
  if (item.type === 'default' || item.type === undefined) return !item.disabled
  if (item.type === 'checkbox') return !item.disabled
  if (item.type === 'user') return true
  if (item.type === 'custom') return typeof item.value === 'string'
  return false
}

export function getItemValue(item: SelectItem): string | undefined {
  if (
    item.type === 'default' ||
    item.type === undefined ||
    item.type === 'checkbox' ||
    item.type === 'user' ||
    item.type === 'custom'
  ) {
    // 'value' may be undefined on custom items
    // (in which case the row is non-selectable)
    return (item as { value?: string }).value
  }
  return undefined
}

export function getItemLabel(item: SelectItem): string | undefined {
  if (
    item.type === undefined ||
    item.type === 'default' ||
    item.type === 'checkbox' ||
    item.type === 'user' ||
    item.type === 'headline' ||
    item.type === 'button'
  ) {
    return (item as { label: string }).label
  }
  return undefined
}

// Header tab descriptor mirrors the public Tab type from @cypress-design/constants-tabs
// but is duplicated here to avoid pulling the Tabs constants as a hard dep.
export interface SelectHeaderTab {
  id: string
  label: string
  'aria-controls'?: string
}

// Sizing inputs for the popover. Each accepts a CSS length or a plain number (px).
export type CssLength = string | number

export interface SelectSizingProps {
  width?: CssLength
  minWidth?: CssLength
  maxWidth?: CssLength
  height?: CssLength
  maxHeight?: CssLength
}

// Shared prop groups — composed via `extends`/intersection by the public
// SelectProps and the internal SelectOptionList/SelectOptionItem prop shapes.
// Small named groups keep each concern's props together so the call-site
// signature reads cleanly and a new field is added in exactly one place.

export interface SelectThemingProps {
  theme?: SelectTheme
  size?: SelectSize
}

export interface SelectHeaderProps {
  headerTitle?: string
  headerButton?: {
    iconLeft: IconNode
    onClick: () => void
    ariaLabel?: string
  }
  headerIconLeft?: IconNode
  headerTag?: string
  headerIconRight?: IconNode
  headerTabs?: SelectHeaderTab[]
  headerActiveTab?: string
}

export interface SelectSearchProps {
  searchable?: boolean
  searchPlaceholder?: string
  // When `searchable` is true, the search Textbox is shown. Set this to
  // `false` to render the Textbox as a visual-only element (no filtering)
  // — useful for showcase pages where every row should stay visible
  // regardless of what the user types. Defaults to true.
  searchFilters?: boolean
}

export interface SelectFooterProps {
  footerLabel?: string
  footerAction?: { label: string; onClick: () => void }
}

/**
 * Normalize a CSS length input to a CSS string. Plain numbers become `${n}px`.
 *
 * `NaN`, `Infinity`, and the empty string don't yield valid CSS — return
 * `undefined` so `buildSizingStyle` omits the property entirely instead of
 * shipping `'NaNpx'` or `''` (browsers ignore both, but a missing key is
 * cleaner than a silently dropped one).
 */
export function toCssLength(value: CssLength | undefined): string | undefined {
  if (value === undefined) return undefined
  if (typeof value === 'number') {
    return Number.isFinite(value) ? `${value}px` : undefined
  }
  return value === '' ? undefined : value
}

/**
 * Build an inline-style object from sizing props.
 */
export function buildSizingStyle(
  props: SelectSizingProps,
): Record<string, string> {
  const style: Record<string, string> = {}
  const w = toCssLength(props.width)
  const minW = toCssLength(props.minWidth)
  const maxW = toCssLength(props.maxWidth)
  const h = toCssLength(props.height)
  const maxH = toCssLength(props.maxHeight)
  if (w) style.width = w
  if (minW) style.minWidth = minW
  if (maxW) style.maxWidth = maxW
  if (h) style.height = h
  if (maxH) style.maxHeight = maxH
  return style
}

// ---------- Defaults ----------

export const DefaultTheme: SelectTheme = 'light'
export const DefaultSize: SelectSize = '32'
export const DefaultAlignment: SelectAlignment = 'left'
export const DefaultTriggerVariant: ButtonVariantLoose = 'outline-gray-light'
export const DefaultSearchPlaceholder = 'Search'
