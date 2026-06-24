import * as React from 'react'
import clsx from 'clsx'
import Checkbox from '@cypress-design/react-checkbox'
import Button from '@cypress-design/react-button'
import Tag from '@cypress-design/react-tag'
import type { ButtonVariants } from '@cypress-design/constants-button'
import type { OpenIconProps } from '@cypress-design/icon-registry'
import * as SelectConstants from '@cypress-design/constants-select'
import type {
  SelectItem,
  SelectTheme,
  SelectSize,
} from '@cypress-design/constants-select'

// Consumer-passed icon component: any cypress-design Icon (or a compatible
// component that accepts the same props minus the `name` discriminator).
// `className` is appended because `renderIcon` and the default-row JSX
// pass it for state-aware coloring; cypress-design Icons accept it via
// their RootIconProps surface but the public `OpenIconProps` doesn't
// declare it.
type IconComponent = React.ComponentType<
  Omit<OpenIconProps, 'name'> & { className?: string }
>

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
    const Component = Icon as IconComponent
    return (
      <Component
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
    // Theme-aware default variant — `white` on light reads as a soft outline
    // pill; on dark we use `outline-dark` so it doesn't sit as a stark white
    // pill against the gray-1000 panel. Mirrors the header back-button rule.
    const buttonVariant =
      item.variant ?? (theme === 'dark' ? 'outline-dark' : 'white')
    // Scale the button height with the row size so the action button doesn't
    // look puny in a `size=40` panel.
    const buttonSize = size === '40' ? '32' : '24'
    return (
      // role="presentation" — the wrapper is layout chrome around the
      // <Button>; matches headline/divider so the listbox tree only
      // exposes selectable rows to assistive tech.
      <div
        id={id}
        role="presentation"
        data-focused={focused || undefined}
        className={clsx(
          SelectConstants.CssButtonRowClasses,
          SelectConstants.CssOptionItemHeightClasses[size],
          SelectConstants.CssOptionItemPaddingClasses[size],
        )}
      >
        <Button
          variant={buttonVariant as ButtonVariants}
          size={buttonSize}
          onClick={(e) => {
            e.stopPropagation()
            item.onClick()
          }}
        >
          {(() => {
            // Render iconLeft via PascalCase JSX so the icon can be either a
            // component reference (the design-system convention) or any other
            // ReactNode the consumer chooses to pass — matches the header-row
            // icon rendering. Avoids `React.createElement` blowing up when
            // someone hands us `<MyIcon />` (a JSX element) instead of
            // `MyIcon` (the component).
            const IconLeft = item.iconLeft as IconComponent | undefined
            return IconLeft ? (
              <IconLeft size="16" interactiveColorsOnGroup={true} />
            ) : null
          })()}
          {item.label}
        </Button>
      </div>
    )
  }

  // From here on, the row uses the shared chrome (state-bearing div).
  const disabled =
    (item.type === 'default' ||
      item.type === undefined ||
      item.type === 'checkbox' ||
      item.type === 'user') &&
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
        {item.render({ selected }) as React.ReactNode}
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
        className={clsx(itemClasses, SelectConstants.CssCheckboxRowClasses)}
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        <span className={SelectConstants.CssCheckboxRowCheckboxWrapperClasses}>
          {/* The Checkbox initializes `localChecked` from `props.checked`
             via useState (uncontrolled) and never syncs back from the
             prop. Keying by `selected` forces a remount whenever the
             row toggles so the visual stays in sync with our externally-
             managed value. */}
          <Checkbox
            key={selected ? 'on' : 'off'}
            checked={selected}
            disabled={disabled}
            onChange={() => undefined}
          />
        </span>
        <div className={SelectConstants.CssCheckboxRowStackClasses}>
          <span className={SelectConstants.CssCheckboxRowLabelClasses[size]}>
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
        aria-disabled={disabled || undefined}
        data-selected={selected || undefined}
        data-focused={focused || undefined}
        className={itemClasses}
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        {renderIcon(item.iconLeft, iconColorClass, '24')}
        <div className={SelectConstants.CssUserRowStackClasses}>
          <span className={SelectConstants.CssUserRowLabelClasses[size]}>
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
      {/* iconRight uses `ml-auto` so it hugs the row's right edge; reuses
          the same state-aware icon color classes as iconLeft. */}
      {item.iconRight
        ? renderIcon(item.iconRight, clsx('ml-auto', iconColorClass))
        : null}
      {item.slotRight !== undefined && (
        <span className="ml-auto shrink-0">
          {item.slotRight as React.ReactNode}
        </span>
      )}
    </div>
  )
}

export default SelectOptionItem
