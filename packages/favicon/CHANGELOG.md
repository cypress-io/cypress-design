# @cypress-design/favicon

## 1.0.0

### Major Changes

- [#723](https://github.com/cypress-io/cypress-design/pull/723) [`b840a79`](https://github.com/cypress-io/cypress-design/commit/b840a79f31f4cf13376443bc4cc3eb55e4017086) Thanks [@emilmilanov](https://github.com/emilmilanov)! - Add `@cypress-design/favicon`: the Cypress favicon assets plus the head markup that declares them.

  A favicon is fetched by the browser as a plain URL before any JavaScript runs, so this package emits
  real files rather than a module — `cypress-favicon <dir>` copies them into whatever directory a site
  serves statically. It also exports `FAVICON_LINKS`, which deliberately omits a `rel="icon"` entry
  for `favicon.ico`: measured against Chrome 153 and Safari 26.5, a declared ICO beats the SVG in both
  engines regardless of `sizes` or document order, so the common `sizes="any"` recipe silently
  disables the adaptive icon.

  Ships no `rel="mask-icon"` and no `safari-pinned-tab.svg`: Safari stopped requiring a monochrome
  pinned-tab SVG in Safari 12, and it is verified inert in Safari 26.5 — a pinned tab renders the
  full-colour favicon with or without the tag.
