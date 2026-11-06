---
'@cypress-design/react-modal': minor
'@cypress-design/vue-modal': minor
---

Modal: add `size` (`sm` 480px, `md` 592px, `lg` 720px, `xl` 840px), a footer (React `footer` prop, Vue `footer` slot), `titleBoxClassName`, `contentClassName` and `footerClassName`, and `closeOnBackdropClick` / `closeOnEscape` (both default to `true`; the close button always closes the modal). Classes passed to the modal now override its defaults through `tailwind-merge`, including the root `className` in React and `class` in Vue.

The modal now renders the same in apps that disable Tailwind's preflight: it removes the browser's dialog padding and border and the close button's background and border, and draws the header divider, which was missing there.

The close button shows a focus ring when reached from the keyboard. A modal opened from the keyboard shows it straight away, since the close button receives focus.
