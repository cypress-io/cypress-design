/// <reference types="cypress" />
import { type Component, ref } from 'vue'
import { mount } from 'cypress/vue'
import { IconDocumentBlank } from '@cypress-design/vue-icon'
import type {
  TableColumnBase,
  TableSort,
} from '@cypress-design/constants-table'
import Table from './Table.vue'
import assertions, {
  type MountOptions,
  type User,
  columns as sharedColumns,
  callsColumn,
  expectColumn,
  lastActiveColumn,
  nameColumn,
  spyOnLink,
  users,
} from '../assertions'

// The shared fixtures leave the icon type open; Vue columns take components.
type VueColumn = TableColumnBase<User, Component>
const columns = sharedColumns as VueColumn[]

function mountStory({
  focusableContainer,
  className,
  onSortChange,
  columns: storyColumns,
  ...props
}: MountOptions) {
  mount(() => (
    <div class="w-96 p-8" tabindex={focusableContainer ? 0 : undefined}>
      <Table
        aria-label="Usage"
        class={className}
        columns={storyColumns as VueColumn[]}
        {...props}
        onUpdate:sort={onSortChange}
      />
    </div>
  ))
}

describe('<Table /> Vue', () => {
  assertions(mountStory, IconDocumentBlank)

  it('renders a `cell-<key>` slot with the row and value', () => {
    mount(() => (
      <Table aria-label="Usage" columns={columns} rows={users}>
        {{
          'cell-calls': ({ row, value }: { row: User; value: unknown }) => (
            <strong>
              {String(value ?? '—')} calls for {row.name}
            </strong>
          ),
        }}
      </Table>
    ))
    cy.contains('td', '480 calls for Jordan Lee').find('strong').should('exist')
    cy.contains('td', '— calls for Sam Rivera').should('exist')
  })

  it('replaces the header label with a `header-<key>` slot', () => {
    mount(() => (
      <Table aria-label="Usage" columns={columns} rows={users}>
        {{
          'header-calls': ({ column }: { column: TableColumnBase<User> }) => (
            <em>{column.label} today</em>
          ),
        }}
      </Table>
    ))
    cy.contains('th', 'Calls today').find('button em').should('exist')
    // The slot is presentational; the button keeps the column label as its name.
    cy.contains('th', 'Calls today')
      .find('button')
      .should('have.attr', 'aria-label', 'Calls')
  })

  it('adds a `class` from `rowLink` to the link', () => {
    mountStory({
      columns,
      rows: users,
      rowLink: (user) => ({ href: `#${user.id}`, class: 'font-bold' }),
    })
    cy.get('a[href="#jordan"]')
      .should('have.class', 'font-bold')
      .and('have.class', 'text-indigo-500')
  })

  it('takes the truncation tooltip from a `cell-<key>` slot', () => {
    mount(() => (
      <Table
        aria-label="Usage"
        columns={[{ ...nameColumn, truncate: true }] as VueColumn[]}
        rows={users.slice(0, 1)}
      >
        {{
          'cell-name': ({ row }: { row: User }) => <em>{row.name} (team)</em>,
        }}
      </Table>
    ))
    cy.contains('em', 'Jordan Lee (team)')
      .parent()
      .should('not.have.attr', 'title')
      .trigger('mouseenter')
      .should('have.attr', 'title', 'Jordan Lee (team)')
  })

  it('re-sorts when the parent passes the new sort back', () => {
    const sort = ref<TableSort | null>({
      key: 'calls',
      direction: 'descending',
    })
    mount(() => (
      <div>
        <Table
          aria-label="Usage"
          columns={columns}
          rows={users}
          sort={sort.value}
          onUpdate:sort={(next: TableSort) => (sort.value = next)}
        />
        <output data-cy="sort">
          {sort.value ? `${sort.value.key} ${sort.value.direction}` : 'none'}
        </output>
      </div>
    ))
    expectColumn(1, ['480', '316', '188', ''])
    cy.contains('th', 'Calls').find('button').click()
    expectColumn(1, ['188', '316', '480', ''])
    cy.get('[data-cy="sort"]').should('have.text', 'calls ascending')
  })

  it('keeps clicks on interactive cell content off the row link', () => {
    const onAction = cy.spy().as('action')
    mount(() => (
      <Table
        aria-label="Usage"
        columns={
          [nameColumn, { key: 'actions', label: 'Actions' }] as VueColumn[]
        }
        rows={users}
        rowLink={(user: User) => ({ href: `#${user.id}` })}
      >
        {{
          'cell-actions': () => (
            <button type="button" onClick={onAction}>
              Remove
            </button>
          ),
        }}
      </Table>
    ))
    spyOnLink('#jordan')
    cy.contains('tr', 'Jordan Lee').contains('button', 'Remove').click()
    cy.get('@action').should('have.been.calledOnce')
    cy.get('@linkClick').should('not.have.been.called')
  })
})

// One snapshot of the resting states, instead of one per test. Wide enough
// for the `max-w-3xl` layout, matching the React snapshot.
describe('<Table /> Vue — all states', { viewportWidth: 1280 }, () => {
  it('renders sorting, icons, alignment, truncation, and clickable rows', () => {
    mount(() => (
      <div class="flex max-w-3xl flex-col gap-8 p-8">
        <Table
          aria-label="Sorted"
          columns={
            [
              { ...nameColumn, icon: IconDocumentBlank },
              callsColumn,
              lastActiveColumn,
            ] as VueColumn[]
          }
          rows={users}
          sort={{ key: 'calls', direction: 'descending' }}
        />
        <Table
          aria-label="Alignment and cell icons"
          columns={
            [
              {
                ...nameColumn,
                cellIcon: (user: User) =>
                  user.calls === null ? undefined : IconDocumentBlank,
              },
              { ...callsColumn, sortable: false, headerAlign: 'center' },
              { ...lastActiveColumn, align: 'center' },
            ] as VueColumn[]
          }
          rows={users}
        />
        <Table
          aria-label="Clickable rows, truncated"
          columns={
            [{ ...nameColumn, truncate: true }, callsColumn] as VueColumn[]
          }
          rows={[
            {
              ...users[0],
              name: 'Jordan Lee from the platform team at a very long company name that keeps going',
            },
            ...users.slice(1),
          ]}
          rowLink={(user: User) =>
            user.id === 'sam' ? undefined : { href: `#${user.id}` }
          }
        />
      </div>
    ))
    cy.get('table').should('have.length', 3)
    cy.percySnapshot('Table all states - vue')
  })
})
