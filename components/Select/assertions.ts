/// <reference types="cypress" />

import type {
  SelectItem,
  SelectThemingProps,
  SelectHeaderProps,
  SelectSearchProps,
  SelectFooterProps,
  SelectSizingProps,
} from '@cypress-design/constants-select'

// Default popover min-width used by both harnesses' mountStory so the panel
// has a consistent shape across the shared assertions. Per-test override via
// SelectMountOptions.minWidth (from SelectSizingProps).
export const DEFAULT_TEST_MIN_WIDTH = 240

// Composed from the same shared groups as SelectProps so adding a header /
// search / footer / sizing field doesn't require a parallel update here.
export type SelectMountOptions = SelectThemingProps &
  SelectHeaderProps &
  SelectSearchProps &
  SelectFooterProps &
  SelectSizingProps & {
    items: SelectItem[]
    value?: string
    defaultValue?: string
    placeholder?: string
    disabled?: boolean
    defaultOpen?: boolean
    id?: string
    onChange?: (value: string | undefined, item: SelectItem) => void
    onOpenChange?: (open: boolean) => void
    onHeaderTabChange?: (id: string) => void
  }

const simpleItems: SelectItem[] = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' },
]

const mixedItems: SelectItem[] = [
  { type: 'headline', label: 'Group A' },
  { label: 'Alpha', value: 'alpha' },
  { label: 'Disabled', value: 'disabled', disabled: true },
  { type: 'divider' },
  { type: 'headline', label: 'Group B' },
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma', tag: 'New' },
]

const checkboxItems: SelectItem[] = [
  { type: 'checkbox', label: 'Option A', value: 'a' },
  { type: 'checkbox', label: 'Option B', value: 'b', subText: 'Hint' },
]

export interface AssertionsContext {
  // Framework-specific arrow-left icon component (Vue or React). Passed in
  // by each harness so the shared assertions can use a real icon in the
  // header back-button test without depending on a framework directly.
  iconArrowLeft: unknown
}

export default function assertions(
  mountStory: (options: SelectMountOptions) => void,
  context: AssertionsContext,
): void {
  describe('Select', () => {
    beforeEach(() => {
      cy.viewport(800, 600)
    })

    // ---------------- trigger / open-close ----------------

    it('renders trigger with placeholder when no value', () => {
      mountStory({ items: simpleItems, placeholder: 'Pick one' })
      cy.findByRole('combobox').should('contain.text', 'Pick one')
      cy.findByRole('listbox').should('not.exist')
    })

    it('reflects the selected value in the trigger label', () => {
      mountStory({ items: simpleItems, defaultValue: 'beta' })
      cy.findByRole('combobox').should('contain.text', 'Beta')
    })

    it('opens on trigger click', () => {
      mountStory({ items: simpleItems })
      cy.findByRole('combobox').click()
      cy.findByRole('listbox').should('be.visible')
    })

    it('opens on ArrowDown from trigger', () => {
      mountStory({ items: simpleItems })
      cy.findByRole('combobox').focus().type('{downArrow}')
      cy.findByRole('listbox').should('be.visible')
    })

    it('opens on Enter from trigger', () => {
      mountStory({ items: simpleItems })
      cy.findByRole('combobox').focus().type('{enter}')
      cy.findByRole('listbox').should('be.visible')
    })

    it('opens on Space from trigger', () => {
      mountStory({ items: simpleItems })
      // cy.type(' ') on a focused button races with the browser's native
      // click-on-space behavior; trigger the keydown directly to exercise
      // the component's handler in isolation.
      cy.findByRole('combobox').focus().trigger('keydown', { key: ' ' })
      cy.findByRole('listbox').should('be.visible')
    })

    it('closes on Escape and returns focus to the trigger', () => {
      mountStory({ items: simpleItems })
      cy.findByRole('combobox').click()
      cy.findByRole('listbox').should('be.visible')
      cy.findByRole('combobox').type('{esc}')
      cy.findByRole('listbox').should('not.exist')
      cy.findByRole('combobox').should('be.focused')
    })

    it('closes on outside click', () => {
      mountStory({ items: simpleItems })
      cy.findByRole('combobox').click()
      cy.findByRole('listbox').should('be.visible')
      // force: true — the body's child layout covers the body itself, so
      // Cypress's actionability check rejects an un-forced click. We're
      // exercising the mousedown listener, not the body element itself.
      cy.get('body').click(700, 500, { force: true })
      cy.findByRole('listbox').should('not.exist')
    })

    it('disabled trigger does not open', () => {
      mountStory({ items: simpleItems, disabled: true })
      // Cypress refuses to click a disabled element; the disabled attribute
      // is what we're actually verifying. The listbox check confirms no
      // popover opened from any default-open or initial-state path.
      cy.findByRole('combobox').should('be.disabled')
      cy.findByRole('listbox').should('not.exist')
    })

    // ---------------- selection ----------------

    it('selecting a default row updates aria-selected, emits change, and closes', () => {
      const onChange = cy.stub().as('onChange')
      mountStory({ items: simpleItems, onChange })
      cy.findByRole('combobox').click()
      cy.findByRole('option', { name: 'Beta' }).click()
      cy.findByRole('listbox').should('not.exist')
      cy.get('@onChange').should('have.been.calledOnce')
      cy.get('@onChange').its('firstCall.args.0').should('equal', 'beta')
      cy.findByRole('combobox').should('contain.text', 'Beta')
    })

    it('does not select disabled rows', () => {
      const onChange = cy.stub().as('onChange')
      mountStory({ items: mixedItems, onChange })
      cy.findByRole('combobox').click()
      // The row uses `aria-disabled="true"` (not native `disabled`), so
      // Cypress's actionability check still fires the click. The component's
      // own `onClick` early-returns on `isDisabled`, which is what the
      // `onChange-not-called` assertion exercises.
      cy.findByRole('option', { name: 'Disabled' })
        .should('have.attr', 'aria-disabled', 'true')
        .click()
      cy.get('@onChange').should('not.have.been.called')
      cy.findByRole('listbox').should('be.visible')
    })

    // ---------------- keyboard navigation ----------------

    it('ArrowDown / ArrowUp wrap around selectable rows; Enter selects focused row', () => {
      const onChange = cy.stub().as('onChange')
      mountStory({ items: simpleItems, onChange })
      // First ArrowDown opens the popover with no row focused; the second one
      // lands focus on the first option. See onKeyDown in Select.{tsx,vue}.
      cy.findByRole('combobox').focus().type('{downArrow}{downArrow}')
      cy.findByRole('option', { name: 'Alpha' }).should(
        'have.attr',
        'data-focused',
        'true',
      )
      cy.findByRole('combobox').type('{downArrow}{downArrow}') // focus Gamma
      cy.findByRole('option', { name: 'Gamma' }).should(
        'have.attr',
        'data-focused',
        'true',
      )
      cy.findByRole('combobox').type('{downArrow}') // wrap → Alpha
      cy.findByRole('option', { name: 'Alpha' }).should(
        'have.attr',
        'data-focused',
        'true',
      )
      cy.findByRole('combobox').type('{upArrow}') // wrap up → Gamma
      cy.findByRole('option', { name: 'Gamma' }).should(
        'have.attr',
        'data-focused',
        'true',
      )
      cy.findByRole('combobox').type('{enter}')
      cy.get('@onChange').should('have.been.calledOnce')
      cy.get('@onChange').its('firstCall.args.0').should('equal', 'gamma')
    })

    // ---------------- item types ----------------

    it('renders headline and divider as presentation roles', () => {
      mountStory({ items: mixedItems })
      cy.findByRole('combobox').click()
      cy.findAllByText('Group A')
        .first()
        .should('have.attr', 'role', 'presentation')
      // divider is aria-hidden via wrapper
      cy.get('[role="listbox"] [aria-hidden="true"]').should('exist')
    })

    it('button-row fires its onClick', () => {
      const onClick = cy.stub().as('rowAction')
      const items: SelectItem[] = [
        { label: 'Alpha', value: 'alpha' },
        { type: 'button', key: 'add', label: 'Add new', onClick },
      ]
      // Placeholder gives the trigger an accessible name so the two buttons
      // (trigger + in-list action) are distinguishable in subsequent queries.
      mountStory({ items, placeholder: 'Open' })
      cy.findByRole('combobox', { name: 'Open' }).click()
      // The button-row's inner <Button> carries role="option" so the
      // listbox exposes only valid children (aria-required-children).
      cy.findByRole('listbox').findByRole('option', { name: 'Add new' }).click()
      cy.get('@rowAction').should('have.been.calledOnce')
    })

    it('button-row is reachable by keyboard (ArrowDown lands focus, Enter fires onClick)', () => {
      const onClick = cy.stub().as('rowAction')
      const items: SelectItem[] = [
        { label: 'Alpha', value: 'alpha' },
        { type: 'button', key: 'add', label: 'Add new', onClick },
      ]
      mountStory({ items, placeholder: 'Open' })
      // 1st ArrowDown opens with no focus; 2nd lands on Alpha; 3rd wraps to
      // the button row (no divider between, so 2 interactive rows total).
      cy.findByRole('combobox', { name: 'Open' })
        .focus()
        .type('{downArrow}{downArrow}{downArrow}')
      // Focus is split across two elements: the inner Button carries
      // `role="option"` (for aria-required-children + activedescendant
      // targeting), and the wrapper carries `data-focused` (which
      // `CssButtonRowFocusClasses` uses via `data-[focused=true]:*`
      // selectors to render the focus ring). Assert on the wrapper
      // reachable from the option via `.closest`.
      cy.findByRole('listbox')
        .findByRole('option', { name: 'Add new' })
        .closest('[role="presentation"]')
        .should('have.attr', 'data-focused', 'true')
      // Enter on the focused button row should fire its onClick. Popover
      // stays open so the consumer can decide whether to close it.
      cy.findByRole('combobox', { name: 'Open' }).type('{enter}')
      cy.get('@rowAction').should('have.been.calledOnce')
      cy.findByRole('listbox').should('be.visible')
    })

    it('checkbox row toggles on/off; popover stays open; emits undefined on untoggle', () => {
      const onChange = cy.stub().as('onChange')
      mountStory({ items: checkboxItems, onChange })
      cy.findByRole('combobox').click()
      cy.findByRole('option', { name: /Option A/ }).click()
      cy.get('@onChange').should('have.been.calledOnce')
      cy.get('@onChange').its('firstCall.args.0').should('equal', 'a')
      cy.findByRole('listbox').should('be.visible')
      // Re-query the element instead of chaining — clicking after a state
      // change can hit a detached node from a prior render.
      cy.findByRole('option', { name: /Option A/ }).should(
        'have.attr',
        'aria-selected',
        'true',
      )
      cy.findByRole('option', { name: /Option A/ }).click()
      cy.get('@onChange').should('have.been.calledTwice')
      cy.get('@onChange').its('secondCall.args.0').should('be.undefined')
      cy.findByRole('listbox').should('be.visible')
    })

    // ---------------- search / filtering ----------------
    // Each search test passes an explicit `searchPlaceholder` rather than
    // relying on `SelectConstants.DefaultSearchPlaceholder`, so changing the
    // default constant doesn't silently break six test invocations.

    it('search filters by label (case-insensitive)', () => {
      mountStory({
        items: simpleItems,
        searchable: true,
        searchPlaceholder: 'Find item',
      })
      cy.findByRole('combobox').click()
      cy.findByPlaceholderText('Find item').type('be')
      cy.findByRole('option', { name: 'Beta' }).should('exist')
      cy.findByRole('option', { name: 'Alpha' }).should('not.exist')
      cy.findByRole('option', { name: 'Gamma' }).should('not.exist')
    })

    it('keyboard nav still walks rows while the search input is focused', () => {
      const onChange = cy.stub().as('onChange')
      mountStory({
        items: simpleItems,
        searchable: true,
        searchPlaceholder: 'Find item',
        onChange,
      })
      cy.findByRole('combobox').click()
      // Focus the search input and type; the wrapper's keydown listener
      // catches bubbled arrow keys, so focus walks rows even with the
      // input active.
      cy.findByPlaceholderText('Find item').focus().type('a')
      // 'a' matches Alpha and Gamma. ArrowDown lands on Alpha.
      cy.findByPlaceholderText('Find item').type('{downArrow}')
      cy.findByRole('option', { name: 'Alpha' }).should(
        'have.attr',
        'data-focused',
        'true',
      )
      // Enter on the focused row selects it and closes the popover.
      cy.findByPlaceholderText('Find item').type('{enter}')
      cy.get('@onChange').should('have.been.calledOnce')
      cy.get('@onChange').its('firstCall.args.0').should('equal', 'alpha')
      cy.findByRole('listbox').should('not.exist')
    })

    it('orphan headlines collapse after filtering', () => {
      mountStory({
        items: mixedItems,
        searchable: true,
        searchPlaceholder: 'Find item',
      })
      cy.findByRole('combobox').click()
      cy.findByPlaceholderText('Find item').type('alpha')
      cy.findByRole('listbox').contains('Group A').should('exist')
      cy.findByRole('listbox').contains('Group B').should('not.exist')
    })

    it('searchFilters=false keeps every row visible while the Textbox renders', () => {
      mountStory({
        items: simpleItems,
        searchable: true,
        searchFilters: false,
        searchPlaceholder: 'Find item',
      })
      cy.findByRole('combobox').click()
      // Use a query that WOULD filter to one row if `searchFilters` were
      // true (it matches only 'Beta'). The assertion passes only when the
      // filter is genuinely disabled, not because the query happens to be
      // unmatchable.
      cy.findByPlaceholderText('Find item').type('be')
      cy.findByRole('option', { name: 'Alpha' }).should('exist')
      cy.findByRole('option', { name: 'Beta' }).should('exist')
      cy.findByRole('option', { name: 'Gamma' }).should('exist')
    })

    // ---------------- accessibility ----------------

    it('popover has aria-label = headerTitle when set, "Options" otherwise', () => {
      // No headerTitle → fallback label.
      mountStory({ items: simpleItems, defaultOpen: true })
      cy.findByRole('listbox').should('have.attr', 'aria-label', 'Options')
    })

    it('popover aria-label uses headerTitle when provided', () => {
      mountStory({
        items: simpleItems,
        headerTitle: 'Pick a team',
        defaultOpen: true,
      })
      cy.findByRole('listbox').should('have.attr', 'aria-label', 'Pick a team')
    })

    // ---------------- header ----------------

    it('renders the header title, back button, and tag when passed', () => {
      const onBack = cy.stub().as('onBack')
      mountStory({
        items: simpleItems,
        headerTitle: 'Pick a thing',
        headerTag: 'New',
        headerButton: {
          iconLeft: context.iconArrowLeft,
          onClick: onBack,
          ariaLabel: 'Go back',
        },
        defaultOpen: true,
      })
      // Header sits OUTSIDE the listbox (the listbox wraps only options);
      // query unscoped so the title/tag are findable.
      cy.contains('Pick a thing').should('exist')
      cy.contains('New').should('exist')
      cy.findByRole('button', { name: 'Go back' }).click()
      cy.get('@onBack').should('have.been.calledOnce')
    })

    it('header tabs emit header-tab-change on switch', () => {
      const onHeaderTabChange = cy.stub().as('onTab')
      mountStory({
        items: simpleItems,
        headerTabs: [
          { id: 'all', label: 'All' },
          { id: 'mine', label: 'Mine' },
        ],
        headerActiveTab: 'all',
        onHeaderTabChange,
        defaultOpen: true,
      })
      // Header tabs sit OUTSIDE the listbox — query unscoped.
      cy.contains('Mine').click()
      cy.get('@onTab').should('have.been.calledOnce')
      cy.get('@onTab').its('firstCall.args.0').should('equal', 'mine')
    })

    // ---------------- footer ----------------

    it('footer label and footerAction render', () => {
      const onAction = cy.stub().as('onFooter')
      mountStory({
        items: simpleItems,
        footerLabel: 'Helper text',
        footerAction: { label: 'Apply', onClick: onAction },
        defaultOpen: true,
      })
      // Footer sits OUTSIDE the listbox — query unscoped.
      cy.contains('Helper text').should('exist')
      cy.findByRole('button', { name: 'Apply' }).click()
      cy.get('@onFooter').should('have.been.calledOnce')
    })
  })
}
