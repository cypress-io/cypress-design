---
name: voice-headings
description: Fetch when writing a feature-spotlight title, nav label, or headline that names one specific Cypress feature — the {Verb+value} with {Feature} formula and its failure modes. Supplements voice.md.
---

# Feature-headline voice: the heading formula

Supplements [voice.md](https://design.cypress.io/agents/voice.md) — it doesn't replace that guide.
Voice.md already asks to front-load value and cut vague verbs (see [Leading with value](https://design.cypress.io/agents/voice.md#leading-with-value)); this file makes that
concrete for one specific case it doesn't spell out: a heading, nav label, or spotlight
title that names a specific Cypress feature.

## The formula

`{Verb + value} with {Feature}`

1. Start with a verb — active voice, not a noun phrase or "our X can Y."
2. State the concrete value/outcome the user gets, not the feature's internal mechanics.
3. Name the feature last, introduced by "with" — attribution, not the sentence's subject.

Shipped examples:

- "Reduce violations with Accessibility"
- "Improve testing gaps with UI Coverage"
- "Generate self-healing tests with `cy.prompt`"
- "Debug with Test Replay"
- "Generate tests with Studio AI"
- "Optimize runs in CI with Smart Orchestration"

### Watch what "with" attaches to

_writing_ with the feature, not verifying with it.

`with {Feature}` binds to the nearest preceding verb, not to the verb you opened with. If
the value phrase ends on a verb — "as you write", "before you commit", "when it's
written" — the feature gets attributed to that verb instead of the headline one.

Fix by ending the value phrase on a noun or adverb so there's no competing verb next to
"with":

- Wrong: "Verify tests as you write with `cypress tap`" (writing with it)
- Wrong: "Catch failures before you commit with `cypress tap`" (committing with it)
- Right: "Verify new tests on the spot with `cypress tap`"
- Right: "Verify tests before they reach CI with `cypress tap`"

Read the last three words aloud before shipping a headline in this formula — the
misattribution is invisible on the page and obvious out loud.

## Applying it

- Feature-spotlight titles, product nav labels, any headline naming a specific Cypress
  capability.
- Terse: 5-8 words, one verb. Don't stack qualifiers like "automatically" or "in one
  click" on top of the verb — the verb already implies the mechanism, and voice.md's
  own "cut vague/redundant words" rule already covers why.
- **Unless the qualifier _is_ the promise.** The test is whether the verb genuinely
  implies it. "Generate tests in one click" — "generate" already implies the mechanism,
  so cut it. "Resolve failures and flake automatically" — "resolve" does not imply
  _without you_, and resolving failures is table stakes; hands-off is the entire
  differentiator. Cutting it there removes the reason to read on. Buy the room back by
  tightening the noun phrase ("failed and flaky tests" → "failures and flake") rather
  than by dropping the qualifier.

- Don't force it onto a page-level headline that spans several features rather than
  naming one — it's a per-feature pattern, not a universal heading rule.

## Descriptions follow the same order

**Never open a description by explaining what the feature is** ("X connects your…",
"X tells you…", "X identifies…"). That's spec-sheet order — feature first, value maybe.
Open with the job the reader can do or the value they get, in an action-oriented voice
(imperative or second person), then attribute the feature as the mechanism.

- Weak: "Test Intent Summaries tell you what each test verifies; Error Summaries explain
  what happened and why it likely failed."
- Strong: "Open a failed run and know where to look first: every test states what it
  verifies, and every failure gets a plain-language explanation of what happened and why.
  Test Intent Summaries cover the what; Error Summaries cover the why."

A colon works well as the hinge: `{job/value}: {how the feature delivers it}`. The
feature name still appears — linked where useful — it just never leads.

**Don't open with a defensive negation, even when the negation is the real clarification
needed.** "X doesn't do Y" reads as hedging, not help — it puts the reader in the position
of first learning what they _can't_ have. This isn't a style nitpick to work around once;
treat it as a standing rule and self-check every description draft against it before
showing it, the same way you'd check for spec-sheet order.

- Weak: "`cypress tap` doesn't write your tests — it's how your agent verifies what it
  just wrote."
- Strong: "Know whether what your agent just wrote actually works: `cypress tap` runs the
  spec, reads the failure exactly as the Cypress app shows it, and inspects the DOM at the
  moment a command ran."

The fix is the same move as the spec-sheet-order rule above: find the positive job the
reader gets (verifying their agent's work, not "not writing tests") and lead with that.
Fold the scope clarification in afterward, as supporting detail, if it's still needed at
all — often the positive framing makes the negative one redundant.

## Check the grammatical subject — it's a capability claim

Whatever noun heads a verb chain is what the copy claims performs _every_ verb in it. A
chain that starts accurate can silently overclaim by the third or fourth verb:

- Wrong: "`cypress tap` runs the spec, reads the failure, and inspects the DOM — then
  fixes the code and confirms the fix." (`cypress tap` doesn't fix code; the agent does.)
- Right: "…your agent just wrote: it runs the spec with `cypress tap`, reads the failure,
  and inspects the DOM — then fixes the code and confirms the fix."

Make the actor the subject and the feature the instrument ("your agent runs it _with_ X"),
then read every verb in the chain back against that subject and ask whether the product
actually does that thing. This is an accuracy check, not a style preference — the same
failure mode as a heading that credits one tool for work that needs two.

## Name the feature once per block

A title plus its description is one block of copy. The feature name appears **once** in it,
normally in the title. The description then refers back with a pronoun, or just drops the
subject and uses imperative verbs — it does not restate the name for its own sake.

The exception is when the name is load-bearing in a sentence the reader would otherwise
misread — most often an instruction that has to say _which_ tool to use ("Instruct your
agent to write a new test and verify it with `cypress tap`"). Naming it there is doing
work, not repeating. What's banned is the third mention and the decorative one: a name
dropped in because the sentence felt anonymous without it.

- Wrong: title "Verify tests as you write with `cypress tap`" + description "…`cypress
tap` runs the spec… Or script against `cypress tap` yourself…" (three in a few lines)
- Right: title "Verify tests as you write with `cypress tap`" + description "…run the
  spec, surface the failure… It's a CLI command like any other, so you can script against
  it yourself too."

Applies to any short block — spotlight, card, callout. Re-read the title and description
together before you call the copy done; repetition that's invisible while editing one
field is glaring once they render next to each other.

## Review flags — judgment calls, not hard rules

**Repetition isn't limited to the feature name.** The "once per block" rule above is
about the feature name specifically; the same eye should also catch a verb or distinctive
word repeated across a section heading and the rows under it, or between two nearby
blocks, even when no single rule was broken. Flag it as a minor issue and suggest a
different word for one occurrence — don't rewrite past what's asked without asking.

**Consider merging features that are individually thin but strong together.** If two
features only make a compelling case side by side — neither carries its own spotlight,
but the combination does — flag that as worth merging into one spotlight rather than
shipping two weak ones. This is a call for the person shaping the page, not something to
decide unprompted.
