import * as React from 'react'
import clsx from 'clsx'
import Checkbox from '@cypress-design/react-checkbox'
import Button from '@cypress-design/react-button'
import Tag from '@cypress-design/react-tag'
import * as SelectConstants from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectTheme,
  SelectSize,
} from '@cypress-design/constants-select'

export interface SelectOptionItemProps {
  item: SelectItem
  theme: SelectTheme
  size: SelectSize
  selected: boolean
  focused: boolean
  id?: string
  onSelect: (item: SelectItem) => void
}

function renderIcon(
  Icon: unknown,
  className: string,
  size: '16' | '24' = '16',
): React.ReactNode {
  if (!Icon) return null
  if (React.isValidElement(Icon)) {
    return <span className={className}>{Icon}</span>
  }
  if (typeof Icon === 'function') {
    const IconComponent = Icon as React.ComponentType<Record<string, unknown>>
    return (
      <IconComponent
        size={size}
        interactiveColorsOnGroup={true}
        className={className}
      />
    )
  }
  return <span className="shrink-0">{Icon as React.ReactNode}</span>
}

export const SelectOptionItem: React.FC<SelectOptionItemProps> = ({
  item,
  theme,
  size,
  selected,
  focused,
  id,
  onSelect,
}) => {
  // Non-row content types are handled before the row chrome is rendered.
  if (item.type === 'headline') {
    return (
      <div
        id={id}
        role="presentation"
        className={clsx(
          SelectConstants.CssOptionHeadlineClasses[theme],
          SelectConstants.CssOptionItemPaddingClasses[size],
        )}
      >
        {item.label}
      </div>
    )
  }

  if (item.type === 'divider') {
    return (
      <div role="presentation" aria-hidden="true">
        <div className={SelectConstants.CssOptionDividerClasses[theme]} />
      </div>
    )
  }

  if (item.type === 'button') {
    return (
      <div className={SelectConstants.CssButtonRowClasses}>
        <Button
          variant={(item.variant as never) ?? 'link'}
          size={size}
          onClick={(e) => {
            e.stopPropagation()
            item.onClick()
          }}
          className="w-full justify-start"
        >
          {item.label}
        </Button>
      </div>
    )
  }

  // From here on, the row uses the shared chrome (state-bearing div).
  const disabled =
    (item.type === 'default' ||
      item.type === undefined ||
      item.type === 'checkbox') &&
    item.disabled === true

  const itemClasses = clsx(
    SelectConstants.CssOptionItemBaseClasses,
    SelectConstants.CssOptionItemClasses[`${theme}-default`],
    SelectConstants.CssOptionItemHeightClasses[size],
    SelectConstants.CssOptionItemPaddingClasses[size],
    SelectConstants.CssOptionItemGapClasses,
  )

  const iconColorClass = SelectConstants.CssOptionItemIconColorClasses[theme]

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return
    e.stopPropagation()
    onSelect(item)
  }

  // Custom row
  if (item.type === 'custom') {
    const isSelectable = typeof item.value === 'string'
    return (
      <div
        id={id}
        role={isSelectable ? 'option' : 'presentation'}
        aria-selected={isSelectable ? selected : undefined}
        aria-disabled={disabled || undefined}
        data-selected={selected || undefined}
        data-focused={focused || undefined}
        className={itemClasses}
        onClick={isSelectable ? handleClick : undefined}
        onMouseDown={(e) => e.preventDefault()}
      >
        {item.render({ selected })}
      </div>
    )
  }

  // Checkbox row
  if (item.type === 'checkbox') {
    return (
      <div
        id={id}
        role="option"
        aria-selected={selected}
        aria-disabled={disabled || undefined}
        data-selected={selected || undefined}
        data-focused={focused || undefined}
        className={itemClasses}
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Checkbox
          checked={selected}
          disabled={disabled}
          // The checkbox's own change is a no-op; the row click drives selection.
          onChange={() => undefined}
        />
        <div className={SelectConstants.CssCheckboxRowStackClasses}>
          <span className={SelectConstants.CssCheckboxRowLabelClasses}>
            {item.label}
          </span>
          {item.subText && (
            <span
              className={SelectConstants.CssOptionItemSubTextClasses[theme]}
            >
              {item.subText}
            </span>
          )}
        </div>
      </div>
    )
  }

  // User row
  if (item.type === 'user') {
    return (
      <div
        id={id}
        role="option"
        aria-selected={selected}
        data-selected={selected || undefined}
        data-focused={focused || undefined}
        className={itemClasses}
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        {renderIcon(item.iconLeft, iconColorClass)}
        <div className={SelectConstants.CssUserRowStackClasses}>
          <span className={SelectConstants.CssUserRowLabelClasses}>
            {item.label}
          </span>
          {item.secondary && (
            <span className={SelectConstants.CssUserRowSecondaryClasses[theme]}>
              {item.secondary}
            </span>
          )}
        </div>
      </div>
    )
  }

  // Default row (type === 'default' or undefined)
  return (
    <div
      id={id}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      data-selected={selected || undefined}
      data-focused={focused || undefined}
      className={itemClasses}
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
    >
      {renderIcon(item.iconLeft, iconColorClass)}
      <span className={SelectConstants.CssOptionItemLabelClasses}>
        {item.label}
      </span>
      {item.tag && (
        <Tag size="16" color="gray" dark={theme === 'dark'}>
          {item.tag}
        </Tag>
      )}
      {item.slotRight && (
        <span className="ml-auto shrink-0">{item.slotRight}</span>
      )}
    </div>
  )
}

export default SelectOptionItem
