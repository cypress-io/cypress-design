/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import '@percy/cypress'

// add testing library selectors types
import '@testing-library/cypress'
// add testing library commands
import '@testing-library/cypress/add-commands'

// add cy.findByTestId command
Cypress.Commands.add('findByTestId', (id) => {
  return cy.get(`[data-cy=${id}]`)
})

// Windows reports spec paths with backslashes.
function specPath(): string {
  return Cypress.spec.relative.replace(/\\/g, '/')
}

// React and Vue specs share assertion files and often the same test titles, so
// Percy's default name (the test's full title) would collide and Percy drops
// the duplicate. Suffix the framework so both get a baseline.
function defaultSnapshotName(): string {
  const title = Cypress.currentTest.titlePath.join(' ')
  const framework = specPath().match(/\/(react|vue)\//)?.[1]
  return framework ? `${title} - ${framework}` : title
}

// Percy serializes the DOM as it stands, so a snapshot taken mid-transition
// captures whatever inline height or opacity the animation is passing
// through. Wait for every finite animation (CSS transitions, CSS animations
// and WAAPI, e.g. the Accordion's details-animation) and for web fonts first.
// Infinite animations never finish; `.percy.yml` freezes those instead.
Cypress.Commands.overwrite('percySnapshot', (originalFn, name, options) => {
  cy.document({ log: false }).should((doc) => {
    const running = doc
      .getAnimations()
      .filter(
        (animation) =>
          animation.playState === 'running' &&
          animation.effect?.getComputedTiming().endTime !== Infinity,
      )
    expect(running, 'animations still running before snapshot').to.have.length(
      0,
    )
    expect(doc.fonts.status, 'web fonts loaded before snapshot').to.equal(
      'loaded',
    )
  })
  return originalFn(name || defaultSnapshotName(), options)
})

// For resting states that a component's Vue all-states gallery already shows
// (docs/src/demos/AllStatesVue.cy.ts). Shared assertions still snapshot them
// for React, which has no gallery, without paying for a Vue duplicate.
Cypress.Commands.add('percySnapshotUnlessInVueGallery', (name?: string) => {
  if (!specPath().includes('/vue/')) {
    cy.percySnapshot(name)
  }
})

// Custom commands are typed by augmenting Cypress's global namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      findByTestId(id: string): Chainable<JQuery<HTMLElement>>
      percySnapshotUnlessInVueGallery(name?: string): Chainable<void>
    }
  }
}
