/// <reference types="cypress" />

import * as React from 'react';
import { mount } from 'cypress/react';
import TooltipStory from './Tooltip.rootstory';

describe('Tooltip', () => {
  it('renders', () => {
    mount(<TooltipStory />);
  });
});
