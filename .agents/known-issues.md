# Known Issues

## User Experience

- **[Medium] Outline active heading jumps ahead during scroll** — The active-heading calculation in Outline.astro:54-56 finds the first heading below the 70px threshold, causing the highlight to jump to the next section while scrolling. Should select the last heading at or above the threshold instead. `docs/src/components/Outline.astro:56` _(PR #659, Copilot)_

## Code Quality

- **[Low] Brittle monorepo root detection in components.ts** — The findComponentsRoot() function at line 33 checks for the Button component directory to locate the monorepo root. This will break if Button is ever renamed or removed. Should check for components/ directory itself or any directory entries. `docs/src/lib/components.ts:34` _(PR #659, Copilot)_
- **[Low] Missing :key binding on TestResultsList v-for loop** — The top-level v-for in TestResultsList.vue:16 iterates over TestResults without a :key binding, which can trigger Vue warnings and cause unnecessary DOM churn. Should add :key="tr.id" since the id is already available. `docs/src/demos/TestResultsList.vue:18` _(PR #659, Copilot)_
- **[Low] Array index used as :key in TestResult demo** — TestResult.vue:13 uses array index (i) as the v-for key, which can cause DOM reuse bugs if the TestResults array order changes. Should use tr.id instead for a stable identifier. `docs/src/demos/TestResult.vue:14` _(PR #659, Copilot)_
