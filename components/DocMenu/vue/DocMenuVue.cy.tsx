/// <reference types="cypress" />
import { type DefineComponent, defineComponent } from 'vue'
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import type { NavGroup, NavItemLink } from '../constants'
import DocMenu from './DocMenu.vue'

const CustomLinkVue: DefineComponent<{ href: StringConstructor }> =
  defineComponent({
    props: {
      href: String,
    },
    setup(props, { slots }) {
      return () => (
        <div>
          {slots.default?.()} + href: {props.href}
        </div>
      )
    },
  })

describe('<DocMenu/>', () => {
  it('renders', () => {
    mount(() => <DocMenu items={[{ href: '/foo', label: 'Foo' }]} />)
    cy.get('ul').should('exist')
  })

  it('renders the custom link components', () => {
    mount(() => (
      <DocMenu
        items={[
          {
            label: 'Baaaaaaz',
            items: [{ label: 'Bar', items: [{ href: '/foo', label: 'Foo' }] }],
          },
        ]}
        linkComponent={CustomLinkVue}
      />
    ))
    cy.findByText('Bar').click()
    cy.findByText('Foo + href: /foo', { selector: 'div' }).should('be.visible')
  })

  function mountStory(items: (NavItemLink | NavGroup)[] = []) {
    mount(() => {
      return <DocMenu items={items} />
    })
  }
  assertions(mountStory)
})
