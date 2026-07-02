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
  // Forward the caller-supplied className so `ml-auto` (right-hug for
  // iconRight) and the theme-aware iconColorClass reach the DOM. Without
  // this, a string/number iconRight lost its right-edge hug and color.
  return <span className={className}>{Icon as React.ReactNode}</span>
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
      // Roles are split so both goals hold at once:
      // - The wrapper stays purely presentational but is the STYLING
      //   surface for the focus ring — `CssButtonRowFocusClasses` uses
      //   `data-[focused=true]:*` selectors, so `data-focused` MUST live
      //   here for the indigo bg / ring / outline to render.
      // - The inner Button is the interactive control AND the option: it
      //   carries `role="option"` (so the listbox sees a valid child per
      //   `aria-required-children`), `id` (so the trigger's
      //   `aria-activedescendant` can point at it), and `tabindex="-1"`
      //   (so native tab doesn't land on the pill while the trigger owns
      //   focus).
      // The pill is still the sole click target — the wrapper has no
      // onClick, so the row's negative space does not fire `onClick`.
      <div
        role="presentation"
        data-focused={focused || undefined}
        className={clsx(
          SelectConstants.CssButtonRowClasses,
          SelectConstants.CssOptionItemHeightClasses[size],
          SelectConstants.CssOptionItemPaddingClasses[size],
          SelectConstants.CssButtonRowFocusClasses[theme],
        )}
      >
        <Button
          variant={buttonVariant as ButtonVariants}
          size={buttonSize}
          id={id}
          role="option"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation()
            item.onClick()
          }}
        >
          {/* Route through renderIcon so the button row accepts the same
              two shapes (component reference OR ReactElement) as
              default-row iconLeft. Rendering the raw value as JSX
              (`<Icon />`) throws when the consumer hands us a
              `<MyIcon />` element instead of `MyIcon`. */}
          {renderIcon(item.iconLeft, 'shrink-0')}
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
        <span
          className={SelectConstants.CssCheckboxRowCheckboxWrapperClasses}
          // The row itself owns interactivity (role="option", aria-selected,
          // click handler, keyboard nav). The visual checkbox is a
          // decorative affordance — hide it from assistive tech so axe's
          // `label` / `nested-interactive` rules don't fire.
          aria-hidden="true"
        >
          {/* The Checkbox initializes `localChecked` from `props.checked`
             via useState (uncontrolled) and never syncs back from the
             prop. Keying by `selected` forces a remount whenever the
             row toggles so the visual stays in sync with our externally-
             managed value. `hideInput` removes the real <input> from
             layout via display:none — axe's `nested-interactive` rule
             flags a focusable input inside a clickable row even when
             the input is tabIndex=-1 + aria-hidden, so we take it out
             of the DOM's interactive path entirely. */}
          <Checkbox
            key={selected ? 'on' : 'off'}
            checked={selected}
            disabled={disabled}
            onChange={() => undefined}
            inputTabIndex={-1}
            hideInput
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
