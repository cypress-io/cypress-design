---
to: components/<%= h.inflection.camelize(name, false) %>/react/ReadMe.md
---
# <%= h.inflection.camelize(name, false) %>

## Summary

Describe your component here.

## install

```bash
npm install @cypress-design/react-<%= h.inflection.transform(name, ['underscore','dasherize']) %>
```

or with yarn

```bash
yarn add @cypress-design/react-<%= h.inflection.transform(name, ['underscore','dasherize']) %>
```
