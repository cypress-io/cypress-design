import { CustomIcon } from '@frontend/design-system'
import React, { ButtonHTMLAttributes, FC, FormEvent } from 'react'
import cs from 'clsx'
import styles from './module.Switch.scss'

interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'size'> {
  checked: boolean
  onChange: (value: boolean) => void
  size?: 'x16' | 'x24' | 'x32' | 'x48'
  'data-cy'?: string
}

const Switch: FC<SwitchProps> = ({
  checked,
  onChange,
  size = 'x48',
  'data-cy': dataCy,
  ...rest
}) => {
  const onClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onChange(!checked)
  }

  return (
    <span className={styles.container}>
      <button
        {...rest}
        data-cy={dataCy}
        aria-checked={checked}
        className={cs('switch', styles.switch, styles[size])}
        role="switch"
        onClick={onClick}
      >
        <span className={styles.indicator} />
      </button>
      {rest.disabled && (
        <span className={styles.locked}>
          <CustomIcon name="security-lock-locked" size="x16" />
          Locked
        </span>
      )}
    </span>
  )
}

export { Switch }
