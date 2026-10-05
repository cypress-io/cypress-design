---
'@cypress-design/vue-accordion': minor
'@cypress-design/react-accordion': minor
'@cypress-design/vue-alert': minor
'@cypress-design/react-alert': minor
'@cypress-design/vue-checkbox': minor
'@cypress-design/react-checkbox': minor
'@cypress-design/vue-docmenu': minor
'@cypress-design/react-docmenu': minor
'@cypress-design/vue-modal': minor
'@cypress-design/react-modal': minor
'@cypress-design/vue-runresults': minor
'@cypress-design/vue-select': minor
'@cypress-design/vue-testresult': minor
'@cypress-design/react-testresult': minor
---

Depend on `@cypress-design/vue-icon` and `@cypress-design/react-icon` 3.x. These packages were last published against icon 1.x, so installs stayed on 1.x and missed the 3.x fixes, including tree-shakable named icon imports. None of the icons these components use were renamed or removed in 2.0 or 3.0, so there are no API changes. `@cypress-design/vue-modal` now also lists `@cypress-design/vue-icon` as a dependency instead of a devDependency, since its build imports it at runtime.
