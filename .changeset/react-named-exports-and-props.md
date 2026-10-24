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

Export each component’s props type: `AccordionProps`, `AlertProps`, `ButtonProps`, `DocMenuProps` (plus `NavItem`), `ModalProps`, `StatusIconProps`, `TabsProps`, `TagProps`, `TestResultProps`, `TextboxProps` and `TooltipProps`. `ButtonProps` and `TextboxProps` include the HTML attributes each component accepts.

`Button`, `Icon`, `StatusIcon` and `Textbox` are now also exported by name (`import { Button } from '@cypress-design/react-button'`). Each of these packages already had other named exports, so what `require()` returns is unchanged. The other packages stay default-only at runtime, so their CommonJS `require()` still returns the component.
