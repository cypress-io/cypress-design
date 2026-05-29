---
name: learning-from-feedback
description: How to treat every piece of feedback as a chance to find a reusable rule, and how to add it to the principle set when it is. Fetch whenever giving or receiving feedback, reviewing work, or deciding whether a piece of guidance belongs in the principles.
---

# Learning from feedback

Most feedback is a one-off fix. Some of it is a rule in disguise — the same point you'd make again next week on a different surface. This file is about catching the second kind and writing it down, so the next reviewer (human or agent) starts from the same place.

The principles are a living document. They grow from real feedback and decisions, not from theory.

## When feedback arrives, run these four steps

1. **Notice** — treat every piece of feedback as a candidate for a rule, not just a task to finish. This applies whether the feedback is framed as a principle or not. Most of it won't be.
2. **Extract** — pull the underlying rule out of the specific case. "Move this label up" is a fix. "Labels sit above their input unless space forbids it" is a rule.
3. **Test for reuse** — would this apply on a different surface, in a different repo, next month? If yes, it's a principle candidate. If it's only true for this one screen, leave it as a fix.
4. **Codify** — vet it against the existing principles, then add it (see below).

The same loop runs when _you_ are the one giving feedback. If you find yourself making the same point twice, that's the signal to write it down.

## Vetting a candidate against existing principles

Before adding anything new, check it against the principles already exposed. Surface mismatches instead of going along quietly.

- **Sounds principled but isn't there.** If something is asserted as a design / UX / product principle but isn't in the principle or pillar files, say so plainly: it's reasonable, but it's a _new_ rule, not an existing one. Don't dress a preference up as an existing principle, and don't invent a principle to justify a take.
- **Conflicts with an existing principle.** If guidance contradicts a principle that _is_ exposed, name the specific principle and the tension — reasoning before verdict (see [feedback.md](./feedback.md)). The existing principle isn't automatically right; the point is to make the conflict explicit so it's resolved deliberately, not by accident.
- **Additive refinement.** If a take is consistent but a principle would push it further, offer the refinement as additive — not a correction.

Quote the principle verbatim in this internal check, so the source is verifiable. That's the one place to quote it — see **"Apply the principle; don't cite it"** in [feedback.md](./feedback.md) for why audience-facing feedback shouldn't.

## Adding a new principle

Most feedback maps back to a principle that already exists — promote only genuine gaps. A bloated set dilutes everything in it; a tight one stays trusted.

When the feedback expresses a rule that genuinely isn't covered:

1. **Confirm it's new** — not a restatement or refinement of something already here.
2. **Phrase it in the design system's voice** — a bold imperative one-liner plus a short rationale, matching the existing bullets (e.g. the Pricing section in [ux.md](./ux.md)).
3. **Place it** in the right file and section, and get the wording signed off.
4. **Open a PR against this repo** (`cypress-io/cypress-design`). The PR is the record — there's no separate staging log. Consumer repos read these files from the source, so the principle is live everywhere the moment it merges.

## Related

- [feedback.md](./feedback.md) — giving and receiving feedback; home of "Apply the principle; don't cite it"
- [ux.md](./ux.md) — the largest body of principles; the voice and style to match when phrasing new ones
- [../index.md](../index.md) — the router that points agents at these files
