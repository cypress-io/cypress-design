import * as React from 'react'
import clsx from 'clsx'
import { SharedSettings } from '@cypress-design/constants-modal'

export interface ModalProps {
  id: string
  label?: string
  className?: string
}

export const Modal: React.FC<ModalProps & React.HTMLProps<HTMLDivElement>> = ({
  id,
  label,
  className,
  ...rest
}) => {
  return (
    <div {...rest} id={id} className={clsx('bg-jade-100', className)}>
      <label>{label}</label>
      Render Function for Modal
      <p>{SharedSettings.foo}</p>
    </div>
  )
}

export default Modal
