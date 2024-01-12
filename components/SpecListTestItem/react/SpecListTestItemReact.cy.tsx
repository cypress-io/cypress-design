/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import SpecListTestItem from './SpecListTestItem'
import assertions from '../assertions'

describe('SpecListTestItem', () => {
  function mountStory(
    options: Parameters<typeof SpecListTestItem>[0] = { id: '1' },
  ) {
    mount(<SpecListTestItem {...options} />)
  }
  assertions(mountStory)
})
