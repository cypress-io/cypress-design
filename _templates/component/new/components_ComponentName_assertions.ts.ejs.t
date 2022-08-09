---
to: components/<%= h.inflection.camelize(name, false) %>/assertions.ts
---
/// <reference types="cypress" />

export default function assertions(mountStory: (options?: any) => void): void {
  it('renders', () => {
    mountStory()
  })
}
