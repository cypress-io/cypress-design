import * as React from 'react'
import { mount } from 'cypress/react18'
import IconTechGitBranches from './_IconTechGitBranches'

describe('<IconTechGitBranches />', () => {
  it('renders', () => {
    mount(
      <IconTechGitBranches
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
        <IconTechGitBranches
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

  it('renders both side by side', { viewportWidth: 900 }, () => {
    mount(
      <div className="bg-red-300 flex gap-4 text-center text-2xl">
        <div>
          <h2>not animated</h2>
          <IconTechGitBranches
            animated={false}
            width={400}
            height={400}
            className="icon-dark-indigo-500 hover:icon-dark-jade-300 icon-light-jade-500 icon-light-secondary-red-500"
          />
        </div>
        <div>
          <h2>animated</h2>
          <IconTechGitBranches
            animated={true}
            width={400}
            height={400}
            className="icon-dark-indigo-500 hover:icon-dark-jade-300 icon-light-jade-500 icon-light-secondary-red-500"
          />
        </div>
      </div>,
    )
  })
})
