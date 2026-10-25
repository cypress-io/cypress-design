import { ref } from 'vue'
import { mount } from 'cypress/vue'

export function iconTests(Icon: any) {
  it('renders', () => {
    mount(() => (
      <Icon
        animated={false}
        width={400}
        height={400}
        class="icon-light-indigo-300 icon-dark-indigo-400 icon-dark-secondary-indigo-500"
      />
    ))
  })

  it('renders active', { viewportHeight: 550 }, () => {
    const isAnimated = ref(false)

    mount(() => (
      <>
        <pre>{isAnimated.value ? 'animated' : 'not animated'}</pre>

        <Icon
          animated={isAnimated.value}
          width={400}
          height={400}
          class="icon-light-indigo-300 icon-dark-indigo-400 icon-dark-secondary-indigo-500 m-[50px]"
          onClick={() => {
            isAnimated.value = !isAnimated.value
          }}
        />
      </>
    ))

    cy.get('svg').click()
  })

  it('renders with props', { viewportHeight: 550 }, () => {
    const isAnimated = ref(false)

    mount(() => (
      <>
        <pre>{isAnimated.value ? 'animated' : 'not animated'}</pre>

        <Icon
          animated={isAnimated.value}
          width={400}
          height={400}
          fillColor="indigo-500"
          strokeColor="jade-300"
          secondaryStrokeColor="purple-400"
          onClick={() => {
            isAnimated.value = !isAnimated.value
          }}
        />
      </>
    ))

    cy.get('svg').click()
  })

  it('renders both side by side', { viewportWidth: 900 }, () => {
    mount(() => (
      <div class="flex gap-4 bg-black text-center text-2xl">
        <div>
          <h2 class="font-bold text-indigo-200">not animated</h2>
          <Icon
            animated={false}
            width={400}
            height={400}
            class="icon-light-indigo-300 icon-dark-indigo-400 icon-dark-secondary-indigo-500"
          />
        </div>
        <div>
          <h2 class="font-bold text-indigo-200">animated</h2>
          <Icon
            animated={true}
            width={400}
            height={400}
            class="icon-light-indigo-300 icon-dark-indigo-400 icon-dark-secondary-indigo-500"
          />
        </div>
      </div>
    ))
    cy.get('svg').should('have.length', 2)
    cy.percySnapshot()
  })
}
