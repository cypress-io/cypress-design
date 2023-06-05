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
const [visible, setVisible] = React.useState(false)

export default () => {
  return (<Modal show={visible} title="modal" onClose={() => setVisible(false)}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis hic
    ad minima ex recusandae autem incidunt, perferendis, illo voluptatum
    repudiandae iste voluptate reiciendis quam officiis voluptas laboriosam
    eligendi explicabo!
  </Modal>
  <Button @click={() => setVisible(true)}>Open Modal</Button>)
}
```
