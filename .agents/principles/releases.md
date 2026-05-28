---
name: releases
description: Principles for shipping releases, betas, previews, feature flags, canary rollouts, hotfixes, deprecations, and multi-quarter phasing. Fetch when planning a release, scoping a beta, designing rollback triggers, sunsetting a feature, or phasing a long-running initiative.
---

# Releases, Betas, and Previews

## Beta and preview discipline

**Whatever you ship in beta, that's what people think you're building.** Temporary UI corrupts feedback. Users anchor to what they see, not to what you tell them is coming next. "It's just a temporary state" doesn't undo the impression — customers will form opinions about the final product based on the interim version. Be very careful what you put in front of customers and call a "temporary state."

**Name release stages accurately.** "Beta" carries an implied promise — that it's close to the GA bar, just rough around the edges. If what you're shipping is actually a dev preview, call it a dev preview. Customers calibrate their feedback and expectations to the name. Calling a dev preview a "beta" sets them up to be disappointed; calling a beta a "dev preview" undersells work that's ready to be evaluated.

**Distinguish dev preview from GA bar before you ship V1.** A dev preview is "I'm peeking over the shoulder of an engineer mid-build" — rough is acceptable, feedback is on direction. The GA bar is "this is the experience we stand behind" — polish matters, feedback drives final refinements. Make which one this release is, and which one the next release is, explicit to both the team and the customers seeing it.

**Pick which customers see which version deliberately.** Customers you've over-promised to should not be the first ones to see a stripped-down preview — they'll grade it against the promise, not the actual scope. Reserve early previews for customers who'll grade on direction and contribute signal, not for accounts where the gap between promise and reality could damage trust.

## Feature flags

**Feature flags are tools, not strategy — every flag needs a sunset plan.** A flag without a removal date is unfinished work pretending to be done. Decide up front: when does this flag come out, and what's the trigger (% rollout, customer count, success metric)?

**Cleanup is part of the work, not "later."** Old flags accumulate as technical debt and obscure what the codebase actually does. Treat flag removal as a first-class task in the same sprint as the launch, not a back-of-backlog item.

## Canary and phased rollouts

**Pick the canary sample deliberately — random isn't enough.** Roll out to customers whose usage patterns will actually reveal the failures you care about. A random 5% might miss the high-volume customer whose workload exercises the new code path; a chosen 5% won't.

**Define rollback triggers before you ship, not when something breaks.** "We'll just watch the logs" isn't a rollback plan; it's a hope. Name the specific metric, the specific threshold, and the specific action — and write them down before the rollout starts. The team that has rollback criteria pre-agreed actually pulls the trigger; the team that doesn't argues about it for an hour while customers churn.

**Fast rollback enables confident shipping.** A team that can roll back in minutes ships more aggressively than one that can't. Treat rollback as a capability to invest in — feature flags, blue-green, instant DNS swaps, whatever the stack needs — not as an admission of failure.

## Hotfixes

**A hotfix is a triage decision, not a release path.** Hotfixes exist to recover from production failures that can't wait for the next cycle. If hotfixes become routine, the actual problem is upstream — in scope, testing, code review, or release cadence. Fix the upstream cause, don't normalize the workaround.

## Deprecation

**"Sunsetting in 30 days" is a rug pull, not a deprecation.** Give customers real lead time, an in-product migration path, and a clear date communicated _in the product itself_ — not just in release notes nobody reads. Deprecation done well preserves trust; deprecation done in a hurry destroys it.

## Multi-quarter phasing

**Every quarter must deliver standalone value.** If a feature spans Q1–Q4, you can't promise full functionality at the end of Q4 — every customer needs a reason to care after Q1, Q2, and Q3 too. Slice the work so each quarter ships something usable, not just a chunk of an unfinished system. Customers who see "coming soon" for a year stop trusting any roadmap claim.

## Related

- [ux.md](./ux.md) — "If you cut a release into smaller pieces, be honest about why" and "Sunk cost doesn't earn the next step" in the Business goals + user needs section
- [feedback.md](./feedback.md) — Giving and receiving feedback on what gets shipped
