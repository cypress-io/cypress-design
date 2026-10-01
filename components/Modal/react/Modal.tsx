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
  helpLinkLabel?: string
  children?: React.ReactNode
  show?: boolean
  onClose?: () => void
  fullscreen?: boolean
  className?: string
  closeIcon?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  show = false,
  title,
  helpLink,
  helpLinkLabel = 'Need help',
  onClose,
  children,
  fullscreen = false,
  className,
  closeIcon,
}) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const showRef = React.useRef(show)
  showRef.current = show
  // Set while handling `cancel`, so the native `close` that may follow the
  // same Escape doesn't call onClose a second time.
  const handledCancel = React.useRef(false)

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

  // Escape fires `cancel` on the native dialog. Stop the browser closing it
  // behind our back and let the parent close it through `onClose`.
  const closeOnCancel = React.useCallback<
    React.ReactEventHandler<HTMLDialogElement>
  >(
    (event) => {
      event.preventDefault()
      handledCancel.current = true
      setTimeout(() => (handledCancel.current = false))
      onClose?.()
    },
    [onClose],
  )

  // Safety net for a native close we didn't initiate — e.g. a repeated
  // Escape, which the browser won't let us cancel. Give the parent the chance
  // to close; if it keeps `show` true, reopen so the dialog matches `show`
  // (and the scroll lock stays consistent).
  const syncOnNativeClose = React.useCallback(() => {
    if (!showRef.current) return
    if (!handledCancel.current) onClose?.()
    setTimeout(() => {
      const dialog = dialogRef.current
      if (showRef.current && dialog && !dialog.open) dialog.showModal()
    })
  }, [onClose])

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
        onCancel={closeOnCancel}
        onClose={syncOnNativeClose}
      >
        <div className={ClassTitleBox}>
          <div id="cy_modal_label" className={ClassTitle}>
            {title}
          </div>
          {helpLink ? <div className={ClassHelpLinkDash} /> : null}
          {helpLink ? (
            <a
              href={helpLink}
              className={ClassHelpLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {helpLinkLabel}
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
            {closeIcon ?? (
              <IconActionDelete
                className="children:transition-all"
                stroke-color="gray-400"
                hover-stroke-color="gray-700"
                interactiveColorsOnGroup
              />
            )}
          </button>
        </div>
        <div className={ClassContent}>{children}</div>
      </dialog>,
      document.body,
    )
  )
}

export default Modal
