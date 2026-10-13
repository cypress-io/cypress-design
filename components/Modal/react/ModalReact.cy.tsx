/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import Modal from './Modal'
import assertions from '../assertions'

const ComponentUsingModal = (options: {
  title?: string
  helpLink?: string
  helpLinkLabel?: string
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
      helpLinkLabel?: string
      fullscreen?: boolean
    } = {},
  ) {
    mount(<ComponentUsingModal {...options} />)
  }
  assertions(mountStory)

  it('stays open and scroll-locked on repeated Escape when the parent keeps it open', () => {
    const onClose = cy.stub().as('onClose')
    mount(
      <Modal show title="Confirm first" onClose={onClose}>
        <p>Unsaved changes</p>
      </Modal>,
    )
    cy.findByRole('dialog').should('be.visible')
    cy.realPress('Escape')
    cy.realPress('Escape')
    cy.get('@onClose').should('have.been.called')
    cy.findByRole('dialog').should('be.visible')
    cy.get('dialog').should('have.prop', 'open', true)
    cy.get('body').should('have.class', 'cy-modal-overflow-hidden')
  })
})
