---
name: voice-terminology
description: Fetch when copy leans on internal/planning jargon, or shortens a feature name to a generic-sounding term. Supplements voice.md.
---

# Terminology

Supplements [voice.md](https://design.cypress.io/agents/voice.md) — it doesn't replace that guide.

## Describe the job, not the jargon

Planning language is not copy. Terms that are useful shorthand in a spec, a ticket, or a PR
description leak into the page when a section gets written straight from its own to-do item.
Before shipping a term the reader has to already know, ask:

1. **Would a visitor who has never read our internal docs decode this?** Not "is it real
   jargon" — plenty of it is real and still unknown outside a niche.
2. **If they half-decode it, does the wrong reading hurt?** This is the dangerous case.
   A term that merely puzzles gets skipped; a term that inverts your meaning does damage.

If either check fails, write what actually happens instead. The behavior is almost always
shorter and clearer than the label for it.

**Worked example — "human out of the loop."** Real term, from the autonomy-levels literature
(in-the-loop → on-the-loop → out-of-the-loop), but effectively unknown in testing. Worse, the
plain-English reading of "out of the loop" is _uninformed_ — the opposite of the intended
"not required," and precisely the anxiety that section needed to defuse. Plain version: the
pipeline triages on its own and the only thing you touch is the PR review.

Its sibling, "human in the loop," is fine to use: it is standard in ML/AI ops, and Cypress
already trades on it externally with the "Quality in the Loop" event. Terms in a family
don't inherit each other's currency — check them one at a time.

Keep both kinds as internal labels in specs and PR to-do lists; that's what they're good at.
Just don't let a section inherit its heading from its ticket.

## Avoid generic terms that collide with a competitor's brand

### Test Replay, never bare "replay"

Never use "replay" as a generic noun/adjective ("replay data," "the replay," "replaying
the test") when referring to Cypress's Test Replay feature — always use the full product
name, "Test Replay" (see [voice.md](https://design.cypress.io/agents/voice.md) → Product and feature names). A competitor is
named **Replay.io**; unqualified "replay" in Cypress copy reads as a generic capability
and risks being mistaken for that competitor's brand rather than Cypress's own feature.

- Wrong: "gives your coding agent the same replay data"
- Right: "gives your coding agent the same Test Replay data"

### The general principle

Before shortening a Cypress feature name to a generic-sounding term in body copy, check
whether that generic term is also a real competitor's product/company name. If it is,
keep the full feature name instead of the shorthand, even mid-sentence where a shorter
word would otherwise read more naturally.
