import { ref } from 'vue'
import assertions from '../assertions'
import Icon, {
  IconDocumentBlank,
  IconObjectBookCode,
  IconBrowserWebkit,
} from './index'
import { mount } from 'cypress/vue'

describe('Icon', { viewportWidth: 80, viewportHeight: 80 }, () => {
  it('renders correctly', () => {
    mount(() => (
      <IconObjectBookCode
        fillColor="red-100"
        strokeColor="red-500"
        secondaryFillColor="indigo-100"
        secondaryStrokeColor="indigo-600"
      />
    ))
  })

  assertions((props) => {
    if (props.name) {
      return mount(() => <Icon {...props} />)
    }
    mount(() => <IconDocumentBlank {...props} class={props.class} />)
  })

  it('renders correctly with array classes', () => {
    mount(() => (
      <IconObjectBookCode
        class={[
          'text-red-100',
          'text-red-500',
          { 'text-indigo-100': true, 'text-indigo-600': true },
        ]}
        fillColor="red-100"
        strokeColor="red-500"
        secondaryFillColor="indigo-100"
        secondaryStrokeColor="indigo-600"
      />
    ))

    cy.get('svg')
      .should('have.class', 'text-red-100')
      .and('have.class', 'text-red-500')
  })

  it('renders multiple times an icon with defs with the generic Icon component', () => {
    mount(() => (
      <div class="p-2">
        <Icon name="browser-webkit" class="hidden h-16 w-16" />
        <Icon name="browser-webkit" class="h-16 w-16" />
      </div>
    ))
  })

  it('renders multiple times an icon with defs', () => {
    mount(() => (
      <div class="flex p-2">
        <IconBrowserWebkit class="hidden h-16 w-16" />
        <IconBrowserWebkit class="h-16 w-16" />
      </div>
    ))
  })

  it('when an icon is unmounted later', () => {
    cy.viewport(200, 100)
    const iconVisible = ref(true)
    mount(() => (
      <div class="flex p-2">
        {iconVisible.value ? <IconBrowserWebkit class="h-16 w-16" /> : null}
        <IconBrowserWebkit class="h-16 w-16" />
        <button onClick={() => (iconVisible.value = !iconVisible.value)}>
          toggle
        </button>
      </div>
    ))

    cy.get('button').click()
    // the svg defs should have been transferred to the end of the body
    cy.get('svg').should('have.length', 2)
  })

  it('when an icon is hidden later', () => {
    cy.viewport(200, 100)
    const iconVisible = ref(true)
    mount(() => (
      <div class="flex p-2">
        <IconBrowserWebkit
          class={`h-16 w-16 ${iconVisible.value ? '' : 'hidden'}`}
        />
        <IconBrowserWebkit class="h-16 w-16" />
        <button onClick={() => (iconVisible.value = !iconVisible.value)}>
          toggle
        </button>
      </div>
    ))

    cy.get('button').click()
  })

  it('renders multiple times an icon with defs with the Icon component and toggle it', () => {
    cy.viewport(200, 200)
    const iconName = ref<'browser-edge' | 'browser-safari'>('browser-safari')
    mount(() => (
      <div class="flex h-screen flex-col items-center justify-center p-2">
        <Icon name={iconName.value} class="hidden h-16 w-16" />
        <Icon name={iconName.value} class="h-16 w-16" />
        <button
          onClick={() =>
            (iconName.value =
              iconName.value === 'browser-edge'
                ? 'browser-safari'
                : 'browser-edge')
          }
        >
          toggle
        </button>
      </div>
    ))

    cy.get('button').click()
  })

  it('renders a title element when passed an alt prop', () => {
    mount(() => <IconBrowserWebkit class="h-16 w-16" alt="This is a title" />)

    cy.get('svg title').should('have.text', 'This is a title')
  })

  it('renders class passed only once', () => {
    mount(() => <IconBrowserWebkit class="h-16 w-16" />)

    cy.get('svg[width="16"]').should('have.attr', 'class', 'h-16 w-16')
  })
})
