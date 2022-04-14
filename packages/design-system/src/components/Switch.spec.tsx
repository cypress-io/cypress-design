import React, { FunctionComponent, useState } from 'react'
import { mount } from '@cypress/react'
import { Switch } from './Switch'

export const SwitchWrapper: FunctionComponent = ({ ...rest }) => {
  const [isChecked, setChecked] = useState(false)

  return (
    <Switch
      {...rest}
      data-cy="switch"
      checked={isChecked}
      onChange={() => setChecked(!isChecked)}
    />
  )
}

describe('Switch', () => {
  it('should be toggleable', () => {
    mount(<SwitchWrapper data-cy="switch" />)
    cy.getCy('switch').should('have.attr', 'aria-checked', 'false')
    cy.getCy('switch').click()
    cy.getCy('switch').should('have.attr', 'aria-checked', 'true')
  })

  it('should not be toggleable when disabled', () => {
    mount(<SwitchWrapper data-cy="switch" disabled />)
    cy.getCy('switch').should('have.attr', 'aria-checked', 'false')
    cy.getCy('switch').click({ force: true }) // can't actually click, since it's disabled
    cy.getCy('switch').should('have.attr', 'aria-checked', 'false')
  })

  it("should accept button props that aren't explicitly listed in the react component", () => {
    mount(<SwitchWrapper data-cy="switch" id="foo" />)
    cy.getCy('switch').should('have.attr', 'id', 'foo')
  })
})
