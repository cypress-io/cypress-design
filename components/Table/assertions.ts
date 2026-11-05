/// <reference types="cypress" />

import {
  CssClickableRowClasses,
  type TableColumnBase,
  type TableSort,
  sortRows,
} from '@cypress-design/constants-table'

export interface User {
  id?: string
  name: string
  calls: number | null
  lastActive: string
  minutesAgo: number
}

export interface MountOptions {
  columns: TableColumnBase<User>[]
  rows: User[]
  sort?: TableSort | null
  manualSort?: boolean
  rowLink?: (row: User) => Record<string, unknown> | undefined
  stickyHeader?: boolean
  onSortChange?: (sort: TableSort) => void
  className?: string
  // Puts the table inside a focusable scroll container, as pages often do.
  focusableContainer?: boolean
}

export type MountFn = (options: MountOptions) => void

export const users: User[] = [
  {
    id: 'jordan',
    name: 'Jordan Lee',
    calls: 480,
    lastActive: '2 min ago',
    minutesAgo: 2,
  },
  {
    id: 'maya',
    name: 'Maya Patel',
    calls: 316,
    lastActive: '1 hr ago',
    minutesAgo: 60,
  },
  {
    id: 'sam',
    name: 'Sam Rivera',
    calls: null,
    lastActive: '1 day ago',
    minutesAgo: 1440,
  },
  {
    id: 'alex',
    name: 'Alex Kim',
    calls: 188,
    lastActive: '5 min ago',
    minutesAgo: 5,
  },
]

export const nameColumn: TableColumnBase<User> = {
  key: 'name',
  label: 'User',
  sortable: true,
}

export const callsColumn: TableColumnBase<User> = {
  key: 'calls',
  label: 'Calls',
  align: 'right',
  sortable: true,
  firstSortDirection: 'descending',
}

export const lastActiveColumn: TableColumnBase<User> = {
  key: 'lastActive',
  label: 'Last active',
  sortable: true,
  sortValue: (user) => user.minutesAgo,
}

export const columns = [nameColumn, callsColumn, lastActiveColumn]

const LongName = 'Jordan Lee from the platform team at a very long company name'

export function expectColumn(index: number, values: string[]): void {
  cy.get('tbody tr').should(($rows) => {
    const texts = Cypress.$.makeArray($rows).map((row) =>
      (row as HTMLTableRowElement).cells[index].textContent?.trim(),
    )
    expect(texts).to.deep.equal(values)
  })
}

// Reads the drawn arrow rather than which icon was picked: the head's left
// stroke passes through (5, 6) on the up arrow and (5, 10) on the down one,
// in the icon's 16x16 viewBox.
function expectArrow(label: string, direction: 'up' | 'down'): void {
  cy.contains('th', label)
    .find('button svg path')
    .should(($path) => {
      const path = $path[0] as unknown as SVGPathElement
      const point = direction === 'up' ? { x: 5, y: 6 } : { x: 5, y: 10 }
      expect(path.isPointInStroke(new DOMPoint(point.x, point.y))).to.equal(
        true,
      )
    })
}

function sortButton(label: string) {
  return cy.contains('th', label).find('button')
}

// Stops the row link from navigating the test frame and records its clicks
// as `@linkClick`.
export function spyOnLink(href: string): void {
  cy.get(`a[href="${href}"]`).then(($link) => {
    const onClick = cy.spy((event: Event) => event.preventDefault())
    $link[0].addEventListener('click', onClick)
    cy.wrap(onClick).as('linkClick')
  })
}

const linkToUser = (user: User) =>
  user.id === 'sam' ? undefined : { href: `#${user.id}` }

export default function assertions(
  mountStory: MountFn,
  icon: TableColumnBase<User>['icon'],
): void {
  describe('content', () => {
    it('renders a header per column and a row per item', () => {
      mountStory({ columns, rows: users })
      cy.get('thead th').should('have.length', 3)
      cy.get('thead th').each(($th) => {
        expect($th).to.have.attr('scope', 'col')
      })
      cy.get('tbody tr').should('have.length', 4)
      expectColumn(0, ['Jordan Lee', 'Maya Patel', 'Sam Rivera', 'Alex Kim'])
      expectColumn(1, ['480', '316', '', '188'])
    })

    it('puts classes and attributes on the table', () => {
      mountStory({ columns, rows: users, className: 'mt-2' })
      cy.get('table')
        .should('have.attr', 'aria-label', 'Usage')
        .and('have.class', 'mt-2')
        .and('have.class', 'w-full')
    })

    it('lets a class override the default table classes', () => {
      mountStory({ columns, rows: users, className: 'bg-gray-50' })
      cy.get('table')
        .should('have.class', 'bg-gray-50')
        .and('not.have.class', 'bg-white')
      // Header cells follow the table's background instead of painting white.
      cy.get('table').then(($table) => {
        cy.contains('th', 'User').should(
          'have.css',
          'background-color',
          $table.css('background-color'),
        )
      })
    })
  })

  describe('alignment', () => {
    it('aligns the header and cells with `align`', () => {
      mountStory({ columns, rows: users })
      cy.contains('th', 'Calls').should('have.css', 'text-align', 'right')
      cy.contains('td', '480').should('have.css', 'text-align', 'right')
      cy.contains('th', 'User').should('have.css', 'text-align', 'left')
      cy.contains('td', 'Jordan Lee').should('have.css', 'text-align', 'left')
    })

    it('overrides the header with `headerAlign` and cells with `cellAlign`', () => {
      mountStory({
        columns: [
          nameColumn,
          {
            key: 'calls',
            label: 'Calls',
            align: 'right',
            headerAlign: 'center',
            cellAlign: (user) => (user.calls === null ? 'center' : 'right'),
          },
        ],
        rows: users,
      })
      cy.contains('th', 'Calls').should('have.css', 'text-align', 'center')
      cy.contains('td', '480').should('have.css', 'text-align', 'right')
      cy.get('tbody tr')
        .eq(2)
        .find('td')
        .eq(1)
        .should('have.css', 'text-align', 'center')
    })

    it('pads sortable right-aligned cells so values line up with the label', () => {
      mountStory({ columns, rows: users })
      cy.contains('td', '480').should('have.css', 'padding-right', '44px')
      cy.contains('td', 'Jordan Lee').should(
        'have.css',
        'padding-right',
        '16px',
      )
      cy.contains('th', 'Calls')
        .find('.truncate')
        .then(($label) => {
          const labelRight = $label[0].getBoundingClientRect().right
          cy.contains('td', '480').then(($cell) => {
            const range = document.createRange()
            range.selectNodeContents($cell[0])
            expect(range.getBoundingClientRect().right).to.be.closeTo(
              labelRight,
              1,
            )
          })
        })
    })

    it('keeps the default padding when the header is left-aligned', () => {
      mountStory({
        columns: [
          nameColumn,
          { ...callsColumn, headerAlign: 'left', cellAlign: 'right' },
        ],
        rows: users,
      })
      cy.contains('td', '480').should('have.css', 'padding-right', '16px')
    })
  })

  describe('sorting', () => {
    it('sorts ascending on the first click and flips on the next', () => {
      mountStory({ columns, rows: users })
      sortButton('User').click()
      expectColumn(0, ['Alex Kim', 'Jordan Lee', 'Maya Patel', 'Sam Rivera'])
      cy.contains('th', 'User').should('have.attr', 'aria-sort', 'ascending')
      sortButton('User').click()
      expectColumn(0, ['Sam Rivera', 'Maya Patel', 'Jordan Lee', 'Alex Kim'])
      cy.contains('th', 'User').should('have.attr', 'aria-sort', 'descending')
    })

    it('starts in `firstSortDirection` and keeps empty values last', () => {
      mountStory({ columns, rows: users })
      sortButton('Calls').click()
      expectColumn(1, ['480', '316', '188', ''])
      sortButton('Calls').click()
      expectColumn(1, ['188', '316', '480', ''])
    })

    it('sorts by `sortValue` when set', () => {
      mountStory({ columns, rows: users })
      sortButton('Last active').click()
      expectColumn(2, ['2 min ago', '5 min ago', '1 hr ago', '1 day ago'])
    })

    it('moves aria-sort to the newly sorted column', () => {
      mountStory({ columns, rows: users })
      sortButton('User').click()
      sortButton('Calls').click()
      cy.contains('th', 'User').should('not.have.attr', 'aria-sort')
      cy.contains('th', 'Calls').should('have.attr', 'aria-sort', 'descending')
    })

    it('points the arrow in the direction a click applies, then the current one', () => {
      mountStory({ columns, rows: users })
      expectArrow('User', 'up')
      expectArrow('Calls', 'down')
      sortButton('User').click()
      expectArrow('User', 'up')
      sortButton('User').click()
      expectArrow('User', 'down')
    })

    it('shows the sort button only on the sorted column at rest', () => {
      mountStory({ columns, rows: users })
      sortButton('Calls').click()
      // Clicking leaves the button focused, which reveals its indicator.
      cy.focused().blur()
      cy.contains('th', 'Calls')
        .find('button > span')
        .last()
        .should('be.visible')
      cy.contains('th', 'User')
        .find('button > span')
        .last()
        .should('not.be.visible')
    })

    it('reports the next sort', () => {
      const onSortChange = cy.spy().as('sortChange')
      mountStory({ columns, rows: users, onSortChange })
      sortButton('Calls').click()
      cy.get('@sortChange').should('have.been.calledOnceWith', {
        key: 'calls',
        direction: 'descending',
      })
    })

    it('shows the sort it is given when controlled', () => {
      const onSortChange = cy.spy().as('sortChange')
      mountStory({
        columns,
        rows: users,
        sort: { key: 'name', direction: 'ascending' },
        onSortChange,
      })
      expectColumn(0, ['Alex Kim', 'Jordan Lee', 'Maya Patel', 'Sam Rivera'])
      sortButton('User').click()
      cy.get('@sortChange').should('have.been.calledOnceWith', {
        key: 'name',
        direction: 'descending',
      })
      // The parent didn't pass the new sort back, so nothing changes.
      expectColumn(0, ['Alex Kim', 'Jordan Lee', 'Maya Patel', 'Sam Rivera'])
      cy.contains('th', 'User').should('have.attr', 'aria-sort', 'ascending')
    })

    it('stays unsorted when controlled with `sort: null`', () => {
      const onSortChange = cy.spy().as('sortChange')
      mountStory({ columns, rows: users, sort: null, onSortChange })
      sortButton('Calls').click()
      cy.get('@sortChange').should('have.been.calledOnceWith', {
        key: 'calls',
        direction: 'descending',
      })
      // The parent didn't pass the new sort back, so the rows keep their order.
      expectColumn(0, ['Jordan Lee', 'Maya Patel', 'Sam Rivera', 'Alex Kim'])
      cy.get('th[aria-sort]').should('not.exist')
    })

    it('leaves the order to the page with `manualSort`', () => {
      mountStory({ columns, rows: users, manualSort: true })
      sortButton('Calls').click()
      expectColumn(0, ['Jordan Lee', 'Maya Patel', 'Sam Rivera', 'Alex Kim'])
      cy.contains('th', 'Calls').should('have.attr', 'aria-sort', 'descending')
    })

    it('keeps the sort buttons and sort state with one row', () => {
      mountStory({
        columns,
        rows: [users[0]],
        sort: { key: 'calls', direction: 'descending' },
      })
      cy.get('thead button').should('have.length', 3)
      cy.contains('th', 'Calls').should('have.attr', 'aria-sort', 'descending')
    })

    it('keeps the sort buttons with no rows', () => {
      mountStory({ columns, rows: [] })
      cy.get('thead button').should('have.length', 3)
      cy.get('tbody tr').should('not.exist')
    })

    it('sorts `NaN` last in both directions', () => {
      mountStory({
        columns,
        rows: users.map((user) =>
          user.id === 'maya' ? { ...user, calls: Number.NaN } : user,
        ),
      })
      sortButton('Calls').click()
      expectColumn(1, ['480', '188', 'NaN', ''])
      sortButton('Calls').click()
      expectColumn(1, ['188', '480', 'NaN', ''])
    })

    it('sorts `Date` values by time', () => {
      type Meeting = { id: string; at: Date }
      const events: Meeting[] = [
        { id: 'monday', at: new Date(2025, 0, 6) },
        { id: 'march', at: new Date(2024, 2, 1) },
        { id: 'friday', at: new Date(2025, 0, 3) },
      ]
      const sorted = sortRows(events, [{ key: 'at', label: 'At' }], {
        key: 'at',
        direction: 'ascending',
      })
      expect(sorted.map(({ id }) => id)).to.deep.equal([
        'march',
        'friday',
        'monday',
      ])
    })

    it('keeps rows without an id intact when sorting', () => {
      mountStory({
        columns,
        rows: users.map(({ id: _id, ...user }) => user),
      })
      sortButton('Calls').click()
      expectColumn(0, ['Jordan Lee', 'Maya Patel', 'Alex Kim', 'Sam Rivera'])
      expectColumn(1, ['480', '316', '188', ''])
    })
  })

  describe('width and scrolling', () => {
    const longRows = [{ ...users[0], name: LongName }, users[1]]

    it('shows full values and scrolls sideways by default', () => {
      mountStory({ columns, rows: longRows })
      cy.contains('td', LongName).should('not.have.attr', 'title')
      cy.get('table')
        .parent()
        .should('have.css', 'overflow-x', 'auto')
        .and(($wrapper) => {
          expect($wrapper[0].scrollWidth).to.be.greaterThan(
            $wrapper[0].clientWidth,
          )
        })
    })

    it('ellipsizes a truncating primary column to fit', () => {
      mountStory({
        columns: [{ ...nameColumn, truncate: true }, callsColumn],
        rows: longRows,
      })
      cy.get(`[title="${LongName}"]`).should(($text) => {
        expect($text[0].scrollWidth).to.be.greaterThan($text[0].clientWidth)
      })
      cy.get('table')
        .parent()
        .should(($wrapper) => {
          expect($wrapper[0].scrollWidth).to.equal($wrapper[0].clientWidth)
        })
    })

    it('caps a truncating non-primary column at 320px', () => {
      mountStory({
        columns: [
          nameColumn,
          { key: 'lastActive', label: 'Last active', truncate: true },
        ],
        rows: [{ ...users[0], lastActive: LongName.repeat(3) }],
      })
      cy.get(`[title="${LongName.repeat(3)}"]`)
        .invoke('outerWidth')
        .should('equal', 320)
    })
  })

  describe('icons', () => {
    it('renders the column icon before the header label', () => {
      mountStory({
        columns: [
          { key: 'name', label: 'User', icon },
          { key: 'calls', label: 'Calls' },
        ],
        rows: users,
      })
      cy.contains('th', 'User')
        .find('svg')
        .should('have.length', 1)
        .and('have.attr', 'aria-hidden', 'true')
        .next()
        .should('have.text', 'User')
      cy.contains('th', 'Calls').find('svg').should('not.exist')
    })

    it('renders `cellIcon` per row', () => {
      mountStory({
        columns: [
          {
            ...nameColumn,
            cellIcon: (user) => (user.calls === null ? undefined : icon),
          },
          callsColumn,
        ],
        rows: users,
      })
      cy.get('tbody tr').each(($row, index) => {
        cy.wrap($row)
          .find('td')
          .first()
          .find('svg')
          .should('have.length', index === 2 ? 0 : 1)
      })
    })
  })

  describe('clickable rows', () => {
    it('puts the primary cell content in a link', () => {
      mountStory({ columns, rows: users, rowLink: linkToUser })
      cy.get('a[href="#jordan"]').should('have.text', 'Jordan Lee')
      cy.get('tbody a').should('have.length', 3)
      cy.contains('td', '480').find('a').should('not.exist')
    })

    it('leaves rows without a link plain', () => {
      mountStory({ columns, rows: users, rowLink: linkToUser })
      cy.contains('tr', 'Sam Rivera')
        .should('not.have.class', 'cursor-pointer')
        .find('a')
        .should('not.exist')
      cy.contains('tr', 'Jordan Lee').should('have.class', 'cursor-pointer')
    })

    it('follows the link from anywhere on the row', () => {
      mountStory({ columns, rows: users, rowLink: linkToUser })
      spyOnLink('#jordan')
      cy.contains('td', '480').click()
      cy.get('@linkClick').should('have.been.calledOnce')
    })

    it('follows the link once when the link itself is clicked', () => {
      mountStory({ columns, rows: users, rowLink: linkToUser })
      spyOnLink('#jordan')
      cy.get('a[href="#jordan"]').click()
      cy.get('@linkClick').should('have.been.calledOnce')
    })

    it('follows the link inside a focusable container', () => {
      mountStory({
        columns,
        rows: users,
        rowLink: linkToUser,
        focusableContainer: true,
      })
      spyOnLink('#jordan')
      cy.contains('td', '480').click()
      cy.get('@linkClick').should('have.been.calledOnce')
    })

    it('ignores a click that ends a text selection inside the row', () => {
      mountStory({ columns, rows: users, rowLink: linkToUser })
      spyOnLink('#jordan')
      cy.contains('td', '480').then(($cell) => {
        $cell[0].ownerDocument.getSelection()?.selectAllChildren($cell[0])
      })
      // `trigger` skips Cypress's mousedown handling, which would reset the
      // selection before the click lands.
      cy.contains('td', '480').trigger('click', {
        eventConstructor: 'MouseEvent',
        button: 0,
      })
      cy.get('@linkClick').should('not.have.been.called')
    })

    it('follows the link while text elsewhere on the page is selected', () => {
      mountStory({ columns, rows: users, rowLink: linkToUser })
      spyOnLink('#jordan')
      cy.contains('th', 'Calls').then(($header) => {
        $header[0].ownerDocument.getSelection()?.selectAllChildren($header[0])
      })
      // `trigger` skips Cypress's mousedown handling, which would reset the
      // selection before the click lands.
      cy.contains('td', '480').trigger('click', {
        eventConstructor: 'MouseEvent',
        button: 0,
      })
      cy.get('@linkClick').should('have.been.calledOnce')
    })

    it('opens a new tab for Cmd, Ctrl, Shift, and middle clicks', () => {
      mountStory({ columns, rows: users, rowLink: linkToUser })
      spyOnLink('#jordan')
      cy.window().then((win) => {
        cy.stub(win, 'open').as('open')
      })
      cy.contains('td', '480').click({ metaKey: true })
      cy.contains('td', '480').click({ ctrlKey: true })
      cy.contains('td', '480').click({ shiftKey: true })
      cy.contains('td', '480').trigger('auxclick', {
        eventConstructor: 'MouseEvent',
        button: 1,
      })
      cy.get('@open').should('have.callCount', 4)
      cy.get('@open').should(
        'always.have.been.calledWithMatch',
        /#jordan$/,
        '_blank',
        'noopener',
      )
      cy.get('@linkClick').should('not.have.been.called')
    })

    it('puts the link in the `primary` column when it is not first', () => {
      mountStory({
        columns: [nameColumn, { ...callsColumn, primary: true }],
        rows: users,
        rowLink: linkToUser,
      })
      cy.contains('td', '480')
        .should('have.class', 'w-full')
        .find('a[href="#jordan"]')
        .should('exist')
      cy.contains('td', 'Jordan Lee')
        .should('not.have.class', 'w-full')
        .find('a')
        .should('not.exist')
    })

    it('keeps clicks on menu items off the row link', () => {
      mountStory({ columns, rows: users, rowLink: linkToUser })
      spyOnLink('#jordan')
      // Menu items use `tabindex="-1"` for roving focus.
      cy.contains('td', '480').then(($cell) => {
        $cell.append('<span role="menuitem" tabindex="-1">Remove</span>')
      })
      cy.contains('[role="menuitem"]', 'Remove').click()
      cy.get('@linkClick').should('not.have.been.called')
    })

    it('ignores a click that extends a selection into the row', () => {
      mountStory({ columns, rows: users, rowLink: linkToUser })
      spyOnLink('#jordan')
      // A Shift-click from a selection that started above the table.
      cy.contains('th', 'User').then(($header) => {
        cy.contains('td', '480').then(($cell) => {
          $header[0].ownerDocument
            .getSelection()
            ?.setBaseAndExtent($header[0], 0, $cell[0], 1)
        })
      })
      cy.contains('td', '480').trigger('click', {
        eventConstructor: 'MouseEvent',
        button: 0,
      })
      cy.get('@linkClick').should('not.have.been.called')
    })

    it('has no row hover state without `rowLink`', () => {
      mountStory({ columns, rows: users })
      cy.get('tbody a').should('not.exist')
      cy.get('tbody tr').should('not.have.class', 'cursor-pointer')
    })
  })

  describe('sticky header', () => {
    it('keeps the row hover outline inside a sticky table', () => {
      mountStory({
        columns,
        rows: users,
        rowLink: linkToUser,
        stickyHeader: true,
      })
      cy.contains('tr', 'Jordan Lee').should(
        'have.attr',
        'class',
        CssClickableRowClasses.sticky,
      )
    })

    it('pins the header cells and drops the scroll wrapper', () => {
      mountStory({ columns, rows: users, stickyHeader: true })
      cy.get('thead th').each(($th) => {
        expect($th).to.have.css('position', 'sticky')
        expect($th).to.have.css('top', '0px')
      })
      cy.get('table').parent().should('have.css', 'overflow-x', 'visible')
    })

    it("doesn't pin the header by default", () => {
      mountStory({ columns, rows: users })
      cy.get('thead th').first().should('have.css', 'position', 'static')
    })
  })
}
