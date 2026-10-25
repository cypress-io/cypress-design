import React from 'react'
import { FAVICON_LINKS, type FaviconLink } from '@cypress-design/favicon'

export interface FaviconProps {
  /** Narrow the tag list, e.g. for a site that ships no web manifest. */
  links?: FaviconLink[]
}

/**
 * Renders the favicon head tags. Server-rendered — in Astro, without a
 * `client:` directive, the output is inlined as plain <link> elements with no
 * JavaScript shipped.
 */
export const Favicon: React.FC<FaviconProps> = ({ links = FAVICON_LINKS }) => (
  <>
    {links.map((link) => (
      <link key={`${link.rel}-${link.href}`} {...link} />
    ))}
  </>
)

export default Favicon
