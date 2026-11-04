/// <reference types="cypress" />
import type { Component } from 'vue'
import { mount } from 'cypress/vue'
import { IconDocumentBlank } from '@cypress-design/vue-icon'
import type { TableColumnBase } from '@cypress-design/constants-table'
import Table from './Table.vue'
import type { MountOptions, User } from '../assertions'
import a11yAssertions from '../a11y-assertions'

function mountStory({
  focusableContainer,
  className,
  onSortChange,
  columns,
  ...props
}: MountOptions) {
  mount(() => (
    <div class="w-96 p-8" tabindex={focusableContainer ? 0 : undefined}>
      <Table
        aria-label="Usage"
        class={className}
        columns={columns as TableColumnBase<User, Component>[]}
        {...props}
        onUpdate:sort={onSortChange}
      />
    </div>
  ))
}

describe('<Table /> Vue — Accessibility', () => {
  a11yAssertions(mountStory, IconDocumentBlank, 'vue')
})
