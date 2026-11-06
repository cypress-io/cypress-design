import { ref } from 'vue'
import { mount } from 'cypress/vue'
import assertions, { type ModalStoryOptions } from '../assertions'
import Modal from './Modal.vue'

describe('<Modal/>', () => {
  function mountStory({
    footer,
    ...options
  }: ModalStoryOptions & { class?: string } = {}) {
    const visibleModal = ref(false)
    mount(() => (
      <div>
        <div class="h-[900px] w-[50px] bg-red-200"></div>
        <button onClick={() => (visibleModal.value = true)}>Open Modal</button>
        <div class="h-[900px] w-[50px] bg-red-200"></div>
        <Modal {...options} v-model:show={visibleModal.value}>
          {{
            default: () => (
              <p>
                Contents of the modal: Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Id perspiciatis hic ad minima ex recusandae
                autem incidunt, perferendis, illo voluptatum repudiandae iste
                voluptate reiciendis quam officiis voluptas laboriosam eligendi
                explicabo!
              </p>
            ),
            ...(footer ? { footer: () => <span>{footer}</span> } : {}),
          }}
        </Modal>
      </div>
    ))
  }

  assertions(mountStory)

  it('lets class override the size width', () => {
    cy.viewport(1200, 600)
    mountStory({ title: 'Modal', size: 'xl', class: 'w-96' })
    cy.findByRole('button', { name: 'Open Modal' }).click()
    cy.findByRole('dialog').should('have.css', 'width', '384px')
  })

  it('does not emit close on Escape or a backdrop click when they are off', () => {
    const visible = ref(false)
    const onClose = cy.stub().as('close')
    mount(() => (
      <div>
        <button onClick={() => (visible.value = true)}>Open Modal</button>
        <Modal
          v-model:show={visible.value}
          title="Unsaved form"
          closeOnBackdropClick={false}
          closeOnEscape={false}
          onClose={onClose}
        >
          <p>Unsaved changes</p>
        </Modal>
      </div>
    ))
    cy.contains('Open Modal').click()
    cy.realPress('Escape')
    cy.realPress('Escape')
    cy.get('body').realClick({ x: 4, y: 4 })
    cy.findByRole('dialog').should('be.visible')
    cy.get('@close').should('not.have.been.called')
    cy.findByRole('button', { name: 'Close' }).click()
    cy.get('@close').should('have.been.calledOnce')
  })

  it('adds a class to the dialog', () => {
    const visible = ref(false)
    mount(() => (
      <div>
        <button onClick={() => (visible.value = true)}>Open Modal</button>
        <Modal
          v-model:show={visible.value}
          title="Modal"
          class="custom-modal-class"
        >
          <p>Content</p>
        </Modal>
      </div>
    ))
    cy.contains('Open Modal').click()
    cy.findByRole('dialog').should('have.class', 'custom-modal-class')
  })

  it('replaces the close icon with the closeIcon slot', () => {
    const visible = ref(false)
    mount(() => (
      <div>
        <button onClick={() => (visible.value = true)}>Open Modal</button>
        <Modal v-model:show={visible.value} title="Modal">
          {{
            default: () => <p>Content</p>,
            closeIcon: () => <span data-cy="custom-close-icon">x</span>,
          }}
        </Modal>
      </div>
    ))
    cy.contains('Open Modal').click()
    cy.findByRole('button', { name: 'Close' }).within(() => {
      cy.get('[data-cy="custom-close-icon"]').should('exist')
      cy.get('svg').should('not.exist')
    })
  })

  it('emits update:show and close on Escape', () => {
    const visible = ref(false)
    const onUpdateShow = cy.stub().as('updateShow')
    const onClose = cy.stub().as('close')
    mount(() => (
      <div>
        <button onClick={() => (visible.value = true)}>Open Modal</button>
        <Modal
          show={visible.value}
          title="Modal"
          onClose={onClose}
          {...({
            'onUpdate:show': (value: boolean) => {
              visible.value = value
              onUpdateShow(value)
            },
          } as Record<string, unknown>)}
        >
          <p>Content</p>
        </Modal>
      </div>
    ))
    cy.contains('Open Modal').click()
    cy.findByRole('dialog').should('be.visible')
    cy.realPress('Escape')
    cy.get('@updateShow').should('have.been.calledWith', false)
    cy.get('@close').should('have.been.calledOnce')
    cy.findByRole('dialog').should('not.exist')
  })

  it('opens as a real modal when mounted with show already true', () => {
    mount(() => (
      <Modal show title="Open on mount">
        <p>Contents</p>
      </Modal>
    ))
    cy.get('dialog').should('have.prop', 'open', true)
    cy.get('body').should('have.class', 'cy-modal-overflow-hidden')
  })
})
