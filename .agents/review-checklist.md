---
name: review-checklist
description: Run before claiming any UI / visual / content task is done. Walk through every applicable check against your own diff; fix violations before committing.
---

# Self-review checklist

Run through these before you say "done." If a check doesn't apply (e.g. no copy changed), skip it. Otherwise it must pass.

## Colors

- [ ] No raw hex values (`#abc`, `#aabbcc`) or `rgb(...)` introduced. Grep the diff: `grep -nE '#[0-9a-fA-F]{3,8}\b|rgb\(|rgba\(' <changed files>`. If any match, replace with a `--cy-*` token or Tailwind class.
- [ ] Text contrast: body text on white uses step `600` or darker; on `gray-1000` uses `300` or lighter. See [colors.md](./colors.md).
- [ ] Tertiary hues (Fuchsia / Green / Magenta) only appear in syntax highlighting or chart code paths.

## Spacing

- [ ] Every new spacing value (margin / padding / gap / width / height) is a multiple of 4. Grep the diff for `[0-9]+px` and confirm.
- [ ] Tailwind spacing utilities used in preference to inline pixel values. See [spacing.md](./spacing.md).

## Iconography

- [ ] New SVGs use `strokeWidth="2"`, `stroke="currentColor"`, `fill="none"`, `strokeLinecap="round"`, `strokeLinejoin="round"`. See [iconography.md](./iconography.md).

## Components

- [ ] If you wrote new UI for a pattern an existing Cypress component covers (Button, Tag, Modal, etc.), use the component instead. Check `components/` before rolling your own.

## Voice & content

- [ ] User-facing strings follow [voice.md](./voice.md): sentence case, no "simply / just / easy", verb-first button labels.
- [ ] Error messages state what happened + what to do next. See [voice.md](./voice.md).

## Accessibility

- [ ] Interactive elements reachable by keyboard, with visible focus states.
- [ ] Icon-only buttons have an `aria-label`.
- [ ] Color is not the only carrier of meaning (status also has icon or text).

## Reuse

- [ ] No duplicate constants or color/spacing maps copy-pasted from another component. Pull from shared `constants/` or tokens.

If a check fails, fix the code, don't relax the rule.
