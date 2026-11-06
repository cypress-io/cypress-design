---
name: components/Modal/architecture
description: "How Modal is built: file layout, preflight independence, size presets, class merging, the footer, how Escape and backdrop clicks close (or don't), the close button focus ring, and type bundling. Fetch alongside instructions.md when changing Modal; skip when only using it."
---

# Modal: architecture

For usage, see [instructions.md](https://design.cypress.io/agents/components/Modal/instructions.md).

## File layout

```text
components/Modal/
  constants/src/index.ts   class strings, ClassModalSizes, ModalSize
  constants/src/bodyScroll.ts   page scroll lock while open
  react/Modal.tsx          portal into document.body, controlled by `show`
  vue/Modal.vue            always rendered, `show` synced to internal state
  assertions.ts            behavior shared by both frameworks' specs
```

Both frameworks render a native `<dialog>` opened with `showModal()`, so the browser provides the backdrop, the top layer and focus containment.

## Preflight independence

Some consumers disable Tailwind's preflight (cypress-services does, and also ships `bootstrap-sass`). Without it the browser's own styles reach the modal: a `<dialog>` has `padding: 1em` and a `3px solid` border, a `<button>` has a grey background and a `2px` border, and `border-b` sets only a width, so no line is drawn. The constants set every one of these themselves: `p-0 border-0 box-border` on the dialog, `border-0 bg-transparent` on the close button, and `[border-bottom-style:solid]` / `[border-top-style:solid]` on the header and footer dividers. The named `border-solid` utility is avoided for the reason SpecResults documents (PD-42). With preflight these classes change nothing.

## Sizes

`ClassModalSizes` maps `sm`, `md`, `lg` and `xl` to 480, 592, 720 and 840px, the widths consumers were already forcing with CSS overrides. Each entry replaces `ClassModalStandardDimensions` instead of adding to it, so a fixed width is never clamped by its `sm:max-w-[70vw]`; each keeps `max-w-[calc(100vw-32px)]` so it still fits small viewports. `fullscreen` wins over `size`.

## Class merging

Every class prop goes through `tailwind-merge` with the consumer's classes last, so a conflicting utility (`contentClassName="py-0"`, `className="w-96"` with a `size`) replaces the default instead of depending on stylesheet order. In Vue, the root `class` is merged the same way: the component sets `inheritAttrs: false`, binds `$attrs` without `class`, and passes `normalizeClass($attrs.class)` to `twMerge` from the template, as ProgressBar does.

## Footer

The footer is a padded bar with a top divider and no layout of its own; consumers place their buttons inside it. It uses the same horizontal padding as the header and body at every breakpoint, so the divider spans the full width. It renders only when footer content is passed.

## Closing

The parent decides when the modal closes, and each path can be turned off except the close button:

- **Backdrop click:** the dialog's `click` handler compares the pointer to the dialog's bounding box. With `closeOnBackdropClick` false it returns early.
- **Escape:** the browser fires `cancel`. The handler always calls `preventDefault()`, then closes only when `closeOnEscape` is true.
- **Native close the component didn't start:** a repeated Escape can't be cancelled, and `<form method="dialog">` or `dialog.close()` close the dialog directly. A `keydown` handler records an Escape in flight, so the `close` handler can tell a blocked Escape (reopen the dialog) from the other cases (sync state and close).

React reports closes through `onClose` and reopens the dialog when the parent keeps `show` true. Vue changes its internal state, which emits `update:show` and `close`.

## Close button focus

The close button keeps `outline-none` but shows `focus-visible:ring-2 focus-visible:ring-indigo-500`, so keyboard users can see it and mouse users don't get a ring after a click. `ring` is a box shadow, so it doesn't depend on preflight. `showModal()` focuses the first focusable element, which is the close button unless there is a help link, so a modal opened from the keyboard shows the ring straight away.

## Types

`ModalSize` comes from `@cypress-design/constants-modal`, which is a bundled devDependency. Both packages emit one self-contained `dist/index.d.ts` with that type inlined: React through `rollup.dts.config.mjs`, Vue through `vite-plugin-dts` with `bundledPackages`. Consumers never install the constants package.
