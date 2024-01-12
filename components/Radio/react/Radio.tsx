import * as React from 'react'
import type { HTMLProps, ReactNode } from 'react'
import clsx from 'clsx'

export interface RadioProps
  extends Omit<HTMLProps<HTMLDivElement>, 'label' | 'onChange' | 'name'> {
  /**
   * A unique identifier for the checkbox on the whole page.
   * It will be used to give match label with input for a11y.
   */
  id?: string
  /**
   * Name attribute of the <input type="radio"/>.
   */
  name?: string
  /**
   * Is the radio checked when it is first rendered.
   */
  checked?: boolean
  /**
   * The color of the background in the checkbox.
   * The checkmark will always be white.
   */
  color?: 'red' | 'indigo' | 'jade'
  /**
   * If the radio is disabled, it will not be clickable.
   */
  disabled?: boolean
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

export const Radio: React.FC<RadioProps & React.HTMLProps<HTMLDivElement>> = ({
  id,
  label,
  body,
  className,
  ...rest
}) => {
  return (
    <div id={id} className={clsx(className)} {...rest}>
      <span>
        <input type="radio" />
        <div>
          <label>{label}</label>
          {body}
        </div>
      </span>
    </div>
  )
}

export default Radio
