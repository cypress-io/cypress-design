---
'@cypress-design/react-checkbox': major
'@cypress-design/vue-checkbox': minor
---

Checkbox now follows `checked` (and in Vue, `modelValue`) when it changes after mount, so it can be controlled from outside; Vue `v-model`, including the array mode tied to `name`, keeps working.

**Breaking (React):** passing `checked` now makes the checkbox controlled — it shows exactly `checked`, so update it from `onChange` to toggle the box. Previously `checked` only set the starting state. If you used `checked` as a starting value, switch to the new `defaultChecked` prop:

```diff
- <Checkbox checked onChange={save} />
+ <Checkbox defaultChecked onChange={save} />
```

`onChange` is now optional. Omitting both `checked` and `defaultChecked` keeps the self-managed box that starts unchecked.
