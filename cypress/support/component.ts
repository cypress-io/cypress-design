// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'tailwindcss/tailwind.css'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import 'cypress-real-events/support'
import 'cypress-real-events'

Cypress.on(
  'uncaught:exception',
  (err) => !err.message.includes('ResizeObserver loop limit exceeded'),
)

beforeEach(() => {
  // `realHover` moves the real CDP cursor, and it stays put between tests.
  // Chrome fires a synthetic mousemove when new content lays out under it, so
  // the next test's component would open a hover tooltip on its own, sometimes
  // before its snapshot and sometimes after. Park the cursor just outside the
  // app's frame: at (0, 0) it would hover whatever the next test mounts there.
  cy.get('html', { log: false }).realMouseMove(-5, -5, { position: 'topLeft' })

  cy.window().then((win) => {
    cy.spy(win.console, 'error')
    cy.spy(win.console, 'warn')
  })
})

afterEach(() => {
  cy.window().then((win) => {
    expect(win.console.error).to.have.callCount(0)
    expect(win.console.warn).to.have.callCount(0)
  })
})
