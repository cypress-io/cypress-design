/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders', () => {
    mount(<Spinner />)
  })

  it('renders dark', () => {
    mount(
      <div className="bg-gray-1000 p-6">
        <Spinner variant="dark" />
      </div>,
    )
  })
})
