---
name: accessibility
description: Accessibility principles and considerations. Fetch when designing interactive elements, modals, custom inputs, animations, evaluating whether a flow works for users on keyboard / assistive tech, or writing copy about accessibility or disability.
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

## Writing about accessibility and disability

Accessibility is a content concern, not only a design one. These rules apply whenever you write or format copy.

**Don't rely on visuals alone.** If a reader can't see colors, images, or video, the core message must still land in the text. Provide alt text for informative images and mark decorative ones as decorative. Keep text and key UI at sufficient contrast for low-vision and color-blind readers.

**Use descriptive link text.** A link must make sense on its own — "Read the Test Replay setup guide", never standalone "click here" or "learn more". (Errors and warnings share this rule; see [errors.md](./errors.md).)

**"Disabled" and "disability" are the correct words — don't tiptoe around them.** This language moves quickly, and we'll get corrected sometimes; stay open to it.

- **Avoid:** "special needs", "differently abled", "people of all abilities", "wheelchair-bound", "normal" / "regular" people, "inspiring" / "inspirational" (when applied to people for being disabled).
- **Prefer, by context:** "people with disabilities", "disabled people", "blind", "deaf", "non-speaking", "non-disabled", "sighted", "mouse users", "screen-reader users".
- **Defer to a person's own preference** when you know it — e.g. capital-D "Deaf", or a stated preference like "hearing impaired". There's no way to know ahead of time, so don't assume.
- **Name the technical need, not the disability, when being specific.** Screen readers aren't used only by blind people — say "screen-reader users" when that's who you mean, and reserve "blind users" for what's genuinely specific to blind people (which is rarer than it seems).

When in doubt, check the [accessibility.com glossary](https://www.accessibility.com/glossary). Deeper references: the [NCDJ Disability Language Style Guide](https://ncdj.org/style-guide/) and the [University of Iowa DEI style guide](https://diversity.uiowa.edu/resources/dei-style-guide/style-guide-people-disabilities).

## Related

- [voice.md](./voice.md) — general voice, tone, and mechanics for all copy
- [colors.md](./colors.md) — Contrast tokens
- [review-checklist.md](./review-checklist.md) — Mechanical a11y checks before shipping
