import * as React from 'react'
import { mount } from 'cypress/react18'
import IconViewChart from './_IconViewChart'

describe('<_IconViewChart />', () => {
  it('renders', () => {
    mount(
      <IconViewChart
        animated={false}
        width={400}
        height={400}
        className="icon-dark-indigo-500 hover:icon-dark-jade-300 icon-light-jade-500 icon-light-secondary-red-500"
      />,
    )
  })

  it('renders active', () => {
    const SUT = () => {
      const [isActive, setIsActive] = React.useState(false)
      return (
        <IconViewChart
          animated={isActive}
          width={400}
          height={400}
          className="icon-dark-indigo-500 hover:icon-dark-jade-300 icon-light-jade-500 icon-light-secondary-red-500"
          onClick={() => setIsActive(!isActive)}
        />
      )
    }
    mount(<SUT />)

    cy.get('svg').click()
  })
})
