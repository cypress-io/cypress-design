/// <reference types="cypress" />
import { type DefineComponent, defineComponent, ref } from 'vue'
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import type { NavGroup, NavItemLink } from '../constants'
import DocMenu from './DocMenu.vue'

describe('<DocMenu/>', () => {
  it('renders', () => {
    mount(() => <DocMenu items={[{ href: '/foo', label: 'Foo' }]} />)
    cy.get('ul').should('exist')
  })

  it('renders the custom link components', () => {
    const selectedHref = ref<string | undefined>()
    const CustomLinkVue: DefineComponent<{ href: StringConstructor }> =
      defineComponent({
        props: {
          href: String,
        },
        setup(props, { slots, emit }) {
          return () => (
            <span onClick={() => (selectedHref.value = props.href)}>
              {slots.default?.()} + href: {props.href}
            </span>
          )
        },
      })
    mount(() => (
      <DocMenu
        activePath={selectedHref.value}
        items={[
          {
            label: 'Baaaaaaz',
            items: [
              {
                label: 'Bar',
                items: [
                  { href: '/foo', label: 'Foo' },
                  { href: '/box', label: 'Box' },
                ],
              },
              { label: 'Baz', href: '/baz' },
            ],
          },
        ]}
        linkComponent={CustomLinkVue}
      />
    ))

    cy.findByText('Foo + href: /foo').should('be.visible')
  })

  function mountStory(items: (NavItemLink | NavGroup)[] = [], activePath = '') {
    mount(() => {
      return (
        <div class="p-4">
          <DocMenu items={items} activePath={activePath} />
        </div>
      )
    })
  }
  assertions(mountStory)
})
