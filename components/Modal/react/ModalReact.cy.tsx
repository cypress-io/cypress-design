/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Modal from './Modal'
import assertions from '../assertions'

const ComponentUsingModal = (options: {
  title?: string
  helpLink?: string
  fullscreen?: boolean
}) => {
  const [visibleModal, setVisibleModal] = React.useState(false)
  return (
    <div>
      <div className="h-[900px] w-[50px] bg-red-200"></div>
      <button onClick={() => setVisibleModal(true)}>Open Modal</button>
      <div className="h-[900px] w-[50px] bg-red-200"></div>
      <Modal
        {...options}
        show={visibleModal}
        onClose={() => setVisibleModal(false)}
      >
        <p>
          Contents of the modal: Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Id perspiciatis hic ad minima ex recusandae autem
          incidunt, perferendis, illo voluptatum repudiandae iste voluptate
          reiciendis quam officiis voluptas laboriosam eligendi explicabo!
        </p>
      </Modal>
    </div>
  )
}

describe('Modal', () => {
  function mountStory(
    options: {
      title?: string
      helpLink?: string
      fullscreen?: boolean
    } = {},
  ) {
    mount(<ComponentUsingModal {...options} />)
  }
  assertions(mountStory)
})
