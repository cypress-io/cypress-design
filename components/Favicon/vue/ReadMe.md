# @cypress-design/vue-favicon

Renders the Cypress favicon head tags. Server-rendered — Astro inlines the output as plain `<link>`
elements with no client JavaScript.

```sh
yarn add @cypress-design/vue-favicon
```

```astro
---
import Favicon from '@cypress-design/vue-favicon'
---
<head>
  <Favicon />
</head>
```

## Props

| Prop    | Type            | Default         | Notes                                                                |
| ------- | --------------- | --------------- | -------------------------------------------------------------------- |
| `links` | `FaviconLink[]` | `FAVICON_LINKS` | Narrow the tag list, for a site that ships a subset of the surfaces. |

```astro
---
import Favicon from '@cypress-design/vue-favicon'
import { FAVICON_LINKS } from '@cypress-design/favicon'
---
<Favicon links={FAVICON_LINKS.filter((l) => l.rel !== 'manifest')} />
```

## Before you reach for this

The component only renders the `<link>` tags. The asset files still have to exist at the site root,
which is a separate build step — see [`@cypress-design/favicon`](../../../packages/favicon/ReadMe.md).

If your head layer cannot render a component — a Docusaurus plugin, an EJS template — use
`faviconHeadTags()` or `faviconLinksHtml()` from that package instead.
