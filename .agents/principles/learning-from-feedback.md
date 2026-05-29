---
name: learning-from-feedback
description: Fetch on every feedback exchange — given or received, from any author (teammates, other agents, Copilot, automation) and on any surface (PR review, Slack, Zoom recap, Claude, GitHub comment). Each piece of feedback is a chance to find a reusable rule; this file shows how to spot the rule, confirm it with the human, and codify it as a principle.
---

# Learning from feedback

Most feedback is a one-off fix. Some of it is a rule in disguise — the same point you'd make again next week on a different surface. This file is about catching the second kind and writing it down, so the next reviewer (human or agent) starts from the same place.

Feedback comes from many places — teammates by name (Brian, Emil, Jennifer, Ryan), other agents, Copilot, automated checks. The source doesn't change the loop; weight humans higher when their feedback expresses intent the codebase can't yet show.

The principles are a living document. They grow from real feedback and decisions, not from theory.

## When feedback arrives, run these four steps

1. **Notice** — treat every piece of feedback as a candidate for a rule, not just a task to finish. This applies whether the feedback is framed as a principle or not. Most of it won't be.
2. **Extract — ask the human for the why.** "Move this label up" is a fix. The rule is hiding in the reason behind the fix. If the human didn't say _why_, ask: "Is the rule here that labels sit above their input unless space forbids it, or is this one-off?" Their answer becomes the rule. Don't infer it silently — the confirmation step is the point.
3. **Test for reuse** — would this apply on a different surface, in a different repo, next month? If yes, it's a principle candidate. If it's only true for this one screen, leave it as a fix.
4. **Codify** — vet it against the existing principles, then add it (see below).

The same loop runs when _you_ are the one giving feedback. If you find yourself making the same point twice, that's the signal to write it down.

## Vetting a candidate against existing principles

Before adding anything new, check it against the principles already exposed. Surface mismatches instead of going along quietly.

- **Sounds principled but isn't there.** If something is asserted as a design / UX / product principle but isn't in the principle or pillar files, say so plainly: it's reasonable, but it's a _new_ rule, not an existing one. Don't dress a preference up as an existing principle, and don't invent a principle to justify a take.
- **Conflicts with an existing principle.** If guidance contradicts a principle that _is_ exposed, name the specific principle and the tension — reasoning before verdict (see [feedback.md](./feedback.md)). The existing principle isn't automatically right; the point is to make the conflict explicit so it's resolved deliberately, not by accident.
- **Additive refinement.** If a take is consistent but a principle would push it further, offer the refinement as additive — not a correction.

Quote the principle verbatim back to the human in the review or reply itself. The quote is how the human confirms that this rule should be documented — or that the rule the agent _thinks_ it heard is what they actually meant. This is a live, audience-facing confirmation, not a private check. (See **"Apply the principle; don't cite it"** in [feedback.md](./feedback.md) — that rule governs how to _apply_ a settled principle in everyday feedback; the quote here is the moment you're settling a new one.)

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
