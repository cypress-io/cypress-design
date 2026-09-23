# Favicon — architecture

Implementation notes for the Favicon component and the `/favicons` documentation page.

The docs site passes a `links` prop to drop the manifest tag, because that site ships no
`site.webmanifest`. A site using the defaults needs only `<Favicon />` and no import of
`FAVICON_LINKS`.

## Acceptance criteria

- Sidebar lists **Favicons** immediately after **Icons** (`order: 5` in the mdx frontmatter; Icons
  is 4). The sidebar builds from a glob over `docs/src/pages/*.mdx`, sorted by `order`.
- The showcase imports its images from the package with Vite's `?url`, rather than writing absolute
  paths. Same bytes either way, but it means the component renders under Cypress too — the
  component-test dev server serves no public directory, so absolute paths 404 there. The docs site
  separately copies the assets to its own root via `packages/favicon/bin/copy-assets.mjs`, which
  `build:docs` re-runs, so the site's real favicon and the page's illustrations come from one source.
- `docs/src/FaviconAssets.cy.ts` covers it: row count against `FAVICON_ASSETS`, every image decoding
  (`naturalWidth > 0`, which fails on a bad path or a corrupt export), and a Percy snapshot named
  `favicon-assets` that guards the artwork itself.
- The file table is generated from `FAVICON_ASSETS` / `FAVICON_LINKS` imported from the package, not
  hand-written, so counts cannot drift.
- The adaptive SVG section states the reader's current colour scheme and repaints when it changes.
- Both omitted tags are explained with their measurement, not with an assertion — a reader who
  arrives from a 2019 blog post should leave understanding why re-adding them would break the icon.

## Why the two omissions are documented so heavily

They are the whole reason the package exists. Both `<link rel="icon" href="…ico" sizes="any">` and
`<link rel="mask-icon">` are widely recommended, were shipped across Cypress sites for years, and
are actively harmful or inert today. The page's job is to stop them being reintroduced by someone
copying a favicon checklist.

Measurements were taken 16–18 September 2026 against Chrome 153.0.8010.48 and Safari 26.5 by serving
markup variants and recording which file each engine fetched. Re-verify before citing them as
current; favicon behaviour has shifted between browser versions before.

## Known issues

- Safari renders the SVG but never evaluates `prefers-color-scheme`, so its dark-mode tab shows the
  light variant. Documented on the page as a known limitation; accepted, not a bug to fix.
