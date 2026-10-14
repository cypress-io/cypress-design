---
'@cypress-design/vue-select': minor
'@cypress-design/react-select': minor
---

Add `searchAutoFocus` to `SelectOptionList` (default `true`). Vue now focuses the search input in code when the popover opens; it relied on the HTML `autofocus` attribute, which browsers ignore after page load, so the search box never got focus. Set it to `false` when rendering the list inline on a page so the search Textbox doesn't take focus and scroll the page on load.

After a selection closes the popover, focus returns to the trigger (as Escape already did). With `searchable`, focus was in the search input, which goes away when the popover closes, so keyboard focus used to drop to the page.
