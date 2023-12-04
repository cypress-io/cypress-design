# DocMenu

## Install

```bash
npm install @cypress-design/react-docmenu
```

or with yarn

```bash
yarn add @cypress-design/react-docmenu
```

## Usage

```ts
import DocMenu from '@cypress-design/react-docmenu'
```

### Default usage

```tsx live
export default () => (
  <DocMenu
    items={[
      {
        label: 'Get Started',
        href: '#',
      },
      {
        label: 'Overview',
        items: [
          {
            label: 'Overview Item 1',
            href: '#',
          },
          {
            label: 'Overview Item 2',
            href: '#',
            active: true,
          },
        ],
      },
      {
        label: 'Getting Started',
        items: [
          {
            label: 'Item 1',
            href: '#',
          },
          {
            label: 'Group',
            items: [
              {
                label: 'Item 1',
                href: '#',
              },
              {
                label: 'Item 2',
                href: '#',
              },
              {
                label: 'Item 3',
                href: '#',
              },
              {
                label: 'Item 4',
                href: '#',
              },
            ],
          },
          {
            label: 'Item 5',
            href: '#',
            active: true,
          },
        ],
      },
    ]}
  />
)
```

### With a custom link

```tsx live
const CustomLink = ({ href, children, className }) => {
  return (
    <a
      href={href}
      className={className}
      onClick={(evt) => {
        console.log('The link was clicked.', { target: evt.target })
      }}
    >
      {children} 🔗
    </a>
  )
}

export default () => (
  <DocMenu
    LinkComponent={CustomLink}
    items={[
      {
        label: 'Install',
        href: '#with-a-custom-link',
      },
    ]}
  />
)
```
