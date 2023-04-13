# Elements of the Cypress Design System

---

The Cypress design system is the whole system of:

- **Storybook instances** with stories that document the behavior of components.
- **Figma files** that specify the behavior of components organized by initiative or location in the app.
- **Design tokens** (a special type of variables) that specify font size, line height, color, etc.
- **Components** that are pre-built to design system standards (eg. with accessibility review.)

## Cross-platform Storybook

_The main place to see the core components, in code._

📖 [design.cypress.io](https://design.cypress.io/ 'https://design.cypress.io/')

Used by Website, App, Cloud, and Documentation

- Has both Vue and React components
- Well-specified in Figma
- Uses [Tailwind](https://tailwindcss.com/ 'https://tailwindcss.com/')

## Components defined in Figma

_The main reference for how we want the components to look._

[Design System, v1.x - @latest](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System%2C-v1.x?node-id=874%3A0&t=uyhh17Qy9KrkvAFj-1)

- Accordion
- Alerts
- Avatars
- Buttons
- ... etc.

## Patterns

_New supplemental documentation and guidelines. (Early roll-out.)_

[Design Patterns, v1.x - @latest](https://www.figma.com/file/AE8KK3Hx2ZCDLlK3FkOd4k/Design-Patterns%2C-v1.x?node-id=0%3A1&t=PS2VyVHdlfNpXJky-1)

- Dates and Times
- GDPR Banners
- Typography
- Grids
- Spacing
- ...etc.

## FAQ

**Why do we have multiple Storybook instances, which one should I use?**\
Cypress works on different platforms and has different generations of work. Prefer the new cross-platform Storybook.

**Why do we have multiple Figma files?**

The Cypress universe has a lot of UI, and most of it is in Figma. We have a lot of files but they are organized consistently:

- by initiative (during design, purple files)
- by area of the app (during development, green files)

## Cloud-only system

- Storybook: [cloud-design.cypress.io](https://cloud-design.cypress.io/ 'https://cloud-design.cypress.io/')
- The legacy cloud-only "design system"
- Uses Bootstrap 3 with SCSS

⚠️ Stable, but not specified in in Figma
