---
'@cypress-design/react-menu': patch
---

The React Menu `icon` type now accepts icon components that ship at more sizes than 24px (for example 16px and 24px), so they can be passed directly instead of being wrapped as `(props) => <Icon {...props} />`. Runtime behavior is unchanged.
