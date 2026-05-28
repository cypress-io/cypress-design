---
name: principles-design-systems
description: Meta-principles about design systems themselves — when to invest, scope, and how they should be structured to unblock both humans and agents. Fetch when scoping design-system work, deciding whether a new pattern belongs in the system, or evaluating system maturity.
---

# Design System Principles

**The design system is what unblocks everyone else.** Mature design systems exist because they make the rest of the company faster. They warrant dedicated team investment for the same reason any other platform investment does: leverage. Treat them as a force multiplier, not a side project.

**One design system spans every surface — product and marketing.** Splitting the system creates inconsistency that customers feel even if they can't name it. The goal from day one should be a single system that feeds both the product and the marketing site.

**A design system is more than components.** Tokens, color, spacing, typography, icons, motion, content patterns, and usage guidelines all count. Without that breadth and without documentation, contributions stay nice-to-haves instead of must-haves.

**Host design tokens at a public URL so agents can fetch them.** A design system that AI tools can read is a design system that scales beyond the designers. Closed tokens force every contributor to reimplement the basics; open tokens let humans and agents stay aligned automatically.

**Build inside the real framework, not a microsite.** New surfaces should live inside the main app or marketing framework so branding stays automatic and code stays maintainable. Microsites accumulate; consolidation pays back.

## Related

- [../architecture.md](../architecture.md) — Repo-level architecture and component patterns
- [ai.md](./ai.md) — How AI tools consume the system
- [visual-hierarchy.md](./visual-hierarchy.md) — How tokens support consistent hierarchy
