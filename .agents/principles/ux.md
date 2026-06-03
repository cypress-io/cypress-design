---
name: ux
description: UX, product design, and business-goal principles. Fetch when designing new flows, evaluating proposed UX, defining success, planning research, reviewing screens, or making product decisions about how features should work.
---

# UX & Product Design Principles

## Business goals + user needs

**UX lives where business goals meet user needs.** JTBD captures the user side well, but the framework is usually phrased entirely from the user's perspective — which quietly hides the business outcome a design has to drive. Good UX serves both at once. If a flow only serves the user, the business gets nothing measurable; if it only serves the business, users feel manipulated and leave. The work is to find designs where both sides win.

**Name the business goal alongside the JTBD.** Before designing, write both down: what the user is trying to accomplish, and what the business is trying to gain (revenue, retention, activation, qualified leads, NPS, etc.). Without both on paper, you can't evaluate trade-offs honestly, and you'll default to whichever side has the loudest voice in the room.

**When user need and business goal conflict, surface the conflict — don't hide it.** A checkout flow optimized purely for conversion will frustrate users; one optimized purely for user comfort will leave money on the table. The best designs resolve the tension explicitly. The worst pretend it doesn't exist.

**Rank jobs, not solutions — and score the job from both sides.** Prioritize by the customer job, not the feature you'd build for it; how hard something is to build shouldn't decide which customer needs are worth solving. But how much a job matters to the customer is only one input — it says nothing about how much the business gains from solving it, or how long it'll take us (which depends on the solution we pick). Rank on customer importance and business value together (see "UX lives where business goals meet user needs," above), then weigh against cost to solve — without letting "it's hard" bury a job that matters.

**A design isn't done until you can explain how it pays back.** If you can't articulate what business outcome the design moves and how you'll measure it, the design is incomplete — no matter how polished it looks.

**Define what success looks like before you design.** Knowing how the work will be measured changes the design itself. Without explicit success criteria, you'll ship and then look for metrics that flatter the result. (Decide the failure response — iterate, scope down, or pull — up front too; see "Decide in advance what happens if it doesn't work" in [product.md](./product.md).)

**Sunk cost doesn't earn the next step — the work has to.** "We've already committed" / "we've already started" / "we already told customers" / "we're 80% done" are rationalizations, not reasons to continue. The work earns its way forward today on JTBD, business goal, and success criteria. If those aren't clear, prior effort doesn't change the calculus — correcting course is almost always cheaper than continuing on the strength of an old statement or a partial build. Be especially careful when the "prior commitment" wasn't a real commitment — just an offhand comment or stray promise that got repeated until it felt binding.

**PMs and design co-own the "why"; design owns the "what."** Which jobs the product serves — and which it deliberately doesn't — has to be agreed by both before anyone commits to a solution. From that shared why, design owns the what: the solution and its UX hierarchy. The common failure runs backward — a PM or engineer arrives with a _what_ and a _how_ already picked, then reverse-engineers a _why_ to justify shipping it fast. That's selling a solution, not solving a problem, and it usually means the why was never worked out. Pushing back with "why?" until the problem is defined is everyone's job — PM, engineering, and design alike. Design tends to feel the gap first, because it can't choose the right what without a settled why — but that's not a reason design should have to carry it alone.

## Discovery & problem definition

**Start from the problem, not the solution.** The default failure mode — especially on engineering-led teams with AI tools — is jumping to "let's build X" before anyone has named the problem, the job, or the customer it serves. Write the problem in plain terms first. A solution with no problem attached is throwaway work waiting to happen.

**A POC has to prove something that matters — say what before you build it.** "We can build it" isn't a result. Name the hypothesis the POC tests and the decision its outcome drives. Are we proving we can launch a rocket, or that we can get to Mars? If you can't say what a successful POC would teach you, you're not ready to build it.

**Map the opportunity space before you commit engineering.** That any single ask is rarely the best solution is the starting point (see "Build against the outcome" and "One solution rarely solves a big problem") — this is the discovery practice that acts on it. Chart the candidate solutions to a problem (an opportunity-solution tree works well) and carry a few into discovery, so the comparison happens before the build, not after. Being handed a fixed feature to execute skips the step where solutions get weighed against each other.

**Tie every solution to a job, and every job to the vision.** A solution should clearly serve a specific job, and that job should clearly advance the product vision. When those links are missing, work still ships but moves nothing that matters — there's no agreed destination for it to serve. Agree on where you're going before debating how to get there; if the team can't agree on the destination, don't start building.

**Learn the cheap way before you build the expensive way.** Validate the assumption with the lightest test that produces real signal — a fake door, a Wizard-of-Oz flow, a mocked workflow — before committing engineering. Each discovery loop carries one hypothesis and one small, observable thing it's trying to learn. Implementation follows the learning, not the reverse.

**Phase by jobs, and keep one standing opportunity doc the loops reference.** Define phases as sets of jobs ("Phase 1 solves these two; Phase 2, the next") and make the sequencing visible so everyone sees why now versus later. List the jobs once in a durable opportunity doc; each discovery loop points at specific jobs instead of re-arguing the whole vision every time.

## Designing for users

**Start with jobs to be done, not the screen.** If the JTBD isn't clear, the UX won't be either — no matter how nice the pixels look. Intuitive design follows from clarity about the underlying job; it doesn't precede it.

**Respect the primary job. Don't optimize for secondary ones.** Every secondary job you try to support competes with the main one for attention and visual real estate. A clean UI that nails the primary task beats a busy UI that tries to support every edge case.

**New features are sub-jobs of existing ones — don't let the feature become the job.** Most "new features" map back to a job the product already serves. Find the parent job first, then design the new capability as a sub-job under it. Designing a feature as if it's a new job creates a UI that competes with the rest of the product instead of extending it.

**Don't solve UX problems by throwing more UI and text at them.** When users keep tripping, the instinct is to add a tooltip, banner, empty state, or guide. That's a bandaid. The real fix is to eliminate the root cause in the interaction itself. Bandaids accumulate; intuitive design compounds.

**Don't interrupt the user's task with uninvited overlays.** Tour pop-ups, coach marks, and in-app announcements fire context-blind — they land while someone is debugging a failed test or about to ship a PR, exactly when an interruption costs the most. The intent is usually pure; the mechanism isn't, and a technical audience dismisses them before reading a word. A feature that needs a guided tour to be usable isn't intuitive yet — fix the interface, don't narrate it. Genuine news belongs where users find it on their own terms, not blocking the task they came to do.

**Ship the simplest version first. Complexity is earned by real user confusion, not anticipated edge cases.** Adding more UI to anticipate confusion you haven't seen yet usually creates the confusion. Start minimal, watch what trips users up, and only add when the confusion is real.

**Reduce surfaces to a small set of recognizable patterns.** UX is pattern recognition. When two adjacent surfaces behave by different rules, users have to relearn each one. Pick the smallest workable set of patterns and apply them consistently across the product.

**Don't follow another product's vocabulary down a rabbit hole.** If a vendor's term is confusing in your context, replace it with one that fits your users. Borrowing a vendor's data is fine; inheriting their UX debt is not.

**Consistency in language is non-negotiable.** Brevity matters, but consistency matters more. Different words for the same concept across different surfaces erodes user trust and slows comprehension.

**Don't over-optimize for consistency either.** Forcing every surface into the same pattern can introduce its own UX problem. Consistency is a default, not a religion — break it deliberately when the job demands it.

**Progressive disclosure means not asking.** Every extra form field, setting, or toggle is a question you haven't justified yet. Default to the bare minimum the user needs to make progress; surface the rest only when the task requires it. Asking for things "in case we need them later" is a tax on every user who never needs them.

**Build against the outcome, not the literal request.** Customers don't know your product, your team, or what you can build. They ask for features in their own words — usually solutions they've already half-stitched-together in their head. That's a signal, not a spec. The most useful question is six words: _"what outcome are you looking for?"_ It surfaces the why behind the why and gives them room to keep working it out as they say it. Half the time the asked-for feature is one of many possible solutions, and often not the best one. The job is helping find the right ask, not answering the wrong one.

**Filters and checkboxes are a smell.** If finding value in the product requires becoming a power user, the product is failing. Features of real value should be first-class citizens, not buried behind configuration.

**Requests for advanced UI are usually a signal of noise — not a spec to build.** When users ask for more filters, favorites, saved views, search options, or any other power-user interface, they're really telling you the firehose is overwhelming and they can't find what's relevant. Reach for simpler tools first: sorting, grouping, smarter defaults. These benefit everyone, are reversible, and don't lock you into advanced features you can't easily remove later without complaints. Most of the time, the right default order or grouping makes the advanced interface unnecessary in the first place.

**Guides over feature lists.** People show up to accomplish a task, not to read a catalogue. Documentation and design should be organized around tasks, not around the surface area of the product.

**One solution rarely solves a big problem.** Be skeptical of any plan that hangs an outcome like "10x leads" on a single page or feature. Big outcomes come from dozens of small, compounding solutions.

**Set the table the user expects on trust-sensitive flows.** Cancellation, sign-in, checkout, billing, account deletion — these flows have to live at trusted URLs, know the user's context automatically, show real impact, and look unmistakably on-brand. Anything that feels off triggers abandonment and support load.

**Cut content by 25–50% before you ship it.** Body copy is the first place to find restraint. Most drafts can lose a quarter to a half of their words without losing meaning — and gain clarity in the process.

**Auto-rotating carousels feel like a rug pull.** Default to manual prev/next controls. If auto-rotation is unavoidable, provide a visible pause. Reading something only to have it disappear is a user-hostile pattern.

**Prioritize public-facing work over internal.** If most people will never see it (internal slides, dashboards, throwaway docs), don't burn design time on it. Save the polish for surfaces that drive outcomes.

**Prototype against real data, not Figma mocks.** Fake data hides the actual UX problems. The point of a prototype is to fail fast on the things you can't see otherwise — and you only see them with the real shape, density, and edge cases of production data.

**Tense matters in UI labels.** Past tense ("self-healed") describes something that already happened. Present-progressive ("self-healing") implies an ongoing state or a filter. These describe different jobs — pick deliberately.

**Name the exact scope of every action.** Labels like "everything" or "all" without scope are misleading — users can't tell whether the action affects the current view, the entire account, or something in between. Spell out exactly what the action will touch ("Run all specs again" not "Run everything again"). Ambiguity at a button is a support ticket waiting to happen.

**Build for the people who buy it, not just the people who trigger it.** A lot of features are designed for the user who hits the feature day-to-day — but the person who decides to pay for it is often someone else (an EM, a director, a CTO). Design for both: the day-to-day user has to be able to use it, but the surface area, reporting, and visibility have to give the buyer reasons to keep the line item.

## Onboarding

**Capture user intent upfront — and eliminate the dead ends it reveals.** Asking "what are you here to do?" early is valuable only if you actually route each answer to a working path. Surfacing intent without removing the dead ends just diagnoses the broken thing without fixing it.

**Onboarding copy leads with value, not product actions.** "Manage your test runs" is not a value proposition — it's a task description. Flip every onboarding line to lead with what the user gains (faster debugging, replayable failures, clearer signal across CI), not what they do.

## Empty states and dead ends

**Never give people a dead end. They should always know how to proceed.** Any state a user can land in — empty, error, partial, end-of-flow, no-results — needs a clear path forward. "No items found" without a try-this-instead, "request failed" without a recovery action, "you're done" without a next step are all dead ends, even when they're technically accurate. Anticipating every state the user can reach, and designing how they exit it, is a UX baseline — not a polish item.

**Empty states without a signal or CTA look like bugs.** If a section has nothing in it and gives no hint of what to do next, users assume the page is broken. Every empty state needs a one-line explanation ("you haven't connected any integrations yet") and a path forward ("Connect one →").

For errors, warnings, and other system-to-user failure messages, see [`../errors.md`](../errors.md) — the principles there (structure, tone, link conventions, no-blame, transient handling) apply whenever the product talks to the user about something that happened.

## Feature naming & positioning

**Naming collisions with existing features create UX debt instantly.** If a new feature reuses a term that already means something else in the product (or in adjacent products customers know), customers will conflate the two. Rename before you ship — migrations after launch are far more expensive than getting the name right up front.

**Feature names communicate value, not mechanics.** "Optimization" tells the user what they get. "Rerun strategy" describes what the feature does internally. Pick the name that signals the outcome — mechanics belong in the docs, not the label.

**Design picks naming candidates. GTM validates.** Designers know the product surface and the user vocabulary; GTM knows how the name will land in trial calls, ads, and sales conversations. Don't finalize a feature name without that loop.

**Feature placement is a statement of belief — and a price signal.** Burying a high-value feature in settings tells everyone — customers, sales, and the rest of the team — that you don't believe it deserves attention, and shipping an enterprise-grade capability as "just config" tells them it isn't worth paying for. If the feature is real, give it real placement; if it protects the customer's business the way a security or audit product does, position and price it that way. If it doesn't deserve real placement, question why you're shipping it at all. (This is about how the _real_ feature ships — a deliberately quiet dev preview is a separate choice; see [releases.md](./releases.md).)

## Pricing

**Don't gate features that should be free.** Detection should be free; analytics and history are worth paying for. Pricing should follow real value, not the desire to use a feature as a paywall hook. Gating obvious value drives churn faster than it drives revenue.

**A consumption cap isn't a paywall — don't conflate them.** Gating _value_ to force payment drives churn (above). Capping _consumption_ that carries real marginal cost — when there's no billing relationship to charge an overage against — is a cost control, not a paywall, and it's legitimate. A hard cap on the free tier protects against unbillable usage; the same cap on a paying tier should be an overage, not a wall. Be clear which one you're imposing, and why.

**When you must enforce a limit, fail the smallest unit — don't halt the whole workflow.** A quota or billing cap shouldn't stop an entire run; degrade at the unit of work — the one prompt, test, or request that couldn't proceed — and let everything else keep moving. This is graceful degradation: a general resilience rule, but a load-bearing one for pricing, because blocking a whole session to enforce a per-item limit turns a cost control into a dead end. The failed unit still needs an exit — upgrade, overage, retry — per "Never give people a dead end" in the Empty states and dead ends section above.

**Defensive pricing solutions can be the right call.** Keeping customers at a lower price point beats losing them entirely to a competitor. Pricing isn't only about maximizing each account — sometimes the math of retention beats the math of upsell.

**Signal future monetization at first exposure — not after adoption.** If a feature will eventually be paid, restricted to a higher tier, or moved behind an enterprise plan, position it that way from day one — "preview of an enterprise capability," "free during preview, paid in the future," or similar. Letting customers anchor on it as a standard included setting and then changing the model later creates product debt and a rug-pull conversation. The moment to set the expectation is on first exposure, when customers form their mental model — not a year in, when changing it means explaining why we're now charging for something they've used freely.

**Turning a free capability paid is a rug pull unless you give lead time and promise no retroactive charges.** Charging for something customers have used freely is as trust-sensitive as deprecating something they depend on, and gets the same treatment: announce before it lands, give a grace period, and state explicitly that nothing already used will be billed retroactively. Signaling monetization at first exposure (above) sets the expectation; this is the commitment that keeps the GA moment from reading as a bait-and-switch. See [releases.md](./releases.md) — the "Sunsetting in 30 days" rug-pull rule is the same logic from the deprecation side.

**Sell the risk people are protecting against, not the feature.** People invest in testing because they have a business to protect — outages, regressions, brand damage. Lead with that. CI minutes and run times are useful supporting evidence, never the headline. Insurance and security companies sell risk for a reason.

**Show people exactly how much they're leaving on the table.** Concrete, personalized savings metrics ("upgrading to Business saves you 12 hours of CI per week") are the only upgrade prompt that actually works. Generic "upgrade for more features" doesn't compete with that.

**A CTA that doesn't complete its implied promise is misleading.** If "Get Started" on a paid plan actually puts users on the free plan, the button is lying. Match the CTA to the real flow — "Request a Demo" for paths that need sales, "Start Free" for self-serve trials, etc. The user shouldn't have to guess what will happen.

**Don't name a tool for what it doesn't deliver.** An "ROI Calculator" that only shows return without the investment isn't an ROI calculator — it's a savings estimate dressed up. Either deliver both sides of the equation or name the tool accurately for what it actually does.

## Related

- [visual-hierarchy.md](./visual-hierarchy.md) — Directing the eye once the JTBD is clear
- [feedback.md](./feedback.md) — How to push back when framing is wrong
- [../personas.md](../personas.md) — Who you're designing for
- [../voice.md](../voice.md) — Copy tone
