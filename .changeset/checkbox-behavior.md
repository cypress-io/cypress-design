---
'@cypress-design/react-checkbox': minor
'@cypress-design/vue-checkbox': minor
---

Checkbox now follows `checked` (and in Vue, `modelValue`) when it changes after mount, so it can be controlled from outside; Vue `v-model`, including the array mode tied to `name`, keeps working. In React, `onChange` is now optional, and passing `checked` makes the checkbox controlled (update `checked` from `onChange` to toggle it), while omitting `checked` keeps the self-managed behavior.
