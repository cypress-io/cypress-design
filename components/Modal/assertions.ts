import type { ModalSize } from '@cypress-design/constants-modal'

export interface ModalStoryOptions {
  title?: string
  helpLink?: string
  helpLinkLabel?: string
  fullscreen?: boolean
  size?: ModalSize
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  titleBoxClassName?: string
  contentClassName?: string
  footerClassName?: string
  /** Text rendered in the footer (React `footer` prop, Vue `footer` slot). */
  footer?: string
}

const sizeWidths: Record<ModalSize, number> = {
  sm: 480,
  md: 592,
  lg: 720,
  xl: 840,
}

function openModal() {
  cy.findByRole('button', { name: 'Open Modal' }).click()
  cy.findByRole('dialog').should('be.visible')
}

export default function assertions(
  mountStory: (options?: ModalStoryOptions) => void,
): void {
  beforeEach(() => {
    cy.viewport(800, 400)
  })

  it('renders', () => {
    mountStory({ title: 'Modal' })
    cy.contains('Open Modal').click()
    cy.findByRole('dialog').should('be.visible')
  })

  it('renders with helpLink', () => {
    mountStory({ title: 'Modal', helpLink: 'https://www.google.com' })
    cy.contains('Open Modal').click()
    cy.findByRole('dialog').should('be.visible')
    cy.findByRole('link', { name: 'Need help' })
      .should('have.attr', 'href', 'https://www.google.com')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
  })

  it('renders a custom helpLinkLabel', () => {
    mountStory({
      title: 'Modal',
      helpLink: 'https://www.google.com',
      helpLinkLabel: 'Read the docs',
    })
    cy.contains('Open Modal').click()
    cy.findByRole('link', { name: 'Read the docs' }).should(
      'have.attr',
      'href',
      'https://www.google.com',
    )
  })

  it('closes on Escape and frees body scroll', () => {
    mountStory({ title: 'Modal' })
    cy.findByRole('button', { name: 'Open Modal' }).click()
    cy.findByRole('dialog').should('be.visible')
    cy.get('body').should('have.class', 'cy-modal-overflow-hidden')
    cy.realPress('Escape')
    cy.findByRole('dialog').should('not.exist')
    cy.get('body').should('not.have.class', 'cy-modal-overflow-hidden')
  })

  it('restores scroll after closing', () => {
    mountStory({
      title: 'Modal',
    })
    cy.findByRole('button', { name: 'Open Modal' }).click()
    cy.findByRole('dialog').should('be.visible')
    cy.findByRole('button', { name: 'Close' }).click()
    cy.findByRole('dialog').should('not.exist')
    cy.window().its('scrollY').should('be.above', 0)
  })

  it('should show a fullscreen modal', () => {
    mountStory({
      title: 'Modal',
      fullscreen: true,
    })
    cy.findByRole('button', { name: 'Open Modal' }).click()
    cy.findByRole('dialog').should('be.visible')
  })

  // Apps that disable Tailwind's preflight keep the browser's dialog padding
  // and border and its button background, so the modal sets them itself.
  it('resets the browser defaults it relies on', () => {
    mountStory({ title: 'Modal' })
    openModal()
    cy.findByRole('dialog')
      .should('have.css', 'padding-top', '0px')
      .and('have.css', 'border-top-width', '0px')
      .children()
      .first()
      .should('have.css', 'border-bottom-style', 'solid')
      .and('have.css', 'border-bottom-width', '1px')
    cy.findByRole('button', { name: 'Close' })
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
      .and('have.css', 'border-top-width', '0px')
  })

  describe('size', () => {
    ;(Object.keys(sizeWidths) as ModalSize[]).forEach((size) => {
      it(`renders the ${size} width`, () => {
        cy.viewport(1200, 600)
        mountStory({ title: 'Modal', size })
        openModal()
        cy.findByRole('dialog').should(
          'have.css',
          'width',
          `${sizeWidths[size]}px`,
        )
      })
    })

    it('never grows past the viewport', () => {
      cy.viewport(600, 400)
      mountStory({ title: 'Modal', size: 'xl' })
      openModal()
      cy.findByRole('dialog').should('have.css', 'width', `${600 - 32}px`)
    })

    it('ignores size when fullscreen', () => {
      cy.viewport(1200, 600)
      mountStory({ title: 'Modal', size: 'sm', fullscreen: true })
      openModal()
      cy.findByRole('dialog')
        .invoke('outerWidth')
        .should('be.greaterThan', sizeWidths.xl)
    })
  })

  describe('class props', () => {
    it('lets titleBoxClassName and contentClassName override the defaults', () => {
      mountStory({
        title: 'Modal',
        titleBoxClassName: 'py-[8px]',
        contentClassName: 'py-0',
      })
      openModal()
      cy.findByRole('dialog').children().as('regions')
      cy.get('@regions').eq(0).should('have.css', 'padding-top', '8px')
      cy.get('@regions').eq(1).should('have.css', 'padding-top', '0px')
    })
  })

  describe('footer', () => {
    it('renders the footer below the content with a divider', () => {
      mountStory({ title: 'Modal', footer: 'Footer actions' })
      openModal()
      cy.findByRole('dialog')
        .children()
        .last()
        .should('contain', 'Footer actions')
        .and('have.css', 'border-top-style', 'solid')
        .and('have.css', 'border-top-width', '1px')
    })

    it('lets footerClassName override the defaults', () => {
      mountStory({
        title: 'Modal',
        footer: 'Footer actions',
        footerClassName: 'py-[8px]',
      })
      openModal()
      cy.findByRole('dialog')
        .children()
        .last()
        .should('have.css', 'padding-top', '8px')
    })

    it('renders no footer region without footer content', () => {
      mountStory({ title: 'Modal' })
      openModal()
      cy.findByRole('dialog').children().should('have.length', 2)
    })
  })

  describe('dismissal', () => {
    it('closes on a backdrop click by default', () => {
      mountStory({ title: 'Modal' })
      openModal()
      cy.get('body').realClick({ x: 4, y: 4 })
      cy.findByRole('dialog').should('not.exist')
    })

    it('stays open on a backdrop click when closeOnBackdropClick is false', () => {
      mountStory({ title: 'Modal', closeOnBackdropClick: false })
      openModal()
      cy.get('body').realClick({ x: 4, y: 4 })
      cy.findByRole('dialog').should('be.visible')
    })

    it('stays open and scroll-locked on Escape when closeOnEscape is false', () => {
      mountStory({ title: 'Modal', closeOnEscape: false })
      openModal()
      cy.realPress('Escape')
      // The browser won't let a second Escape be cancelled.
      cy.realPress('Escape')
      cy.findByRole('dialog').should('be.visible')
      cy.get('dialog').should('have.prop', 'open', true)
      cy.get('body').should('have.class', 'cy-modal-overflow-hidden')
    })

    it('still closes from the close button when the other paths are off', () => {
      mountStory({
        title: 'Modal',
        closeOnBackdropClick: false,
        closeOnEscape: false,
      })
      openModal()
      cy.findByRole('button', { name: 'Close' }).click()
      cy.findByRole('dialog').should('not.exist')
    })
  })

  describe('close button focus', () => {
    it('shows a focus ring when reached from the keyboard', () => {
      mountStory({ title: 'Modal' })
      cy.findByRole('button', { name: 'Open Modal' }).focus()
      cy.realPress('Enter')
      cy.findByRole('button', { name: 'Close' })
        .should('have.focus')
        .and('not.have.css', 'box-shadow', 'none')
    })

    it('closes with Enter even when Escape and backdrop clicks are off', () => {
      mountStory({
        title: 'Modal',
        closeOnBackdropClick: false,
        closeOnEscape: false,
      })
      cy.findByRole('button', { name: 'Open Modal' }).focus()
      cy.realPress('Enter')
      cy.findByRole('button', { name: 'Close' }).should('have.focus')
      cy.realPress('Enter')
      cy.findByRole('dialog').should('not.exist')
    })
  })
}
