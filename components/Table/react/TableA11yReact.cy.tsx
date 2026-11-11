/// <reference types="cypress" />
import * as React from 'react'
import { mount } from 'cypress/react'
import { IconDocumentBlank } from '@cypress-design/react-icon'
import { Table, type TableColumn } from './Table'
import type { MountOptions, User } from '../assertions'
import a11yAssertions from '../a11y-assertions'

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

describe('<Table /> React — Accessibility', () => {
  a11yAssertions(mountStory, IconDocumentBlank)
})
