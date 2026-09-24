# Favicon

## Install

```bash
yarn add @cypress-design/vue-favicon
```

This is the only package you need. It brings the icon files, the link data and the copy command
with it.

Use this build when your Astro config registers Vue. The `react-favicon` build renders the same
tags for sites that register React instead — see _Picking a build_ below for why the choice
matters.

## Copy the icon files

A favicon is fetched by the browser as a plain URL before any JavaScript runs, so the icon files
have to exist in your site's static directory. Add the copy as a prebuild step:

```json
{
  "scripts": {
    "prebuild": "cypress-favicon public"
  }
}
```

## Render the tags

```astro
---
import Favicon from '@cypress-design/vue-favicon'
---
<head>
  <Favicon />
</head>
```

The component is server-rendered: Astro inlines plain `<link>` elements and ships no JavaScript
for it.

## Narrow the tag list

Pass `links` when your site ships only some of the surfaces — for example, a site with no web
manifest:

```astro
---
import Favicon, { FAVICON_LINKS } from '@cypress-design/vue-favicon'
---
<Favicon links={FAVICON_LINKS.filter((l) => l.rel !== 'manifest')} />
```
