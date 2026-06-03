---
name: cy-design-review
description: Run a structured design and product review against Cypress design principles before shipping work that creates or changes a user-facing surface. Use across any Cypress repo (cypress.io, cypress-cloud, cypress-services, cypress-app, cypress-design, etc.) when reviewing a PR, evaluating a prototype, critiquing AI-generated UI / copy / illustration, or before claiming any design / UX / product task done. Triggers automatically when an agent is creating or modifying pages, components, marketing surfaces, blog posts, illustrations, copy, or making UX / product decisions on Cypress surfaces.
---

# cy-design-review

Structured design and product review against the Cypress design principles, voice, and review-checklist hosted at `https://design.cypress.io/agents/`. Pairs with the mechanical checklist (`review-checklist.md`), which handles token / spacing / a11y violations.

## When to run

- Before merging or shipping any UI, UX, copy, or illustration work — in any Cypress repo
- When generating new pages, components, or copy with AI
- When asked for a design review on a proposal
- Before claiming any design / UX / product task done

## Steps

1. **Identify the surface and the job.** What is this — page, component, copy, illustration, AI-generated output? Who is the user (fetch `https://design.cypress.io/agents/personas.md`) and what's the JTBD? If you can't answer this, stop and ask the requester.

2. **Identify the business goal.** What outcome should this drive (revenue, retention, activation, lead gen, NPS)? If there isn't one named, the work isn't ready for review — fetch `https://design.cypress.io/agents/principles/product.md` and apply its "Business goals & prioritization" section.

3. **Fetch the relevant principles.** Always: `https://design.cypress.io/agents/principles/ux.md`, `https://design.cypress.io/agents/principles/visual-hierarchy.md`, `https://design.cypress.io/agents/principles/feedback.md` (delivery rules for any review). As applicable: `https://design.cypress.io/agents/principles/ai.md` (any AI-generated work), `https://design.cypress.io/agents/principles/product.md` (a brief, initiative, or product decision — product principles: ownership, shipping to learn, post-launch follow-through), `https://design.cypress.io/agents/illustrations.md` (illustrations), `https://design.cypress.io/agents/accessibility.md` (interactive surfaces), `https://design.cypress.io/agents/errors.md` (error / warning / deprecation messages).

4. **Fetch voice + the mechanical checklist.** `https://design.cypress.io/agents/voice.md` for any copy. `https://design.cypress.io/agents/review-checklist.md` for the mechanical pass.

5. **Walk the work against each fetched principle.** For each, ask: does this design honor or violate it? Note violations with a one-line _why_.

6. **Cluster findings by section.** UX, visual hierarchy, copy, accessibility, AI quality, etc. Use numbered lists — see `https://design.cypress.io/agents/principles/feedback.md` for delivery rules.

7. **Lead with framing problems if any exist.** If the design solves the wrong JTBD, ignores business goals, or skipped the design process, that lands first — visual nits second.

8. **Always include the WHY for each finding.** A finding without a reason teaches nothing and reads as a power play.

9. **Run the checklists last.** Use `https://design.cypress.io/agents/review-checklist.md` to catch token, color, spacing, icon, and accessibility violations. If the work is a product brief, initiative, or design proposal — not just a UI surface — also run `https://design.cypress.io/agents/product-review-checklist.md` for product rigor: problem defined before solution, alternatives compared, success metric + measurement, review date, post-launch decision.

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

### Product rigor (if reviewing a brief / initiative / product decision)
1. <finding> — <why>

## Mechanical checklist
- [ ] colors
- [ ] spacing
- [ ] iconography
- [ ] voice
- [ ] components
- [ ] a11y

## Product checklist (if reviewing a brief / initiative)
- [ ] problem defined before solution
- [ ] alternatives compared
- [ ] success metric + measurement infrastructure
- [ ] review date set
- [ ] post-launch keep/iterate/kill decision owned

## Recommendation
<ship / revise / reframe>
```

## Don't

- Don't run on internal-only surfaces (private dashboards, throwaway docs) unless explicitly asked — see `https://design.cypress.io/agents/principles/ux.md` on prioritizing public-facing work.
- Don't deliver findings without the WHY behind each one.
- Don't gate-keep — if the framing is right and the work is good, say so directly.
