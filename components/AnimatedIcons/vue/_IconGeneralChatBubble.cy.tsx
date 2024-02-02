import { mount } from 'cypress/vue'
import IconGeneralChatBubble from './_IconGeneralChatBubble.vue'

describe('<_IconGeneralChatBubble />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    mount(() => <IconGeneralChatBubble {...{ width: '300', height: '300' }} />)
  })
})
