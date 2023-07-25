import * as React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import {
  IconActionQuestionMarkCircle,
  IconActionDelete,
} from '@cypress-design/react-icon'
import {
  ClassBackDrop,
  ClassCloseButton,
  ClassContent,
  ClassHelpLink,
  ClassHelpLinkDash,
  ClassModal,
  ClassModalFullscreenDimensions,
  ClassModalStandardDimensions,
  ClassModalContainer,
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
}

export const Modal: React.FC<ModalProps> = ({
  show = false,
  title,
  helpLink,
  onClose,
  children,
  fullscreen = false,
}) => {
  React.useEffect(() => {
    if (show) {
      disableBodyScroll()
    } else {
      freeBodyScroll()
    }
  }, [show])

  React.useEffect(
    () => () => {
      freeBodyScroll()
    },
    [],
  )

  return (
    show &&
    createPortal(
      <div>
        <div className={ClassBackDrop} onClick={() => onClose?.()}></div>

        <div
          className={ClassModalContainer}
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby="cy_modal_label"
          role="dialog"
        >
          <div
            className={clsx(
              ClassModal,
              fullscreen
                ? ClassModalFullscreenDimensions
                : ClassModalStandardDimensions,
            )}
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
                className={ClassCloseButton}
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
          </div>
        </div>
      </div>,
      document.body,
    )
  )
}

export default Modal
