---
name: errors
description: Principles and patterns for errors, warnings, deprecations, and other system-to-user messages where the product needs to tell the user something happened. Fetch when writing or reviewing an error message, a warning, a deprecation notice, or any failure-state communication in the product, app, CLI, or Cloud. For the full writing workflow and worked examples, fetch the `cypress-error-messages` skill in `cypress-io/aihub`.
---

# Errors and Warnings

Errors, warnings, deprecations, and other system-to-user messages — wherever the product talks to the user when something happened, failed, or needs their attention.

> The content here is distilled from Jennifer Shehane's [`cypress-error-messages` skill](https://github.com/cypress-io/aihub/tree/main/skills/cypress-error-messages) in `cypress-io/aihub`. For the full pre-write checklist, the complete message structure, and the worked examples (security warning, usage cap, rate limit, CLI flag error, etc.), fetch the skill directly — this pillar gives the design-system shape of the rules; the skill is the authoritative workflow.

## Principles

**Every message answers four questions in order: what happened, why, what to do next, what happens if you do nothing.** If a reader can't answer "I know what to do next" after reading the message, the message isn't done. Not every message needs all four sections — simple ones can collapse what-and-why into a single sentence — but the order is non-negotiable.

**Never blame the user.** Frame messages as what the system observed, not what the user did wrong. "Cypress couldn't find a `ciBuildId`" lands differently than "You didn't provide a `ciBuildId`."

**No exclamation points in errors or warnings.** Serious tone, not playful. Personality belongs in marketing and onboarding, not in a CI failure at 11pm.

**Print interpreted values back to the user.** When the system parsed or resolved input from flags, config, or arguments, show what it actually saw — usually as a code block — so the user can confirm or correct.

**"Our team has been notified" only appears when monitoring actually captures the failure.** False reassurance is a trust violation. If the error isn't being captured by Sentry or equivalent, the language can't appear — full stop.

**Transient errors must say so explicitly, and give the right recovery.** Tell the user when it will resolve if you know ("will reset in 5 minutes"). Use "refresh" for messages in the Cypress app or Cloud UI; use "try again later" for CLI and test output. Pick the recovery action that matches the surface.

## Voice + accessibility

Tone rules in [voice.md](./voice.md) apply — but messages are stricter:

- Plain language. Active voice. Short sentences. Concrete, specific verbs over vague ones ("an issue occurred" is not acceptable).
- No wit. No personality.
- Meaning never depends on color, icons, or formatting alone. A red banner without text is not a message — it's decoration.
- Link text is descriptive. Never "click here" or "learn more" standalone — the link text itself describes the destination.

## Links

**Always use `https://on.cypress.io/<slug>` redirects — never `https://docs.cypress.io/<path>` direct links.** `on.cypress.io` is a redirect layer that prevents broken links in the product when documentation moves or gets reorganized. Direct `docs.cypress.io` URLs in messages can break permanently.

If the slug you need doesn't exist yet, add one to `data/links.yml` in the `cypress-services` repo and open a PR — see the workflow in the [`cypress-error-messages` skill](https://github.com/cypress-io/aihub/tree/main/skills/cypress-error-messages).

While the slug is pending, use `https://on.cypress.io/[slug-tbd]` in drafts and remember to finalize before shipping.

## Code references

Command names, flag names, variable names, argument names, and config keys all go in backticks: `` `cy.prompt()` ``, `` `--ci-build-id` ``, `` `allowCypressEnv` ``, `` `{ multiple: true }` ``. This matches what users will type or see in their config and code.

## Named errors

When a message represents a specific error class, name it at the top (e.g. `PromptLengthError`, `PromptUsageLimitError`). Named errors are searchable, distinguishable in logs, and easier for users to ask about.

## Workflow + examples

For the pre-write checklist, the full message structure pattern, and five annotated worked examples, fetch:

`https://github.com/cypress-io/aihub/tree/main/skills/cypress-error-messages`

## Related

- [voice.md](./voice.md) — tone, POV, capitalization that applies to all copy
- [principles/ux.md](./principles/ux.md) — "Never give people a dead end" and the empty-state rule (the broader UX framing that messages are one application of)
- [accessibility.md](./accessibility.md) — broader accessibility patterns
- [review-checklist.md](./review-checklist.md) — mechanical checks before shipping
