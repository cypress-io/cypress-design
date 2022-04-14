import React from 'react'
import { formatISO, sub } from 'date-fns'
import { map } from 'lodash'
import { mount } from '@cypress/react'
import { RunStatusDots } from './RunStatusDots'
import { RunStatusEnum } from '@frontend/dashboard/src/graphql-codegen-operations.gen'

const runStatuses: RunStatusEnum[] = [
  'CANCELLED',
  'ERRORED',
  'FAILED',
  'NOTESTS',
  'OVERLIMIT',
  'PASSED',
  'RUNNING',
  'TIMEDOUT',
]

const runs = map(runStatuses, (status, i) => {
  return {
    buildNumber: i + 1,
    status,
    endTime: formatISO(sub(new Date(), { hours: runStatuses.length - i })),
  }
})

it('displays all statuses', () => {
  mount(<RunStatusDots runs={runs} />)

  cy.get('li').should('have.length', 8)
})

// NOTE: tooltip tests are broken because some styles are not loaded
it.skip('displays full tooltip when all data is available', () => {
  mount(<RunStatusDots runs={runs} />)

  cy.get('li').first().trigger('mouseenter')
  cy.get('.rc-tooltip').contains('Run #1 was canceled about 8 hours ago')
})

it('displays placeholders when `shouldFillEmpty` is true and maxShown > runs provided', () => {
  mount(<RunStatusDots maxShown={4} runs={[runs[0]]} shouldFillEmpty />)

  cy.get('li').should('have.length', 4)
})

it('displays placeholders when `shouldFillEmpty` is true and no runs are provided', () => {
  mount(<RunStatusDots maxShown={4} runs={[]} shouldFillEmpty />)

  cy.get('li').should('have.length', 4)
})

// NOTE: tooltip tests are broken because some styles are not loaded
it.skip('displays correct tooltip when build number is missing', () => {
  const runs = map(runStatuses, (status, i) => {
    return {
      status,
      endTime: formatISO(sub(new Date(), { hours: runStatuses.length - i })),
    }
  })

  mount(<RunStatusDots runs={runs} />)

  cy.get('li').first().trigger('mouseenter')
  cy.get('.rc-tooltip').contains('Run was canceled about 8 hours ago')
})

// NOTE: tooltip tests are broken because some styles are not loaded
it.skip('displays correct tooltip when time is missing', () => {
  const runs = map(runStatuses, (status, i) => {
    return {
      buildNumber: i + 1,
      status,
    }
  })

  mount(<RunStatusDots runs={runs} />)

  cy.get('li').first().trigger('mouseenter')
  cy.get('.rc-tooltip').contains('Run #1 was canceled')
})

// NOTE: tooltip tests are broken because some styles are not loaded
it.skip('displays correct tooltip when time and build number are missing', () => {
  const runs = map(runStatuses, (status, i) => {
    return {
      status,
    }
  })

  mount(<RunStatusDots runs={runs} />)

  cy.get('li').first().trigger('mouseenter')
  cy.get('.rc-tooltip').contains('Run was canceled')
})

it('displays no more than the max number of runs', () => {
  mount(<RunStatusDots runs={runs} maxShown={4} />)

  cy.get('li').should('have.length', 4)
})
