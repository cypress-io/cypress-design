import type { CSSProperties, ReactNode } from 'react'
import DocMenu from '@cypress-design/react-docmenu'

// Swap the default <a> for your router's link. It receives `href`,
// `className`, `style`, and `children`.
function CustomLink({
  href,
  className,
  style,
  children,
}: {
  href: string
  className: string
  style: CSSProperties
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(evt) =>
        console.log('The link was clicked.', { target: evt.target })
      }
    >
      {children} 🔗
    </a>
  )
}

export default function CustomLinkDemo() {
  return (
    <DocMenu
      LinkComponent={CustomLink}
      items={[{ label: 'Install', href: '#with-a-custom-link' }]}
    />
  )
}
