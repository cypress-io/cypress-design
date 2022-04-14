declare global {
  namespace Cypress {
    interface Chainable {
      /* eslint-disable */
      getCy: typeof getCy
      /* eslint-enable */
    }
  }
}

const compareColor = (color, property) => (targetElement) => {
  // https://github.com/cypress-io/cypress/issues/2186#issuecomment-606796041
  const tempElement = document.createElement('div')
  tempElement.style.color = color
  tempElement.style.display = 'none' // make sure it doesn't actually render
  document.body.appendChild(tempElement) // append so that `getComputedStyle` actually works

  const tempColor = getComputedStyle(tempElement).color
  const targetColor = getComputedStyle(targetElement[0])[property]

  document.body.removeChild(tempElement) // remove it because we're done with it

  expect(tempColor).to.equal(targetColor)
}

function getCy(cySelector: string) {
  return cy.get(`[data-cy=${cySelector}]`)
}
Cypress.Commands.add('getCy', getCy)

function unquote(str) {
  return str.replace(/(^")|("$)/g, '')
}

// get pseudo-element :before
// usage: cy.get('foo').before('color').should('eq', 'bar')
// https://newbedev.com/cypress-testing-pseudo-css-class-before
Cypress.Commands.add(
  'before',
  {
    prevSubject: 'element',
  },
  (el, property) => {
    const win = el[0].ownerDocument.defaultView
    const before = win.getComputedStyle(el[0], 'before')
    return unquote(before.getPropertyValue(property))
  }
)

Cypress.Commands.add(
  'after',
  {
    prevSubject: 'element',
  },
  (el, property) => {
    const win = el[0].ownerDocument.defaultView
    const after = win.getComputedStyle(el[0], 'after')
    return unquote(after.getPropertyValue(property))
  }
)

Cypress.Commands.overwrite(
  'should',
  (originalFn, subject, expectation, ...args) => {
    // https://github.com/cypress-io/cypress/issues/2186#issuecomment-606796041
    const customMatchers = {
      'have.backgroundColor': compareColor(args[0], 'backgroundColor'),
      'have.color': compareColor(args[0], 'color'),
    }

    // See if the expectation is a string and if it is a member of Jest's expect
    if (typeof expectation === 'string' && customMatchers[expectation]) {
      return originalFn(subject, customMatchers[expectation])
    }
    return originalFn(subject, expectation, ...args)
  }
)
