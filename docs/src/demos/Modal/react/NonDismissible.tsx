import { useState } from 'react'
import Modal from '@cypress-design/react-modal'
import Button from '@cypress-design/react-button'

export default function NonDismissible() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      {/*
        `closeOnBackdropClick` and `closeOnEscape` set to false keep a stray
        click or Escape from discarding the user's input. The close button
        still closes the modal.
      */}
      <Modal
        show={visible}
        title="Send feedback"
        closeOnBackdropClick={false}
        closeOnEscape={false}
        onClose={() => setVisible(false)}
      >
        Only the close button closes this modal.
      </Modal>
      <Button onClick={() => setVisible(true)}>Open modal</Button>
    </>
  )
}
