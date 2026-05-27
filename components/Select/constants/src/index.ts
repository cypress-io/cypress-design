import type * as React from 'react'

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
// agnostic in spirit but typed against React here (Textbox does the same).
// The Vue package layers in looser prop typings.
type IconNode = React.ComponentType<Record<string, unknown>> | React.ReactNode

// Sub-shapes for each row content type.

export interface SelectItemDefault {
  type?: 'default'
  value: string
  label: string
  iconLeft?: IconNode
  slotRight?: React.ReactNode
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
}

export interface SelectItemCustom {
  type: 'custom'
  value?: string
  key?: string
  render: (ctx: { selected: boolean }) => React.ReactNode
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

/**
 * Normalize a CSS length input to a CSS string. Plain numbers become `${n}px`.
 */
export function toCssLength(value: CssLength | undefined): string | undefined {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
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
export const DefaultSize: SelectSize = '40'
export const DefaultAlignment: SelectAlignment = 'left'
export const DefaultTriggerVariant: ButtonVariantLoose = 'outline-gray-light'
export const DefaultSearchPlaceholder = 'Search'
