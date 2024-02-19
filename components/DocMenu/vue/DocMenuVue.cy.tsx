/// <reference types="cypress" />
import { type DefineComponent, defineComponent, ref } from 'vue'
import { mount } from 'cypress/vue'
import assertions, { BIG_ITEMS_SET } from '../assertions'
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
        setup(props, { slots }) {
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

  assertions(mountStory, () => {
    const selectedHref = ref<string | undefined>('/foo')

    const CustomLinkVue: DefineComponent<{ href: StringConstructor }> =
      defineComponent({
        props: {
          href: String,
        },
        setup(props, { slots }) {
          return () => (
            <button
              style="text-align:left"
              onClick={() => (selectedHref.value = props.href)}
            >
              {slots.default?.()}
            </button>
          )
        },
      })

    mount(() => (
      <>
        <button onClick={() => (selectedHref.value = '/kephren')}>
          Set path to /kephren
        </button>
        <DocMenu
          activePath={selectedHref.value}
          items={[
            {
              label: 'Section 1',
              items: [
                { href: '/foo', label: 'Foo' },
                {
                  label: 'Subsection',
                  items: [{ href: '/sub', label: 'Sub' }],
                },
              ],
            },
            {
              label: 'Pyramid',
              items: [{ href: '/kephren', label: 'Kephren' }],
              collapsed: true,
            },
          ]}
          linkComponent={CustomLinkVue}
        />
      </>
    ))
  })

  it.only('scrolls the active item into view', { viewportHeight: 200 }, () => {
    const CustomLinkVue: DefineComponent<{ href: StringConstructor }> =
      defineComponent({
        props: {
          href: String,
        },
        setup(props, { slots }) {
          return () => (
            <button style="text-align:left">{slots.default?.()}</button>
          )
        },
      })

    const pathState = ref('/fooTop')
    const SUT = () => {
      return (
        <>
          <button
            onClick={() => (pathState.value = '/faa6')}
            class="p-2 m-2 rounded bg-gray-100 border border-gray-300"
          >
            Set path to <code>/faa6</code>
          </button>
          <DocMenu
            items={BIG_ITEMS_SET}
            activePath={pathState.value}
            linkComponent={CustomLinkVue}
            collapsible
          />
        </>
      )
    }
    mount(() => <SUT />)

    cy.findByText('Code').click()

    cy.contains('Set path to').click()
    cy.contains('Quisquam, quos').then(($el) => {
      const windowInnerHeight = Cypress.config(`viewportHeight`)

      const rect = ($el?.[0] as any).getBoundingClientRect()

      expect(windowInnerHeight).to.be.greaterThan(rect.top)
    })
  })
})
