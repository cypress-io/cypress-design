import clsx from 'clsx'
import * as React from 'react'
import type { FunctionComponent, HTMLProps, ReactNode } from 'react'
import { IconCheckmarkSmall } from '@cypress-design/react-icon'

export interface CheckboxProps
  extends Omit<HTMLProps<HTMLLabelElement>, 'label' | 'onChange'> {
  id?: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  color?: 'indigo' | 'red' | 'jade'
  label?: ReactNode
  disabled?: boolean
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  id = crypto.randomUUID(),
  checked = false,
  onChange,
  color = 'indigo',
  label,
  disabled,
  ...rest
}) => {
  const [localChecked, setChecked] = React.useState(checked)

  function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(!localChecked)
    onChange(event)
  }

  return (
    <label
      {...rest}
      className={clsx(rest.className, 'relative flex items-center')}
    >
      <input
        id={id}
        className="absolute inset-0 w-0 h-0 opacity-0"
        aria-describedby={`${id}-description`}
        name={id}
        type="checkbox"
        onChange={onChangeInput}
        disabled={disabled}
        checked={localChecked}
      />
      <span
        className={clsx([
          `block border-1 rounded h-16px w-16px flex items-center text-white`,
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
      >
        {localChecked && (
          <IconCheckmarkSmall strokeColor="white" className="-m-1px" />
        )}
      </span>
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
  )
}

export default Checkbox
