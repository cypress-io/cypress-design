---
to: components/<%= h.inflection.camelize(name, false) %>/vue/ReadMe.md
---
# <%= h.inflection.camelize(name, false) %>

## Summary

Describe your component here.

## install

```bash
npm install @cypress-design/vue-<%= h.inflection.transform(name, ['underscore','dasherize']) %>
```

or with yarn

```bash
yarn add @cypress-design/vue-<%= h.inflection.transform(name, ['underscore','dasherize']) %>
```
