---
name: releases
description: Principles for shipping releases, betas, and previews — how to name them, what to ship, and how to read the feedback you get back. Fetch when planning a release, scoping a beta, or deciding whether interim UI is ready to put in front of customers.
---

# Releases, Betas, and Previews

**Whatever you ship in beta, that's what people think you're building.** Temporary UI corrupts feedback. Users anchor to what they see, not to what you tell them is coming next. "It's just a temporary state" doesn't undo the impression — customers will form opinions about the final product based on the interim version. Be very careful what you put in front of customers and call a "temporary state."

**Name release stages accurately.** "Beta" carries an implied promise — that it's close to the GA bar, just rough around the edges. If what you're shipping is actually a dev preview, call it a dev preview. Customers calibrate their feedback and expectations to the name. Calling a dev preview a "beta" sets them up to be disappointed; calling a beta a "dev preview" undersells work that's ready to be evaluated.

**Distinguish dev preview from GA bar before you ship V1.** A dev preview is "I'm peeking over the shoulder of an engineer mid-build" — rough is acceptable, feedback is on direction. The GA bar is "this is the experience we stand behind" — polish matters, feedback drives final refinements. Make which one this release is, and which one the next release is, explicit to both the team and the customers seeing it.

**Pick which customers see which version deliberately.** Customers you've over-promised to should not be the first ones to see a stripped-down preview — they'll grade it against the promise, not the actual scope. Reserve early previews for customers who'll grade on direction and contribute signal, not for accounts where the gap between promise and reality could damage trust.

## Related

- [ux.md](./ux.md) — "If you cut a release into smaller pieces, be honest about why" and "Sunk cost doesn't earn the next step" in the Business goals + user needs section
- [feedback.md](./feedback.md) — Giving and receiving feedback on what gets shipped
