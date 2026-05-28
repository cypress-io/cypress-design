---
name: principles-accessibility
description: Accessibility principles beyond the mechanical review-checklist items. Fetch when designing interactive elements, modals, custom inputs, animations, or evaluating whether a flow works for users on keyboard / assistive tech.
---

# Accessibility Principles

**Accessibility is a baseline, not a feature.** WCAG AA is the floor for any user-facing surface — not a checklist to game, not a "phase 2" item, not a nice-to-have. If a surface doesn't meet the baseline, it's not done.

**Focus states must be visible.** Keyboard users need to know where they are at all times. Removing focus outlines for visual cleanliness is one of the most common and most user-hostile patterns in modern UI. If the default outline is ugly, design a better one — don't delete it.

**Keyboard navigation is a first-class concern.** Every interactive element should be reachable and operable with the keyboard alone, in a logical tab order. If you can't complete a task without a mouse, the design has failed a portion of users entirely.

**Use real semantic HTML before reaching for ARIA.** A `<button>` is a button; a `<div role="button">` with custom handlers usually isn't, no matter how many ARIA attributes get added. ARIA should patch gaps in HTML semantics, not replace them.

**Don't trap users in inaccessible flows.** Modals, dropdowns, carousels, and custom inputs are where accessibility most often breaks. Test them with a keyboard and a screen reader before shipping — not after a customer files a ticket.

**Hit targets need real size.** Tiny buttons and icon-only controls fail users with motor impairments, users on touch screens, and users in any non-ideal context. 44×44px is the practical minimum for primary interactions.

**Don't rely on motion or hover to teach.** Animations that introduce critical information, or affordances that only appear on hover, exclude users on touch devices, with motion sensitivity, or using assistive tech. Make the core information visible by default.

**Test with real assistive tech, not just automated tools.** Automated accessibility checks catch a fraction of real issues. A 5-minute pass with a screen reader and keyboard catches the ones that matter most to actual users.

## Related

- [../colors.md](../colors.md) — Contrast tokens
- [../review-checklist.md](../review-checklist.md) — Mechanical a11y checks before shipping
