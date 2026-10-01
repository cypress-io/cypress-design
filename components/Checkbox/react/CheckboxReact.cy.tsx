import * as React from 'react'
import { mount } from 'cypress/react'
import { Checkbox } from './Checkbox'

const ControlledCheckbox = () => {
  const [isChecked, setChecked] = React.useState(true)
  return (
    <Checkbox
      label="Welcome guide settings"
      id="welcome-opt-out"
      checked={isChecked}
      onChange={() => setChecked(!isChecked)}
      className="px-2 py-1 m-2 border border-gray-300 rounded"
    />
  )
}

describe('Checkbox', () => {
  it('changes when the label is clicked', () => {
    mount(<ControlledCheckbox />)

    cy.get('input[type="checkbox"]').should('be.checked')
    cy.percySnapshot()
    cy.contains('Welcome guide settings').click()
    cy.get('input[type="checkbox"]').should('not.be.checked')
    cy.percySnapshot()
  })

  it('changes when checkbox is clicked', () => {
    mount(<ControlledCheckbox />)

    cy.get('input[type="checkbox"]').should('be.checked')
    cy.get('svg').click()
    cy.get('input[type="checkbox"]').should('not.be.checked')
  })

  it('follows the checked prop when it changes', () => {
    const Parent = () => {
      const [isChecked, setChecked] = React.useState(false)
      return (
        <>
          <Checkbox label="Controlled" checked={isChecked} />
          <button onClick={() => setChecked(!isChecked)}>Toggle</button>
        </>
      )
    }
    mount(<Parent />)

    cy.get('input[type="checkbox"]').should('not.be.checked')
    cy.contains('button', 'Toggle').click()
    cy.get('input[type="checkbox"]').should('be.checked')
    cy.contains('button', 'Toggle').click()
    cy.get('input[type="checkbox"]').should('not.be.checked')
  })

  it('stays in sync with checked when onChange does not update it', () => {
    const onChange = cy.stub().as('onChange')
    mount(<Checkbox label="Locked" checked onChange={onChange} />)

    cy.contains('Locked').click()
    cy.get('@onChange').should('have.been.calledOnce')
    cy.get('input[type="checkbox"]').should('be.checked')
  })

  it('toggles on its own without checked or onChange', () => {
    mount(<Checkbox label="Uncontrolled" />)

    cy.get('input[type="checkbox"]').should('not.be.checked')
    cy.contains('Uncontrolled').click()
    cy.get('input[type="checkbox"]').should('be.checked')
    cy.contains('Uncontrolled').click()
    cy.get('input[type="checkbox"]').should('not.be.checked')
  })

  it('starts checked with defaultChecked and still toggles on its own', () => {
    mount(<Checkbox label="Starts checked" defaultChecked />)
    cy.get('input').should('be.checked')
    cy.get('input').click()
    cy.get('input').should('not.be.checked')
  })

  it('keeps its width when label is long', () => {
    mount(
      <Checkbox
        label={[
          'lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
          'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
          'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
          'sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ].join(' ')}
        id="lorem-checkbox"
      />,
    )

    cy.percySnapshot()

    cy.get('label span:first-child').invoke('outerWidth').should('equal', 16)
  })
})
