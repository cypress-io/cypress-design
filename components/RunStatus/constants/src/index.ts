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
  // Outer wrapper around the pill.
  container: 'flex pointer-events-auto',
  // The <ul> pill itself. Theme overrides border and text colors via CssTheme.
  list: 'w-full text-[14px] leading-[20px] font-medium list-none border rounded-[4px] flex items-center',
  // Each <li> stat.
  item: 'h-full whitespace-nowrap flex items-center',
  // Inner <a> wrapper for linked stats.
  link: 'flex items-center h-full w-full px-[6px] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-0',
  // Inner <span> wrapper for unlinked stats.
  unlinked: 'flex items-center h-full w-full px-[6px]',
  // Icon margin matches source `svg { margin: 0 4px }`.
  icon: 'mx-[4px]',
  // Separator after the last leading <li>. Border color comes from CssTheme.
  separatorAfter:
    "after:content-[''] after:border-r after:h-3 after:mx-1 after:self-center",
  // Optional full-width flag (the <div>, not the <ul>).
  fullWidth: 'w-full',
} as const

export const CssTheme = {
  light: {
    list: 'text-gray-600 border-gray-100',
    link: 'text-gray-700 hover:bg-indigo-100 focus-visible:bg-indigo-100',
    separator: 'after:border-gray-100',
  },
  dark: {
    list: 'text-gray-400 border-gray-700',
    link: 'text-gray-300 hover:bg-gray-800 focus-visible:bg-gray-800',
    separator: 'after:border-gray-700',
  },
} as const

export type RunStatusTheme = keyof typeof CssTheme

// Tooltip color contrasts with the surface the pill sits on.
export const TooltipColorForTheme: Record<RunStatusTheme, 'light' | 'dark'> = {
  light: 'dark',
  dark: 'light',
}

// Source uses `top` for the flaky stat, `topRight` (= Floating UI `top-end`) for the rest.
export function getTooltipPlacement(key: StatKey): 'top' | 'top-end' {
  return key === 'flaky' ? 'top' : 'top-end'
}

// Convert the API key (camelCase) to the DOM-attribute / display form (kebab-case).
// Single multi-word case — explicit string match instead of a generic camel→kebab utility.
export function statKeyToKebab(key: StatKey): string {
  return key === 'selfHealed' ? 'self-healed' : key
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Tooltip / aria-label text. `isLinked` flips "View X tests" ↔ "X tests".
export function getTooltipLabel(
  key: StatKey,
  count: number,
  isLinked: boolean,
): string {
  if (key === 'flaky') {
    return count === 1
      ? 'This test both passed and failed when retried within a run'
      : `${count} tests both passed and failed when retried within a run`
  }
  const display = statKeyToKebab(key).replace(/-/g, ' ')
  return isLinked ? `View ${display} tests` : `${capitalize(display)} tests`
}

export interface RunStatusProps {
  passed: number | null
  failed: number | null
  skipped: number | null
  pending: number | null
  flaky?: number | null

  // Self-healed (independent of flaky). Both `showSelfHealed` and a non-zero
  // `selfHealed` count are required for it to render.
  selfHealed?: number | null
  showSelfHealed?: boolean

  theme?: RunStatusTheme
  // When true, regular stats render even with a zero count.
  // Does NOT affect leading stats — they only render when count > 0.
  expanded?: boolean
  fullWidth?: boolean

  links?: Partial<Record<StatKey, string>>
  // Same signature in React and Vue. `children` is whatever the framework
  // renders for the inner icon + count.
  renderLink?: (href: string, children: unknown) => unknown

  showTooltip?: boolean
  className?: string
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
export function getSeparatorAfterKey(
  props: Pick<
    RunStatusProps,
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
  const showSelfHealed =
    !!props.showSelfHealed && statValue(props.selfHealed) > 0
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
    RunStatusProps,
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
    (!!props.showSelfHealed && statValue(props.selfHealed) > 0) ||
    showRegularStat(props.passed, expanded) ||
    showRegularStat(props.failed, expanded) ||
    showRegularStat(props.skipped, expanded) ||
    showRegularStat(props.pending, expanded)
  )
}
