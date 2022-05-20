/// <reference types="cypress" />

import * as React from 'react';
import { mount } from 'cypress/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders', () => {
    mount(<div>
      {
        (['primary', 'secondary', 'tertiary', 
          'outline', 'pending', 'link', 'text',
          'danger', 'warning', 'info'] as const).map(variant => {
            return <div className="flex items-center">
              {(['sm', 'md', 'lg', 'lg-wide'] as const).map(size => {
                return <div className="w-90 h-20 flex items-center justify-center">
                  <Button variant={variant} size={size} className="m-16px">
                    {variant} - {size}
                  </Button>
                </div>
              })}
            </div>
        })
      }
    </div>);
  });
});
