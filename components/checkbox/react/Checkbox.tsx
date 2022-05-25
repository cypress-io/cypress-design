import clsx from 'clsx'
import * as React from 'react'
import type { FunctionComponent, HTMLProps, ReactNode } from 'react'

export interface CheckboxProps
  extends Omit<HTMLProps<HTMLDivElement>, 'label'> {
  id?: string
  modelValue: boolean
  onChange: () => void
  state?: 'success' | 'danger' | 'default'
  label?: ReactNode
}

// TODO: how do you disable it? does it work?
export const Checkbox: FunctionComponent<CheckboxProps> = ({
  id = crypto.randomUUID(),
  modelValue,
  onChange,
  state = 'default',
  label,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={clsx(rest.className, 'relative flex items-center')}
    >
      <div className="flex items-center h-5">
        <input
          id={id}
          defaultChecked={modelValue}
          aria-describedby={`${id}-description`}
          name={id}
          type="checkbox"
          className={`border-1 rounded border-gray-200 bg-white h-4 w-4 text-indigo-500 disabled:bg-gray-100 checked:bg-indigo-500 ${
            state === 'default'
              ? 'text-indigo-500 checked:border-indigo-300 checked:bg-indigo-600 checked:text-indigo-600'
              : ''
          } ${
            state === 'success'
              ? 'checked:border-jade-300 checked:bg-jade-600 checked:text-jade-600'
              : ''
          } ${
            state === 'danger'
              ? 'checked:border-red-300 checked:bg-red-600 checked:text-red-600'
              : ''
          }`}
          onChange={onChange}
        />
      </div>
      <div className="ml-2 text-16px leading-normal">
        <label
          v-if="label"
          htmlFor={id}
          className="disabled:text-gray-500 text-gray-800 font-light select-none"
        >
          {label}
        </label>
      </div>
    </div>
  )
}

export default Checkbox
