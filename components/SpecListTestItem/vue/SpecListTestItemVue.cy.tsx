/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import SpecListTestItem from './SpecListTestItem.vue'

describe('<SpecListTestItem/>', () => {
  function mountStory(
    options: ComponentProps<typeof SpecListTestItem> = { id: '1' },
  ) {
    mount(() => <SpecListTestItem {...options} />)
  }
  assertions(mountStory)
})
