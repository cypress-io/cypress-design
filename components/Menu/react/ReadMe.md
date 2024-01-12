# Menu

## Install

```bash
npm install @cypress-design/react-menu
```

or with yarn

```bash
yarn add @cypress-design/react-menu
```

## Usage

```ts
import Menu from '@cypress-design/vue-docmenu'
```

### Default usage

```tsx live
export default () => (
  <Menu
    activePath="#group-item-3"
    items={[
      {
        label: 'Get Started',
        href: '#get-started',
      },
      {
        label: 'Overview',
        items: [
          {
            label: 'Overview Item 1',
            href: '#overview-item-1',
          },
          {
            label: 'Overview Item 2',
            href: '#overview-item-2',
          },
        ],
      },
      {
        label: 'Getting Started',
        items: [
          {
            label: 'Item 1',
            href: '#item-1',
          },
          {
            label: 'Group',
            items: [
              {
                label: 'Item 1',
                href: '#group-item-1',
              },
              {
                label: 'Item 2',
                href: '#group-item-2',
              },
              {
                label: 'Item 3',
                href: '#group-item-3',
              },
              {
                label: 'Item 4',
                href: '#group-item-4',
              },
            ],
          },
          {
            label: 'Item 5',
            href: '#',
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
  <Menu
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
