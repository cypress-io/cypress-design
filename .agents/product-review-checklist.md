---
name: product-review-checklist
description: Run when reviewing a product brief, initiative, or design proposal — before committing engineering, before shipping, and after. Complements review-checklist.md (mechanical UI checks) with product-rigor checks.
---

# Product review checklist

Run before committing engineering to an initiative, before shipping it, and after it ships. If a check doesn't apply, skip it; otherwise it must pass.

This is the product-rigor companion to [review-checklist.md](https://design.cypress.io/agents/review-checklist.md) (tokens, spacing, a11y). That one asks "is the surface built right?"; this one asks "should we be building it, and will we know if it worked?"

## Before starting work

- [ ] The problem is written down, independent of any solution.
- [ ] The customer job is articulated — what outcome are users after, and why can't they get it today?
- [ ] The job is ranked by importance to the customer **and** value to the business — not by how cheap it is to build.
- [ ] Problem importance is backed by data: how many customers, ARR at risk, churn signal — not assumed.
- [ ] More than one solution was considered, and each is scored on the full cost ledger — engineering, design, UX impact, docs, and customer cost-to-adopt — not just build cost.
- [ ] The opportunity is sized against other priorities — is this the best use of the resource right now?
- [ ] Success metrics are defined: what improves, by how much, and what would count as failure — define it now, since how you measure success shapes the solution.

## Before shipping

- [ ] The failure response is decided before launch — iterate, scope down, or kill.
- [ ] Measurement infrastructure exists — dashboard, query, or session path — before launch.
- [ ] Changes ship incrementally where possible; if bundled, the confidence threshold is set.
- [ ] It's explicit whether this release validates the problem or the solution, and the comparison needed to read the result (e.g. an A/B) exists.
- [ ] A review date is on the calendar.
- [ ] The initiative has one clear owner, through post-launch.

## After shipping

- [ ] The defined metrics were actually reviewed — direction and magnitude.
- [ ] Checked for regressions and silent failures.
- [ ] A decision was made and acted on: keep, iterate, or kill — not left in limbo.
- [ ] Learnings were documented and shared with the team.

If a check fails, fix the gap before proceeding — don't waive it.
