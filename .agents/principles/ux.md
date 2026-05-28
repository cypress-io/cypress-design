---
name: ux
description: UX and product design principles. Fetch when designing new flows, evaluating proposed UX, reviewing screens, or making product decisions about how features should work.
---

# UX & Product Design Principles

**Start with jobs to be done, not the screen.** If the JTBD isn't clear, the UX won't be either — no matter how nice the pixels look. Intuitive design follows from clarity about the underlying job; it doesn't precede it.

**Respect the primary job. Don't optimize for secondary ones.** Every secondary job you try to support competes with the main one for attention and visual real estate. A clean UI that nails the primary task beats a busy UI that tries to support every edge case.

**Don't solve UX problems by throwing more UI and text at them.** When users keep tripping, the instinct is to add a tooltip, banner, empty state, or guide. That's a bandaid. The real fix is to eliminate the root cause in the interaction itself. Bandaids accumulate; intuitive design compounds.

**Reduce surfaces to a small set of recognizable patterns.** UX is pattern recognition. When two adjacent surfaces behave by different rules, users have to relearn each one. Pick the smallest workable set of patterns and apply them consistently across the product.

**Don't follow another product's vocabulary down a rabbit hole.** If a vendor's term is confusing in your context, replace it with one that fits your users. Borrowing a vendor's data is fine; inheriting their UX debt is not.

**Consistency in language is non-negotiable.** Brevity matters, but consistency matters more. Different words for the same concept across different surfaces erodes user trust and slows comprehension.

**Don't over-optimize for consistency either.** Forcing every surface into the same pattern can introduce its own UX problem. Consistency is a default, not a religion — break it deliberately when the job demands it.

**Filters and checkboxes are a smell.** If finding value in the product requires becoming a power user, the product is failing. Features of real value should be first-class citizens, not buried behind configuration.

**Requests for advanced UI are usually a signal of noise — not a spec to build.** When users ask for more filters, favorites, saved views, search options, or any other power-user interface, they're really telling you the firehose is overwhelming and they can't find what's relevant. Reach for simpler tools first: sorting, grouping, smarter defaults. These benefit everyone, are reversible, and don't lock you into advanced features you can't easily remove later without complaints. Most of the time, the right default order or grouping makes the advanced interface unnecessary in the first place.

**Guides over feature lists.** People show up to accomplish a task, not to read a catalogue. Documentation and design should be organized around tasks, not around the surface area of the product.

**One solution rarely solves a big problem.** Be skeptical of any plan that hangs an outcome like "10x leads" on a single page or feature. Big outcomes come from dozens of small, compounding solutions.

**Set the table the user expects on trust-sensitive flows.** Cancellation, sign-in, checkout, billing, account deletion — these flows have to live at trusted URLs, know the user's context automatically, show real impact, and look unmistakably on-brand. Anything that feels off triggers abandonment and support load.

**Cut content by 25–50% before you ship it.** Body copy is the first place to find restraint. Most drafts can lose a quarter to a half of their words without losing meaning — and gain clarity in the process.

**Auto-rotating carousels feel like a rug pull.** Default to manual prev/next controls. If auto-rotation is unavoidable, provide a visible pause. Reading something only to have it disappear is a user-hostile pattern.

**Prioritize public-facing work over internal.** If most people will never see it (internal slides, dashboards, throwaway docs), don't burn design time on it. Save the polish for surfaces that drive outcomes.

**Prototype against real data, not Figma mocks.** Fake data hides the actual UX problems. The point of a prototype is to fail fast on the things you can't see otherwise — and you only see them with the real shape, density, and edge cases of production data.

**Stop burying low-hanging fruit in tickets.** Small, obvious fixes don't belong in a ticket queue where they'll rot. If the fix is small and the impact is clear, do it directly. Queues exist to coordinate; they're not a substitute for doing the work.

**Tense matters in UI labels.** Past tense ("self-healed") describes something that already happened. Present-progressive ("self-healing") implies an ongoing state or a filter. These describe different jobs — pick deliberately.

**Don't gate features that should be free.** Detection should be free; analytics and history are worth paying for. Pricing should follow real value, not the desire to use a feature as a paywall hook. Gating obvious value drives churn faster than it drives revenue.

**Defensive pricing solutions can be the right call.** Keeping customers at a lower price point beats losing them entirely to a competitor. Pricing isn't only about maximizing each account — sometimes the math of retention beats the math of upsell.

**Signal future monetization at first exposure — not after adoption.** If a feature will eventually be paid, restricted to a higher tier, or moved behind an enterprise plan, position it that way from day one — "preview of an enterprise capability," "free during preview, paid in the future," or similar. Letting customers anchor on it as a standard included setting and then changing the model later creates product debt and a rug-pull conversation. The moment to set the expectation is on first exposure, when customers form their mental model — not a year in, when changing it means explaining why we're now charging for something they've used freely.

## Related

- [business-and-user-needs.md](./business-and-user-needs.md) — Pairing user needs with business outcomes
- [visual-hierarchy.md](./visual-hierarchy.md) — Directing the eye once the JTBD is clear
- [../personas.md](../personas.md) — Who you're designing for
- [../voice.md](../voice.md) — Copy tone
