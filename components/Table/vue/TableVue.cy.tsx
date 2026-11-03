/// <reference types="cypress" />
import { ref } from 'vue'
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
  columns,
  expectColumn,
  nameColumn,
  users,
} from '../assertions'

function mountStory({
  focusableContainer,
  className,
  onSortChange,
  ...props
}: MountOptions) {
  mount(() => (
    <div class="w-96 p-8" tabindex={focusableContainer ? 0 : undefined}>
      <Table
        aria-label="Usage"
        class={className}
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
        columns={[nameColumn, { key: 'actions', label: 'Actions' }]}
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
