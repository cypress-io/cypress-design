import * as React from 'react'
import clsx from 'clsx'
import Button from '@cypress-design/react-button'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import * as SelectConstants from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectTheme,
  SelectSize,
  SelectAlignment,
  SelectHeaderTab,
  ButtonVariantLoose,
} from '@cypress-design/constants-select'
import SelectOptionList from './SelectOptionList'
import { getSelectableIndices } from './filter-items'

export interface SelectTriggerContext {
  open: boolean
  selected: SelectItem | null
  toggle: () => void
  close: () => void
}

export interface SelectProps {
  theme?: SelectTheme
  size?: SelectSize
  align?: SelectAlignment
  triggerVariant?: ButtonVariantLoose

  items: SelectItem[]

  value?: string
  defaultValue?: string
  onChange?: (value: string, item: SelectItem) => void

  placeholder?: string
  disabled?: boolean

  // Header
  headerTitle?: string
  headerTabs?: SelectHeaderTab[]
  headerActiveTab?: string
  onHeaderTabChange?: (id: string) => void
  searchable?: boolean
  searchPlaceholder?: string

  // Footer
  footer?: React.ReactNode
  footerLabel?: string
  footerAction?: { label: string; onClick: () => void }

  // Sizing forwarded to popover
  width?: SelectConstants.CssLength
  minWidth?: SelectConstants.CssLength
  maxWidth?: SelectConstants.CssLength
  height?: SelectConstants.CssLength
  maxHeight?: SelectConstants.CssLength

  // Open state
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void

  // Escape hatches
  trigger?: React.ReactNode | ((ctx: SelectTriggerContext) => React.ReactNode)
  className?: string
  popoverClassName?: string
  id?: string
}

let uidCounter = 0
const useUid = () => {
  const [uid] = React.useState(() => `cy-select-${++uidCounter}`)
  return uid
}

export const Select: React.FC<SelectProps> = ({
  theme = SelectConstants.DefaultTheme,
  size = SelectConstants.DefaultSize,
  align = SelectConstants.DefaultAlignment,
  triggerVariant = SelectConstants.DefaultTriggerVariant,
  items,
  value: valueProp,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  headerTitle,
  headerTabs,
  headerActiveTab,
  onHeaderTabChange,
  searchable = false,
  searchPlaceholder,
  footer,
  footerLabel,
  footerAction,
  width,
  minWidth,
  maxWidth,
  height,
  maxHeight,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  trigger,
  className,
  popoverClassName,
  id,
}) => {
  const uid = useUid()
  const popoverId = id ? `${id}-popover` : `${uid}-popover`
  const itemIdPrefix = id ? `${id}-opt` : `${uid}-opt`

  // ---------- Open state (controlled / uncontrolled) ----------
  const isOpenControlled = openProp !== undefined
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = isOpenControlled ? openProp : internalOpen
  const setOpen = (next: boolean) => {
    if (!isOpenControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  // ---------- Selected value (controlled / uncontrolled) ----------
  const isValueControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    defaultValue,
  )
  const value = isValueControlled ? valueProp : internalValue

  const selected = React.useMemo<SelectItem | null>(() => {
    if (value === undefined) return null
    const found = items.find((it) => SelectConstants.getItemValue(it) === value)
    return found ?? null
  }, [items, value])

  // ---------- Focused index (within filtered selectables) ----------
  const [focusedIndex, setFocusedIndex] = React.useState(0)
  // Search query state is owned by the option list itself, but we need to
  // mirror it here so keyboard traversal sees the same filtered list. To
  // keep ownership clean for v1, traversal traverses the *unfiltered*
  // selectable indices — search filtering visually hides rows but arrows
  // still walk over the underlying list. This is documented as a known
  // limitation in instructions.md and revisited in the accessibility
  // branch.
  const selectableIndices = React.useMemo(
    () => getSelectableIndices(items),
    [items],
  )

  // Reset focused index when opening: land on the selected item, or first.
  React.useEffect(() => {
    if (!open) return
    if (value === undefined) {
      setFocusedIndex(0)
      return
    }
    const idx = selectableIndices.findIndex(
      (i) => SelectConstants.getItemValue(items[i]) === value,
    )
    setFocusedIndex(idx >= 0 ? idx : 0)
  }, [open, value, selectableIndices, items])

  // ---------- Click outside ----------
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current) return
      if (e.target instanceof Node && wrapperRef.current.contains(e.target)) {
        return
      }
      setOpen(false)
    }
    document.addEventListener('mousedown', handler, true)
    return () => document.removeEventListener('mousedown', handler, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // ---------- Keyboard ----------
  const triggerRef = React.useRef<HTMLDivElement | null>(null)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      ;(
        triggerRef.current?.querySelector(
          'button, [tabindex]',
        ) as HTMLElement | null
      )?.focus()
      return
    }
    if (e.key === 'Tab') {
      setOpen(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIndex((i) =>
        selectableIndices.length === 0 ? 0 : (i + 1) % selectableIndices.length,
      )
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex((i) =>
        selectableIndices.length === 0
          ? 0
          : (i - 1 + selectableIndices.length) % selectableIndices.length,
      )
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const realIndex = selectableIndices[focusedIndex]
      if (realIndex === undefined) return
      const item = items[realIndex]
      handleSelect(item)
    }
  }

  // ---------- Selection ----------
  const handleSelect = (item: SelectItem) => {
    const itemValue = SelectConstants.getItemValue(item)
    if (itemValue === undefined) return
    if (!isValueControlled) setInternalValue(itemValue)
    onChange?.(itemValue, item)
    setOpen(false)
  }

  // ---------- Trigger rendering ----------
  const toggle = () => setOpen(!open)
  const close = () => setOpen(false)
  const triggerCtx: SelectTriggerContext = { open, selected, toggle, close }

  const defaultTriggerLabel =
    selected && 'label' in selected ? selected.label : placeholder ?? ''

  const triggerNode =
    typeof trigger === 'function' ? (
      trigger(triggerCtx)
    ) : trigger !== undefined ? (
      trigger
    ) : (
      <Button
        variant={triggerVariant as never}
        size={size}
        disabled={disabled}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={popoverId}
        aria-activedescendant={
          open
            ? `${itemIdPrefix}-${selectableIndices[focusedIndex] ?? 0}`
            : undefined
        }
        onClick={toggle}
        className={SelectConstants.CssTriggerWidthClasses}
      >
        <span className={SelectConstants.CssTriggerContentClasses}>
          <span className="truncate">{defaultTriggerLabel}</span>
          <IconChevronDownSmall
            className={clsx(
              SelectConstants.CssChevronClasses,
              open && SelectConstants.CssChevronOpenClasses,
            )}
          />
        </span>
      </Button>
    )

  return (
    <div
      ref={wrapperRef}
      className={clsx(SelectConstants.CssWrapperClasses, className)}
      onKeyDown={onKeyDown}
    >
      <div ref={triggerRef}>{triggerNode}</div>
      {open && (
        <SelectOptionList
          id={popoverId}
          itemIdPrefix={itemIdPrefix}
          items={items}
          theme={theme}
          size={size}
          value={value}
          onSelect={handleSelect}
          headerTitle={headerTitle}
          headerTabs={headerTabs}
          headerActiveTab={headerActiveTab}
          onHeaderTabChange={onHeaderTabChange}
          searchable={searchable}
          searchPlaceholder={searchPlaceholder}
          footer={footer}
          footerLabel={footerLabel}
          footerAction={footerAction}
          width={width}
          minWidth={minWidth}
          maxWidth={maxWidth}
          height={height}
          maxHeight={maxHeight}
          align={align}
          focusedIndex={focusedIndex}
          className={popoverClassName}
        />
      )}
    </div>
  )
}

export default Select
