---
'@cypress-design/react-icon': minor
'@cypress-design/vue-icon': minor
'@cypress-design/css': minor
'@cypress-design/icon-registry': minor
---

## New syntaxes to add dynamic icon colors

### With a prefix focus/hover

```html
<IconBook size="16" strokeColor="blue-600" hoverStrokeColor="jade-600" focusStrokeColor="jade-900" />
```

### With the same prefix acting on a group

```html
<button class="group">
  <IconBook size="16" strokeColor="blue-600" hoverStrokeColor="jade-600" focusStrokeColor="jade-900" interactiveColorsOnGroup />Read
</button>
```
