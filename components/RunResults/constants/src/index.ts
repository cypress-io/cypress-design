// Status keys this component accepts in its API.
// camelCase to match StatusIcon's multi-word keys (noTests, timedOut, overLimit).
// `data-cy` attributes use kebab-case ("self-healed") — see `statKeyToKebab`.
export type StatKey =
  | 'passed'
  | 'failed'
  | 'skipped'
  | 'pending'
  | 'flaky'
  | 'selfHealed'

// Regular stats (the four primary outcomes). Order is fixed.
export const RegularStatKeys = [
  'skipped',
  'pending',
  'passed',
  'failed',
] as const
export type RegularStatKey = (typeof RegularStatKeys)[number]

// Leading stats (rendered before the separator). Order is fixed.
export const LeadingStatKeys = ['flaky', 'selfHealed'] as const
export type LeadingStatKey = (typeof LeadingStatKeys)[number]

export const CssClasses = {
  // The root wrapper. `inline-flex` shrinks it to content; `gap-2` puts an 8px
  // gap between the two pills when both are rendered; `pointer-events-auto`
  // re-enables clicks if a parent disabled them.
  container: 'inline-flex items-center gap-2 pointer-events-auto',
  // The <ul> pill (test-counts). Border is an `::after` overlay — see
  // architecture.md ("Theme strategy").
  list: "flex items-center text-[14px] leading-[24px] font-medium list-none rounded-[4px] relative after:content-[''] after:pointer-events-none after:absolute after:inset-0 after:rounded-[4px]",
  // Each <li> stat.
  item: 'h-full whitespace-nowrap flex items-center',
  // Inner <a> wrapper for linked stats.
  link: 'flex items-center h-full w-full px-[6px] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-0',
  // Inner <span> wrapper for unlinked stats.
  unlinked: 'flex items-center h-full w-full px-[6px]',
  icon: 'mx-[4px]',
  // Flaky icon: hide the yellow background rect — see architecture.md.
  iconFlaky: 'mx-[4px] [&_path:first-child]:fill-transparent',
  iconSelfHealed: 'mx-[4px]',
  // Separator after the last leading <li>. Border color comes from CssTheme.
  separatorAfter:
    "after:content-[''] after:border-r after:h-3 after:mx-1 after:self-center",

  // === RUN-STATUS PILL ===
  // Same `::after` overlay pattern as the test-counts pill. Border color
  // depends on `variant` + `status` (see RUN_STATUS_BORDER_CLASSES).
  runStatusPill:
    "flex items-center h-[24px] text-[14px] leading-[24px] font-medium rounded-[4px] relative after:content-[''] after:pointer-events-none after:absolute after:inset-0 after:rounded-[4px]",
  // Each segment <a>/<span>. 8px horizontal padding (pill outer edge to icon
  // / label edge to pill outer edge), flex layout.
  runStatusSegment: 'flex items-center h-full px-[8px] whitespace-nowrap',
  // Segment as <a>: hover/focus state plus the segment base.
  runStatusLink:
    'no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-0',
  // Icon spacing inside a segment.
  runStatusIcon: 'mr-[4px]',
  // Branch text — `font-normal` overrides the pill's inherited `font-medium`
  // (the branch label is regular weight; the build number stays medium).
  // Max-w + truncate match cypress-services CommitBranch.
  runStatusBranchText: 'max-w-[260px] truncate font-normal',
  // Vertical divider between segments (applied to the first segment when the
  // second segment is present). Positioned via `after:ml-2` (8px between the
  // segment's last text/icon and the divider line) and sits flush against the
  // first segment's right edge; the segment's right padding is dropped to `0`
  // (see `runStatusSegmentDividerAdjacent` below) so the branch segment's own
  // `pl-[8px]` provides the 8px from divider → branch icon.
  // Border color comes from CssTheme[theme].runStatusDivider.
  runStatusDivider:
    "after:content-[''] after:border-r after:h-3 after:ml-2 after:self-center",
  // Applied to the first segment when a divider is present — cancels its right
  // padding so the divider line sits at the segment boundary and total
  // divider → branch icon gap = branch's `pl-[8px]` = 8px.
  runStatusSegmentDividerAdjacent: '!pr-0',
} as const

export const CssTheme = {
  light: {
    list: 'bg-white text-gray-700 after:shadow-[inset_0_0_0_1px_theme(colors.gray.100)]',
    link: 'text-gray-700 hover:bg-gray-50 hover:text-gray-700 hover:no-underline focus:text-gray-700 focus:no-underline focus-visible:bg-gray-50',
    separator: 'after:border-gray-100',
    // Run-status pill: light theme.
    // Subtle gray-50 background and a default 1px gray-100 border via the
    // `::after` overlay. The background persists in hover; only the border
    // color changes to the status color (link variant only) via
    // RUN_STATUS_BORDER_CLASSES. Text color is set per-segment:
    // status-colored on the build-number, gray-700 on the branch.
    runStatusPill:
      'bg-gray-50 after:shadow-[inset_0_0_0_1px_theme(colors.gray.100)]',
    runStatusLink: 'hover:no-underline',
    runStatusBranchText: 'text-gray-700',
    runStatusDivider: 'after:border-gray-200',
  },
  dark: {
    list: 'bg-gray-1000 text-gray-400 after:shadow-[inset_0_0_0_1px_theme(colors.gray.800)]',
    link: 'text-gray-300 hover:bg-gray-900 hover:text-gray-300 hover:no-underline focus:text-gray-300 focus:no-underline focus-visible:bg-gray-900',
    separator: 'after:border-gray-800',
    runStatusPill:
      'bg-gray-950 after:shadow-[inset_0_0_0_1px_theme(colors.gray.800)]',
    runStatusLink: 'hover:no-underline',
    runStatusBranchText: 'text-gray-300',
    runStatusDivider: 'after:border-gray-800',
  },
} as const

// === RUN-STATUS PILL CONSTANTS ===

// Run-applicable status keys (subset of StatusIcon's statusTypes).
// Drives the status icon, border color, text color, and aria-label / title.
export type RunStatusKey =
  | 'passed'
  | 'failed'
  | 'running'
  | 'cancelled'
  | 'errored'
  | 'timedOut'
  | 'noTests'
  | 'overLimit'

// StatusIcon variant + size chosen per run status. `running` only supports
// `outline` in StatusIcon; all terminal statuses use `solid`.
export const RUN_STATUS_VARIANTS: Record<
  RunStatusKey,
  { variant: 'outline' | 'solid'; size: '16' }
> = {
  passed: { variant: 'solid', size: '16' },
  failed: { variant: 'solid', size: '16' },
  running: { variant: 'outline', size: '16' },
  cancelled: { variant: 'solid', size: '16' },
  errored: { variant: 'solid', size: '16' },
  timedOut: { variant: 'solid', size: '16' },
  noTests: { variant: 'solid', size: '16' },
  overLimit: { variant: 'solid', size: '16' },
}

// Text color for the build-number segment per status. Branch segment uses the
// theme's default text color (see CssTheme[theme].runStatusBranchText).
// <tw-keep> comments keep Tailwind's tree-shake from stripping the dynamic classes.
export const RUN_STATUS_TEXT_CLASSES: Record<RunStatusKey, string> = {
  // <tw-keep className="text-jade-400" />
  passed: 'text-jade-400',
  // <tw-keep className="text-red-400" />
  failed: 'text-red-400',
  // <tw-keep className="text-indigo-400" />
  running: 'text-indigo-400',
  // <tw-keep className="text-gray-400" />
  cancelled: 'text-gray-400',
  // <tw-keep className="text-orange-400" />
  errored: 'text-orange-400',
  // <tw-keep className="text-orange-400" />
  timedOut: 'text-orange-400',
  // <tw-keep className="text-orange-400" />
  noTests: 'text-orange-400',
  // <tw-keep className="text-orange-400" />
  overLimit: 'text-orange-400',
}

// Status-colored border applied on **hover** of the run-status pill when
// variant='link'. In the default (non-hover) state the pill wears the neutral
// gray-100 / gray-800 border from CssTheme[theme].runStatusPill; hovering
// swaps in the status color on the same `::after` overlay so nothing shifts.
// <tw-keep> comments keep Tailwind's tree-shake from stripping the dynamic classes.
export const RUN_STATUS_BORDER_CLASSES: Record<RunStatusKey, string> = {
  // <tw-keep className="hover:after:shadow-[inset_0_0_0_1px_theme(colors.jade.400)]" />
  passed: 'hover:after:shadow-[inset_0_0_0_1px_theme(colors.jade.400)]',
  // <tw-keep className="hover:after:shadow-[inset_0_0_0_1px_theme(colors.red.400)]" />
  failed: 'hover:after:shadow-[inset_0_0_0_1px_theme(colors.red.400)]',
  // <tw-keep className="hover:after:shadow-[inset_0_0_0_1px_theme(colors.indigo.400)]" />
  running: 'hover:after:shadow-[inset_0_0_0_1px_theme(colors.indigo.400)]',
  // <tw-keep className="hover:after:shadow-[inset_0_0_0_1px_theme(colors.gray.400)]" />
  cancelled: 'hover:after:shadow-[inset_0_0_0_1px_theme(colors.gray.400)]',
  // <tw-keep className="hover:after:shadow-[inset_0_0_0_1px_theme(colors.orange.400)]" />
  errored: 'hover:after:shadow-[inset_0_0_0_1px_theme(colors.orange.400)]',
  // <tw-keep className="hover:after:shadow-[inset_0_0_0_1px_theme(colors.orange.400)]" />
  timedOut: 'hover:after:shadow-[inset_0_0_0_1px_theme(colors.orange.400)]',
  // <tw-keep className="hover:after:shadow-[inset_0_0_0_1px_theme(colors.orange.400)]" />
  noTests: 'hover:after:shadow-[inset_0_0_0_1px_theme(colors.orange.400)]',
  // <tw-keep className="hover:after:shadow-[inset_0_0_0_1px_theme(colors.orange.400)]" />
  overLimit: 'hover:after:shadow-[inset_0_0_0_1px_theme(colors.orange.400)]',
}

// Dev-mode warning for invalid `runStatus.status` values. Deduped per status
// via a module-level Set so the same message doesn't spam the console under
// React StrictMode / re-renders. No-op in production. Shared between the
// React and Vue outer wrappers (they both compute `showRunStatus` and need to
// warn once when the pill gets skipped).
const warnedRunStatuses: Set<string> = new Set()
export function warnInvalidRunStatus(status: string): void {
  if (
    typeof process === 'undefined' ||
    process.env?.NODE_ENV === 'production'
  ) {
    return
  }
  if (warnedRunStatuses.has(status)) return
  warnedRunStatuses.add(status)
  // eslint-disable-next-line no-console
  console.warn(
    `[RunResults] runStatus.status="${status}" is not a valid RunStatusKey; skipping the run-status pill. Valid values: ${Object.keys(RUN_STATUS_VARIANTS).join(', ')}.`,
  )
}

// Readable label per status. Drives the `title` attribute on the pill (so
// screen readers + hover-tooltips announce the run status).
export const RUN_STATUS_LABELS: Record<RunStatusKey, string> = {
  passed: 'Passed',
  failed: 'Failed',
  running: 'Running',
  cancelled: 'Cancelled',
  errored: 'Errored',
  timedOut: 'Timed out',
  noTests: 'No tests',
  overLimit: 'Over limit',
}

// Config object passed via the `runStatus` prop.
export interface RunStatusConfig {
  buildNumber: number
  status: RunStatusKey
  // Branch name displayed after a vertical divider. Always rendered as plain
  // text — the branch segment is never a link. (If the parent surface needs
  // branch navigation, expose it as a separate link outside the pill.)
  branch?: string
  variant?: 'base' | 'link'
  href?: string
  // Classes for the run-status pill `<span>`, merged via `tailwind-merge`.
  pillClassName?: string
}

export type RunResultsTheme = keyof typeof CssTheme

// Tooltip color contrasts with the surface the pill sits on.
export const TooltipColorForTheme: Record<RunResultsTheme, 'light' | 'dark'> = {
  light: 'dark',
  dark: 'light',
}

// RunResults-specific overrides applied via Tooltip's `popperClassName`:
//   - drop the 160px min-width so the tooltip auto-fits content
//   - shrink text to 14px / 20px (DS body size; shared Tooltip defaults to 16px / 24px)
//   - text color: gray-300 for dark tooltips (on light RunResults), gray-700 for light tooltips (on dark RunResults)
// `[&>div]` targets the colored container inside the popper (where text color
// is set on the shared Tooltip); `[&>div>div]` targets the inner text container
// (where font-size / line-height / min-width are set on the shared Tooltip).
// `!` is required because the shared Tooltip applies these on the same elements.
const CssTooltipPopperBase =
  '[&>div>div]:!text-[14px] [&>div>div]:!leading-[20px] [&>div>div]:!min-w-0'
export const CssTooltipPopperDark = `[&>div]:!text-gray-300 ${CssTooltipPopperBase}`
export const CssTooltipPopperLight = `[&>div]:!text-gray-700 ${CssTooltipPopperBase}`

// `top-start` for flaky: left-aligns the tooltip with the stat so the arrow
// points at the element rather than at the center of a wide tooltip.
// `top-end` for the rest (right-aligned stats on the right side of the pill).
export function getTooltipPlacement(key: StatKey): 'top-start' | 'top-end' {
  return key === 'flaky' ? 'top-start' : 'top-end'
}

// Convert the API key (camelCase) to the DOM-attribute / display form (kebab-case).
// Single multi-word case — explicit string match instead of a generic camel→kebab utility.
export function statKeyToKebab(key: StatKey): string {
  return key === 'selfHealed' ? 'self-healed' : key
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Long-form flaky description used in tooltips (always shown regardless of link).
export function getFlakyTooltipText(count: number): string {
  return count === 1
    ? 'This test both passed and failed when retried within a run'
    : `${count} tests both passed and failed when retried within a run`
}

// Tooltip / aria-label text. `isLinked` flips "View X tests" ↔ "X tests".
// Flaky linked stat uses "View flaky tests"; tooltip content uses getFlakyTooltipText.
export function getTooltipLabel(
  key: StatKey,
  count: number,
  isLinked: boolean,
): string {
  if (key === 'flaky') {
    return isLinked ? 'View flaky tests' : getFlakyTooltipText(count)
  }
  const display = statKeyToKebab(key)
  return isLinked ? `View ${display} tests` : `${capitalize(display)} tests`
}

export interface RunResultsProps {
  // Run-status pill — rendered when provided. See RunStatusConfig.
  runStatus?: RunStatusConfig

  // Test-counts pill — all four are optional (default 0). Null and undefined
  // are coerced to 0. Were previously required; relaxed so callers can render
  // only the run-status pill.
  passed?: number | null
  failed?: number | null
  skipped?: number | null
  pending?: number | null
  flaky?: number | null

  // Self-healed (independent of flaky). Rendered whenever `showSelfHealed`
  // is true — the count (including 0, including `null` coerced to 0) is shown
  // verbatim. Consumers set the flag based on whether the run could have
  // self-healed tests at all (e.g. `cy.prompt` was available).
  selfHealed?: number | null
  showSelfHealed?: boolean

  theme?: RunResultsTheme
  // When true, regular stats render even with a zero count.
  // Does NOT affect leading stats. Flaky still renders only when its count
  // is > 0; self-healed renders whenever `showSelfHealed` is true (including
  // count 0). See `getSeparatorAfterKey` and `hasAnyStat` for the exact rules.
  expanded?: boolean

  links?: Partial<Record<StatKey, string>>
  // Same signature in React and Vue. `children` is whatever the framework
  // renders for the inner icon + count. `className` is the component's computed
  // link styling (gray text, padding, no-underline, hover/focus) — apply it to
  // your custom link so it matches the default <a>.
  renderLink?: (href: string, children: unknown, className?: string) => unknown

  showTooltip?: boolean
  // Classes for the root wrapper element (appended via `clsx`, DS convention).
  className?: string
  // Classes for the pill `<ul>`, merged with the component's own classes via
  // `tailwind-merge` so a consumer can override conflicting utilities — e.g.
  // `bg-gray-900` / `bg-transparent` to blend the pill into a colored surface —
  // and win the Tailwind source-order conflict.
  pillClassName?: string
}

// Null-safe count → numeric value for display & visibility logic.
export function statValue(count: number | null | undefined): number {
  return count ?? 0
}

// Should a regular stat render?
export function showRegularStat(
  count: number | null | undefined,
  expanded: boolean,
): boolean {
  return expanded || statValue(count) > 0
}

// Which leading key (if any) gets the separator-after modifier?
// - selfHealed wins if it would render (it's the second leading stat)
// - else flaky if it would render
// - else null (no separator at all)
// Also returns null when there are no regular stats to follow — keep separators
// from dangling at the end of the pill.
//
// Self-healed renders whenever `showSelfHealed` is true (regardless of count);
// flaky renders only when its count > 0.
export function getSeparatorAfterKey(
  props: Pick<
    RunResultsProps,
    | 'flaky'
    | 'selfHealed'
    | 'showSelfHealed'
    | 'passed'
    | 'failed'
    | 'skipped'
    | 'pending'
    | 'expanded'
  >,
): LeadingStatKey | null {
  const showFlaky = statValue(props.flaky) > 0
  const showSelfHealed = !!props.showSelfHealed
  if (!showFlaky && !showSelfHealed) return null

  const expanded = !!props.expanded
  const anyRegular =
    showRegularStat(props.passed, expanded) ||
    showRegularStat(props.failed, expanded) ||
    showRegularStat(props.skipped, expanded) ||
    showRegularStat(props.pending, expanded)
  if (!anyRegular) return null

  return showSelfHealed ? 'selfHealed' : 'flaky'
}

// Does anything render at all? Used to short-circuit to `null` on empty state.
export function hasAnyStat(
  props: Pick<
    RunResultsProps,
    | 'flaky'
    | 'selfHealed'
    | 'showSelfHealed'
    | 'passed'
    | 'failed'
    | 'skipped'
    | 'pending'
    | 'expanded'
  >,
): boolean {
  const expanded = !!props.expanded
  return (
    statValue(props.flaky) > 0 ||
    !!props.showSelfHealed ||
    showRegularStat(props.passed, expanded) ||
    showRegularStat(props.failed, expanded) ||
    showRegularStat(props.skipped, expanded) ||
    showRegularStat(props.pending, expanded)
  )
}
