import cs from 'clsx'
import React, {
  FormEvent,
  FunctionComponent,
  HTMLProps,
  ReactNode,
} from 'react'
import styles from './module.Radio.scss'

interface RadioProps extends Omit<HTMLProps<HTMLDivElement>, 'label'> {
  isChecked?: boolean
  isDisabled?: boolean
  label: ReactNode
  name?: string
  onBlur?: () => void
  onChange: (e: FormEvent<HTMLInputElement>) => void
  subLabel?: ReactNode
  value?: string | number
  'data-cy'?: string
}

export const Radio: FunctionComponent<RadioProps> = ({
  isChecked = false,
  isDisabled = false,
  label,
  name,
  onBlur,
  onChange,
  subLabel,
  value,
  'data-cy': dataCy,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={cs(styles.radio, rest.className)}
      data-cy="cy-radio-container"
    >
      <label
        className={cs({
          [styles.label]: true,
          [styles.checked]: isChecked,
          [styles.disabled]: isDisabled,
        })}
      >
        <input
          checked={isChecked}
          data-cy={dataCy || 'cy-radio'}
          disabled={isDisabled}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          type="radio"
          value={value}
        />
        {label}
        {subLabel && (
          <>
            <br />
            <span className={cs('text-muted', styles.subLabel)}>
              {subLabel}
            </span>
          </>
        )}
      </label>
    </div>
  )
}
