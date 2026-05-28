# Agent guidance

Before doing any work, you MUST read:

- `/.agents/architecture.md` — repo structure, build, deploy.
- `/.agents/index.md` — router for design, voice, and component guidance. Fetch only the pillars and components the task needs. Don't load them all preemptively.

Before claiming any UI / visual / content task is done, run `/.agents/review-checklist.md` against your own diff.

Everything under `/.agents/` is also served at `https://design.cypress.io/agents/` for consumer repos to fetch — same files, single source of truth.

## Framing — why the design system exists and how it's structured

This section is for contributors to the design system itself (people changing files in this repo). Consumers fetching `.agents/index.md` from other repos don't need it.

The design system is what unblocks everyone else. Mature design systems exist because they make the rest of the company faster, and they warrant dedicated team investment for the same reason any other platform investment does — one team building it makes every other team move faster. Treat the design system as a force multiplier, not a side project. A few non-negotiables shape how this one is structured:

- **One design system spans every surface — product and marketing.** Splitting the system creates inconsistency that customers feel even if they can't name it. The goal from day one is a single system that feeds both the product and the marketing site.
- **A design system is more than components.** Tokens, color, spacing, typography, icons, motion, content patterns, and usage guidelines all count. Without that breadth and without documentation, contributions stay nice-to-haves instead of must-haves.
- **Build inside the real framework, not a microsite.** New surfaces should live inside the main app or marketing framework so branding stays automatic and code stays maintainable. Microsites are easy to launch but burden everyone who has to maintain them later — and they're often a way to skip consensus and avoid the hard work of integrating into the real system. Shipping the easiest possible solution and calling it production-ready is an illusion of progress, not progress.
- **Figma is a sketch. The design system in code is the truth.** Designs that live only in Figma drift from what actually ships. The code is the source of truth — both for humans and for AI tools generating UI. Build toward the model where the code, the tokens, and the agent-readable rules are all aligned, and Figma is upstream sketching, not downstream documentation.
- **Figma work that can't translate to code is wasted effort.** Components built in Figma in ways that can't map to a real implementation, or layouts that use tools that have no code equivalent, look like progress but produce nothing shippable. Bias toward code-first tools and Figma patterns that translate cleanly to real components.
- **Ship the rules with the package.** When a project installs the design system, the agent instructions, lint rules, and conventions that govern correct use should come along automatically. Manually documenting the rules elsewhere creates drift; bundled rules stay in sync with the code they constrain.
- **Migrate to the design system globally-first, then incrementally.** Components used across multiple products (buttons, modals, form controls, tags) are where one swap multiplies across the most surfaces — standardize those first. Then swap less-used components in piece by piece. Big-bang migrations rarely land; incremental swaps compound.

## Component files

Each component may have:

- `components/<Name>/instructions.md` — consumer-facing API docs (props, variants, states, accessibility)
- `components/<Name>/architecture.md` — implementation details (file layout, constants, interaction rationale, gotchas). Load alongside `instructions.md` when modifying a component.
- `components/<Name>/react/ReadMe.md` and `components/<Name>/vue/ReadMe.md` — install command, import path, code examples

Not every component has all files yet — add them when a component is created or meaningfully revised. When adding a new component, update the component list in `/.agents/index.md`.

## Pages

Page-specific acceptance criteria and known issues live in `/.agents/pages/<page-name>.md`. Load the relevant file when working on or verifying a docs page.

Available pages:

- `pages/colors.md` — `/colors` page sections, palette behavior, TOC, known issues

## Skills

Task-specific guidance lives in `/.agents/skills/<skill-name>.md`. Each skill has YAML frontmatter with a `description` telling you when to load it. Read the relevant skill(s) before starting matching work; don't load them preemptively.

Available skills:

- `skill(implement-component)` — use when implementing a new component, or adding a variant/size/state to an existing one, from a Figma spec.
- `skill(cy-review-pr-comments)` — use to review the latest GitHub Copilot review comments on the PR for the current branch, triage them, update `.agents/known-issues.md`, and reply to or resolve each comment appropriately.
