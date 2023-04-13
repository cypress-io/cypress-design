import * as React from 'react'
import Icon, { IconObjectBookCode } from './index'
import { mount } from 'cypress/react18'

describe('Icon', () => {
  it('renders correctly', () => {
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
      </ul>
    )
  })
})
