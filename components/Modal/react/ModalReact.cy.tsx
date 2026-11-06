/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import Modal from './Modal'
import assertions, { type ModalStoryOptions } from '../assertions'

const ComponentUsingModal = ({
  footer,
  ...options
}: ModalStoryOptions & { className?: string }) => {
  const [visibleModal, setVisibleModal] = React.useState(false)
  return (
    <div>
      <div className="h-[900px] w-[50px] bg-red-200"></div>
      <button onClick={() => setVisibleModal(true)}>Open Modal</button>
      <div className="h-[900px] w-[50px] bg-red-200"></div>
      <Modal
        {...options}
        footer={footer ? <span>{footer}</span> : undefined}
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
  function mountStory(options: ModalStoryOptions = {}) {
    mount(<ComponentUsingModal {...options} />)
  }
  assertions(mountStory)

  it('lets className override the size width', () => {
    cy.viewport(1200, 600)
    mount(<ComponentUsingModal title="Modal" size="xl" className="w-96" />)
    cy.findByRole('button', { name: 'Open Modal' }).click()
    cy.findByRole('dialog').should('have.css', 'width', '384px')
  })

  it('does not call onClose on Escape or a backdrop click when they are off', () => {
    const onClose = cy.stub().as('onClose')
    mount(
      <Modal
        show
        title="Unsaved form"
        closeOnBackdropClick={false}
        closeOnEscape={false}
        onClose={onClose}
      >
        <p>Unsaved changes</p>
      </Modal>,
    )
    cy.findByRole('dialog').should('be.visible')
    cy.realPress('Escape')
    cy.realPress('Escape')
    cy.get('body').realClick({ x: 4, y: 4 })
    cy.findByRole('dialog').should('be.visible')
    cy.get('@onClose').should('not.have.been.called')
    cy.findByRole('button', { name: 'Close' }).click()
    cy.get('@onClose').should('have.been.calledOnce')
  })

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
