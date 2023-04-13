/// <reference types="cypress" />

import { Tab } from './constants'

const tabs = [
  { id: 'ov', label: 'Overview', active: true },
  { id: 'cl', label: 'Command Log' },
  { id: 'err', label: 'Errors' },
  { id: 'reco', label: 'Recommendations' },
]

export default function assertions(
  mountStory: (options?: { tabs: Tab[] }) => void
): void {
  it('renders', () => {
    mountStory({ tabs })
  })
}
