import clsx from 'clsx'
import * as React from 'react'
import type { FunctionComponent, HTMLProps, ReactNode } from 'react'
import { IconCheckmarkSmall } from '@cypress-design/react-icon'

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
   * Is the checkbox checked when it is first rendered.
   */
  checked?: boolean
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const uid = () =>
  String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ''
  )

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  id = uid(),
  checked = false,
  onChange,
  color = 'indigo',
  label,
  disabled,
  className,
  name,
  ...rest
}) => {
  const [localChecked, setChecked] = React.useState(checked)

  function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(!localChecked)
    onChange(event)
  }

  return (
    <div className={clsx(className, 'relative flex items-center')} {...rest}>
      <input
        id={id}
        className="absolute inset-0 w-0 h-0 opacity-0"
        aria-describedby={`${id}-description`}
        name={name || id}
        type="checkbox"
        onChange={onChangeInput}
        disabled={disabled}
        checked={localChecked}
      />
      <label className="flex items-center" htmlFor={id}>
        {localChecked && (
          // <windi-keep strokeColor="white"/>
          <IconCheckmarkSmall strokeColor="white" className="absolute" />
        )}
        <span
          className={clsx([
            `block border-1 border-solid rounded h-16px w-16px flex items-center text-white`,
            disabled
              ? 'border-gray-200 bg-gray-100'
              : localChecked
              ? {
                  'border-indigo-500 bg-indigo-400': color === 'indigo',
                  'border-jade-500 bg-jade-400': color === 'jade',
                  'border-red-500 bg-red-400': color === 'red',
                }
              : 'border-gray-200 bg-white',
          ])}
        />
        {label && (
          <span
            className={clsx([
              disabled ? 'text-gray-500' : 'text-gray-800',
              'block ml-2 text-16px leading-normal font-light select-none',
            ])}
          >
            {label}
          </span>
        )}
      </label>
    </div>
  )
}

export default Checkbox
