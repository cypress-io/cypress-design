---
name: releases
description: Principles for shipping releases, betas, previews, feature flags, and deprecations. Fetch when planning a release, scoping a beta, managing feature flags, or sunsetting a feature.
---

# Releases, Betas, and Previews

## Beta and preview discipline

**Whatever you ship in beta, that's what people think you're building.** Temporary UI corrupts feedback. Users anchor to what they see, not to what you tell them is coming next. "It's just a temporary state" doesn't undo the impression — customers will form opinions about the final product based on the interim version. Be very careful what you put in front of customers and call a "temporary state."

**Name release stages accurately.** "Beta" carries an implied promise — that it's close to the GA bar, just rough around the edges. If what you're shipping is actually a dev preview, call it a dev preview. Customers calibrate their feedback and expectations to the name. Calling a dev preview a "beta" sets them up to be disappointed; calling a beta a "dev preview" undersells work that's ready to be evaluated.

**Distinguish dev preview from GA bar before you ship V1.** A dev preview is "I'm peeking over the shoulder of an engineer mid-build" — rough is acceptable, feedback is on direction. The GA bar is "this is the experience we stand behind" — polish matters, feedback drives final refinements. Make which one this release is, and which one the next release is, explicit to both the team and the customers seeing it.

**Pick which customers see which version deliberately.** Customers you've over-promised to should not be the first ones to see a stripped-down preview — they'll grade it against the promise, not the actual scope. Reserve early previews for customers who'll grade on direction and contribute signal, not for accounts where the gap between promise and reality could damage trust.

## Release titles

**Lead with the benefit, but name the feature when people search for it.** Release titles follow the same benefit-first rule as the rest of the product ([voice.md](../voice.md), "Leading with value") — open on the outcome, not the mechanism. A release index adds a second job: it's a scan-and-navigate surface, and for some launches a search-and-discovery one. A benefit-only title can leave someone scanning the list unsure what actually shipped, and feature or category names aren't always self-explanatory on their own (e.g. "Smart Orchestration").

**When a release introduces a term people come looking for — a product or feature name with recognition or search value, like "Cloud MCP" — put it in the title alongside the benefit.** Keep the benefit-led phrasing, and tag it with the name as a short prefix: `Cloud MCP Beta: Debug failing tests with your AI assistant`, not `Debug failing tests with your AI assistant (beta)`. The value-first phrasing stays; the title also reads clearly to scanners and search.

**Don't force a name into every title.** Use this when the term carries recognition or SEO weight people actually scan or search for. If a feature name adds no discovery value, keep the clean benefit-led title.

## Feature flags

**Feature flags are tools, not strategy — every flag needs a sunset plan.** A flag without a removal date is unfinished work pretending to be done. Decide up front: when does this flag come out, and what's the trigger (% rollout, customer count, success metric)?

**Cleanup is part of the work, not "later."** Old flags accumulate as technical debt and obscure what the codebase actually does. Treat flag removal as a first-class task in the same sprint as the launch, not a back-of-backlog item.

## Deprecation

**"Sunsetting in 30 days" is a rug pull, not a deprecation.** Give customers real lead time, an in-product migration path, and a clear date communicated _in the product itself_ — not just in release notes nobody reads. Deprecation done well preserves trust; deprecation done in a hurry destroys it. The same rule runs in reverse when you make a free capability paid — see [ux.md](./ux.md), "Turning a free capability paid is a rug pull" in the Pricing section.

## Related

- [ux.md](./ux.md) — "If you cut a release into smaller pieces, be honest about why" and "Sunk cost doesn't earn the next step" in the Business goals + user needs section; "Turning a free capability paid is a rug pull" in the Pricing section — the free→paid mirror of the deprecation rule above
- [feedback.md](./feedback.md) — Giving and receiving feedback on what gets shipped
