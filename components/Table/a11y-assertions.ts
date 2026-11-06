/// <reference types="cypress" />

import {
  CssClickableRowClasses,
  CssSortButtonClasses,
  RowLinkCellAttributes,
  type TableColumnBase,
} from '@cypress-design/constants-table'
import {
  type MountFn,
  type User,
  columns,
  linkToUser,
  nameColumn,
  spyOnLink,
  users,
} from './assertions'

// The marker the row's focus outline selects on (`RowLinkCellAttribute` isn't
// exported).
const RowLinkCellAttribute = Object.keys(RowLinkCellAttributes)[0]

// A focusable sentinel before the table, so tests Tab into it for real
// (programmatic focus doesn't exercise tab order). Cypress clears the mount
// root between tests but not `document.body`, so any sentinel left by an
// interrupted test is removed first, and `afterEach` removes this one.
function focusSentinel(): void {
  cy.document().then((doc) => {
    doc
      .querySelectorAll('[data-cy="sentinel"]')
      .forEach((node) => node.remove())
    const button = doc.createElement('button')
    button.setAttribute('data-cy', 'sentinel')
    button.textContent = 'sentinel'
    doc.body.insertBefore(button, doc.body.firstChild)
  })
  cy.get('[data-cy="sentinel"]').focus()
}

export default function a11yAssertions(
  mountStory: MountFn,
  icon: TableColumnBase<User>['icon'],
): void {
  afterEach(() => {
    cy.document().then((doc) => {
      doc
        .querySelectorAll('[data-cy="sentinel"]')
        .forEach((node) => node.remove())
    })
  })

  describe('semantics', () => {
    it('renders a named native table with column headers', () => {
      mountStory({ columns, rows: users })
      cy.get('table')
        .should('have.attr', 'aria-label', 'Usage')
        .within(() => {
          cy.get('thead tr th[scope="col"]').should('have.length', 3)
          cy.get('tbody tr').should('have.length', 4)
          cy.get('tbody th').should('not.exist')
        })
    })

    it('names each sort button by its column label', () => {
      mountStory({ columns, rows: users })
      cy.get('thead button').each(($button, index) => {
        expect($button).to.have.attr('type', 'button')
        expect($button.text().trim()).to.equal(columns[index].label)
      })
    })

    it('marks only the sorted column with aria-sort', () => {
      mountStory({ columns, rows: users })
      cy.get('th[aria-sort]').should('not.exist')
      cy.contains('th', 'Calls').find('button').click()
      cy.get('th[aria-sort]')
        .should('have.length', 1)
        .and('contain.text', 'Calls')
        .and('have.attr', 'aria-sort', 'descending')
    })

    it('hides the sort arrow and icons from assistive tech', () => {
      mountStory({
        columns: [
          { ...nameColumn, icon, cellIcon: () => icon },
          ...columns.slice(1),
        ],
        rows: users,
        rowLink: linkToUser,
      })
      // 1 header icon, 3 sort arrows, and 4 cell icons.
      cy.get('table svg').should('have.length', 8)
      cy.get('table svg').each(($svg) => {
        expect($svg).to.have.attr('aria-hidden', 'true')
      })
    })

    it('names row links by the primary cell text', () => {
      mountStory({
        columns: [{ ...nameColumn, cellIcon: () => icon }, ...columns.slice(1)],
        rows: users,
        rowLink: linkToUser,
      })
      cy.get('tbody a').should('have.length', 3)
      users
        .filter((user) => linkToUser(user))
        .forEach((user) => {
          cy.get(`a[href="#${user.id}"]`).should('have.text', user.name)
        })
      // The row's focus outline selects on this marker.
      cy.get('a[href="#jordan"]')
        .closest('td')
        .should('have.attr', RowLinkCellAttribute)
    })
  })

  describe('keyboard', () => {
    it('tabs through sort buttons, then one stop per clickable row', () => {
      mountStory({ columns, rows: users, rowLink: linkToUser })
      focusSentinel()
      ;['User', 'Calls', 'Last active'].forEach((label) => {
        cy.realPress('Tab')
        cy.focused().should('match', 'button').and('have.text', label)
      })
      ;['#jordan', '#maya', '#alex'].forEach((href) => {
        cy.realPress('Tab')
        cy.focused().should('have.attr', 'href', href)
      })
    })

    it('sorts with Enter and Space on a sort button', () => {
      mountStory({ columns, rows: users })
      focusSentinel()
      cy.realPress('Tab')
      cy.realPress('Enter')
      cy.contains('th', 'User').should('have.attr', 'aria-sort', 'ascending')
      cy.realPress('Space')
      cy.contains('th', 'User').should('have.attr', 'aria-sort', 'descending')
    })

    it('follows the row link with Enter', () => {
      mountStory({ columns, rows: users.slice(0, 2), rowLink: linkToUser })
      spyOnLink('#jordan')
      focusSentinel()
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'href', '#jordan')
      cy.realPress('Enter')
      cy.get('@linkClick').should('have.been.calledOnce')
    })

    // These check that focus lands where expected and the `focus-visible`
    // classes are wired up, not that an outline paints: Chrome's
    // `:focus-visible` heuristic is unreliable inside Cypress's test iframe.
    it('wires the focus outline classes on the focused sort button', () => {
      mountStory({ columns, rows: users })
      focusSentinel()
      cy.realPress('Tab')
      cy.focused()
        .should('have.prop', 'tagName', 'BUTTON')
        .and('contain.text', 'User')
        .and('have.attr', 'class', CssSortButtonClasses)
    })

    it('wires the focus outline classes on the row of the focused link', () => {
      mountStory({ columns, rows: users.slice(0, 2), rowLink: linkToUser })
      focusSentinel()
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused()
        .should('have.attr', 'href', '#jordan')
        .closest('tr')
        .should('have.attr', 'class', CssClickableRowClasses.default)
    })
  })
}
