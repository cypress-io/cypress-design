/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import Accordion from './Accordion/AllStates.vue'
import Alert from './Alert/AllStates.vue'
import Button from './Button/AllStates.vue'
import DocMenu from './DocMenu/AllStates.vue'
import Icon from './Icon/AllStates.vue'
import Menu from './Menu/AllStates.vue'
import RunResults from './RunResults/AllStates.vue'
import Select from './Select/AllStates.vue'
import Spinner from './Spinner/AllStates.vue'
import StatusIcon from './StatusIcon/AllStates.vue'
import Tabs from './Tabs/AllStates.vue'
import Tag from './Tag/AllStates.vue'
import TestResult from './TestResult/AllStates.vue'
import Textbox from './Textbox/AllStates.vue'

// One snapshot per component of the gallery shown at the top of its docs
// page, so every resting variant is reviewed together and the docs galleries
// themselves are covered. Interactive states (open popovers, tooltips,
// modals) stay as targeted snapshots in each component's own spec. Modal and
// Tooltip galleries only show a closed trigger, and the Checkbox and Logo
// galleries are Astro, so none of those are mounted here.
const galleries = {
  Accordion,
  Alert,
  Button,
  DocMenu,
  Icon,
  Menu,
  RunResults,
  Select,
  Spinner,
  StatusIcon,
  Tabs,
  Tag,
  TestResult,
  Textbox,
}

// The TestResult gallery scrolls inside a 400px box on the docs page; let it
// grow so the snapshot shows every row, not just the first few.
const percyCSS: Record<string, string> = {
  TestResult: '.max-h-\\[400px\\] { max-height: none !important; }',
}

describe('All states galleries (Vue)', { viewportWidth: 1280 }, () => {
  Object.entries(galleries).forEach(([name, gallery]) => {
    it(name, () => {
      mount(gallery)
      cy.get('[data-cy-root]').children().should('have.length.above', 0)
      cy.percySnapshot(`${name} all states - vue`, {
        percyCSS: percyCSS[name],
      })
    })
  })
})
