import * as React from 'react';
import { IconBookCode } from './index'
import { mount } from 'cypress/react';

describe('Icon', () => {
  it('renders correctly', () => {
    mount(<IconBookCode fillColor="red-100" strokeColor="red-500" secondaryFillColor="indigo-100" secondaryStrokeColor="indigo-600"/>)
  })
})
