# SidebarNavigation

## Install

```bash
npm install @cypress-design/react-SidebarNavigation
```

or with yarn

```bash
yarn add @cypress-design/react-SidebarNavigation
```

## Usage

```ts
import SidebarNavigation from '@cypress-design/react-SidebarNavigation'
```

```tsx live
<SidebarNavigation
  items={[
    {
      text: 'Get Started',
      href: '#',
    },
    {
      text: 'Overview',
      items: [
        {
          text: 'Overview Item 1',
          href: '#',
        },
        {
          text: 'Overview Item 2',
          href: '#',
          active: true,
        },
      ],
    },
    {
      text: 'Getting Started',
      items: [
        {
          text: 'Item 1',
          href: '#',
        },
        {
          text: 'Group',
          items: [
            {
              text: 'Item 1',
              href: '#',
            },
            {
              text: 'Item 2',
              href: '#',
            },
            {
              text: 'Item 3',
              href: '#',
            },
            {
              text: 'Item 4',
              href: '#',
            },
          ],
        },
        {
          text: 'Item 5',
          href: '#',
          active: true,
        },
      ],
    },
  ]}
/>
```
