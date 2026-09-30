import { ref } from 'vue'
import { mount } from 'cypress/vue'
import { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import Modal from './Modal.vue'

describe('<Modal/>', () => {
  function mountStory(options: ComponentProps<typeof Modal> = {}) {
    const visibleModal = ref(false)
    mount(() => (
      <div>
        <div class="h-[900px] w-[50px] bg-red-200"></div>
        <button onClick={() => (visibleModal.value = true)}>Open Modal</button>
        <div class="h-[900px] w-[50px] bg-red-200"></div>
        <Modal {...options} v-model:show={visibleModal.value}>
          <p>
            Contents of the modal: Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Id perspiciatis hic ad minima ex recusandae autem
            incidunt, perferendis, illo voluptatum repudiandae iste voluptate
            reiciendis quam officiis voluptas laboriosam eligendi explicabo!
          </p>
        </Modal>
      </div>
    ))
  }

  assertions(mountStory)

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
    // Escape makes the browser fire `cancel` on the dialog
    cy.findByRole('dialog').should('be.visible').trigger('cancel')
    cy.get('@updateShow').should('have.been.calledWith', false)
    cy.get('@close').should('have.been.calledOnce')
    cy.findByRole('dialog').should('not.exist')
  })
})
