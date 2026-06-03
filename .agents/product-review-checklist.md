---
name: product-review-checklist
description: Run when reviewing a product brief, initiative, or design proposal — before committing engineering, before shipping, and after. Complements review-checklist.md (mechanical UI checks) with product-rigor checks. Distilled from principles/ux.md and principles/product.md.
---

# Product review checklist

Run before committing engineering to an initiative, before shipping it, and after it ships. If a check doesn't apply, skip it; otherwise it must pass. Each maps to a principle in [principles/ux.md](./principles/ux.md) or [principles/product.md](./principles/product.md).

This is the product-rigor companion to [review-checklist.md](./review-checklist.md) (tokens, spacing, a11y). That one asks "is the surface built right?"; this one asks "should we be building it, and will we know if it worked?"

## Before starting work

- [ ] The problem is written down, independent of any solution. ("Start from the problem, not the solution")
- [ ] The customer job is articulated — what outcome are users after, and why can't they get it today? ("Start with jobs to be done")
- [ ] The job is ranked by importance to the customer **and** value to the business — not by how easy it is to build. ("Rank jobs, not solutions")
- [ ] Problem importance is backed by data: how many customers, ARR at risk, churn signal — not assumed. ("Learn the cheap way" / "Name the business goal")
- [ ] More than one solution was considered, with pros / cons / trade-offs documented. ("Map the opportunity space before you commit engineering")
- [ ] The opportunity is sized against other priorities — is this the best use of the resource right now? ("Rank jobs, not solutions")
- [ ] Success metrics are defined: what improves, by how much, and what would count as failure — define it now, since how you measure success shapes the solution. ("Define what success looks like before you design")
- [ ] The failure response is decided up front — iterate, scope down, or kill. ("Decide in advance what happens if it doesn't work")

## Before shipping

- [ ] Measurement infrastructure exists — dashboard, query, or session path — before launch. ("Build the measurement before you ship")
- [ ] Changes ship incrementally where possible; if bundled, the confidence threshold is set. ("Don't bundle changes you want to learn from")
- [ ] A review date is on the calendar. ("Set the review date before you ship")
- [ ] The initiative has one clear owner, through post-launch. ("Every initiative has one owner")

## After shipping

- [ ] The defined metrics were actually reviewed — direction and magnitude. ("Review the data, then decide")
- [ ] Checked for regressions and silent failures. ("Review the data, then decide")
- [ ] A decision was made and acted on: keep, iterate, or kill — not left in limbo. ("Review the data, then decide" / "Don't let work rot at 'almost done'")
- [ ] Learnings were documented and shared with the team. ("Share what you learned")

If a check fails, fix the gap before proceeding — don't waive it.
