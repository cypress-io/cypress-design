import { useState } from 'react'
import Modal from '@cypress-design/react-modal'
import Button from '@cypress-design/react-button'

export default function Footer() {
  const [visible, setVisible] = useState(false)
  const close = () => setVisible(false)
  return (
    <>
      {/* `footer` renders below the body, separated by a full-width divider. */}
      <Modal
        show={visible}
        title="Delete project?"
        size="sm"
        onClose={close}
        footer={
          <div className="flex gap-3">
            <Button variant="red-dark" onClick={close}>
              Delete
            </Button>
            <Button variant="white" onClick={close}>
              Cancel
            </Button>
          </div>
        }
      >
        This removes the project and its recorded runs. You can&apos;t undo
        this.
      </Modal>
      <Button onClick={() => setVisible(true)}>Open modal</Button>
    </>
  )
}
