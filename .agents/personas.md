---
name: personas
description: Fetch when writing copy or designing flows that target specific Cypress user roles (QA engineers, developers, eng managers). Skip for purely structural changes.
---

# Personas

> **TODO**: real content. Initial direction below; refine before relying on it.

## QA engineer

- Writes and maintains end-to-end tests; lives in the test runner UI daily.
- Cares about: flake rate, test stability, debugging signals, CI integration.
- Comfortable with: selectors, assertions, networking, browser internals.

## Application developer

- Uses Cypress for component tests and pre-merge validation.
- Cares about: speed, DX, type safety, framework integration (React, Vue).
- Less comfortable with: deep CI/infra concerns; wants sane defaults.

## Engineering manager

- Reads dashboards, not test logs.
- Cares about: trend lines, flaky-test debt, pass rates by suite, cost.
- Wants: high-level summaries, drill-downs only when something's wrong.

## What this means for copy

- Don't explain selectors or assertions to QA engineers.
- Do explain CI/parallelization tradeoffs to application developers.
- For managers: lead with the metric, link to the detail.
