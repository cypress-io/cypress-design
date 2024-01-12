/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import type { ComponentProps } from '../../vue-utils'
import assertions from '../assertions'
import SpecListTestItem from './SpecListTestItem.vue'

describe('<SpecListTestItem/>', () => {
  function mountStory(
    options: ComponentProps<typeof SpecListTestItem> = {
      names: [
        'Authentication',
        'Roles',
        'Admin',
        'Should be able to login successfully with proper credentials',
      ],
    },
  ) {
    mount(() => (
      <div class="p-[24px]">
        <div>
          <SpecListTestItem status="passed" {...options} />
          <SpecListTestItem status="failed" {...options} />
          <SpecListTestItem status="errored" {...options} />
          <SpecListTestItem status="skipped" {...options} />
          <SpecListTestItem status="running" {...options} />
        </div>
      </div>
    ))
  }
  assertions(mountStory)
})
