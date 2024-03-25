/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/vue'
import { logoLockUp, logoMark } from '@cypress-design/icon-registry'
import assertions from '../assertions'
import { CypressLockUp, CypressMark } from './Logo'

describe('Logo', () => {
  function mountStory() {
    mount(() => (
      <>
        <div class="flex gap-4">
          {Object.keys(logoLockUp).map((v) => (
            <CypressLockUp variant={v as keyof typeof logoLockUp} key={v} />
          ))}
        </div>
        <div class="flex mt-4 gap-4">
          {Object.keys(logoMark).map((v) => (
            <CypressMark variant={v as keyof typeof logoMark} key={v} />
          ))}
        </div>
      </>
    ))
  }
  assertions(mountStory)
})
