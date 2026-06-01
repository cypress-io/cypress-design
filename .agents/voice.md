---
name: voice
description: Fetch when writing user-facing copy — UI strings, error messages, empty states, marketing prose, docs body. Skip for code comments and internal logs.
---

# Voice

## Tone

- Confident, technical, concise. Speak like a senior engineer who respects the reader's time.
- No hype, no marketing fluff. Avoid "simply", "just", "easy", "powerful", "seamless", "delight".
- Prefer present tense, active voice.
- For errors, warnings, and deprecation messages specifically — stricter rules apply (no exclamation points, no blame, structured what/why/next). See [errors.md](./errors.md).

## Point of view

- Address the reader as "you". Refer to the product as "Cypress".
- Avoid "we" in product UI; reserve it for blog posts and marketing.

## Capitalization

- Sentence case for buttons, headings, menu items, page titles. Not Title Case.
- Code identifiers stay verbatim — never rewrap or recase them.

## Headings

- Headings pull people in; they don't label a shelf. Bias toward action- or outcome-oriented phrasing ("Catch failures before they ship") over dry category labels ("Workflows and integrations"). Category labels read as inert; action-oriented headings tell the reader why to keep reading.

## Leading with value

- **Lead with the benefit, not the mechanism.** Open with the outcome the reader gets, or the problem it removes — then name the feature that delivers it. The reader decides whether to care based on the "why"; the "what" earns its place once they do. Keep the mechanism in the second clause or the link-out, never the lead. ("Spend less time fixing accessibility violations by hand" before "Cloud MCP exposes accessibility report data.")
- **Stay in active voice, addressed to the reader.** The reader — or something working on their behalf — is the subject doing or receiving the benefit: "your AI agent ranks what matters", not "violations are ranked". Passive constructions bury who acts and drain the sentence of momentum.
