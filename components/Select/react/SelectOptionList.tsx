import * as React from 'react'
import clsx from 'clsx'
import Tabs from '@cypress-design/react-tabs'
import Textbox from '@cypress-design/react-textbox'
import Button from '@cypress-design/react-button'
import Tag from '@cypress-design/react-tag'
import {
  IconObjectMagnifyingGlass,
  IconActionInfoOutline,
} from '@cypress-design/react-icon'
import * as SelectConstants from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectThemingProps,
  SelectHeaderProps,
  SelectSearchProps,
  SelectFooterProps,
  SelectSizingProps,
} from '@cypress-design/constants-select'
import SelectOptionItem from './SelectOptionItem'
import { getSelectableIndices } from './filter-items'

// Composed from the same shared groups as SelectProps so the popover's
// chrome (header + search + footer + sizing + theming) stays a single
// source of truth. `items` arrives ALREADY FILTERED — Select owns the
// search query and applies `filterAndCollapseHeadlines` before passing
// the list down, so keyboard nav and rendering agree on which rows exist.
export interface SelectOptionListProps
  extends SelectThemingProps,
    SelectHeaderProps,
    Omit<SelectSearchProps, 'searchFilters'>,
    SelectFooterProps,
    SelectSizingProps {
  items: SelectItem[]
  value?: string
  onSelect: (item: SelectItem) => void
  onHeaderTabChange?: (id: string) => void

  // Controlled search value — Select owns the state and the filter.
  searchValue?: string
  onSearchValueChange?: (value: string) => void

  // React-only: structured footerLabel/footerAction live in SelectFooterProps;
  // the optional ReactNode escape hatch sits alongside them.
  footer?: React.ReactNode

  align?: SelectConstants.SelectAlignment
  id?: string
  className?: string

  // Keyboard-focused row index (within the rendered list).
  // Provided by Select; the panel just renders the state.
  focusedIndex?: number
  itemIdPrefix?: string
}

// React JSX needs a component type to instantiate; the shared
// SelectHeaderProps interface uses IconNode (= unknown) so it stays
// framework-agnostic. Re-narrow at the destructure boundary.
type IconComponent = React.ComponentType<Record<string, unknown>>

export const SelectOptionList: React.FC<SelectOptionListProps> = ({
  items,
  theme = SelectConstants.DefaultTheme,
  size = SelectConstants.DefaultSize,
  value,
  onSelect,
  headerTitle,
  // Icon props are renamed to PascalCase locals so they can be rendered as
  // JSX (`<HeaderIconLeft />`) instead of `React.createElement(...)`.
  headerButton: headerButtonRaw,
  headerIconLeft: headerIconLeftRaw,
  headerTag,
  headerIconRight: headerIconRightRaw,
  headerTabs,
  headerActiveTab,
  onHeaderTabChange,
  searchable = false,
  searchPlaceholder = SelectConstants.DefaultSearchPlaceholder,
  searchValue = '',
  onSearchValueChange,
  footer,
  footerLabel,
  footerAction,
  width,
  minWidth,
  maxWidth,
  height,
  maxHeight,
  align = SelectConstants.DefaultAlignment,
  id,
  className,
  focusedIndex,
  itemIdPrefix,
}) => {
  const HeaderButton = headerButtonRaw as
    | { iconLeft: IconComponent; onClick: () => void; ariaLabel?: string }
    | undefined
  const HeaderIconLeft = headerIconLeftRaw as IconComponent | undefined
  const HeaderIconRight = headerIconRightRaw as IconComponent | undefined

  const selectableIndices = React.useMemo(
    () => getSelectableIndices(items),
    [items],
  )
  const focusedSelectableIndex =
    typeof focusedIndex === 'number'
      ? selectableIndices[focusedIndex]
      : undefined

  const hasTitleRow = Boolean(
    headerTitle ||
      HeaderButton ||
      HeaderIconLeft ||
      headerTag ||
      HeaderIconRight,
  )
  const hasTabsOrSearch = Boolean(
    (headerTabs && headerTabs.length > 0) || searchable,
  )
  const hasHeader = hasTitleRow || hasTabsOrSearch
  const hasFooter = Boolean(footer || footerLabel || footerAction)

  const panelStyle = SelectConstants.buildSizingStyle({
    width,
    minWidth,
    maxWidth,
    height,
    maxHeight,
  })

  return (
    <div
      id={id}
      role="listbox"
      style={panelStyle}
      className={clsx(
        SelectConstants.CssPopoverLayoutClasses,
        SelectConstants.CssAlignmentClasses[align],
        SelectConstants.CssPopoverClasses[theme],
        SelectConstants.CssPopoverSizeClasses[size],
        className,
      )}
    >
      {hasHeader && (
        <div className={SelectConstants.CssHeaderContainerClasses}>
          {hasTitleRow && (
            <div
              className={clsx(
                SelectConstants.CssHeaderTitleRowClasses,
                // Title row carries its own bottom border so a separator
                // appears between it and whatever follows (tabs/search
                // bundle, or the items area if nothing else in the header).
                SelectConstants.CssHeaderClasses[theme],
                // 8px from the row edge to the back button so the button
                // hugs the panel edge; 16px when no button so the iconLeft
                // / title sits inset from the edge.
                HeaderButton ? 'pl-[8px]' : 'pl-[16px]',
                // 16px between the iconRight and the panel edge so the
                // icon has breathing room; default 8px when no iconRight.
                HeaderIconRight ? 'pr-[16px]' : 'pr-[8px]',
              )}
            >
              {HeaderButton && (
                <Button
                  size="32"
                  square
                  variant={theme === 'dark' ? 'outline-dark' : 'white'}
                  aria-label={HeaderButton.ariaLabel}
                  onClick={HeaderButton.onClick}
                  className={SelectConstants.CssHeaderBackButtonSpacingClasses}
                >
                  <HeaderButton.iconLeft
                    size="16"
                    interactiveColorsOnGroup={true}
                  />
                </Button>
              )}
              <div className={SelectConstants.CssHeaderTitleGroupClasses}>
                {HeaderIconLeft && (
                  <HeaderIconLeft
                    size="16"
                    interactiveColorsOnGroup={true}
                    className={SelectConstants.CssHeaderIconColorClasses[theme]}
                  />
                )}
                {headerTitle && (
                  <span
                    className={clsx(
                      SelectConstants.CssHeaderTitleSizeClasses[size],
                      SelectConstants.CssHeaderTitleClasses[theme],
                    )}
                  >
                    {headerTitle}
                  </span>
                )}
                {headerTag && (
                  <Tag size="16" color="gray" dark={theme === 'dark'}>
                    {headerTag}
                  </Tag>
                )}
              </div>
              {HeaderIconRight && (
                <HeaderIconRight
                  size="16"
                  interactiveColorsOnGroup={true}
                  className={SelectConstants.CssHeaderIconColorClasses[theme]}
                />
              )}
            </div>
          )}
          {hasTabsOrSearch && (
            <div
              className={clsx(
                SelectConstants.CssHeaderTabsSearchWrapperClasses,
                // Bottom border separates the tabs/search bundle from the
                // items area below.
                SelectConstants.CssHeaderClasses[theme],
              )}
            >
              {headerTabs && headerTabs.length > 0 && (
                // Wrapper keeps Tabs at content width — flex-col parents
                // otherwise stretch every child to the full cross-axis.
                // Dark: `dark-small` at size 32 / `dark-large` at size 40
                // so tabs scale with the row height. Light has no `*-small`
                // pill variant yet, so it stays on `default` for both sizes.
                <div className="self-start">
                  <Tabs
                    variant={
                      theme === 'dark'
                        ? size === '40'
                          ? 'dark-large'
                          : 'dark-small'
                        : 'default'
                    }
                    tabs={headerTabs as never}
                    activeId={headerActiveTab}
                    onSwitch={(tab) => onHeaderTabChange?.(tab.id)}
                  />
                </div>
              )}
              {searchable && (
                <Textbox
                  theme={theme}
                  size="32"
                  placeholder={searchPlaceholder}
                  iconLeft={IconObjectMagnifyingGlass}
                  value={searchValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onSearchValueChange?.(e.target.value)
                  }
                  aria-label={searchPlaceholder}
                />
              )}
            </div>
          )}
        </div>
      )}

      <div className={SelectConstants.CssItemsContainerClasses}>
        {/* Show "No results" whenever no selectable rows match. The filter
            keeps standalone divider and button rows (so a "+ Add new"
            button stays visible during search) — those still render below
            this message; we just need to call out that nothing matched. */}
        {selectableIndices.length === 0 && (
          <div className={SelectConstants.CssEmptyStateClasses[theme]}>
            No results
          </div>
        )}
        {items.map((item, index) => {
          const itemValue = SelectConstants.getItemValue(item)
          // Empty string is a valid `value` per `SelectItemDefault` —
          // `itemValue === value` already excludes `undefined` ↔ '' (since
          // `'' !== undefined`), so no extra guard is needed.
          const selected = itemValue !== undefined && itemValue === value
          const focused = index === focusedSelectableIndex
          const rowId = itemIdPrefix ? `${itemIdPrefix}-${index}` : undefined
          const key = (() => {
            if ('key' in item && item.key) return item.key
            // Empty string is a valid `value` (selection treats it as such);
            // use `!== undefined` rather than a truthy check so a row with
            // `value: ''` doesn't fall back to the type-and-index key and
            // unnecessarily remount when items reorder.
            if (itemValue !== undefined) return itemValue
            return `${item.type ?? 'default'}-${index}`
          })()
          return (
            <SelectOptionItem
              key={key}
              id={rowId}
              item={item}
              theme={theme}
              size={size}
              selected={selected}
              focused={focused}
              onSelect={onSelect}
            />
          )
        })}
      </div>

      {hasFooter && (
        <div
          className={clsx(
            SelectConstants.CssFooterContainerClasses,
            SelectConstants.CssFooterClasses[theme],
          )}
        >
          {footer ?? (
            <>
              {footerLabel && (
                <span className={SelectConstants.CssFooterLabelGroupClasses}>
                  <IconActionInfoOutline
                    size="16"
                    interactiveColorsOnGroup={true}
                    className={SelectConstants.CssFooterIconColorClasses[theme]}
                  />
                  <span
                    className={SelectConstants.CssFooterLabelClasses[theme]}
                  >
                    {footerLabel}
                  </span>
                </span>
              )}
              {footerAction && (
                <Button
                  size="24"
                  // Theme-aware default: `link` reads as a subtle textual link
                  // on light, but vanishes against the dark footer band — use
                  // the `outline-dark` variant there so it stays visible.
                  variant={theme === 'dark' ? 'outline-dark' : 'link'}
                  onClick={footerAction.onClick}
                >
                  {footerAction.label}
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SelectOptionList
