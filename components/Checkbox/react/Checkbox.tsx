import clsx from 'clsx'
import * as React from 'react'
import type { FunctionComponent, HTMLProps, ReactNode } from 'react'
import { IconCheckmarkSmall } from '@cypress-design/react-icon'
import {
  CssCheckboxColors,
  CssClasses,
} from '@cypress-design/constants-checkbox'

export interface CheckboxProps
  extends Omit<HTMLProps<HTMLDivElement>, 'label' | 'onChange' | 'name'> {
  /**
   * A unique identifier for the checkbox on the whole page.
   * It will be used to give match label with input for a11y.
   */
  id?: string
  /**
   * Name attribute of the <input type="checkbox"/>.
   */
  name?: string
  /**
   * Is the checkbox checked.
   * When set, the checkbox is controlled and always reflects this value:
   * update it from `onChange` to toggle the box.
   * When omitted, the checkbox manages its own state (see `defaultChecked`).
   */
  checked?: boolean
  /**
   * Starting state for a self-managed checkbox (when `checked` is omitted).
   * Ignored when `checked` is set.
   */
  defaultChecked?: boolean
  /**
   * The color of the background in the checkbox.
   * The checkmark will always be white.
   */
  color?: 'red' | 'indigo' | 'jade'
  /**
   * If the checkbox is disabled, it will not be clickable.
   */
  disabled?: boolean
  /**
   * Label for the checkbox.
   * It is very important to set this to make the checkbox accessible.
   */
  label?: ReactNode
  /**
   * Called with the native change event when the user toggles the checkbox.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Forwarded to the underlying `<input type="checkbox">`. Use `-1` when
   * the checkbox is a decorative affordance inside a wider interactive
   * row (e.g. Select's checkbox-row) — the wrapping row carries
   * `role="option"` + keyboard nav, and the input must not be
   * independently focusable to satisfy axe's
   * `nested-interactive` rule.
   */
  inputTabIndex?: number
  /**
   * When true, the real `<input>` is removed from the accessibility tree
   * and the layout with `display: none`. Use inside a wider interactive
   * row (e.g. Select's checkbox-row) where the row itself is the option
   * — axe's `nested-interactive` rule flags a focusable input inside a
   * clickable row even when the input carries `aria-hidden` /
   * `tabindex="-1"`; `display: none` is the one form axe accepts.
   */
  hideInput?: boolean
}

const uid = () =>
  String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    '',
  )

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  id = uid(),
  checked,
  defaultChecked = false,
  onChange,
  color = 'indigo',
  label,
  disabled,
  className,
  name,
  inputTabIndex,
  hideInput = false,
  ...rest
}) => {
  const isControlled = checked !== undefined
  const [uncontrolledChecked, setChecked] = React.useState(defaultChecked)
  const localChecked = isControlled ? checked : uncontrolledChecked

  function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) {
      setChecked(!uncontrolledChecked)
    }
    onChange?.(event)
  }

  return (
    <span className={clsx(className, CssClasses.wrapper)} {...rest}>
      <input
        id={id}
        className={CssClasses.hiddenInput}
        aria-describedby={`${id}-description`}
        name={name || id}
        type="checkbox"
        onChange={onChangeInput}
        disabled={disabled}
        checked={localChecked}
        tabIndex={inputTabIndex}
        aria-hidden={hideInput || undefined}
        style={hideInput ? { display: 'none' } : undefined}
      />
      <label className={CssClasses.labelTag} htmlFor={id}>
        {localChecked && (
          // <tw-keep strokeColor="white"/>
          <IconCheckmarkSmall strokeColor="white" className="absolute" />
        )}
        <span
          className={clsx([
            CssClasses.visibleCheckbox,
            disabled
              ? CssCheckboxColors.disabled
              : localChecked
                ? CssCheckboxColors[color]
                : CssCheckboxColors.empty,
          ])}
        />
        {label && (
          <span
            className={clsx([
              disabled ? 'text-gray-500' : 'text-gray-800',
              CssClasses.trueLabel,
            ])}
          >
            {label}
          </span>
        )}
      </label>
    </span>
  )
}

export default Checkbox
