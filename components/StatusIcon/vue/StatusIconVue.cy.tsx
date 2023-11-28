/// <reference types="cypress" />
import { mount } from 'cypress/vue'

import { sizes, statuses, variants } from '@cypress-design/constants-statusicon'
import { StatusIcon } from '@cypress-design/vue-statusicon'
import StatusIconStory from './StatusIcon.rootstory'
import { computed, defineComponent, ref } from 'vue'

describe('StatusIcon', () => {
  it('defaults to a variant that exists if the one provided does not exist', () => {
    mount(() => {
      return (
        <div>
          <StatusIcon variant="simple" size="16" status="placeholder" />
          <StatusIcon variant="solid" size="16" status="placeholder" />
        </div>
      )
    })

    cy.get('svg').first().invoke('html').as('firstIcon')
    cy.get('svg').last().invoke('html').as('secondIcon')
    cy.then(function () {
      expect(this.firstIcon).to.eq(this.secondIcon)
    })
  })

  it('displays a placeholder icon if no status is passed', () => {
    mount(() => {
      return (
        <div>
          <StatusIcon variant="simple" size="16" />
          <StatusIcon variant="solid" size="16" status="placeholder" />
        </div>
      )
    })

    cy.get('svg').first().invoke('html').as('firstIcon')
    cy.get('svg').last().invoke('html').as('secondIcon')
    cy.then(function () {
      expect(this.firstIcon).to.eq(this.secondIcon)
    })
  })

  it('displays a placeholder icon if undefined status is passed', () => {
    mount(() => {
      return (
        <div>
          <StatusIcon variant="simple" size="16" status={undefined} />
          <StatusIcon variant="simple" size="16" status="placeholder" />
        </div>
      )
    })

    cy.get('svg').first().invoke('html').as('firstIcon')
    cy.get('svg').last().invoke('html').as('secondIcon')
    cy.then(function () {
      expect(this.firstIcon).to.eq(this.secondIcon)
    })
  })

  const VariableStatusIcon = defineComponent({
    setup() {
      const sizeSlider = ref(3)
      const size = computed(
        () => sizes[sizeSlider.value] as (typeof sizes)[number],
      )
      const statusSlider = ref(0)
      const status = computed(
        () =>
          Object.keys(statuses)[statusSlider.value] as keyof typeof statuses,
      )
      const variantSlider = ref(0)
      const variant = computed(
        () => variants[variantSlider.value] as (typeof variants)[number],
      )

      return () => {
        return (
          <div class="p-8">
            <div class="flex items-center gap-4">
              <label for="sizeRange" class="w-20">
                Size
              </label>
              <input
                id="sizeRange"
                type="range"
                min="0"
                max="4"
                step="1"
                v-model={sizeSlider.value}
              />
              {size.value}
            </div>
            <div class="flex items-center gap-4">
              <label for="statusRange" class="w-20">
                Status
              </label>
              <input
                id="statusRange"
                type="range"
                min="0"
                max="12"
                step="1"
                v-model={statusSlider.value}
              />
              {status.value}
            </div>
            <div class="flex items-center gap-4">
              <label for="variantRange" class="w-20">
                Variant
              </label>
              <input
                id="variantRange"
                type="range"
                min="0"
                max="2"
                step="1"
                v-model={variantSlider.value}
              />
              {variant.value}
            </div>
            <div class="ml-20 h-20 w-[160px] flex items-center justify-center">
              <StatusIcon
                variant={variant.value}
                size={size.value}
                status={status.value}
              />
            </div>
          </div>
        )
      }
    },
  })

  it('is reactive to size prop changes', () => {
    mount(() => <VariableStatusIcon />)
    cy.get('svg').should('have.attr', 'width', '16')
    cy.get('#sizeRange').invoke('val', 4).trigger('input')
    cy.get('svg').should('have.attr', 'width', '24')
  })

  it('is reactive to status prop changes', () => {
    mount(() => <VariableStatusIcon />)
    cy.get('svg').then(($svg) => {
      const oldHTML = $svg[0].innerHTML

      cy.get('#statusRange').invoke('val', 6).trigger('input')
      cy.get('svg').then(($svg2) => {
        const newHTML = $svg2[0].innerHTML
        expect(oldHTML).to.not.eq(newHTML)
      })
    })
  })

  it('is reactive to variant prop changes', () => {
    mount(() => <VariableStatusIcon />)
    cy.get('#statusRange').invoke('val', 2).trigger('input')
    cy.get('svg').then(($svg) => {
      const oldHTML = $svg[0].innerHTML

      cy.get('#variantRange').invoke('val', 1).trigger('input')
      cy.get('svg').then(($svg2) => {
        const newHTML = $svg2[0].innerHTML
        expect(oldHTML).to.not.eq(newHTML)
      })
    })
  })

  it('renders', () => {
    mount(StatusIconStory)
    cy.percySnapshot()
  })
})
