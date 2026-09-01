---
name: voice-punctuation
description: Fetch when a sentence uses an em dash — checks for the two-em-dash-per-sentence trap. Supplements voice.md.
---

# Punctuation

Supplements [voice.md](https://design.cypress.io/agents/voice.md) — it doesn't replace that guide. Voice.md's Mechanics section already says "use em dashes sparingly"; this file makes that concrete.

## Never two em dashes in one sentence

One em-dash aside is a break in the sentence's flow; a second one asks the reader to hold
two interruptions open at once and forces a re-read to find the actual subject and verb.
Rewrite with a comma, a colon, or a second sentence instead of reaching for a matching pair.

- Wrong: "Cypress AI keeps the whole loop — creating, debugging, improving — moving quickly."
- Right: "Cypress AI keeps the whole loop moving quickly, from creating to debugging to
  improving."

This applies per sentence, not per paragraph — two separate sentences can each carry one
em-dash aside without tripping this rule.
