# DocMenu

## Install

```bash
npm install @cypress-design/vue-docmenu
```

or with yarn

```bash
yarn add @cypress-design/vue-docmenu
```

## Usage

```ts
import DocMenu from '@cypress-design/vue-docmenu'
```

```vue live
<DocMenu
  :items="[
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
  ]"
/>
```
