// import cs from "clsx"
import React, { FunctionComponent, HTMLProps, ReactNode } from "react"
// import styles from './module.Checkbox.scss'

interface CheckboxProps extends Omit<HTMLProps<HTMLDivElement>, "label"> {
  isChecked?: boolean
  isDisabled?: boolean
  label: ReactNode
  onChange: () => void
  subLabel?: string | null
  "data-cy"?: string
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  isChecked = false,
  isDisabled = false,
  label,
  onChange,
  subLabel,
  "data-cy": dataCy,
  ...rest
}) => {
  return (
    <div
      {...rest}
      // className={cs(styles.checkbox, rest.className)}
      data-cy="cy-checkbox-container"
    >
      <label
      // className={cs({
      //   [styles.label]: true,
      //   [styles.checked]: isChecked,
      //   [styles.disabled]: isDisabled,
      // })}
      >
        <input
          type="checkbox"
          data-cy={dataCy || "cy-checkbox"}
          checked={isChecked}
          disabled={isDisabled}
          onChange={onChange}
        />
        {label}
        {subLabel && (
          <>
            <br />
            <span
            // className={cs('text-muted', styles.subLabel)}
            >
              {subLabel}
            </span>
          </>
        )}
      </label>
    </div>
  )
}
