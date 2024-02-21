import { DefineComponent, ref } from 'vue'
import { mount } from 'cypress/vue'

export function iconTests(Icon: any) {
  it('renders', () => {
    mount(() => (
      <Icon
        animated={false}
        width={400}
        height={400}
        class="icon-dark-indigo-500 hover:icon-dark-jade-300 icon-light-jade-500 icon-light-secondary-red-500"
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
          class="icon-dark-indigo-500 hover:icon-dark-jade-300 icon-light-jade-500 icon-light-secondary-red-500 m-[50px]"
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
      <div class="bg-red-300 flex gap-4 text-center text-2xl">
        <div>
          <h2>not animated</h2>
          <Icon
            animated={false}
            width={400}
            height={400}
            class="icon-dark-indigo-500 hover:icon-dark-jade-300 icon-light-jade-500 icon-light-secondary-red-500"
          />
        </div>
        <div>
          <h2>animated</h2>
          <Icon
            animated={true}
            width={400}
            height={400}
            class="icon-dark-indigo-500 hover:icon-dark-jade-300 icon-light-jade-500 icon-light-secondary-red-500"
          />
        </div>
      </div>
    ))
  })
}
