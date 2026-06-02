import * as React from 'react'
import clsx from 'clsx'
import Tabs from '@cypress-design/react-tabs'
import Textbox from '@cypress-design/react-textbox'
import Button from '@cypress-design/react-button'
import { IconObjectMagnifyingGlass } from '@cypress-design/react-icon'
import * as SelectConstants from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectTheme,
  SelectSize,
  SelectHeaderTab,
} from '@cypress-design/constants-select'
import SelectOptionItem from './SelectOptionItem'
import {
  filterAndCollapseHeadlines,
  getSelectableIndices,
} from './filter-items'

export interface SelectOptionListProps {
  items: SelectItem[]
  theme?: SelectTheme
  size?: SelectSize
  value?: string
  onSelect: (item: SelectItem) => void

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

  // Sizing forwarded to inline style on the panel
  width?: SelectConstants.CssLength
  minWidth?: SelectConstants.CssLength
  maxWidth?: SelectConstants.CssLength
  height?: SelectConstants.CssLength
  maxHeight?: SelectConstants.CssLength

  align?: SelectConstants.SelectAlignment
  id?: string
  className?: string

  // Keyboard-focused row index (within the *filtered* list).
  // Provided by Select; the panel just renders the state.
  focusedIndex?: number
  itemIdPrefix?: string
}

export const SelectOptionList: React.FC<SelectOptionListProps> = ({
  items,
  theme = SelectConstants.DefaultTheme,
  size = SelectConstants.DefaultSize,
  value,
  onSelect,
  headerTitle,
  headerTabs,
  headerActiveTab,
  onHeaderTabChange,
  searchable = false,
  searchPlaceholder = SelectConstants.DefaultSearchPlaceholder,
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
  const [searchValue, setSearchValue] = React.useState('')

  const filteredItems = React.useMemo(
    () => (searchable ? filterAndCollapseHeadlines(items, searchValue) : items),
    [items, searchable, searchValue],
  )

  const selectableIndices = React.useMemo(
    () => getSelectableIndices(filteredItems),
    [filteredItems],
  )
  const focusedSelectableIndex =
    typeof focusedIndex === 'number'
      ? selectableIndices[focusedIndex]
      : undefined

  const hasHeader = Boolean(
    headerTitle || (headerTabs && headerTabs.length > 0) || searchable,
  )
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
        <div
          className={clsx(
            SelectConstants.CssHeaderContainerClasses,
            SelectConstants.CssHeaderClasses[theme],
          )}
        >
          {headerTitle && (
            <div
              className={clsx(
                SelectConstants.CssHeaderTitleClasses[theme],
                SelectConstants.CssOptionItemPaddingClasses[size],
              )}
            >
              {headerTitle}
            </div>
          )}
          {headerTabs && headerTabs.length > 0 && (
            // Wrapper keeps Tabs at content width — flex-col parents
            // otherwise stretch every child to the full cross-axis.
            <div className="self-start">
              <Tabs
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
                setSearchValue(e.target.value)
              }
              aria-label={searchPlaceholder}
            />
          )}
        </div>
      )}

      <div className={SelectConstants.CssItemsContainerClasses}>
        {filteredItems.length === 0 ? (
          <div className={SelectConstants.CssEmptyStateClasses[theme]}>
            No results
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const itemValue = SelectConstants.getItemValue(item)
            const selected =
              itemValue !== undefined && itemValue === value && itemValue !== ''
            const focused = index === focusedSelectableIndex
            const rowId = itemIdPrefix ? `${itemIdPrefix}-${index}` : undefined
            const key = (() => {
              if ('key' in item && item.key) return item.key
              if (itemValue) return itemValue
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
          })
        )}
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
                <span className={SelectConstants.CssFooterLabelClasses[theme]}>
                  {footerLabel}
                </span>
              )}
              {footerAction && (
                <Button size="32" variant="link" onClick={footerAction.onClick}>
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
