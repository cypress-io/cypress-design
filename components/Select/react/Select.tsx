import * as React from 'react'
import clsx from 'clsx'
import Button from '@cypress-design/react-button'
import { IconChevronDownSmall } from '@cypress-design/react-icon'
import type { ButtonVariants } from '@cypress-design/constants-button'
import * as SelectConstants from '@cypress-design/constants-select'
import {
  filterAndCollapseHeadlines,
  getInteractiveIndices,
  getSelectableIndices,
} from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectAlignment,
  ButtonVariantLoose,
  SelectThemingProps,
  SelectHeaderProps,
  SelectSearchProps,
  SelectFooterProps,
  SelectSizingProps,
} from '@cypress-design/constants-select'
import SelectOptionList from './SelectOptionList'

export interface SelectTriggerContext {
  open: boolean
  selected: SelectItem | null
  toggle: () => void
  close: () => void
}

// Composed from the shared prop groups in `constants-select` so the surface
// stays in sync with SelectOptionList / SelectOptionItem; only Select-only
// fields live in the body below.
export interface SelectProps
  extends SelectThemingProps,
    SelectHeaderProps,
    SelectSearchProps,
    SelectFooterProps,
    SelectSizingProps {
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

  onHeaderTabChange?: (id: string) => void

  // React-only: the footer slot accepts arbitrary ReactNode in addition to
  // the structured footerLabel / footerAction props from SelectFooterProps.
  footer?: React.ReactNode

  // Open state
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void

  // Escape hatches
  trigger?: React.ReactNode | ((ctx: SelectTriggerContext) => React.ReactNode)
  className?: string
  triggerClassName?: string
  popoverClassName?: string
  id?: string
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
  // Matches the Vue default so that callers passing `searchable` without
  // also passing `searchFilters` still get the filter behavior the
  // instructions document (`searchFilters` defaults to `true`).
  searchFilters = true,
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
  triggerClassName,
  popoverClassName,
  id,
}) => {
  // `React.useId` is the canonical way to mint a per-instance, SSR-safe id.
  const reactUid = React.useId()
  const uid = `cy-select-${reactUid.replace(/:/g, '')}`
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
  // `searchValue` lives here (not in OptionList) so the keyboard handler
  // and the rendered popover work off the same filtered list. Before this,
  // Select walked indices on the raw `items` while OptionList re-filtered
  // internally — Enter could select rows hidden by the search filter and
  // `aria-activedescendant` pointed at non-rendered ids.
  const [searchValue, setSearchValue] = React.useState('')
  const displayItems = React.useMemo(
    () =>
      searchable && searchFilters
        ? filterAndCollapseHeadlines(items, searchValue)
        : items,
    [items, searchable, searchFilters, searchValue],
  )
  // Keyboard nav walks `interactive` indices (selectable rows + button
  // rows) so in-list actions are reachable. handleSelect still
  // distinguishes selectable rows from button rows.
  const selectableIndices = React.useMemo(
    () => getInteractiveIndices(displayItems),
    [displayItems],
  )

  // Open the popover with no focused row. The first arrow keypress lands
  // focus on the first option (or the last, on ArrowUp) — see onKeyDown.
  React.useEffect(() => {
    if (!open) return
    setFocusedIndex(-1)
  }, [open])

  // If a parent flips `disabled` to true while the popover is still open,
  // close it. The trigger and `toggle()` already short-circuit on disabled,
  // but a popover that opened before the flip stays mounted — without this,
  // option clicks would still mutate `value` and fire `onChange` on a
  // disabled Select, and `Escape` / `Tab` would be ignored by the early
  // return in `onKeyDown`.
  React.useEffect(() => {
    if (disabled && open) setOpen(false)
    // setOpen is a stable closure (defined inline above); only `disabled`
    // and `open` matter for whether to fire.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, open])

  // Reset focus when the displayed *content* changes — typing into search
  // or the consumer swapping `items` (e.g., a header-tab change). Keying
  // off `displayItems` identity would fire on every parent re-render that
  // hands us a fresh inline array, dropping focus and aria-activedescendant
  // on rerenders that didn't change what the user sees. Hash by type +
  // key/value + label so identity churn over identical rows is a no-op.
  const displayItemsSignature = React.useMemo(
    () =>
      displayItems
        .map((i) => {
          const it = i as {
            type?: string
            value?: string
            label?: string
            key?: string
          }
          return `${it.type ?? ''}|${it.key ?? it.value ?? ''}|${it.label ?? ''}`
        })
        .join('\n'),
    [displayItems],
  )
  React.useEffect(() => {
    setFocusedIndex(-1)
  }, [displayItemsSignature])

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
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target as HTMLElement | null
      const isTextInput =
        target instanceof HTMLInputElement &&
        (target.type === 'text' || target.type === 'search')
      // Space must always reach the search input as a character — never
      // confirm a focused row from the header `Textbox`. Enter does the
      // opposite: standard combobox UX is "type to filter, Enter commits
      // the highlighted row", so let Enter fall through even from search.
      if (isTextInput && e.key === ' ') return
      if (focusedIndex === -1) {
        // Nothing focused yet. Two cases left:
        //  - User pressed the key on the trigger button → native button
        //    activation would re-toggle the popover. preventDefault so a
        //    second press doesn't dismiss.
        //  - User pressed Enter in the search input with no row focused →
        //    nothing to commit; preventDefault is fine (no native submit).
        e.preventDefault()
        return
      }
      const realIndex = selectableIndices[focusedIndex]
      if (realIndex === undefined) return
      // A row is focused. Both Enter and Space confirm. preventDefault
      // suppresses the native button-activation that would otherwise toggle
      // the popover closed without selecting.
      e.preventDefault()
      const item = displayItems[realIndex]
      handleSelect(item)
    }
  }

  // ---------- Selection ----------
  const handleSelect = (item: SelectItem) => {
    // Belt to the close-on-disabled-flip effect above: a click that was
    // already in flight when `disabled` flipped should not mutate `value`.
    if (disabled) return
    // Button rows aren't selectable (no value) — they fire their own
    // onClick when picked via keyboard. The pointer path goes through
    // `SelectOptionItem` and reaches the Button directly; here we only
    // see keyboard Enter on a focused row. Don't close the popover so
    // multi-action flows are possible; the consumer's onClick can close
    // via `onOpenChange` if needed.
    if (item.type === 'button') {
      item.onClick()
      return
    }
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
  // `toggle` is exposed via the trigger context to custom slots — gate it on
  // `disabled` so a slotted control can't open the popover when the Select
  // is disabled. (The default Button trigger already honors `disabled`
  // natively; this only matters for the custom-trigger path.) `close` is
  // fine to call when disabled — letting a parent force-close an open
  // popover stays useful even when the trigger has been disabled mid-flight.
  const toggle = () => {
    if (disabled) return
    setOpen(!open)
  }
  const close = () => setOpen(false)
  const triggerCtx: SelectTriggerContext = { open, selected, toggle, close }

  const defaultTriggerLabel =
    selected && 'label' in selected ? selected.label : placeholder ?? ''
  // When the trigger has no label text (no selection AND no placeholder),
  // render it as an icon-only square so the chevron alone doesn't sit in a
  // stretched-out button.
  const isTriggerIconOnly = !defaultTriggerLabel

  const triggerNode =
    typeof trigger === 'function' ? (
      trigger(triggerCtx)
    ) : trigger !== undefined ? (
      trigger
    ) : (
      <Button
        variant={triggerVariant as ButtonVariants}
        size={size}
        square={isTriggerIconOnly}
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
        className={clsx(
          !isTriggerIconOnly && SelectConstants.CssTriggerWidthClasses,
          triggerClassName,
        )}
      >
        <span
          className={
            isTriggerIconOnly
              ? SelectConstants.CssTriggerIconOnlyClasses
              : SelectConstants.CssTriggerContentClasses
          }
        >
          {!isTriggerIconOnly && (
            <span className="truncate">{defaultTriggerLabel}</span>
          )}
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
          items={displayItems}
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
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
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
