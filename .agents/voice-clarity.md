---
name: voice-clarity
description: Fetch when writing copy with a pronoun back-reference ("this", "that", "it", "which") spanning a clause or sentence break. Supplements voice.md.
---

# Referent clarity

Supplements [voice.md](https://design.cypress.io/agents/voice.md) — it doesn't replace that guide.

## Every "this," "that," "it," or "which" needs a noun it can point to

A pronoun referring back to a previous clause needs an actual noun there to land on — not a
verb, not the general gist of the sentence, not "the idea of what I just said." If you can't
point at the specific word the pronoun stands in for, the reader can't either.

- Wrong: "...to find the exact point where they diverged. **That difference** is the root
  cause..." — nothing in the prior clause is literally _a difference_; `diverged` is a verb,
  not a noun the pronoun can grab.
- Right: "...to find the exact point where they diverged, then fixes the actual cause instead
  of retrying again." — drop the pronoun and the second sentence; say what happens next
  directly instead of summarizing backward first.

## How to check it yourself

Read the sentence containing the pronoun in isolation, with no memory of what came before. If
you can't answer "referring to what, specifically?" in one word or a short noun phrase pulled
verbatim from the prior sentence, the reference is broken — rewrite rather than patch. Two
common fixes:

1. **Merge the clauses** so the pronoun's target and its reference sit in the same sentence,
   removing the gap a reader has to bridge.
2. **Name the thing again** instead of pronoun-ing it, if merging would make the sentence too
   long.

Don't reach for a vaguer pronoun ("this," "that") to paper over an unclear antecedent — it
reads as confident while meaning less than the sentence before it.
