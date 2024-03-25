import * as React from 'react'
import { mount } from 'cypress/react18'
import {
  HasSecondaryFillColor,
  HasSecondaryStrokeColor,
} from '@cypress-design/icon-registry'
import { AnimatedProps } from './compileAttributes'

export function iconTests(
  Icon: React.FC<
    AnimatedProps &
      HasSecondaryStrokeColor &
      React.SVGProps<SVGSVGElement> & {
        animated: boolean
      }
  >,
) {
  it('renders', () => {
    mount(
      <Icon
        animated={false}
        width={400}
        height={400}
        className="icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400"
      />,
    )
  })

  it('renders active', () => {
    const SUT = () => {
      const [isActive, setIsActive] = React.useState(false)
      return (
        <>
          <pre>{isActive ? 'active' : 'not active'}</pre>
          <Icon
            animated={isActive}
            width={400}
            height={400}
            className="icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400 m-[50px]"
            onClick={() => setIsActive(!isActive)}
          />
        </>
      )
    }
    mount(<SUT />)

    cy.get('svg').click()
  })

  it('renders with props', { viewportHeight: 550 }, () => {
    const SUT = () => {
      const [isActive, setIsActive] = React.useState(false)
      return (
        <>
          <pre>{isActive ? 'active' : 'not active'}</pre>
          <Icon
            animated={isActive}
            width={400}
            height={400}
            fillColor="indigo-500"
            strokeColor="jade-300"
            secondaryStrokeColor="purple-400"
            onClick={() => setIsActive(!isActive)}
          />
        </>
      )
    }
    mount(<SUT />)

    cy.get('svg').click()
  })

  it('renders both side by side', { viewportWidth: 900 }, () => {
    mount(
      <div className="bg-black flex gap-4 text-center text-2xl">
        <div>
          <h2 className="text-indigo-200 drop-shadow-md font-bold">
            not animated
          </h2>
          <Icon
            animated={false}
            width={400}
            height={400}
            className="icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400"
          />
        </div>
        <div>
          <h2 className="text-indigo-200 drop-shadow-md font-bold">animated</h2>
          <Icon
            animated={true}
            width={400}
            height={400}
            className="icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400"
          />
        </div>
      </div>,
    )
  })
}
