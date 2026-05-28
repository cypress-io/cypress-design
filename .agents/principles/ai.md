---
name: ai
description: Principles for using AI tools to build, design, write, or review Cypress work. Fetch when generating UI / copy / illustration with AI, deciding whether AI is the right tool, or reviewing AI output.
---

# AI Principles

## Quality, review, and debt

**Design is a process — protect it.** Good design needs time to produce good results. AI doesn't shortcut that; it just changes which parts of the process get faster. Treat the time the process requires as a real constraint, not a soft one. This sits at the top because it frames everything below it.

**AI is a build accelerator, not a designer.** It can produce something that looks on-brand and feels passable, but "passable" isn't the bar. The right question is always whether the JTBD is solved and the UX is actually right — and only a human reviewer with taste can answer that.

**You still have to know what good looks like — across every craft AI touches.** If you can't write code, you can't judge whether AI's code is tested, scalable, or DRY. Same for design, copy, illustration, strategy. Without an expert reviewer, AI just produces faster mediocrity, and the iteration cost of bending output into the right shape eats the speed gain.

**AI shifts the bottleneck left — it doesn't remove it.** Generation gets faster. Review, decision-making, and team buy-in don't. Anyone can ship a unique, on-brand idea with AI tools now, but it won't succeed if success was never defined, the JTBD was never named, and the persona was never chosen.

**Speed without review creates debt — product, design, UX, code, all of it.** AI lets people jump in and ship pages, features, or copy that pass their own litmus test but miss the bar of someone who actually knows the craft. The output looks done; the debt is invisible until someone with expertise has to unwind it. AI-produced work also blurs what was specified vs. "vibed," so documentation and review become as load-bearing as the output itself.

**AI volume isn't AI value — the bottleneck is the thinking.** Eight pages of AI-generated content can't be compressed into something meaningful if the source thinking was weak. It just becomes more stuff to look at, and trust collapses. Think like an architect: build a layered source-of-truth so good material can break into the right shape for each audience. The layers only work if the input is strong.

**Don't let AI output replace the design process.** A functional prototype is a wireframe, not a finished UI. Treating "looks like it works" as "90% done" skips the part where the JTBD is actually figured out — and the final UI almost always needs to look meaningfully different from the AI-generated starting point.

**Don't let "anyone can prompt the website" become the architecture.** AI lowers the cost of contribution, but review is still the bottleneck and visual problems still need a designer. Open prompting without an expert gate produces noise, not value.

## When to use AI and which tool

**If you already know what good looks like, AI can slow you down.** AI wins when you hand it a screenshot, a clear spec, or a tight prompt. It loses when you're trying to discover what you want through iteration with it — you'll often arrive at something you could have built faster in the native tool.

**AI is uneven across crafts. Match the tool to the task.** Strong at illustration with the right prompt. Decent at synthesizing research. Weak at original visual problem-solving and at slide design when you have a specific outcome in mind. Don't assume one tool wins everywhere.

**Token caps on creative AI tools undermine the value.** Creativity doesn't happen on a budget; people need freedom to explore without rationing prompts. On-demand billing on a creative tool actively eats the stickiness that makes it worth using.

## Working with AI day-to-day

**Invest the upfront prompt work — it's the part nobody sees.** Consistent AI output, especially for illustration and brand-sensitive work, comes from refining the prompt many times against a reference style. One-shot generation is a coincidence, not a system.

**Treat agent instructions as a living artifact.** Whenever you find a gap in how an AI handles something, fix the instructions in the same pass as the work. The only way AI gets better at a job is if the guidance gets patched as the holes appear.

**Use AI to do the synthesis work, then own the conclusion.** The pattern: AI compresses the research, the human signs off on the position. Never publish or decide on AI synthesis without an explicit human endorsement of the conclusion.

## Sources of truth AI reads

**Align every source of truth AI reads.** Docs, marketing, and custom instructions all need to say the same thing. Mixed messages across sources mean customers and agents get inconsistent answers depending on where they happen to look — and trust degrades.

**Don't point AI at content that goes stale.** Blog posts capture a moment in time; product docs are the living source. Pointing AI at outdated content guarantees outdated answers.

## Related

- [ux.md](./ux.md) — JTBD and how it gates AI work
- [business-and-user-needs.md](./business-and-user-needs.md) — Defining success before designing
- [../voice.md](../voice.md) — Voice rules for all AI-generated copy
- [../review-checklist.md](../review-checklist.md) — Mechanical gate before shipping
