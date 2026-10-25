import * as React from 'react'
import { mount } from 'cypress/react'
import assertions from '../assertions'
import Icon, {
  IconBrowserWebkit,
  IconObjectBookCode,
  IconDocumentBlank,
} from './index'

describe('Icon', { viewportWidth: 80, viewportHeight: 80 }, () => {
  it('renders correctly', { viewportWidth: 500, viewportHeight: 500 }, () => {
    mount(
      <ul className="m-4">
        <li className="mb-3 flex items-center px-2">
          fillColor="red-100" -{' '}
          <IconObjectBookCode
            fillColor="red-100"
            className="ml-2"
            strokeColor="red-500"
            secondaryFillColor="indigo-100"
            secondaryStrokeColor="indigo-600"
          />
        </li>
        <li className="mb-3 flex items-center bg-magenta-100 px-2">
          fillColor="transparent" -{' '}
          <Icon
            name="arrow-outline-down"
            strokeColor="magenta-500"
            fillColor="transparent"
            className="ml-2"
          />
        </li>
        <li className="flex items-center px-2">
          strokeColor="current" -{' '}
          <button className="m-2 flex items-center gap-2 rounded bg-jade-600 px-2 py-1 text-white hover:bg-jade-800">
            <Icon name="action-add-large" strokeColor="current" />
            Add a new icon
          </button>
        </li>
      </ul>,
    )
  })

  assertions(({ class: className, ...props }) => {
    if (props.name) {
      return mount(<Icon className={className} {...props} />)
    }
    mount(<IconDocumentBlank className={className} {...props} />)
  })

  it('renders multiple times an icon with defs', () => {
    mount(
      <div className="p-2">
        <IconBrowserWebkit className="hidden h-16 w-16" />
        <IconBrowserWebkit className="h-16 w-16" />
      </div>,
    )
  })

  it('renders a title element when passed an alt prop', () => {
    mount(
      <IconBrowserWebkit className="h-16 w-16" alt="This is a <b>title</b>" />,
    )

    cy.get('svg title').should('have.text', 'This is a <b>title</b>')
  })

  it('renders class passed only once', () => {
    mount(<IconBrowserWebkit className="h-16 w-16" />)

    cy.get('svg[width="16"]').should('have.attr', 'class', 'h-16 w-16')
  })
})
