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
  // `value` is `undefined` when the selection is cleared — that happens when
  // a checkbox row is re-clicked (toggle off). Consumers must handle both
  // cases.
  onChange?: (value: string | undefined, item: SelectItem) => void

  placeholder?: string
  disabled?: boolean

  // Header
  headerTitle?: string
  headerButton?: {
    iconLeft: React.ComponentType<Record<string, unknown>>
    onClick: () => void
    ariaLabel?: string
  }
  headerIconLeft?: React.ComponentType<Record<string, unknown>>
  headerTag?: string
  headerIconRight?: React.ComponentType<Record<string, unknown>>
  headerTabs?: SelectHeaderTab[]
  headerActiveTab?: string
  onHeaderTabChange?: (id: string) => void
  searchable?: boolean
  searchPlaceholder?: string
  searchFilters?: boolean

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
  headerButton,
  headerIconLeft,
  headerTag,
  headerIconRight,
  headerTabs,
  headerActiveTab,
  onHeaderTabChange,
  searchable = false,
  searchPlaceholder,
  searchFilters,
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

  // ---------- Selected value ----------
  // Sticky-toward-controlled: once we ever see a defined `value` prop the
  // component is "controlled" and stays that way for the rest of its life.
  // This is the only discriminator that handles every common pattern:
  //   - Pure uncontrolled (no `value` ever): stays uncontrolled, falls
  //     back to `internalValue`.
  //   - Pure controlled (initial defined): controlled from render 1, the
  //     parent's `value` always wins.
  //   - Lazy controlled (`useState<string|undefined>(undefined)` + `value`):
  //     uncontrolled until the parent first sets a defined value, then
  //     locks into controlled.
  //   - Controlled clear (parent sets `value` to `undefined` after it was
  //     defined): stays controlled — trigger shows the placeholder
  //     instead of falling back to a stale `internalValue`.
  //   - Checkbox toggle-off (component emits `undefined` via onChange):
  //     same as controlled clear if the parent reflects it; the prop
  //     wins and the trigger clears cleanly.
  const wasControlledRef = React.useRef(false)
  if (valueProp !== undefined) wasControlledRef.current = true
  const isValueControlled = wasControlledRef.current
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
  // -1 means "no row focused" — the visual focus ring + aria-activedescendant
  // are suppressed until the user actually navigates with an arrow key.
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
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

  // Open the popover with no focused row. The first arrow keypress lands
  // focus on the first option (or the last, on ArrowUp) — see onKeyDown.
  React.useEffect(() => {
    if (!open) return
    setFocusedIndex(-1)
  }, [open])

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
      setFocusedIndex((i) => {
        const n = selectableIndices.length
        if (n === 0) return -1
        // First arrow press (i === -1) lands on the first option.
        if (i === -1) return 0
        return (i + 1) % n
      })
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex((i) => {
        const n = selectableIndices.length
        if (n === 0) return -1
        // First arrow press (i === -1) lands on the last option — wraps
        // symmetrically with ArrowDown-from-last.
        if (i === -1) return n - 1
        return (i - 1 + n) % n
      })
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      // No-op when nothing is focused yet (user hasn't pressed an arrow).
      if (focusedIndex === -1) return
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
    // Checkbox rows toggle: clicking an already-checked row unchecks it.
    // Default rows still use plain select semantics (re-click is a no-op).
    // We also keep the popover open on checkbox toggle since the user is
    // likely picking multiple from a multi-select intent.
    const isCheckboxToggle = item.type === 'checkbox' && value === itemValue
    const nextValue = isCheckboxToggle ? undefined : itemValue
    // Uncontrolled consumers: track the selection internally. Controlled
    // consumers: the parent's prop drives the next render; don't touch
    // internalValue (otherwise a parent that clears `value` to `undefined`
    // would still see the cleared trigger fall back to the last clicked
    // row — exactly the "stale label" bug Cursor caught).
    if (!isValueControlled) setInternalValue(nextValue)
    onChange?.(nextValue, item)
    if (item.type !== 'checkbox') setOpen(false)
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
          open && focusedIndex >= 0
            ? `${itemIdPrefix}-${selectableIndices[focusedIndex]}`
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
          headerButton={headerButton}
          headerIconLeft={headerIconLeft}
          headerTag={headerTag}
          headerIconRight={headerIconRight}
          headerTabs={headerTabs}
          headerActiveTab={headerActiveTab}
          onHeaderTabChange={onHeaderTabChange}
          searchable={searchable}
          searchPlaceholder={searchPlaceholder}
          searchFilters={searchFilters}
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
