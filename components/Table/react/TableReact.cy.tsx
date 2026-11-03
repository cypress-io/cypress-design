/// <reference types="cypress" />
import * as React from 'react'
import { mount } from 'cypress/react'
import { IconDocumentBlank } from '@cypress-design/react-icon'
import { Table, type TableColumn } from './Table'
import assertions, {
  type MountOptions,
  type User,
  callsColumn,
  columns,
  expectColumn,
  lastActiveColumn,
  nameColumn,
  users,
} from '../assertions'

function mountStory({
  focusableContainer,
  columns: storyColumns,
  ...props
}: MountOptions) {
  mount(
    <div className="w-96 p-8" tabIndex={focusableContainer ? 0 : undefined}>
      <Table
        aria-label="Usage"
        columns={storyColumns as TableColumn<User>[]}
        {...props}
      />
    </div>,
  )
}

describe('<Table /> React', () => {
  assertions(mountStory, IconDocumentBlank)

  it('renders a column with `render`', () => {
    mountStory({
      columns: [
        nameColumn,
        {
          ...callsColumn,
          render: (user: User) => <strong>{user.calls ?? '—'} calls</strong>,
        } as TableColumn<User>,
      ],
      rows: users,
    })
    cy.contains('td', '480 calls').find('strong').should('exist')
    cy.contains('td', '— calls').should('exist')
  })

  it('starts from `defaultSort`', () => {
    mount(
      <Table
        aria-label="Usage"
        columns={columns}
        rows={users}
        defaultSort={{ key: 'calls', direction: 'descending' }}
      />,
    )
    expectColumn(1, ['480', '316', '188', ''])
    cy.contains('th', 'Calls').find('button').click()
    expectColumn(1, ['188', '316', '480', ''])
  })

  it('keeps clicks on interactive cell content off the row link', () => {
    const onAction = cy.spy().as('action')
    mountStory({
      columns: [
        nameColumn,
        {
          key: 'actions',
          label: 'Actions',
          render: () => (
            <button type="button" onClick={onAction}>
              Remove
            </button>
          ),
        } as TableColumn<User>,
      ],
      rows: users,
      rowLink: (user) => ({ href: `#${user.id}` }),
    })
    cy.get('a[href="#jordan"]').then(($link) => {
      const onClick = cy.spy((event: Event) => event.preventDefault())
      $link[0].addEventListener('click', onClick)
      cy.wrap(onClick).as('linkClick')
    })
    cy.contains('tr', 'Jordan Lee').contains('button', 'Remove').click()
    cy.get('@action').should('have.been.calledOnce')
    cy.get('@linkClick').should('not.have.been.called')
  })
})

// One snapshot of the resting states, instead of one per test.
describe('<Table /> React — all states', { viewportWidth: 1280 }, () => {
  it('renders sorting, icons, alignment, truncation, and clickable rows', () => {
    mount(
      <div className="flex max-w-3xl flex-col gap-8 p-8">
        <Table
          aria-label="Sorted"
          columns={[
            { ...nameColumn, icon: IconDocumentBlank },
            callsColumn,
            lastActiveColumn,
          ]}
          rows={users}
          defaultSort={{ key: 'calls', direction: 'descending' }}
        />
        <Table
          aria-label="Alignment and cell icons"
          columns={[
            {
              ...nameColumn,
              cellIcon: (user) =>
                user.calls === null ? undefined : IconDocumentBlank,
            },
            { ...callsColumn, sortable: false, headerAlign: 'center' },
            { ...lastActiveColumn, align: 'center' },
          ]}
          rows={users}
        />
        <Table
          aria-label="Clickable rows, truncated"
          columns={[{ ...nameColumn, truncate: true }, callsColumn]}
          rows={[
            {
              ...users[0],
              name: 'Jordan Lee from the platform team at a very long company name that keeps going',
            },
            ...users.slice(1),
          ]}
          rowLink={(user) =>
            user.id === 'sam' ? undefined : { href: `#${user.id}` }
          }
        />
      </div>,
    )
    cy.get('table').should('have.length', 3)
    cy.percySnapshot('Table all states - react')
  })
})
