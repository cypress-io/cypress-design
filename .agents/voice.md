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
- For errors, warnings, and deprecation messages specifically — stricter rules apply (no exclamation points, no blame, structured what/why/next). See [errors.md](./errors.md).

## Point of view

- Address the reader as "you". Refer to the product as "Cypress".
- **"We" is for storytelling surfaces — blog posts, social, newsletters, announcements — where Cypress narrates to an audience.** Everywhere the product acts or the text is reference — product UI, error messages, docs, and release notes / changelog — use product voice: "Cypress now supports hover interactions", not "We added support for hover interactions". Never refer to the product as "it".

## Writing for people

People skim before they commit. Write so the structure carries the meaning on a fast pass.

- **Front-load the point.** Use the [inverted pyramid](https://en.wikipedia.org/wiki/Inverted_pyramid_(journalism)) — most important information first. Assume the reader stops at any point.
- **Make structure visible.** Headings, subheads, and lists over walls of text. Short paragraphs, direct sentences.
- **Plain language over academic phrasing.** Favor the everyday word. Breaking a strict grammar rule is fine when it improves clarity.
- **Cut buzzwords and vague verbs.** "Use Cypress to automate your tests", not "leverage Cypress to automate your tests".
- **Write for an international audience.** Avoid idioms, slang, and culturally specific phrases — prefer globally understandable terms.

## Confidence and certainty

- **Be direct about what we know; be explicit about uncertainty when it exists.** Never imply a guarantee where there isn't one.
- **When behavior is probabilistic or evolving, say so.** This matters most for AI-powered features — don't frame AI as autonomous or magical, don't promise correctness without guardrails, and don't imply it replaces human judgment. For the principles behind building with AI, see [principles/ai.md](./principles/ai.md).

## Capitalization

- Sentence case for buttons, headings, menu items, page titles. Not Title Case.
- Proper product and feature names keep their capitalization inside sentence-case text (see [Product and feature names](#product-and-feature-names)).
- Code identifiers stay verbatim — never rewrap or recase them.

## Product and feature names

Use sentence case in most contexts; avoid unnecessary capitalization. When capitalization is unclear, match how the term appears in the product UI.

- **Cypress** — write "Cypress", never "Cypress.io". On non-Cypress domains, link the first mention to cypress.io. "Cypress" can mean the whole platform (app + Cloud); when explaining specific behavior, name the specific product.
- **Cypress Cloud** — always capitalized; don't precede with "the".
- **Cypress app** — lowercase "app" unless a format forces title case.
- **Cypress Studio**, **Cypress Learn** — capitalized.
- **Cypress End-to-End Testing**, **Cypress Component Testing** — capitalize when naming the product or UI entity; lowercase for the general practice.
- **Test Replay** — capitalized.
- **UI Coverage** — capitalized; never "UI Code Coverage".
- **Cypress Accessibility** — capitalized. Reports are "Cypress Accessibility report" or "accessibility report" depending on specificity.
- **Launchpad**, **Test Runner** (the specific feature, not the whole app), **Command Log** — capitalized.

## Abbreviations and acronyms

- Spell out acronyms on first use unless universally known (API, CSS).
- Prefer "accessibility" over "a11y" in most contexts.
- Use the shortened form consistently after first use.

## Headings

- Headings pull people in; they don't label a shelf. Bias toward action- or outcome-oriented phrasing ("Catch failures before they ship") over dry category labels ("Workflows and integrations"). Category labels read as inert; action-oriented headings tell the reader why to keep reading.
- Make the verb do work. A heading's verb is its most prominent word — don't spend it on a generic opener like "Get", "Use", or "Discover" that could front any heading. Reach for the verb that names the specific action or payoff: "Ground your agent's responses in official docs" over "Get accurate answers from your agent".

## Leading with value

- **Lead with the benefit, not the mechanism.** Open with the outcome the reader gets, or the problem it removes — then name the feature that delivers it. The reader decides whether to care based on the "why"; the "what" earns its place once they do. Keep the mechanism in the second clause or the link-out, never the lead. ("Spend less time fixing accessibility violations by hand" before "Cloud MCP exposes accessibility report data.")
- **Stay in active voice, addressed to the reader.** The reader — or something working on their behalf — is the subject doing or receiving the benefit: "your AI agent ranks what matters", not "violations are ranked". Passive constructions bury who acts and drain the sentence of momentum.
- **In release titles, name the searchable feature alongside the benefit.** A release index is also a scan-and-search surface, so a benefit-only title can hide what shipped. When a launch introduces a term people look for (e.g. "Cloud MCP"), prefix the benefit with it — `Cloud MCP Beta: Debug failing tests with your AI assistant`. See [releases.md](./principles/releases.md), "Release titles".
- **Open the sentence on the verb.** Lead body copy with the action the reader takes — don't start with the feature name or an "X is a…" definition that strands the benefit behind the mechanism. "Ask your coding agent any Cypress question and trust the answer" beats "`cypress-docs` is a new skill that…". Each sentence should earn its momentum from the first word:
  > Wind back the clock to any point in an application's execution and see exactly what it was doing during the point of failure. Inspect the DOM, network events, and console logs of your application from your tests exactly as they ran in CI.
  > Review videos, screenshots, and logs for every spec file from any CI test run.

## Mechanics

- **Numbers.** Spell out one through nine; use numerals for 10 and above. Always use numerals for metrics, measurements, and performance data.
- **Dates and time.** Spell out days; abbreviate months. Use numerals with am/pm (7am, 7:30pm). Include time zones when scheduling matters.
- **Punctuation.** Use the serial (Oxford) comma. Use a colon to introduce a list. Use em dashes sparingly. Never use exclamation points in error messages or alerts — see [errors.md](./errors.md).
- **Active voice by default.** "Cypress added support for hover interactions", not "Support for hover interactions was added". Reach for passive only when the actor genuinely doesn't matter.

## Writing about accessibility and inclusion

When your copy concerns accessibility, disability, or assistive technology — alt text, link text, color reliance, and the language to use (and avoid) when referring to people with disabilities — the content rules live in [accessibility.md](./accessibility.md), "Writing about accessibility and disability". Fetch it before writing that content.

## Before you publish

Confirm the reader can answer: what changed, why Cypress made this choice, whether it affects them, and what to do next — and that the content reduces uncertainty rather than adding it. If Support would have to interpret your intent, it isn't ready.

## Related

- [errors.md](./errors.md) — stricter overrides for errors, warnings, and deprecations
- [accessibility.md](./accessibility.md) — content accessibility and disability language
- [principles/ai.md](./principles/ai.md) — building, designing, and writing with AI
- [principles/ux.md](./principles/ux.md) — where business goals meet user needs
- [principles/releases.md](./principles/releases.md) — release titles and shipping stages
