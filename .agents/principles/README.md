---
name: principles-maintenance
description: How the design principles are maintained — vetting feedback framed as a principle, and the living-document loop for adding new ones. Fetch when feedback is framed as a principle, when deciding whether something is a new principle, or when proposing a change to the principle set.
---

# Maintaining the principles

These principles are a **living document.** They grow from real feedback and decisions, not from theory. Two disciplines keep the set trustworthy: vetting what gets called a principle, and a clear path for adding new ones.

## Vetting feedback framed as a principle

When feedback or a decision is asserted as a principle, check it against the exposed principles before accepting it — and surface mismatches rather than going along quietly.

- **Sounds principled but isn't there.** If a claim is asserted as a design / UX / product principle but has no basis in the principle or pillar files, say so plainly: it's reasonable, but it's a _new_ rule, not an existing one. Don't dress a preference up as canon, and don't invent a principle to justify a take.
- **Conflicts with an existing principle.** If guidance contradicts a principle that _is_ exposed, name the specific principle and the tension — reasoning before verdict (see [feedback.md](./feedback.md)). The existing principle isn't automatically right; the point is to make the conflict explicit so it's resolved deliberately, not by accident.
- **Additive refinement.** If a take is consistent but a principle would push it further, offer the refinement as additive — not as a correction.

Quote the principle verbatim in this internal check, so the source is verifiable. That's the one place to quote it — see **"Apply the principle; don't cite it"** in [feedback.md](./feedback.md) for why audience-facing feedback shouldn't.

## Adding a new principle

Most feedback maps back to a principle that already exists — promote only genuine gaps. A bloated set dilutes the canon; a tight one stays trusted.

When feedback expresses a rule that genuinely isn't covered:

1. **Confirm it's new** — not a restatement or a refinement of something already here.
2. **Phrase it in the design system's voice** — a bold imperative one-liner plus a short rationale, matching the existing bullets (e.g. the Pricing section in [ux.md](./ux.md)).
3. **Place it** in the right file and section, and get the wording signed off.
4. **Open a PR against this repo** (`cypress-io/cypress-design`). The PR is the record — there's no separate staging log. Consumer repos read these files from the source, so the principle is live everywhere the moment it merges.

## Related

- [feedback.md](./feedback.md) — giving and receiving feedback; home of "Apply the principle; don't cite it"
- [ux.md](./ux.md) — the largest body of principles; the voice and style to match when phrasing new ones
- [../index.md](../index.md) — the router that points agents at these files
