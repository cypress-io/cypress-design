# Modal

## Install

```bash
npm install @cypress-design/react-modal
```

or with yarn

```bash
yarn add @cypress-design/react-modal
```

```tsx live
import React from 'react'
import Button from '@cypress-design/react-button'
import Modal from '@cypress-design/react-modal'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Modal
        show={visible}
        title="Modal Title"
        onClose={() => setVisible(false)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis
        hic ad minima ex recusandae autem incidunt, perferendis, illo voluptatum
        repudiandae iste voluptate reiciendis quam officiis voluptas laboriosam
        eligendi explicabo!
      </Modal>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
    </>
  )
}
```

## Size, footer and dismissal

`size` sets a fixed width, `footer` adds a bar below the body, and `closeOnBackdropClick` / `closeOnEscape` keep a stray click or Escape from discarding a form. The close button always closes the modal.

```tsx live
import React from 'react'
import Button from '@cypress-design/react-button'
import Modal from '@cypress-design/react-modal'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const close = () => setVisible(false)

  return (
    <>
      <Modal
        show={visible}
        title="Send feedback"
        size="md"
        closeOnBackdropClick={false}
        closeOnEscape={false}
        onClose={close}
        footer={
          <div className="flex gap-3">
            <Button onClick={close}>Send</Button>
            <Button variant="white" onClick={close}>
              Cancel
            </Button>
          </div>
        }
      >
        Tell us what we could do better.
      </Modal>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
    </>
  )
}
```
