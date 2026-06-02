---
name: voice
description: Fetch when writing user-facing copy — UI strings, error messages, empty states, marketing prose, docs body. Skip for code comments and internal logs.
---

# Voice

## Tone

- Confident, technical, concise. Speak like a senior engineer who respects the reader's time.
- No hype, no marketing fluff. Avoid "simply", "just", "easy", "powerful", "seamless", "delight".
- Prefer present tense, active voice.
- For errors, warnings, and deprecation messages specifically — stricter rules apply (no exclamation points, no blame, structured what/why/next). See [errors.md](./errors.md).

## Point of view

- Address the reader as "you". Refer to the product as "Cypress".
- Avoid "we" in product UI; reserve it for blog posts and marketing.

## Capitalization

- Sentence case for buttons, headings, menu items, page titles. Not Title Case.
- Code identifiers stay verbatim — never rewrap or recase them.
- Feature and product names are proper nouns — see [Feature & product names](#feature--product-names). They keep their exact casing even mid-sentence in sentence-case copy.

## Feature & product names

Cypress feature and product names are proper nouns. Capitalize them exactly as listed below — never lowercase them in body copy, even in the middle of a sentence ("…with Smart Orchestration", not "…with smart orchestration"). Sentence case applies to ordinary words in headings and UI strings (see [Capitalization](#capitalization)); it does **not** demote a proper-noun feature name.

Source of truth is the cypress.io product navigation (`src/layouts/Header/content/product.yml`) for products and feature categories, and the [pricing page](https://www.cypress.io/pricing) (`src/components/pages/pricing/**`) for individual features. When a name changes there or a name is added, update the relevant list below in the same change — keep these living, not a snapshot.

### Products

Things customers buy, sign into, or install:

- Cypress App
- Cypress Cloud
- UI Coverage — premium add-on
- Cypress Accessibility — premium add-on

### Feature categories

The capability groupings within each product:

- **Cypress App:** Browser Testing, Visual Debugging, Test Generation, Flake Resistance
- **Cypress Cloud:** Visual Reviews, Smart Orchestration, Analytics & Insights, Workflow Integrations

### Features

Individual capabilities, grouped under their category:

- **Test Generation** (Cypress App): Cypress Studio, Studio AI
- **Visual Reviews** (Cypress Cloud): Test Replay, Branch Review, AI Summaries, Test Artifacts
- **Smart Orchestration** (Cypress Cloud): Parallelization, Load Balancing, Manual Cancellation, Auto Cancellation, Spec Prioritization
- **Analytics & Insights** (Cypress Cloud): Test History, Project Analytics, Flake Detection, Flaky Test Analytics, Enterprise Reporting, Data Extract API
- **Workflow Integrations** (Cypress Cloud): Status Checks, PR Comments, Team Notifications, Cloud MCP, Jira Integration

### Plan tiers

- Starter
- Team
- Business
- Enterprise

### Notes

- **`cy.prompt`** is a code identifier — keep it verbatim and lowercase, never "Cy.prompt" or "Cy.Prompt" (see [Capitalization](#capitalization) on code identifiers).
- Integration partner names keep their own branding: **GitHub**, **GitLab**, **Bitbucket**, **Slack**, **MS Teams**, **Jira**, **Okta**, **Azure AD**.
- **SSO** and **CI / CD** are written as the pricing page renders them.

## Headings

- Headings pull people in; they don't label a shelf. Bias toward action- or outcome-oriented phrasing ("Catch failures before they ship") over dry category labels ("Workflows and integrations"). Category labels read as inert; action-oriented headings tell the reader why to keep reading.
- Make the verb do work. A heading's verb is its most prominent word — don't spend it on a generic opener like "Get", "Use", or "Discover" that could front any heading. Reach for the verb that names the specific action or payoff: "Ground your agent's responses in official docs" over "Get accurate answers from your agent".

## Leading with value

- **Lead with the benefit, not the mechanism.** Open with the outcome the reader gets, or the problem it removes — then name the feature that delivers it. The reader decides whether to care based on the "why"; the "what" earns its place once they do. Keep the mechanism in the second clause or the link-out, never the lead. ("Spend less time fixing accessibility violations by hand" before "Cloud MCP exposes accessibility report data.")
- **Stay in active voice, addressed to the reader.** The reader — or something working on their behalf — is the subject doing or receiving the benefit: "your AI agent ranks what matters", not "violations are ranked". Passive constructions bury who acts and drain the sentence of momentum.
- **Open the sentence on the verb.** Lead body copy with the action the reader takes — don't start with the feature name or an "X is a…" definition that strands the benefit behind the mechanism. "Ask your coding agent any Cypress question and trust the answer" beats "`cypress-docs` is a new skill that…". Each sentence should earn its momentum from the first word:
  > Wind back the clock to any point in an application's execution and see exactly what it was doing during the point of failure. Inspect the DOM, network events, and console logs of your application from your tests exactly as they ran in CI.
  > Review videos, screenshots, and logs for every spec file from any CI test run.
