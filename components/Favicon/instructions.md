# Favicon

Renders the favicon `<link>` tags into `<head>`. The asset set itself, and the reasoning behind the
markup, are documented on the [Favicons](/favicons) page. No visual output, no interactivity, no state — it
exists so consumers stop hand-writing markup that is easy to get subtly wrong.

## Import

```ts
import Favicon from '@cypress-design/vue-favicon'
import Favicon from '@cypress-design/react-favicon'
```

## Props

- `links?: FaviconLink[]` — defaults to `FAVICON_LINKS`. Pass a filtered list for a site that does
  not ship every surface, e.g. one with no web manifest.

## Pick the framework the consuming site already has

Both builds render identically. Use whichever framework the site registers with Astro — and note
that using the _wrong_ one is not merely redundant, it breaks the build:

Astro finds a component's renderer by asking each registered renderer in turn. `@astrojs/react`'s
check reads `Component["$$typeof"].toString()` for any object, and a compiled Vue SFC is a plain
object with no `$$typeof`, so it throws rather than returning false. On a site that registers React
before Vue, a server-rendered Vue component therefore crashes every page before Vue is ever asked.
Verified on an Astro site that registers both.

- Astro config registers Vue only → `vue-favicon`.
- Astro config registers React, or React before Vue → `react-favicon`.

## When not to use it at all

A component needs a framework rendering the `<head>` at the moment it is assembled. Two Cypress
surfaces have none:

- **Docusaurus** returns tag descriptors from a plugin before any component tree exists — use
  `faviconHeadTags()`.
- **EJS templates** have no component runtime; a page with zero `<script>` tags has nothing for a
  component to mount into — use `faviconLinksHtml()`.

A client-side component _can_ reach the head after hydration, but a favicon is fetched during the
initial HTML parse, so the tag would arrive after the browser has already requested `/favicon.ico`.

## Implementation note

The Vue build renders with a render function rather than a `v-for` template: the tags carry
different attributes from each other, and `v-bind` spreading an arbitrary attribute object onto a
`<link>` silently renders nothing.
