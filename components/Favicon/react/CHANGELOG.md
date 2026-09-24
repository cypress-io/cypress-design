# @cypress-design/react-favicon

## 1.0.0

### Major Changes

- [#723](https://github.com/cypress-io/cypress-design/pull/723) [`b840a79`](https://github.com/cypress-io/cypress-design/commit/b840a79f31f4cf13376443bc4cc3eb55e4017086) Thanks [@emilmilanov](https://github.com/emilmilanov)! - Add `@cypress-design/vue-favicon` and `@cypress-design/react-favicon`: components that render the
  favicon head tags from `FAVICON_LINKS`.

  Server-rendered, so Astro inlines plain `<link>` elements with no client JavaScript. Both take an
  optional `links` prop for sites that ship a subset of the surfaces.

  Use the build matching the framework the consuming site registers with Astro. This is not
  cosmetic: Astro finds a renderer by asking each registered one in turn, and `@astrojs/react`'s check
  throws on a compiled Vue SFC rather than returning false — so a Vue component on a React-first site
  crashes every page. cypress.io registers Vue only; the design system docs register React first.

  Head layers that cannot render a component — Docusaurus plugins, EJS templates — use
  `faviconHeadTags()` or `faviconLinksHtml()` from `@cypress-design/favicon`.

  Each component package is the only install a site needs: it depends on `@cypress-design/favicon`,
  re-exports `FAVICON_LINKS`, and ships its own `cypress-favicon` command — package managers only link
  commands from direct dependencies, so the base package's command would otherwise be missing.

### Patch Changes

- Updated dependencies [[`b840a79`](https://github.com/cypress-io/cypress-design/commit/b840a79f31f4cf13376443bc4cc3eb55e4017086)]:
  - @cypress-design/favicon@1.0.0
