---
name: cy-design-review
description: Run a structured design and product review against Cypress principles before shipping. Use when reviewing a PR, evaluating a prototype, critiquing AI-generated UI / copy / illustration, or before claiming any design / UX / product task done. Triggers automatically when creating new pages, components, marketing surfaces, illustrations, or making UX decisions on Cypress surfaces.
---

# cy-design-review

Structured design and product review against the Cypress design principles. Pairs with [review-checklist.md](../review-checklist.md), which handles the mechanical token / spacing / a11y checks.

## When to run

- Before merging or shipping any UI, UX, copy, or illustration work
- When generating new pages, components, or copy with AI
- When asked for a design review on a proposal
- Before claiming any design / UX / product task done

## Steps

1. **Identify the surface and the job.** What is this — page, component, copy, illustration, AI-generated output? Who is the user (see [../personas.md](../personas.md)) and what's the JTBD? If you can't answer this, stop and ask the requester.

2. **Identify the business goal.** What outcome should this drive (revenue, retention, activation, lead gen, NPS)? If there isn't one named, the work isn't ready for review — see [../principles/business-and-user-needs.md](../principles/business-and-user-needs.md).

3. **Fetch the relevant principles.** Always: [../principles/ux.md](../principles/ux.md), [../principles/visual-hierarchy.md](../principles/visual-hierarchy.md). As applicable: [../principles/ai.md](../principles/ai.md) (any AI-generated work), [../principles/illustration.md](../principles/illustration.md) (illustrations), [../principles/accessibility.md](../principles/accessibility.md) (interactive surfaces), [../principles/design-systems.md](../principles/design-systems.md) (new components or patterns).

4. **Fetch voice + the mechanical checklist.** [../voice.md](../voice.md) for any copy. [../review-checklist.md](../review-checklist.md) for the mechanical pass.

5. **Walk the work against each fetched principle.** For each, ask: does this design honor or violate it? Note violations with a one-line _why_.

6. **Cluster findings by section.** UX, visual hierarchy, copy, accessibility, AI quality, etc. Use numbered lists — see [../principles/feedback.md](../principles/feedback.md) for delivery rules.

7. **Lead with framing problems if any exist.** If the design solves the wrong JTBD, ignores business goals, or skipped the design process, that lands first — visual nits second.

8. **Always include the WHY for each finding.** A finding without a reason teaches nothing and reads as a power play.

9. **Run the mechanical checklist last.** Use [../review-checklist.md](../review-checklist.md) to catch token, color, spacing, icon, and accessibility violations.

## Output format

```
## Framing
(if the JTBD, persona, or business goal is unclear or wrong, name it here)

## Findings

### UX
1. <finding> — <why>

### Visual hierarchy
1. <finding> — <why>

### Copy (if applicable)
1. <finding> — <why>

### Accessibility
1. <finding> — <why>

### AI quality (if applicable)
1. <finding> — <why>

## Mechanical checklist
- [ ] colors
- [ ] spacing
- [ ] iconography
- [ ] voice
- [ ] components
- [ ] a11y

## Recommendation
<ship / revise / reframe>
```

## Don't

- Don't run on internal-only surfaces (private dashboards, throwaway docs) unless explicitly asked — see [../principles/ux.md](../principles/ux.md) on prioritizing public-facing work.
- Don't deliver findings without the WHY behind each one.
- Don't gate-keep — if the framing is right and the work is good, say so directly.
