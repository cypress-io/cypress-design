# @cypress-design/favicon

The Cypress favicon, its companion icon files, and the head markup that declares them.

```sh
yarn add @cypress-design/favicon
```

## Why this is a file copy, not an import

A favicon never enters the document. The browser fetches it as a standalone URL and paints it into
its own chrome — the tab strip, bookmarks, history — usually before the JavaScript bundle exists.
So unlike the rest of the design system, this package has to put real files on disk.

## Usage

Copy the assets into whatever directory your site serves statically, as a prebuild step:

```jsonc
// package.json
{
  "scripts": {
    "prebuild": "cypress-favicon public", // `static` for Docusaurus
  },
}
```

Then declare the markup. Which form you use depends on what your head layer accepts — all three
come from the same `FAVICON_LINKS` array, so they cannot disagree with each other.

### Astro

```astro
---
// use the build matching a framework your Astro config registers
import Favicon from '@cypress-design/vue-favicon'
// or, on a site whose Astro config registers React:
// import Favicon from '@cypress-design/react-favicon'
---
<head>
  <Favicon />
</head>
```

Picking the wrong one is not merely redundant. Astro finds a renderer by asking each registered one
in turn, and `@astrojs/react`'s check throws on a compiled Vue component rather than returning
false — so a Vue component on a site that registers React first crashes every page.

Pass `links` to narrow the list, e.g. for a site that ships no web manifest:

```astro
<Favicon links={FAVICON_LINKS.filter((l) => l.rel !== 'manifest')} />
```

### Docusaurus

A Docusaurus plugin injects objects rather than markup, so there is no component to render:

```js
const { faviconHeadTags } = require('@cypress-design/favicon')

module.exports = async function favIcon() {
  return {
    name: 'docusaurus-plugin-favicon',
    injectHtmlTags: () => ({ headTags: faviconHeadTags() }),
  }
}
```

### EJS and other server-rendered HTML

```ejs
<head>
  <%- faviconLinksHtml() %>
</head>
```

EJS templates take a string. This is also the only form that works on a page with no JavaScript at
all — a server-rendered page with no `<script>` tags has nothing for a component to mount into.

### Why not a component everywhere

The component renders `<link>` elements, so it needs a framework doing the rendering at the point the
`<head>` is built. Astro does. A Docusaurus plugin hands back descriptors before any component tree
exists, and an EJS template has no component runtime. A client-side React component _can_ reach the
head after hydration, but a favicon is fetched during the initial HTML parse — so injecting it later
means the browser has already asked for `/favicon.ico` and moved on.

## Two things deliberately absent

No `rel="icon"` entry for `favicon.ico`, and no `rel="mask-icon"` at all.

## The ICO rule

`FAVICON_LINKS` deliberately contains **no `rel="icon"` entry for `favicon.ico`.**

Measured against Chrome 153 and Safari 26.5: when an ICO is declared, it beats the SVG in both
engines regardless of `sizes` or document order, and Chrome does not even download the SVG. The
widely copied `<link rel="icon" href="/favicon.ico" sizes="any">` line is what _prevents_ the
adaptive icon from being used, not what enables it.

The ICO is still shipped and still served. Clients that want it — Safari before 26, crawlers,
unfurlers, RSS readers — request `/favicon.ico` from the origin root by convention, without reading
your markup. Keep the file at the root and leave it undeclared.

## What's in the box

| File                   | Used by                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| `favicon.svg`          | Chrome, Edge, Firefox — adapts to light/dark via `prefers-color-scheme`   |
| `favicon.ico`          | Safari before 26, crawlers, unfurlers. Real ICO container, 16/24/32/48/64 |
| `apple-touch-icon.png` | iOS home screen. 180×180, no alpha                                        |
| `android-chrome-*.png` | Android and installed PWAs, via the manifest                              |

The ICO is baked from the **dark** variant with the navy disc filled. It cannot adapt, so it has to
be one image that survives on a light or a dark tab strip — a filled disc gives the wordmark its own
background either way.

Safari 26 renders the SVG but always resolves it light, so its dark-mode tab shows the light
variant. That is legible, just not identical to Chrome.

## Local development

`exports` points at `dist/`, so a linked consumer sees built output, not source. Rebuild after
editing:

```sh
yarn workspace @cypress-design/favicon build
```

## Why there is no mask-icon

Safari required a flat monochrome `safari-pinned-tab.svg` for pinned tabs from Safari 9 (2015).
Safari 12 (2018) started using the regular favicon there instead, and it has never been required
since. Verified inert in Safari 26.5: a pinned tab renders the full-colour favicon whether or not
the tag is declared. Apple's guidance for it is archived, and apple.com no longer ships it.

Note that Safari renders `favicon.svg` but always resolves it **light**, in both appearances — so
a Safari dark-mode tab shows the light variant while Chrome and Firefox show the dark one.
