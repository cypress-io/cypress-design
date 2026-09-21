/**
 * Favicon assets and the head markup that declares them.
 *
 * The markup is the part worth centralising. A favicon is fetched by the
 * browser as a plain URL, so the only thing shared code can get wrong — and
 * the thing that has been wrong across Cypress sites — is which file the
 * browser is told to prefer. See FAVICON_LINKS for the rule.
 */

export interface FaviconLink {
  rel: string
  href: string
  type?: string
  color?: string
  sizes?: string
}

export interface ManifestIcon {
  src: string
  sizes: string
  type: string
}

/** Files shipped in this package, relative to its `assets/` directory. */
export const FAVICON_ASSETS = [
  'favicon.svg',
  'favicon.ico',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-256x256.png',
  'android-chrome-512x512.png',
] as const

export type FaviconAsset = (typeof FAVICON_ASSETS)[number]

/**
 * Bump when the artwork changes. The browser caches favicons aggressively and
 * will keep serving the old one from an unchanged URL.
 */
export const FAVICON_VERSION = 2

/**
 * Head links every Cypress site should declare.
 *
 * Note what is deliberately absent: there is no `rel="icon"` entry for
 * favicon.ico. Measured against Chrome 153 and Safari 26.5, a declared ICO
 * beats the SVG in both engines regardless of `sizes` or document order — and
 * Chrome does not even download the SVG. The widely copied
 * `<link rel="icon" href="/favicon.ico" sizes="any">` trick is what *stops*
 * the adaptive icon from being used, not what enables it.
 *
 * The ICO is still shipped and still served; clients that want it
 * (Safari before 26, crawlers, unfurlers, RSS readers) request /favicon.ico
 * from the origin root by convention, without reading this markup.
 *
 * Also absent: rel="mask-icon". Safari stopped requiring a monochrome pinned-tab
 * SVG in Safari 12 and renders the real favicon there instead; verified inert in
 * Safari 26.5, where a pinned tab shows the full-colour icon with or without the
 * tag. Apple's own guidance for it is archived and apple.com no longer ships it.
 */
export const FAVICON_LINKS: FaviconLink[] = [
  {
    rel: 'icon',
    href: `/favicon.svg?v=${FAVICON_VERSION}`,
    type: 'image/svg+xml',
  },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
]

/** Icons array for a site's web manifest. Site-specific fields stay with the site. */
export const MANIFEST_ICONS: ManifestIcon[] = [
  { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
  { src: '/android-chrome-256x256.png', sizes: '256x256', type: 'image/png' },
  { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
]

/** Renders FAVICON_LINKS as HTML, for templates that take a string. */
export function faviconLinksHtml(links: FaviconLink[] = FAVICON_LINKS): string {
  return links
    .map((link) => {
      const attrs = Object.entries(link)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
      return `<link ${attrs}>`
    })
    .join('\n')
}

/** A head tag in the shape Docusaurus's `injectHtmlTags` expects. */
export interface HeadTag {
  tagName: 'link'
  attributes: Record<string, string>
}

/**
 * FAVICON_LINKS reshaped for head layers that take tag descriptors rather than
 * markup -- Docusaurus plugins, principally:
 *
 *   injectHtmlTags: () => ({ headTags: faviconHeadTags() })
 */
export function faviconHeadTags(
  links: FaviconLink[] = FAVICON_LINKS,
): HeadTag[] {
  return links.map((link) => {
    const attributes: Record<string, string> = {}
    Object.entries(link).forEach(([key, value]) => {
      attributes[key] = String(value)
    })
    return { tagName: 'link' as const, attributes }
  })
}
