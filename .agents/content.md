---
name: content
description: Fetch when writing button labels, error messages, empty states, form copy, or any in-product strings. Skip for code-only or token-only changes.
---

# Content patterns

> **TODO**: real content. Initial direction below; refine with the content team before relying on it.

## Buttons

- Verb-first, action-specific. "Save changes" not "Submit". "Delete project" not "OK".
- One primary action per view.

## Error messages

- State what happened, then what to do next.
- No blame ("You did X wrong"). No apologies ("Sorry, something went wrong").
- Include the failing identifier when safe to surface.

## Empty states

- One sentence explaining what would normally appear here.
- One action — usually a primary button — to fill the state.

## Accessibility labels

- `aria-label` matches visible text when one exists; describes purpose when icon-only.
- Don't repeat the element type ("Search button" → "Search").
