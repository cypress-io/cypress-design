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
    mount(() => <IconDocumentBlank {...props} />)
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

  it('renders multiple times an icon with defs with the Icon comp', () => {
    mount(() => (
      <div class="p-2">
        <Icon name="browser-webkit" class="w-16 h-16 hidden" />
        <Icon name="browser-webkit" class="w-16 h-16" />
      </div>
    ))
  })

  it('renders multiple times an icon with defs', () => {
    mount(() => (
      <div class="p-2 flex">
        <IconBrowserWebkit class="w-16 h-16 hidden" />
        <IconBrowserWebkit class="w-16 h-16" />
      </div>
    ))
  })

  it('when an icon is unmounted later', () => {
    cy.viewport(200, 100)
    const iconVisible = ref(true)
    mount(() => (
      <div class="p-2 flex">
        {iconVisible.value ? <IconBrowserWebkit class="w-16 h-16" /> : null}
        <IconBrowserWebkit class="w-16 h-16" />
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
      <div class="p-2 flex">
        <IconBrowserWebkit
          class={`w-16 h-16 ${iconVisible.value ? '' : 'hidden'}`}
        />
        <IconBrowserWebkit class="w-16 h-16" />
        <button onClick={() => (iconVisible.value = !iconVisible.value)}>
          toggle
        </button>
      </div>
    ))

    cy.get('button').click()
  })

  it('renders multiple times an icon with defs with the Icon comp', () => {
    cy.viewport(200, 200)
    const iconName = ref<'browser-webkit' | 'browser-safari'>('browser-safari')
    mount(() => (
      <div class="p-2 flex flex-col h-screen items-center justify-center">
        <Icon name={iconName.value} class="w-16 h-16 hidden" />
        <Icon name={iconName.value} class="w-16 h-16" />
        <button
          onClick={() =>
            (iconName.value =
              iconName.value === 'browser-webkit'
                ? 'browser-safari'
                : 'browser-webkit')
          }
        >
          toggle
        </button>
      </div>
    ))

    cy.get('button').click()
  })
})
