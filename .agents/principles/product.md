---
name: product
description: Product principles — the why/whether side of the canon, paired with ux.md (the design/what side). Which jobs are worth doing, how the problem gets defined and explored, how success is set, and how the work is run from problem to shipped to learned-from. Fetch when planning or prioritizing an initiative, defining success, planning research, deciding what to ship, or reviewing whether shipped work is measured and followed up.
---

# Product principles

How product work gets decided and run — from naming the problem, to shipping, to learning whether it worked. [ux.md](https://design.cypress.io/agents/principles/ux.md) is the _what_: the UX, the interaction, the shape of the solution. This file is the _why_ and _whether_: is this the right problem, is the job worth doing, will we know if it worked, and does the work actually get finished? Product and design decide the why together — that overlap is intentional — so this file holds the why side, to keep work from stalling, shipping with no way to measure it, or getting abandoned at "almost done."

**The "why" is shared; the "what" is design's.** The problem the product solves — which jobs it serves, and which it deliberately doesn't — is PM and design's to agree on together, before anyone commits to a solution. From that shared why, design owns the what: the solution and its UX hierarchy. The common failure runs backward — a PM or engineer arrives with a _what_ and a _how_ already picked, then reverse-engineers a _why_ to justify shipping it fast. That's selling a solution, not solving a problem, and it usually means the why was never worked out. Pushing back with "why?" until the problem is defined is everyone's job — PM, engineering, and design alike. Design tends to feel the gap first, because it can't choose the right what without a settled why — but that's not a reason design should have to carry it alone.

## Business goals & prioritization

**Name the business goal alongside the JTBD.** Before designing, write both down: what the user is trying to accomplish, and what the business is trying to gain (revenue, retention, activation, qualified leads, NPS, etc.). Without both on paper, you can't evaluate trade-offs honestly, and you'll default to whichever side has the loudest voice in the room.

**When user need and business goal conflict, surface the conflict — don't hide it.** A checkout flow optimized purely for conversion will frustrate users; one optimized purely for user comfort will leave money on the table. The best designs resolve the tension explicitly. The worst pretend it doesn't exist.

**Rank jobs, not solutions — and score the job from both sides.** Prioritize by the customer job, not the feature you'd build for it; how hard something is to build shouldn't decide which customer needs are worth solving. But how much a job matters to the customer is only one input — it says nothing about how much the business gains from solving it, or how long it'll take us (which depends on the solution we pick). Rank on customer importance and business value together (see "UX lives where business goals meet user needs" in [ux.md](https://design.cypress.io/agents/principles/ux.md)), then weigh against cost to solve — without letting "it's hard" bury a job that matters.

**Define what success looks like before you design.** Name the business outcome the work moves and how you'll measure it, up front — knowing how it'll be measured changes the design itself. Skip it and you'll ship, then hunt for metrics that flatter the result. A design you can't tie to a measurable payback isn't done, no matter how polished.

**Sunk cost doesn't earn the next step — the work has to.** "We've already committed" / "we've already started" / "we already told customers" / "we're 80% done" are rationalizations, not reasons to continue. The work earns its way forward today on JTBD, business goal, and success criteria. If those aren't clear, prior effort doesn't change the calculus — correcting course is almost always cheaper than continuing on the strength of an old statement or a partial build. Be especially careful when the "prior commitment" wasn't a real commitment — just an offhand comment or stray promise that got repeated until it felt binding.

**Be data-informed, not data-driven — some prioritization calls won't be fully answerable by data, and that's not license to stall.** Use whatever signal exists to narrow the option space, but when a question genuinely can't be settled by the data available, make the strongest argument you can and act, rather than wait for a certainty the data will never produce. What this doesn't excuse: a decision made with neither data nor a stated rationale — being data-informed still means naming what signal exists and being honest about where it runs out, not skipping the argument entirely.

## Problem definition & discovery

**Start from the problem, not the solution.** The default failure mode — especially on engineering-led teams with AI tools — is jumping to "let's build X" before anyone has named the problem, the job, or the customer it serves. Write the problem in plain terms first. A solution with no problem attached is throwaway work waiting to happen.

**Name the decision before you go looking for data.** Research without a decision attached produces interesting findings and zero action. Before commissioning research, ask: what am I going to do differently depending on what I learn? If there's no answer, the research is performative. Same discipline as "Decide in advance what happens if it doesn't work" below — don't gather signal you haven't committed to acting on.

**A POC has to prove something that matters — say what before you build it.** "We can build it" isn't a result. Name the hypothesis the POC tests and the decision its outcome drives. Are we proving we can launch a rocket, or that we can get to Mars? If you can't say what a successful POC would teach you, you're not ready to build it.

**Map the opportunity space before you commit engineering.** That any single ask is rarely the best solution is the starting point (see "Build against the outcome" and "One solution rarely solves a big problem" in [ux.md](https://design.cypress.io/agents/principles/ux.md)) — this is the discovery practice that acts on it. Chart the candidate solutions to a problem (an opportunity-solution tree works well) and carry a few into discovery, so the comparison happens before the build, not after. Being handed a fixed feature to execute skips the step where solutions get weighed against each other.

**Compare competing solutions on the full cost ledger, not just our build cost.** When you weigh candidate solutions, score every option — before committing — on engineering, design, UX impact across the existing product, documentation, and the customer's cost to adopt (the time to understand it, set it up, and reach the value you marketed). Pick on build cost alone and you can ship the option that's both the most expensive for us to build and support _and_ the hardest for customers to adopt, because the value sits behind docs and manual setup. ("Map the opportunity space before you commit engineering" above says to compare solutions; this says what to compare them on. The customer-adoption axis is the same cost as "Minimize the effort before first value" in [ux.md](https://design.cypress.io/agents/principles/ux.md), measured before the build.)

**Tie every solution to a job, and every job to the vision.** A solution should clearly serve a specific job, and that job should clearly advance the product vision. When those links are missing, work still ships but moves nothing that matters — there's no agreed destination for it to serve. Agree on where you're going before debating how to get there; if the team can't agree on the destination, don't start building.

**Learn the cheap way before you build the expensive way.** Validate the assumption with the lightest test that produces real signal — a fake door, a Wizard-of-Oz flow, a mocked workflow — before committing engineering. Each discovery loop carries one hypothesis and one small, observable thing it's trying to learn. Implementation follows the learning, not the reverse.

**For a bet too big or ambiguous to fake-door test, validate it with a small group of financially-committed customers instead of building alone.** "Learn the cheap way before you build the expensive way" above covers assumptions a lightweight test can answer; some bets — a new product area, a significant platform shift — are too undefined for a fake door to tell you anything real. For those, recruit customers willing to pay something to be part of the build and give continuous feedback throughout, rather than building in isolation for months and finding out who adopts it only at launch. A customer who's paid to be in the room has a real incentive to give honest, engaged feedback — a different signal than feedback from someone with no stake in the outcome.

**Phase by jobs, and keep one standing opportunity doc the loops reference.** Define phases as sets of jobs ("Phase 1 solves these two; Phase 2, the next") and make the sequencing visible so everyone sees why now versus later. List the jobs once in a durable opportunity doc; each discovery loop points at specific jobs instead of re-arguing the whole vision every time.

## Ownership & follow-through

**Every initiative has one owner, through post-launch review.** Work without a clear owner stalls at the first hard decision. The owner drives it to shipped — and to the review after, not just to launch.

**Assign owners and due dates to action items, then track them.** An action item with no owner and no date is how a problem resurfaces months later, still unsolved, after the team has already spent on the wrong thing. If it's worth recording as an action, it's worth assigning.

**Don't let work rot at "almost done."** Staged-but-unshipped work — blocked on a bug, waiting on a call no one owns — is the most expensive state there is: the cost is already paid and the value is never collected. Force an explicit decision: fix and ship, or cancel. Limbo is not a decision. This is the other side of "sunk cost doesn't earn the next step" above — there, don't continue on momentum; here, don't abandon by neglect. Either way, decide on purpose.

**Stop burying low-hanging fruit in tickets.** Small, obvious fixes don't belong in a ticket queue where they'll rot. If the fix is small and the impact is clear, do it directly. Queues exist to coordinate; they're not a substitute for doing the work.

**Content or features kept alive for a specific historical reason don't stay justified by default — recheck the reason, don't just trust it.** A page kept for its SEO traffic, a narrative kept because it once matched the competitive landscape — these accumulate past their useful life if nobody revisits whether the original reason still holds. Anything justified by "we keep this because of [a metric from years ago]" deserves a recheck of that metric on a normal cadence, not indefinite trust in the original call.

## Shipping to learn

In order, all before launch: define success ("Define what success looks like before you design," above) → decide the failure response → build the measurement → put the review date on the calendar. Each step assumes the one before it — and committing to the exit before launch is what keeps sunk cost from deciding for you later.

**Decide in advance what happens if it doesn't work.** When you define success, also define the failure response — iterate, scope down, or pull the feature — before the numbers come in. A success metric with no pre-agreed consequence is one everyone quietly walks away from; naming the response up front makes a missed goal trigger a real decision instead of defaulting to "leave it as-is."

**Build the measurement before you ship, not after.** The dashboard, query, or session path that captures the metric has to exist before launch. Ship without it and you've given up the ability to know whether it worked — you can't repeat a win or catch a regression.

**Don't bundle changes you want to learn from.** Several changes shipped together can't be told apart — if the number moves, you don't know which change moved it. Ship one variable at a time when the goal is learning. When you must bundle, set the confidence threshold up front so you know when there's enough signal to judge the result. (Distinct from release-slicing in [releases.md](https://design.cypress.io/agents/principles/releases.md), which is about not stripping the value out of a release; this is about attribution.) Experiment throughput is also bounded by how much traffic reaches the test — the smaller the funnel, the longer any single test needs to reach significance, and the fewer you can run at once. That's a reason to be deliberate about which few things you test concurrently, not a reason to skip isolating variables.

**Be clear whether a limited release validates the problem or the solution — a half-built version answers neither on its own.** A scope-cut v1 shipped as if it's ready confounds the read both ways: weak adoption looks like "no demand" when it may just be too costly to adopt, and healthy usage looks like "this solution won" when nothing was tested against the alternative. Decide up front which question the release answers and build what's needed to answer it — if you need to know one solution beats another, that takes a real A/B, not a single shipped version. Skip that and the numbers get read as proof of whatever already shipped. (Pairs with "Don't bundle changes you want to learn from" above — that's attribution across changes; this is whether there's a control at all. See also "A POC has to prove something that matters" in Problem definition & discovery.)

**Set the review date before you ship.** Put the date the team will look at results on a real calendar — don't rely on someone remembering. The date is the forcing function that turns "we'll see how it does" into an actual decision.

## After shipping

**Review the data, then decide: keep, iterate, or kill.** Go back to the metrics you defined and read them honestly — right direction, meaningful magnitude? Then make the call and act on it; don't let an initiative linger in uncertainty because no one closed the loop. Check for regressions while you're there: did anything quietly get worse? Weight repeat usage over request volume or one-time visits — a feature people return to is validated in a way a loudly-requested one that gets tried once and abandoned isn't. Low return usage is a prompt to ask why (hard to find? genuinely low value?) before treating it as a kill signal.

**Share what you learned.** Write down what worked, what didn't, and why, where the rest of the team can find it. A learning kept in one person's head doesn't compound; a documented one keeps the next team from re-running the same experiment.

## Related

- [ux.md](https://design.cypress.io/agents/principles/ux.md) — the design/what side: designing for users, patterns, naming, empty states, pricing UX, restraint. "UX lives where business goals meet user needs" is the bridge between the two files
- [feedback.md](https://design.cypress.io/agents/principles/feedback.md) — challenging a solution-first brief before work starts
- [releases.md](https://design.cypress.io/agents/principles/releases.md) — release stages, betas, slicing a release honestly
- [product-review-checklist.md](https://design.cypress.io/agents/product-review-checklist.md) — the before/before-shipping/after checklist that operationalizes these principles
- [index.md](https://design.cypress.io/agents/index.md) — the router that points agents at these files
