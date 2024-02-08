import { ref } from 'vue'
import { mount } from 'cypress/vue'
import IconGeneralChatBubble from './_IconGeneralChatBubble.vue'

describe('<_IconGeneralChatBubble />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    const active = ref(false)

    mount(() => (
      <>
        <button onClick={() => (active.value = !active.value)}>
          <IconGeneralChatBubble
            {...{ width: '300', height: '300' }}
            isActive={active.value}
          />
          <span class="sr-only">click</span>
        </button>
        {active.value && <div>Active</div>}
      </>
    ))
    cy.get('button').should('be.visible').click()
  })
})
