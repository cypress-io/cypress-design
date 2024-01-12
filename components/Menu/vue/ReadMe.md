# Menu

## Install

```bash
npm install @cypress-design/vue-menu
```

or with yarn

```bash
yarn add @cypress-design/vue-menu
```

## Usage

```ts
import Menu from '@cypress-design/vue-menu'
```

```vue live
<Menu
  activePath="#group-item-3"
  :items="[
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
  ]"
/>
```
