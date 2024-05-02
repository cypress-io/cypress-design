import * as React from 'react'
import { mount } from 'cypress/react18'
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
        <li className="flex items-center px-2 mb-3">
          fillColor="red-100" -{' '}
          <IconObjectBookCode
            fillColor="red-100"
            className="ml-2"
            strokeColor="red-500"
            secondaryFillColor="indigo-100"
            secondaryStrokeColor="indigo-600"
          />
        </li>
        <li className="flex items-center px-2 mb-3 bg-magenta-100">
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
          <button className="flex items-center px-2 py-1 m-2 text-white rounded gap-2 bg-jade-600 hover:bg-jade-800">
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
        <IconBrowserWebkit className="w-16 h-16 hidden" />
        <IconBrowserWebkit className="w-16 h-16" />
      </div>,
    )
  })

  it('renders a title element when passed an alt prop', () => {
    mount(
      <IconBrowserWebkit className="w-16 h-16" alt="This is a <b>title</b>" />,
    )

    cy.get('svg title').should('have.text', 'This is a <b>title</b>')
  })

  it('renders class passed only once', () => {
    mount(<IconBrowserWebkit className="w-16 h-16" />)

    cy.get('svg[width="16"]').should('have.attr', 'class', 'w-16 h-16')
  })
})
