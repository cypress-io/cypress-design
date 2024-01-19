import { mount } from 'cypress/vue'
import IconTechServer from './_IconTechServer.vue'

describe(
  '<_IconTechServer />',
  { viewportHeight: 30, viewportWidth: 30 },
  () => {
    it('renders', () => {
      // see: https://on.cypress.io/mounting-vue
      mount(() => (
        <div class="m-[3px]">
          <IconTechServer />
        </div>
      ))
    })
  },
)
