import * as React from 'react';
import Icon, { IconObjectBookCode } from './index'
import { mount } from 'cypress/react';

describe('Icon', () => {
  it('renders correctly', () => {
    mount(<ul className="m-4">
      <li className="flex items-center mb-3 px-2">
        fillColor="red-100" - <IconObjectBookCode fillColor="red-100" className="ml-2" strokeColor="red-500" secondaryFillColor="indigo-100" secondaryStrokeColor="indigo-600"/>
        </li>
      <li className="flex items-center mb-3 px-2 bg-magenta-100">
        fillColor="transparent" - <Icon name="arrow-outline-down" strokeColor="magenta-500" fillColor="transparent" className="ml-2" />
        </li>
      <li className="flex items-center px-2">
        strokeColor="current" - <button className="flex gap-2 items-center m-2 bg-jade-400 hover:bg-jade-500 text-white py-1 px-2 rounded">
          <Icon name="add-large" strokeColor="current" />
          Add a new icon
        </button>
      </li>
    </ul>)
  })
})
