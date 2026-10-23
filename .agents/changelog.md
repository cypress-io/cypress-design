---
name: changelog
description: How to write the changeset (`.changeset/*.md`) text that becomes a package's CHANGELOG entry. Load before writing or editing a changeset.
---

# Changelog entries

Each `.changeset/*.md` file becomes the package's `CHANGELOG.md` entry, word for word, when the version PR merges. The bump level and file conventions live in [implement-component, step 5](https://design.cypress.io/agents/skills/implement-component.md). This doc covers the text.

## Rules

- **Be direct.** Say what changed in as few words as it takes, with enough clarity that the reader understands the full impact.
- **Stand on its own.** Readers should _never_ have to click the linked issue or PR to understand the change, and _absolutely never_ have to read the code. If you couldn't understand the change from the entry alone, add more context.
- **Describe only user-facing impact:** what the user will now observe, and what they need to do, if anything.
- **No implementation details.** Leave out internal function and file names, refactors, the code path that changed, and how the fix works under the hood.
- **Name the public API the reader uses:** props, slots, slot props, events, and package names are fine, since they're what consumers write.
- **Say which framework, if only one changed.** Prefix the line with "Vue:" or "React:".
- **Use one bullet per behavior** when an entry covers several changes. Keep each to a sentence or two.

## Example

Too much _how_:

> The wrapper listened for `focus`, which doesn't bubble from the trigger, so only a focusable wrapper ever opened it. The popper is teleported to the end of `<body>`, so Tab is redirected into it and `inert` is set for one tick.

User-facing:

> - Vue: tabbing to a button or link inside a Tooltip now opens it. Before, only a Tooltip with its own `tabindex` responded to the keyboard.
> - In an `interactive` tooltip, Tab from the trigger moves into the tooltip's links, and Tab from the last one continues to the next control on the page.
