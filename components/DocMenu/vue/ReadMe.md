# DocMenu

## Summary

Describe your component here.

## Install

```bash
npm install @cypress-design/vue-docmenu
```

or with yarn

```bash
yarn add @cypress-design/vue-docmenu
```

## Usage

```vue live
<DocMenu
  :items="[
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
          ],
        },
        {
          text: 'Item 2',
          href: '#',
          active: true,
        },
      ],
    },
  ]"
/>
```
