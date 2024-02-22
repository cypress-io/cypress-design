import { DefineComponent, ref } from 'vue'
import { mount } from 'cypress/vue'

export function iconTests(Icon: any) {
  it('renders', () => {
    mount(() => (
      <Icon
        animated={false}
        width={400}
        height={400}
        class="icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400"
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
          class="icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400 m-[50px]"
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
      <div class="bg-black flex gap-4 text-center text-2xl">
        <div>
          <h2 class="text-indigo-200 font-bold">not animated</h2>
          <Icon
            animated={false}
            width={400}
            height={400}
            class="icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400"
          />
        </div>
        <div>
          <h2 class="text-indigo-200 font-bold">animated</h2>
          <Icon
            animated={true}
            width={400}
            height={400}
            class="icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400"
          />
        </div>
      </div>
    ))
  })
}
