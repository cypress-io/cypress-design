---
name: accessibility
description: Accessibility principles and considerations. Fetch when designing interactive elements, modals, custom inputs, animations, or evaluating whether a flow works for users on keyboard / assistive tech.
---

# Accessibility

When and how to invest in accessibility, plus the patterns that come up most often. The mechanical checks live in [review-checklist.md](./review-checklist.md).

## When to invest

**Accessibility investment scales with audience, stage, and risk — not a fixed floor.** An accessible product can still be hard to use; a usable product can ship without full coverage if product-market fit isn't proven yet. Match investment to the situation: who the audience is, what stage the product is at, how many users it serves, the speed/feedback trade-off, and how much regulatory or contractual exposure exists. Early-stage features may earn the right to ship without full coverage; mature, broadly-used surfaces don't. The question isn't "is this accessible" — it's "is the accessibility right for what this is and who it serves."

**Mobile-first and accessibility tend to scale together.** Both are signals you've moved past "prove it works" into "make it work for everyone." Plan them as the same decision: when the product earns a wider audience, both come up.

## Patterns for the surfaces you do ship

**Focus states must be visible.** Keyboard users need to know where they are at all times. Removing focus outlines for visual cleanliness is one of the most common and most user-hostile patterns in modern UI. If the default outline is ugly, design a better one — don't delete it.

**Keyboard navigation is a first-class concern.** Every interactive element should be reachable and operable with the keyboard alone, in a logical tab order. If you can't complete a task without a mouse, the design has failed a portion of users entirely.

**Use real semantic HTML before reaching for ARIA.** A `<button>` is a button; a `<div role="button">` with custom handlers usually isn't, no matter how many ARIA attributes get added. ARIA should patch gaps in HTML semantics, not replace them.

**Don't trap users in inaccessible flows.** Modals, dropdowns, carousels, and custom inputs are where accessibility most often breaks. Test them with a keyboard and a screen reader before shipping — not after a customer files a ticket.

## Related

- [colors.md](./colors.md) — Contrast tokens
- [review-checklist.md](./review-checklist.md) — Mechanical a11y checks before shipping
