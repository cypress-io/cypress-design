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
}

export const Modal: React.FC<ModalProps> = ({
  show = false,
  title,
  helpLink,
  onClose,
  children,
}) => {
  React.useEffect(() => {
    if (show) {
      disableBodyScroll()
    } else {
      freeBodyScroll()
    }
    return () => {
      freeBodyScroll()
    }
  }, [show])

  return (
    <>
      {createPortal(
        <div>
          {show ? (
            <div className={ClassBackDrop} onClick={() => onClose?.()}></div>
          ) : null}
          {show ? (
            <div
              className={ClassModalContainer}
              tabIndex={-1}
              aria-modal="true"
              role="modal"
            >
              <div className={ClassModal}>
                <div className={ClassTitleBox}>
                  <div className={ClassTitle}>{title}</div>
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
          ) : null}
        </div>,
        document.body
      )}
    </>
  )
}

export default Modal
