# Favicon — Props, Setup & Reference

Renders the Cypress favicon `<link>` tags into `<head>`. No visual output, no interactivity, no
state — it exists so sites stop hand-writing markup that is easy to get subtly wrong. The demo above
shows the icon set it declares.

## Which package do I install?

Exactly one. Pick by what renders your site's `<head>`:

| Your `<head>` is rendered by                     | Install                         |
| ------------------------------------------------ | ------------------------------- |
| Astro, with Vue registered                       | `@cypress-design/vue-favicon`   |
| Astro, with React registered                     | `@cypress-design/react-favicon` |
| Docusaurus, EJS, or anything without a component | `@cypress-design/favicon`       |

The component packages bring everything with them — the icon files, the link data and the
`cypress-favicon` copy command. `@cypress-design/favicon` is the shared base they are built on, and
you only install it directly when you cannot use a component (see _Without the component_ below).

## Props

- `links?: FaviconLink[]` — defaults to `FAVICON_LINKS`. Pass a filtered list for a site that does
  not ship every surface, e.g. one with no web manifest. `FAVICON_LINKS` is re-exported from both
  component packages.

## Picking a build

Both builds render identically, but using the wrong one is not merely redundant — it breaks the
site. Astro finds a component's renderer by asking each registered renderer in turn, and
`@astrojs/react`'s check reads `Component["$$typeof"].toString()` for any object. A compiled Vue
component is a plain object with no `$$typeof`, so the check throws instead of returning false — and
on a site that registers React before Vue, a server-rendered Vue component crashes every page.

- Astro config registers Vue only → `vue-favicon`.
- Astro config registers React, or React before Vue → `react-favicon`.

## Without the component

Some head layers cannot render a component at all. For those, install `@cypress-design/favicon` and
call a function instead — the output is the same tags, built from the same `FAVICON_LINKS` array.

```bash
yarn add @cypress-design/favicon
```

Copy the icon files as a prebuild step, pointing at your static directory:

```json
{
  "scripts": {
    "prebuild": "cypress-favicon static"
  }
}
```

### Docusaurus

A Docusaurus plugin returns tag descriptors before any component tree exists, so there is nothing to
render into. Use `faviconHeadTags()`:

```js
const { faviconHeadTags } = require('@cypress-design/favicon')

injectHtmlTags: () => ({ headTags: faviconHeadTags() })
```

### EJS and other server-rendered HTML

An EJS template has no component runtime, and a page that ships no `<script>` tags has nothing for a
component to mount into. Use `faviconLinksHtml()`, which returns the tags as a string:

```ejs
<head>
  <%- faviconLinksHtml() %>
</head>
```

A client-side component _can_ reach the head after hydration, but a favicon is fetched during the
initial HTML parse — injecting the tag later means the browser has already requested `/favicon.ico`
and moved on.

## Two tags deliberately omitted

Both are widely recommended, and both were tested against a real browser rather than a support
table. Measurements are from Chrome 153 and Safari 26.5, September 2026.

### No `rel="icon"` for `favicon.ico`

The common recipe declares the ICO with `sizes="any"` so browsers prefer the SVG:

```html
<!-- do not do this -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon.ico" sizes="any" />
```

It does the opposite. Serving five markup variants and recording which file each engine fetched:

| Markup                          | Chrome 153      | Safari 26.5 | Fetched      |
| ------------------------------- | --------------- | ----------- | ------------ |
| SVG first, `sizes="any"` on ICO | ICO             | ICO         | **ICO only** |
| `sizes="any"` on both           | ICO             | ICO         | **ICO only** |
| Explicit sizes on the ICO       | ICO             | ICO         | **ICO only** |
| ICO first, SVG last             | ICO             | ICO         | both         |
| **SVG only, no ICO link**       | **SVG, adapts** | **SVG**     | SVG          |

A declared ICO wins in both engines regardless of attributes or order, and in three of the four
cases Chrome never downloaded the SVG. The ICO is still shipped and still served — clients that want
it request `/favicon.ico` from the site root by convention, without reading the markup.

### No `rel="mask-icon"`

Safari needed a flat monochrome `safari-pinned-tab.svg` for pinned tabs from Safari 9 (2015).
Safari 12 (2018) started using the regular favicon instead. Verified inert in Safari 26.5: a pinned
tab shows the full-colour favicon whether or not the tag is declared.

## How the assets are made

One adaptive SVG is the source of truth. Every raster is exported from a dark-variant copy with the
palette resolved to literal hex — the adaptive file is never rasterised directly, because a renderer
that ignores CSS custom properties would silently export the light variant.

- **`favicon.ico`** is a real ICO container with five PNG frames at 16/24/32/48/64. Each frame gets
  an unsharp mask — edge energy at 16px rises from 160 to 230, since the ring is about a pixel thick
  at that size.
- **Large rasters are supersampled 4× before downscaling.** The ring is four separate quarter paths;
  where they meet at 12/3/6/9 o'clock the independently antialiased edges let the disc show through
  as hairlines, 25.5/255 deep at 512px. Supersampling removes the seam.
- **The ICO is baked from the dark variant** with the disc filled. It cannot adapt, so it has to be
  one image that survives on a light or a dark tab strip.

## Known limitation

Safari renders `favicon.svg` but never evaluates `prefers-color-scheme` — it always resolves light.
A Safari dark-mode tab shows the light variant while Chrome and Firefox show the dark one. It stays
legible, because the white disc still gives the mark a background.
