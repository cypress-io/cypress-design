import * as React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import {
  IconActionQuestionMarkCircle,
  IconActionDelete,
} from '@cypress-design/react-icon'
import {
  ClassCloseButton,
  ClassContent,
  ClassHelpLink,
  ClassHelpLinkDash,
  ClassModal,
  ClassModalFullscreenDimensions,
  ClassModalStandardDimensions,
  ClassTitle,
  ClassTitleBox,
  disableBodyScroll,
  freeBodyScroll,
} from '@cypress-design/constants-modal'

export interface ModalProps {
  title?: string
  helpLink?: string
  children?: React.ReactNode
  show?: boolean
  onClose?: () => void
  fullscreen?: boolean
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  show = false,
  title,
  helpLink,
  onClose,
  children,
  fullscreen = false,
  className,
}) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    if (show) {
      disableBodyScroll()
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
      freeBodyScroll()
    }
  }, [show, onClose])

  React.useEffect(
    () => () => {
      freeBodyScroll()
    },
    [],
  )

  const closeOnClickBackdrop = React.useCallback<
    React.MouseEventHandler<HTMLDialogElement>
  >(
    (event) => {
      const rect = dialogRef.current?.getBoundingClientRect()
      if (!rect) return
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      if (!isInDialog) {
        onClose?.()
      }
    },
    [onClose],
  )

  return (
    show &&
    createPortal(
      <dialog
        ref={dialogRef}
        className={clsx(
          show ? ClassModal : null,
          fullscreen
            ? ClassModalFullscreenDimensions
            : ClassModalStandardDimensions,
          className,
        )}
        onClick={closeOnClickBackdrop}
      >
        <div className={ClassTitleBox}>
          <div id="cy_modal_label" className={ClassTitle}>
            {title}
          </div>
          {helpLink ? <div className={ClassHelpLinkDash} /> : null}
          {helpLink ? (
            <a href={helpLink} className={ClassHelpLink}>
              Need help
              <IconActionQuestionMarkCircle
                className="ml-[4px]"
                stroke-color="indigo-500"
                fill-color="indigo-100"
              />
            </a>
          ) : null}

          <div className="grow" />
          <button
            aria-label="Close"
            className={`${ClassCloseButton} group`}
            onClick={() => onClose?.()}
          >
            <IconActionDelete
              className="children:transition-all"
              stroke-color="gray-400"
              hover-stroke-color="gray-700"
              interactiveColorsOnGroup
            />
          </button>
        </div>
        <div className={ClassContent}>{children}</div>
      </dialog>,
      document.body,
    )
  )
}

export default Modal
