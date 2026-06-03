---
name: product-process
description: Product and delivery process principles — ownership, shipping to learn, and post-launch follow-through. Fetch when planning or prioritizing an initiative, deciding what to ship, or reviewing whether shipped work is being measured and followed up. Pairs with ux.md (what to build and why) — this file is how the work is run.
---

# Product & delivery process

How work gets from problem to shipped to learned-from. The principles in [ux.md](./ux.md) cover _what_ to build and _why_; these cover _how the work is run_ so it doesn't stall, ship blind, or get abandoned at "almost done."

## Ownership & follow-through

**Every initiative has one owner, through post-launch review.** Work without a clear owner stalls at the first hard decision. The owner drives it to shipped — and to the review after, not just to launch.

**Assign owners and due dates to action items, then track them.** An action item with no owner and no date is how a problem resurfaces months later, still unsolved, after the team has already spent on the wrong thing. If it's worth recording as an action, it's worth assigning.

**Don't let work rot at "almost done."** Staged-but-unshipped work — blocked on a bug, waiting on a call no one owns — is the most expensive state there is: the cost is already paid and the value is never collected. Force an explicit decision: fix and ship, or cancel. Limbo is not a decision. This is the other side of "sunk cost doesn't earn the next step" in [ux.md](./ux.md) — there, don't continue on momentum; here, don't abandon by neglect. Either way, decide on purpose.

## Shipping to learn

**Build the measurement before you ship, not after.** Defining the success metric isn't enough — the dashboard, query, or session path that captures it has to exist before launch. Ship without it and you've given up the ability to know whether it worked, which means you can't repeat a win or catch a regression. Pairs with "Define what success looks like before you design" in [ux.md](./ux.md): that names the metric; this makes it observable.

**Don't bundle changes you want to learn from.** Several changes shipped together can't be told apart — if the number moves, you don't know which change moved it. Ship one variable at a time when the goal is learning. When you must bundle, set the confidence threshold up front so you know when there's enough signal to judge the result. (Distinct from release-slicing in [ux.md](./ux.md), which is about not stripping the value out of a release; this is about attribution.)

**Set the review date before you ship.** Put the date the team will look at results on a real calendar, before launch — don't rely on someone remembering to check. The date is the forcing function that turns "we'll see how it does" into an actual decision. Pairs with "Decide in advance what happens if it doesn't work" in [ux.md](./ux.md).

## After shipping

**Review the data, then decide: keep, iterate, or kill.** Go back to the metrics you defined and read them honestly — right direction, meaningful magnitude? Then make the call and act on it; don't let an initiative linger in uncertainty because no one closed the loop. Check for regressions while you're there: did anything quietly get worse?

**Share what you learned.** Write down what worked, what didn't, and why, where the rest of the team can find it. A learning kept in one person's head doesn't compound; a documented one keeps the next team from re-running the same experiment.

## Related

- [ux.md](./ux.md) — what to build and why; success criteria, prioritization, and the sunk-cost rule this file pairs with
- [feedback.md](./feedback.md) — challenging a solution-first brief before work starts
- [../product-review-checklist.md](../product-review-checklist.md) — the before/before-shipping/after checklist that operationalizes these principles
- [../index.md](../index.md) — the router that points agents at these files
