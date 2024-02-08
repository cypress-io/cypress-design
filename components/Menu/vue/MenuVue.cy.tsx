/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import Menu from './Menu.vue'

describe('<Menu/>', () => {
  it('renders', () => {
    mount(() => (
      <Menu
        items={[
          { label: 'Item 1' }, //
          { label: 'Item 2' },
          { label: 'Item 3' },
        ]}
      />
    ))
  })
})
