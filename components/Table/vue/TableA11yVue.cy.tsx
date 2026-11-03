/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import { IconDocumentBlank } from '@cypress-design/vue-icon'
import Table from './Table.vue'
import type { MountOptions } from '../assertions'
import a11yAssertions from '../a11y-assertions'

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

describe('<Table /> Vue — Accessibility', () => {
  a11yAssertions(mountStory, IconDocumentBlank)
})
