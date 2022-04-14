import cs from 'clsx'
import React, { FunctionComponent, HTMLProps, useRef } from 'react'

import styles from './module.IconButton.scss'
import { CustomIcon } from '../custom-icons/CustomIcon'

type IconButtonProps = {
  icon: string
  className?: string
  isActive?: boolean
  isCircle?: boolean
  onClick?: () => void
  text?: string
  isCustomCyIconButton?: boolean
}

export const IconButton: FunctionComponent<
  IconButtonProps & HTMLProps<HTMLButtonElement>
> = ({
  icon,
  className,
  isActive,
  isCircle,
  onClick,
  text,
  isCustomCyIconButton,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const onClickWithBlur = () => {
    if (buttonRef.current) {
      buttonRef.current.blur()
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    // @ts-ignore
    <button
      {...rest}
      className={cs('cy-icon-button', styles.cyIconButton, className, {
        [styles.active]: isActive,
        [styles.circle]: isCircle,
        [styles.cyIconCustomButton]: isCustomCyIconButton,
      })}
      onClick={onClickWithBlur}
      ref={buttonRef}
    >
      <div className={styles.buttonContainer}>
        <CustomIcon name={icon} />
      </div>
      {text && <div className={styles.text}>{text}</div>}
    </button>
  )
}
