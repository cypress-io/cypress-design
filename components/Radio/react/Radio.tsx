import * as React from 'react'
import type { HTMLProps, ReactNode } from 'react'
import clsx from 'clsx'
import { type RadioProps as GenericRadioProps } from '@cypress-design/constants-radio'

export interface RadioProps
  extends Omit<
      HTMLProps<HTMLDivElement>,
      'label' | 'onChange' | 'name' | 'color'
    >,
    GenericRadioProps {
  /**
   * Label for the radio.
   * It is very important to set this to make the checkbox accessible.
   */
  label?: ReactNode
  /**
   * Body content for the radio (for example, description text for the Radio field)
   */
  body?: ReactNode
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const RadioInput: React.FC<
  RadioProps & React.HTMLProps<HTMLDivElement>
> = ({ id, label, body, className, name, ...rest }) => {
  return (
    <div className={clsx(className)} {...rest}>
      <span>
        <input type="radio" id={id} name={name} />
        <div>
          <label htmlFor={id}>{label}</label>
          {body}
        </div>
      </span>
    </div>
  )
}

export default RadioInput
