---
name: personas
description: Fetch when writing copy or designing flows that target specific Cypress user roles (QA engineers, developers, eng managers). Skip for purely structural changes.
---

# Personas

These are lenses into how teams use Cypress — not rigid boxes. A single person often spans
multiple roles depending on team size or context.

---

## Practitioner

**Typical titles:** QA Engineer, SDET, Developer, Automation Engineer

The primary hands-on user. Writes and maintains tests, investigates failures, and debugs
flakiness daily. Experiences tooling friction most acutely.

- Cares about: test stability, flake rate, debugging signals, runner performance
- Comfortable with: selectors, assertions, networking, browser internals
- Needs from UI: fast feedback loops, clear failure output, actionable error messages
- Copy guidance: skip the basics — they know how tests work. Be precise and direct.

---

## Champion

**Typical titles:** Engineering/QA Lead, Staff+ Engineer, Test Architect, QA Manager, Tech Lead

Drives adoption and alignment across the team. Evaluates tooling, shapes workflows, and
advocates for quality investment. Often a former Practitioner.

- Cares about: team-wide consistency, onboarding friction, CI integration, coverage strategy
- Comfortable with: architecture decisions, process design, cross-team coordination
- Needs from UI: configuration clarity, team-level visibility, exportable evidence of value
- Copy guidance: speak to outcomes and trade-offs, not just feature descriptions.

---

## DevOps / Infrastructure

**Typical titles:** DevOps Engineer, Platform Engineer, Release Engineer, SRE

Owns how Cypress runs in CI — not what it tests. Focused on reliability, parallelization,
caching, and infrastructure cost.

- Cares about: execution efficiency, resource usage, pipeline stability, security posture
- Comfortable with: CI/CD systems, containers, environment config, cloud infrastructure
- Needs from UI: machine-readable output, clear parallelization controls, predictable behavior
- Copy guidance: lead with operational concerns. Avoid test-authoring language entirely.

---

## Reviewer

**Typical titles:** Engineering Manager, Product Manager, PR Reviewer, Product Designer

Consumes Cypress output to make shipping decisions. Reads reports and dashboards rather
than writing tests.

- Cares about: regressions, flake trends, coverage gaps, release confidence
- Comfortable with: high-level summaries, trend charts, pass/fail signals
- Needs from UI: clear signal-to-noise, scannable summaries, drill-down only when needed
- Copy guidance: lead with the metric. Link to detail rather than surfacing it by default.

---

## Executive

**Typical titles:** Director/VP of Engineering, CTO, Head of Engineering/QA

Sets priorities and evaluates whether quality tooling aligns with broader engineering goals.
Focused on team productivity, risk reduction, and long-term efficiency.

- Cares about: ROI, organizational risk, team velocity, cost justification
- Comfortable with: business cases, high-level metrics, org-wide reporting
- Needs from UI: executive summaries, cost and efficiency data, clear value signal
- Copy guidance: frame around outcomes and risk reduction, not technical implementation.

---

## Procurement / Legal / Security

**Typical titles:** Procurement Manager, Legal Counsel, Security Engineer, Compliance Officer

Evaluates vendor risk, security posture, and contractual requirements. Engaged late in the
process, but can block progress if concerns aren't addressed.

- Cares about: data handling, compliance certifications, contractual terms, vendor stability
- Comfortable with: formal documentation, audit trails, standardized security questionnaires
- Needs from UI: trust signals, clear data practices, links to compliance documentation
- Copy guidance: straightforward, factual, no jargon. Link to formal docs rather than inline explanation.
