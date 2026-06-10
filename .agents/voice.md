---
name: voice
description: Fetch when writing user-facing copy — UI strings, error messages, empty states, marketing prose, docs body. Skip for code comments and internal logs.
---

# Voice

Clarity over comfort. Evidence over enthusiasm. Trust over tone. External communication is part of the product — treat it with the same rigor as code. The goal is never polish for its own sake; it's confidence through clarity.

## Before you write

Be explicit about four things before drafting any user-facing content:

- **Audience** — who is this for, and how familiar are they with Cypress?
- **Goal** — what should the reader understand or decide after reading?
- **Main takeaway** — what stays clear if they only skim?
- **Why it matters** — what cost, risk, effort, or uncertainty does this remove?

Lead with reader benefit; the action you want follows from understanding. See [Leading with value](#leading-with-value).

## Tone

- Confident, technical, concise. Speak like a senior engineer who respects the reader's time.
- No hype, no marketing fluff. Avoid "simply", "just", "easy", "powerful", "seamless", "delight".
- Prefer present tense, active voice.
- **Match register to stakes.** The voice stays constant; the register tightens as stakes rise. More instructional for tutorials and learning; calm and direct for product changes; serious and precise for security, reliability, and deprecations. Clarity always outranks personality.
- For errors, warnings, and deprecation messages specifically — stricter rules apply (no exclamation points, no blame, structured what/why/next). See [errors.md](https://design.cypress.io/agents/errors.md).

## Point of view

- Address the reader as "you". Refer to the product as "Cypress".
- **"We" is for storytelling surfaces — blog posts, social, newsletters, announcements — where Cypress narrates to an audience.** Everywhere the product acts or the text is reference — product UI, error messages, docs, and release notes / changelog — use product voice: "Cypress now supports hover interactions", not "We added support for hover interactions". Never refer to the product as "it".

## Writing for people

People skim before they commit. Write so the structure carries the meaning on a fast pass.

- **Front-load the point.** Use the [inverted pyramid](<https://en.wikipedia.org/wiki/Inverted_pyramid_(journalism)>) — most important information first. Assume the reader stops at any point.
- **Make structure visible.** Headings, subheads, and lists over walls of text. Short paragraphs, direct sentences.
- **Plain language over academic phrasing.** Favor the everyday word. Breaking a strict grammar rule is fine when it improves clarity.
- **Cut buzzwords and vague verbs.** "Use Cypress to automate your tests", not "leverage Cypress to automate your tests".
- **Write for an international audience.** Avoid idioms, slang, and culturally specific phrases — prefer globally understandable terms.

## Confidence and certainty

- **Be direct about what we know; be explicit about uncertainty when it exists.** Never imply a guarantee where there isn't one.
- **When behavior is probabilistic or evolving, say so.** This matters most for AI-powered features — don't frame AI as autonomous or magical, don't promise correctness without guardrails, and don't imply it replaces human judgment. For the principles behind building with AI, see [principles/ai.md](https://design.cypress.io/agents/principles/ai.md).

## Capitalization

- Sentence case for buttons, headings, menu items, page titles. Not Title Case.
- Proper product and feature names keep their capitalization inside sentence-case text (see [Product and feature names](#product-and-feature-names)).
- Code identifiers stay verbatim — never rewrap or recase them.

## Product and feature names

**Product and feature names are always capitalized** — they're proper names, even inside otherwise sentence-case text, and a name is never lowercased in body copy ("…with Smart Orchestration", not "…with smart orchestration"). Sentence case (above) governs UI chrome and headings, not these names. When capitalization is unclear, match how the term appears in the product UI. The general capability stays lowercase even when the product is capitalized: "Cypress Accessibility" the product, "an accessibility report" the artifact.

Keep these lists current: when a name changes or a new one ships, update the relevant list in the same change — they're living, not a snapshot.

### Products

- Cypress App
- Cypress Cloud
- UI Coverage
- Cypress Accessibility

### Feature categories

- **Cypress App:** Browser Testing, Visual Debugging, Test Generation, Flake Resistance
- **Cypress Cloud:** Visual Reviews, Smart Orchestration, Analytics & Insights, Workflow Integrations

### Features

- **Visual Debugging** (Cypress App): Time Travel, Live Reload, Native Browser Inspection, Screenshots & Videos, Embedded Cloud Workflows
- **Test Generation** (Cypress App): Cypress Studio, Studio AI
- **Flake Resistance** (Cypress App): Automatic Waiting, Test Retries, Test Isolation, Flake Detection, Consistent Results
- **Visual Reviews** (Cypress Cloud): Test Replay, Branch Review, AI Summaries, Test Artifacts
- **Smart Orchestration** (Cypress Cloud): Parallelization, Load Balancing, Manual Cancellation, Auto Cancellation, Spec Prioritization
- **Analytics & Insights** (Cypress Cloud): Test History, Project Analytics, Flake Detection, Flaky Test Analytics, Enterprise Reporting, Data Extract API
- **Workflow Integrations** (Cypress Cloud): Status Checks, PR Comments, Team Notifications, Cloud MCP, Jira Integration

### Plan tiers

- Starter
- Team
- Business
- Enterprise

### Naming rules

- **Cypress** — write "Cypress", never "Cypress.io". On non-Cypress domains, link the first mention to cypress.io. "Cypress" can mean the whole platform (the App and Cloud); when explaining specific behavior, name the specific product.
- **Cypress Cloud** — don't precede with "the".
- **Cypress End-to-End Testing**, **Cypress Component Testing** — capitalize when naming the product or UI entity; lowercase for the general practice.
- **UI Coverage** — never "UI Code Coverage".
- **Cypress Learn**, **Launchpad**, **Test Runner** (the specific feature, not the whole Cypress App), **Command Log** — other capitalized named entities.
- **`cy.prompt`** is a code identifier — keep it verbatim and lowercase, never "Cy.prompt" or "Cy.Prompt".
- Integration partner names keep their own branding: **GitHub**, **GitLab**, **Bitbucket**, **Slack**, **MS Teams**, **Jira**, **Okta**, **Azure AD**.
- **SSO** and **CI/CD** are written in caps.

## Abbreviations and acronyms

- Spell out acronyms on first use unless universally known (API, CSS).
- Prefer "accessibility" over "a11y" in user-facing copy. "a11y" is fine in internal labels, code, anchors, and checklists.
- Use the shortened form consistently after first use.

## Headings

- Headings pull people in; they don't label a shelf. Bias toward action- or outcome-oriented phrasing ("Catch failures before they ship") over dry category labels ("Workflows and integrations"). Category labels read as inert; action-oriented headings tell the reader why to keep reading.
- Make the verb do work. A heading's verb is its most prominent word — don't spend it on a generic opener like "Get", "Use", or "Discover" that could front any heading. Reach for the verb that names the specific action or payoff: "Ground your agent's responses in official docs" over "Get accurate answers from your agent".

## Leading with value

- **Lead with the benefit, not the mechanism.** Open with the outcome the reader gets, or the problem it removes — then name the feature that delivers it. The reader decides whether to care based on the "why"; the "what" earns its place once they do. Keep the mechanism in the second clause or the link-out, never the lead. ("Spend less time fixing accessibility violations by hand" before "Cloud MCP exposes accessibility report data.")
- **Stay in active voice, addressed to the reader.** The reader — or something working on their behalf — is the subject doing or receiving the benefit: "your AI agent ranks what matters", not "violations are ranked". Passive constructions bury who acts and drain the sentence of momentum.
- **In release titles, name the searchable feature alongside the benefit.** A release index is also a scan-and-search surface, so a benefit-only title can hide what shipped. When a launch introduces a term people look for (e.g. "Cloud MCP"), prefix the benefit with it — `Cloud MCP Beta: Debug failing tests with your AI assistant`. See [releases.md](https://design.cypress.io/agents/principles/releases.md), "Release titles".
- **Open the sentence on the verb.** Lead body copy with the action the reader takes — don't start with the feature name or an "X is a…" definition that strands the benefit behind the mechanism. "Ask your coding agent any Cypress question and trust the answer" beats "`cypress-docs` is a new skill that…". Each sentence should earn its momentum from the first word:
  > Wind back the clock to any point in an application's execution and see exactly what it was doing during the point of failure. Inspect the DOM, network events, and console logs of your application from your tests exactly as they ran in CI.
  > Review videos, screenshots, and logs for every spec file from any CI test run.

## Mechanics

- **Numbers.** Spell out one through nine; use numerals for 10 and above. Always use numerals for metrics, measurements, and performance data.
- **Dates and time.** Spell out the day of the week and abbreviate the month (Tuesday, Jan 14). Use numerals with am/pm (7am, 7:30pm). Include time zones when scheduling matters.
- **Punctuation.** Use the serial (Oxford) comma. Use a colon to introduce a list. Use em dashes sparingly. Never use exclamation points in error messages or alerts — see [errors.md](https://design.cypress.io/agents/errors.md).

## Writing about accessibility and inclusion

When your copy concerns accessibility, disability, or assistive technology — alt text, link text, color reliance, and the language to use (and avoid) when referring to people with disabilities — the content rules live in [accessibility.md](https://design.cypress.io/agents/accessibility.md), "Writing about accessibility and disability". Fetch it before writing that content.

## Before you publish

Confirm the reader can answer: what changed, why Cypress made this choice, whether it affects them, and what to do next — and that the content reduces uncertainty rather than adding it. If Support would have to interpret your intent, it isn't ready.

## Related

- [errors.md](https://design.cypress.io/agents/errors.md) — stricter overrides for errors, warnings, and deprecations
- [accessibility.md](https://design.cypress.io/agents/accessibility.md) — content accessibility and disability language
- [principles/ai.md](https://design.cypress.io/agents/principles/ai.md) — building, designing, and writing with AI
- [principles/ux.md](https://design.cypress.io/agents/principles/ux.md) — where business goals meet user needs
- [principles/releases.md](https://design.cypress.io/agents/principles/releases.md) — release titles and shipping stages
