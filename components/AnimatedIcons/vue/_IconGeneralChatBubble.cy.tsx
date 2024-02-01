import { mount } from 'cypress/vue'
import _IconGeneralChatBubble from './_IconGeneralChatBubble.vue'

describe('<_IconGeneralChatBubble />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    mount(() => <_IconGeneralChatBubble />)
  })
})
