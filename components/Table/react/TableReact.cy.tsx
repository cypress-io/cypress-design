/// <reference types="cypress" />
import * as React from 'react'
import { createPortal } from 'react-dom'
import { mount } from 'cypress/react'
import { IconDocumentBlank } from '@cypress-design/react-icon'
import { Table, type TableColumn } from './Table'
import assertions, {
  type MountOptions,
  type User,
  callsColumn as sharedCallsColumn,
  columns as sharedColumns,
  expectColumn,
  lastActiveColumn as sharedLastActiveColumn,
  nameColumn as sharedNameColumn,
  spyOnLink,
  users,
} from '../assertions'

// The shared fixtures leave the icon type open; React columns take components.
const columns = sharedColumns as TableColumn<User>[]
const nameColumn = sharedNameColumn as TableColumn<User>
const callsColumn = sharedCallsColumn as TableColumn<User>
const lastActiveColumn = sharedLastActiveColumn as TableColumn<User>

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

  it('adds a `className` from `rowLink` to the link', () => {
    mountStory({
      columns,
      rows: users,
      rowLink: (user) => ({ href: `#${user.id}`, className: 'font-bold' }),
    })
    cy.get('a[href="#jordan"]')
      .should('have.class', 'font-bold')
      .and('have.class', 'text-indigo-500')
  })

  it('follows a `rowLinkAs` component that drops extra attributes', () => {
    function PlainLink({
      href,
      className,
      children,
    }: {
      href: string
      className?: string
      children?: React.ReactNode
    }) {
      return (
        <a href={href} className={className}>
          {children}
        </a>
      )
    }
    mount(
      <Table
        aria-label="Usage"
        columns={columns}
        rows={users}
        rowLinkAs={PlainLink}
        rowLink={(user) => ({ href: `#${user.id}` })}
      />,
    )
    spyOnLink('#jordan')
    cy.contains('td', '480').click()
    cy.get('@linkClick').should('have.been.calledOnce')
  })

  it('passes row clicks to a `rowLinkAs` that is not a link', () => {
    function ButtonLink({
      onActivate,
      className,
      children,
    }: {
      onActivate: (event: React.MouseEvent) => void
      className?: string
      children?: React.ReactNode
    }) {
      return (
        <button type="button" className={className} onClick={onActivate}>
          {children}
        </button>
      )
    }
    const onActivate = cy.spy().as('activate')
    cy.window().then((win) => {
      cy.stub(win, 'open').as('open')
    })
    mount(
      <Table
        aria-label="Usage"
        columns={columns}
        rows={users}
        rowLinkAs={ButtonLink}
        rowLink={() => ({ onActivate })}
      />,
    )
    cy.contains('td', '480').click()
    cy.get('@activate').should('have.been.calledOnce')
    // A modified click goes to the component too, with its modifier key.
    cy.contains('td', '480').click({ metaKey: true })
    cy.get('@activate').should('have.been.calledTwice')
    cy.get('@activate').its('secondCall.args.0.metaKey').should('equal', true)
    cy.get('@open').should('not.have.been.called')
  })

  it('keeps clicks in a portaled menu off the row link', () => {
    mountStory({
      columns: [
        nameColumn,
        {
          key: 'menu',
          label: 'Menu',
          render: () =>
            createPortal(
              <div data-cy="portaled">Open menu</div>,
              document.body,
            ),
        } as TableColumn<User>,
      ],
      rows: users.slice(0, 1),
      rowLink: (user) => ({ href: `#${user.id}` }),
    })
    spyOnLink('#jordan')
    cy.get('[data-cy="portaled"]').click()
    cy.get('@linkClick').should('not.have.been.called')
  })

  it('takes the truncation tooltip from `render`', () => {
    mountStory({
      columns: [
        {
          ...nameColumn,
          truncate: true,
          render: (user: User) => `${user.name} (team)`,
        } as TableColumn<User>,
        {
          ...lastActiveColumn,
          truncate: true,
          render: (user: User) => <em>{user.lastActive}, local time</em>,
        } as TableColumn<User>,
      ],
      rows: users.slice(0, 1),
    })
    cy.get('[title="Jordan Lee (team)"]').should('exist')
    cy.contains('em', '2 min ago, local time')
      .parent()
      .trigger('mouseover')
      .should('have.attr', 'title', '2 min ago, local time')
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
    spyOnLink('#jordan')
    cy.contains('tr', 'Jordan Lee').contains('button', 'Remove').click()
    cy.get('@action').should('have.been.calledOnce')
    cy.get('@linkClick').should('not.have.been.called')
  })
})

// One snapshot of the resting states, instead of one per test.
describe('<Table /> React — all states', { viewportWidth: 1280 }, () => {
  it('forwards its ref to the table element', () => {
    const ref = React.createRef<HTMLTableElement>()
    mount(<Table ref={ref} aria-label="Usage" columns={columns} rows={users} />)
    cy.get('table').then(($table) => {
      expect(ref.current).to.equal($table[0])
    })
  })

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
