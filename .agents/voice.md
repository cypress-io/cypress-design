---
name: voice
description: Fetch when writing user-facing copy — UI strings, error messages, empty states, marketing prose, docs body. Skip for code comments and internal logs.
---

# Voice

## Tone

- Confident, technical, concise. Speak like a senior engineer who respects the reader's time.
- No hype, no marketing fluff. Avoid "simply", "just", "easy", "powerful", "seamless", "delight".
- Prefer present tense, active voice.
- For error / warning / deprecation messages specifically — stricter rules apply (no exclamation points, no blame, structured what/why/next). See [messages.md](./messages.md).

## Point of view

- Address the reader as "you". Refer to the product as "Cypress".
- Avoid "we" in product UI; reserve it for blog posts and marketing.

## Capitalization

- Sentence case for buttons, headings, menu items, page titles. Not Title Case.
- Code identifiers stay verbatim — never rewrap or recase them.

## Headings

- Headings pull people in; they don't label a shelf. Bias toward action- or outcome-oriented phrasing ("Catch failures before they ship") over dry category labels ("Workflows and integrations"). Category labels read as inert; action-oriented headings tell the reader why to keep reading.
