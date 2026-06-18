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
  // Outer wrapper. `inline-flex` so the component shrinks to content width.
  container: 'inline-flex pointer-events-auto',
  // The <ul> pill. Border is an `::after` overlay — see architecture.md
  // ("Theme strategy").
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
} as const

export const CssTheme = {
  light: {
    list: 'bg-white text-gray-700 after:shadow-[inset_0_0_0_1px_theme(colors.gray.100)]',
    link: 'text-gray-700 hover:bg-gray-50 hover:text-gray-700 hover:no-underline focus:text-gray-700 focus:no-underline focus-visible:bg-gray-50',
    separator: 'after:border-gray-100',
  },
  dark: {
    list: 'bg-gray-1000 text-gray-400 after:shadow-[inset_0_0_0_1px_theme(colors.gray.800)]',
    link: 'text-gray-300 hover:bg-gray-900 hover:text-gray-300 hover:no-underline focus:text-gray-300 focus:no-underline focus-visible:bg-gray-900',
    separator: 'after:border-gray-800',
  },
} as const

export type RunResultsTheme = keyof typeof CssTheme

// The pill <ul>'s themed classes, with the background optionally overridden.
// `bgClassName` replaces the theme's single `bg-*` token so the override always
// wins (no Tailwind source-order conflict); a theme with no `bg-*` falls back to
// appending. Shared by the React and Vue components.
export function listClasses(
  theme: RunResultsTheme,
  bgClassName?: string,
): string {
  const base = CssTheme[theme].list
  if (!bgClassName) return base
  return /\bbg-\S+/.test(base)
    ? base.replace(/\bbg-\S+/, bgClassName)
    : `${base} ${bgClassName}`
}

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
  passed: number | null
  failed: number | null
  skipped: number | null
  pending: number | null
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
  className?: string
  // Override the pill's background (e.g. `bg-transparent` to blend with a
  // colored surface). Replaces the theme's default background on the <ul>.
  bgClassName?: string
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
