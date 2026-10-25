---
'@cypress-design/react-accordion': minor
'@cypress-design/react-alert': minor
'@cypress-design/react-button': minor
'@cypress-design/react-docmenu': minor
'@cypress-design/react-icon': minor
'@cypress-design/react-modal': minor
'@cypress-design/react-statusicon': minor
'@cypress-design/react-tabs': minor
'@cypress-design/react-tag': minor
'@cypress-design/react-testresult': minor
'@cypress-design/react-textbox': minor
'@cypress-design/react-tooltip': minor
---

Export each component’s props type: `AccordionProps`, `AlertProps`, `ButtonProps`, `DocMenuProps` (plus `NavItem`), `ModalProps`, `StatusIconProps`, `TabsProps`, `TagProps`, `TestResultProps`, `TextboxProps` and `TooltipProps`. Each one is derived from the component (`ComponentProps<typeof Tag>`), so it covers everything the component accepts, including the HTML or SVG attributes it passes through. Use it to type a wrapper that forwards its props.

`Button`, `Icon`, `StatusIcon` and `Textbox` are now also exported by name (`import { Button } from '@cypress-design/react-button'`). Each of these packages already had other named exports, so what `require()` returns is unchanged. The other packages stay default-only at runtime, so their CommonJS `require()` still returns the component.
