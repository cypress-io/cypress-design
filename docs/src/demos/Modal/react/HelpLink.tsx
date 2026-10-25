import { useState } from 'react'
import Modal from '@cypress-design/react-modal'
import Button from '@cypress-design/react-button'

export default function HelpLink() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      {/* `helpLink` adds a "Need help" link to the header. */}
      <Modal
        show={visible}
        title="Modal title"
        helpLink="https://docs.cypress.io"
        onClose={() => setVisible(false)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis
        hic ad minima ex recusandae autem incidunt, perferendis, illo voluptatum
        repudiandae iste voluptate reiciendis quam officiis voluptas laboriosam
        eligendi explicabo!
      </Modal>
      <Button onClick={() => setVisible(true)}>Open modal</Button>
    </>
  )
}
