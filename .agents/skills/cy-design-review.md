---
name: cy-design-review
description: Use when reviewing someone else's user-facing work against the Cypress design guidance — a PR, a prototype, a proposal, or AI-generated UI, copy, or illustration — or when asked for a design review, in any Cypress repo. For checking your own work before calling it done, run review-checklist.md instead.
---

# cy-design-review

Review a user-facing surface against the Cypress design guidance hosted at `https://design.cypress.io/agents/`, and hand the author findings they can act on.

## Steps

1. **Name the surface, the user, and the job.** What is it — page, component, copy, illustration, flow? Who uses it (see [personas.md](https://design.cypress.io/agents/personas.md)) and what are they trying to get done?
   - **New surface, brief, or initiative:** it also needs a named business goal (activation, retention, revenue, lead gen). If the user, job, or goal is missing, that's your first finding.
   - **Change to an existing surface:** take the why from the PR description. Ask the author only if it's missing.
2. **Look at it rendered.** Run it locally, or open the preview deployment or visual snapshots if the PR has them. Check light and dark themes, each interactive state (hover, focus, disabled, error, empty, loading), and narrow widths. Judge spacing, hierarchy, and focus from the screen, not from class names.
3. **Load the guidance that applies.** Use [index.md](https://design.cypress.io/agents/index.md) to pick the design docs and components the surface touches. Load [voice.md](https://design.cypress.io/agents/voice.md) if copy changed.
4. **Walk the work against each doc you loaded.** Note every place it departs from the guidance, with a one-line why.
5. **Run the checklists.** [review-checklist.md](https://design.cypress.io/agents/review-checklist.md) for every surface. Add [product-review-checklist.md](https://design.cypress.io/agents/product-review-checklist.md) for a brief, initiative, or design proposal.
6. **Write it up** in the format below, as a PR review if you're reviewing a PR, otherwise in your reply.

## Writing findings

- **Framing problems go first.** If the work solves the wrong job, serves the wrong user, or has no goal, that outweighs every visual detail.
- **Give each finding its why.** A finding without a reason teaches nothing and reads as a power play.
- **Point at the existing answer.** Name the component, token, or doc section the author should use instead.
- **Don't gate-keep.** If the framing is right and the work is good, say so plainly.

## Output format

```text
## Framing
(only if the user, job, or goal is unclear or wrong)

## Findings
Group under the headings that apply: Visual and layout, Interaction and states,
Copy, Accessibility, Reuse of existing components, Product rigor.
1. <finding> — <why> — <what to use instead>

## Checklists
review-checklist.md: <failed checks, or "all applicable checks pass">
product-review-checklist.md: <failed checks, or "not applicable">

## Recommendation
<ship / revise / reframe>, with one line on why
```

## Don't

- Don't run on internal-only surfaces (private dashboards, throwaway docs) unless asked.
- Don't copy checklist items into the review. Report results against the checklists themselves, so the review stays in step with them.
