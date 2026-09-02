// Statuses this component accepts, in the fixed order pills and ticks both
// render in. UNCLAIMED has no pill of its own — it only ever appears folded
// into the RUNNING pill's "remaining" count and in the tick bar.
export type StripStatus =
  | 'FAILED'
  | 'ERRORED'
  | 'PASSED'
  | 'SKIPPED'
  | 'RUNNING'
  | 'UNCLAIMED'

export const STATUS_ORDER: StripStatus[] = [
  'FAILED',
  'ERRORED',
  'PASSED',
  'SKIPPED',
  'RUNNING',
  'UNCLAIMED',
]

export const PILL_STATUS_ORDER = STATUS_ORDER.filter(
  (status) => status !== 'UNCLAIMED',
)

// The public prop shape. Plain per-status totals -- the caller folds Cloud's
// RunInstanceStatusEnum onto these seven keys (TIMEDOUT -> errored,
// UNCLAIMED -> queued); this component knows nothing about that enum.
// `skipped` and `cancelled` are separate inputs (NOTESTS and CANCELLED
// respectively) but render as one combined "skipped" pill -- the component
// does that summing, not the caller. The pill's link still filters the Specs
// tab on both real statuses (STATUS_FILTER_VALUES.SKIPPED below).
export interface SpecResultCounts {
  failed?: number
  errored?: number
  passed?: number
  skipped?: number
  cancelled?: number
  running?: number
  queued?: number
}

// The single-key, 1:1 statuses. `skipped`/`cancelled` both feed SKIPPED and
// are summed separately in buildSpecResultsView, not looked up here.
const COUNT_KEY: Record<
  Exclude<keyof SpecResultCounts, 'skipped' | 'cancelled'>,
  StripStatus
> = {
  failed: 'FAILED',
  errored: 'ERRORED',
  passed: 'PASSED',
  running: 'RUNNING',
  queued: 'UNCLAIMED',
}

export type HoverColor = 'red' | 'orange' | 'jade' | 'gray' | 'indigo'

// @cypress-design/react-statusicon's `status` prop is `keyof typeof statuses`
// on a runtime object, with no separately exported type to import -- these
// are exactly its "outline" icon names for our six statuses.
export type OutlineStatusIconName =
  | 'failed'
  | 'errored'
  | 'passed'
  | 'skipped'
  | 'running'
  | 'unclaimed'

interface StatusMeta {
  icon: OutlineStatusIconName
  label: string
  hover: HoverColor
  /** Tailwind background class for this status's tick-bar segment. `null` gets special-cased (RUNNING animates, UNCLAIMED is empty track). */
  tickClass: string | null
}

export const STATUS_META: Record<StripStatus, StatusMeta> = {
  FAILED: {
    icon: 'failed',
    label: 'failed',
    hover: 'red',
    tickClass: 'bg-red-400',
  },
  ERRORED: {
    icon: 'errored',
    label: 'errored',
    hover: 'orange',
    tickClass: 'bg-orange-400',
  },
  PASSED: {
    icon: 'passed',
    label: 'passed',
    hover: 'jade',
    tickClass: 'bg-jade-400',
  },
  SKIPPED: {
    icon: 'skipped',
    label: 'skipped',
    hover: 'gray',
    tickClass: 'bg-gray-500',
  },
  RUNNING: {
    icon: 'running',
    label: 'running',
    hover: 'indigo',
    tickClass: null,
  },
  UNCLAIMED: {
    icon: 'unclaimed',
    label: 'queued',
    hover: 'gray',
    tickClass: null,
  },
}

// The real RunInstanceStatusEnum values a status's Specs-tab filter link
// expands to (e.g. ERRORED also matches a timed-out spec).
export const STATUS_FILTER_VALUES: Record<StripStatus, string[]> = {
  FAILED: ['FAILED'],
  ERRORED: ['ERRORED', 'TIMEDOUT'],
  PASSED: ['PASSED'],
  SKIPPED: ['NOTESTS', 'CANCELLED'],
  RUNNING: ['RUNNING'],
  UNCLAIMED: ['UNCLAIMED'],
}

// Every spacing/sizing value below is a literal `[Npx]` arbitrary value, not
// Tailwind's named rem-based scale (`h-6`, `text-base`, `gap-2`, ...) -- see
// the "Known issue" note in architecture.md for why. `rounded`/`rounded-b`/
// `rounded-tl-none`/`rounded-tr-none` are the one exception: this design
// system's own theme hardcodes `borderRadius.DEFAULT`/`.md` to a literal 4px
// (not a rem value), so the bare `rounded` utilities are already immune and
// don't need converting.
//
// The stacking breakpoint is a container query (`@container` on `strip`,
// `@[576px]:` on `row`/`pills`) rather than a viewport `sm:` media query, so
// the strip stacks based on its own rendered width -- correct even when it's
// embedded somewhere narrower than the viewport (a sidebar, a split pane).
// `@[576px]:` is an arbitrary-value container variant, not the
// `@tailwindcss/container-queries` plugin's named `@sm:` -- that plugin's
// default `containers.sm` is `24rem`, which would hit the exact rem/px bug
// above at the one consumer that needs px in the first place.
export const CssClasses = {
  strip:
    'relative flex flex-col justify-center gap-[12px] border border-solid border-gray-100 rounded bg-white pl-[10px] pr-[16px] pt-[12px] pb-[16px] @container @[576px]:min-h-[56px]',
  row: 'flex flex-col items-start gap-[8px] @[576px]:flex-row @[576px]:flex-wrap @[576px]:items-center @[576px]:justify-between',
  pills:
    'flex flex-col items-start gap-[8px] @[576px]:flex-row @[576px]:flex-wrap @[576px]:items-center',
  pill: 'group inline-flex h-[24px] items-center gap-[6px] px-[6px] rounded text-[16px] leading-[24px] font-normal no-underline transition-colors duration-150 hover:bg-gray-50 hover:no-underline text-gray-700',
  count: 'text-gray-900 font-semibold',
  bar: 'absolute -inset-x-px -bottom-px flex h-[4px] gap-px overflow-hidden rounded-b bg-gray-100/50',
  tick: 'box-border rounded transition-all duration-500 ease-in-out',
  tickFirst: 'rounded-tl-none',
  tickLast: 'rounded-tr-none',
  // Overrides applied via Tooltip's `popperClassName` (see RunResults for
  // the same pattern) -- `[&>div]` is the tooltip's outer color block,
  // `[&>div>div]` its padded inner content container. `!` is required
  // because the shared Tooltip sets these same properties on the same
  // elements. Text stays the shared Tooltip's own 16px/24px default (already
  // matches this component's own pill text, unlike RunResults' smaller
  // body). The shared Tooltip's own p-[8px] reads cramped once a tooltip
  // has more than one line in it (title + body + link), so this bumps it to
  // p-[12px] -- matching the strip's own top padding -- alongside the
  // alignment/width/color overrides.
  tooltipPopper:
    '[&>div]:!text-gray-300 [&>div>div]:!min-w-0 [&>div>div]:!text-left [&>div>div]:!p-[12px]',
  tooltipRows: 'flex flex-col gap-[6px]',
  tooltipRow: 'flex items-center gap-[6px]',
  tooltipRowCount: 'text-white font-semibold',
  tooltipText: 'flex flex-col gap-[6px] max-w-[220px]',
  tooltipTitle: 'text-white font-semibold',
  // Underlined so it doesn't just look like the rest of the sentence -- the
  // point is to make "you can click this" obvious without relying on the
  // reader already knowing the pill underneath the tooltip is itself a link.
  tooltipLink: 'text-indigo-300 underline hover:text-indigo-200',
} as const

// Text/number hover classes per status -- on hover the neutral gray steps
// aside for the status's own hue (label at -500, count a shade darker at
// -600) so the hover reads as "go to this status" rather than a generic
// link hover.
export const HOVER_TEXT_CLASS: Record<HoverColor, string> = {
  red: 'hover:text-red-500',
  orange: 'hover:text-orange-500',
  jade: 'hover:text-jade-500',
  gray: 'hover:text-gray-800',
  indigo: 'hover:text-indigo-500',
}

export const HOVER_COUNT_CLASS: Record<HoverColor, string> = {
  red: 'group-hover:text-red-600',
  orange: 'group-hover:text-orange-600',
  jade: 'group-hover:text-jade-600',
  gray: 'group-hover:text-gray-900',
  indigo: 'group-hover:text-indigo-600',
}

export interface TickGroup {
  status: StripStatus
  count: number
}

// A pill's combined count can fold together two real statuses (skipped =
// NOTESTS + CANCELLED; remaining = RUNNING + UNCLAIMED). A `breakdown`
// tooltip breaks that back out, one row per contributing status -- only
// present when both sides are actually nonzero, since a single-cause total
// is already fully explained by the pill's own text. The scheduled-to-
// complete pill has no numeric split to explain, just a `text` tooltip
// clarifying what the state means (the pill itself is already the link to
// go change it, so this never duplicates that as its own link).
export interface TooltipRow {
  /** 'lightning-bolt' is the DS's own "time saved" icon (Textbox, etc.) --
   * Auto Cancellation stopped a run early, so it borrows that same meaning
   * rather than reusing the plain skipped/ban icon a second time in one row. */
  icon: OutlineStatusIconName | 'lightning-bolt'
  countText: string
  label: string
}

export type PillTooltip =
  | { kind: 'breakdown'; rows: TooltipRow[] }
  // `linkLabel` reuses the pill's own `href` (the tooltip never needs a
  // second URL) -- it exists so the component can render an explicit,
  // clickable call to action inside the tooltip itself, rather than relying
  // on the reader already knowing the pill underneath is the real link.
  | { kind: 'text'; title: string; text: string; linkLabel: string }

export interface Pill {
  status: StripStatus
  href: string
  hover: HoverColor
  icon: OutlineStatusIconName
  /** Pre-rendered pieces so the component just needs to interpolate: `<b>{countText}</b> {rest}`. */
  countText: string
  rest: string
  tooltip?: PillTooltip
}

// Singular is derived by dropping the trailing "s" off `suffix` -- "1 failed
// spec" vs "18 passed specs". Pass suffix="" to drop it entirely (e.g. when
// this strip renders directly above a list already titled "Specs").
const withSuffix = (count: number, suffix: string): string => {
  if (!suffix) return ''
  return ' ' + (count === 1 ? suffix.replace(/s$/, '') : suffix)
}

const specNoun = (count: number): string => (count === 1 ? 'spec' : 'specs')

// Relative to a run tab's own URL (.../runs/:id/<tab>) -- "specs" (not
// "../specs") is what actually lands on .../runs/:id/specs. A leading "../"
// resolves one level too far up and drops the run id entirely.
const buildFilterUrl = (statuses: StripStatus[]): string =>
  `specs?specStatus=${encodeURIComponent(
    JSON.stringify(statuses.flatMap((s) => STATUS_FILTER_VALUES[s])),
  )}`

/**
 * Derives everything the component needs to render -- the pill list (in
 * fixed order, empty statuses dropped), the tick-bar groups (contiguous runs
 * of the same status collapsed into one flush block), and whether the run is
 * "indeterminate" (no counts known yet at all).
 */
export function buildSpecResultsView(
  results: SpecResultCounts,
  options: { label?: string; scheduledToComplete?: string } = {},
) {
  const suffix = options.label ?? 'specs'
  const counts: Partial<Record<StripStatus, number>> = {}
  ;(Object.keys(COUNT_KEY) as (keyof typeof COUNT_KEY)[]).forEach((key) => {
    const n = results[key]
    if (n) counts[COUNT_KEY[key]] = n
  })
  const skippedTotal = (results.skipped ?? 0) + (results.cancelled ?? 0)
  if (skippedTotal) counts.SKIPPED = skippedTotal

  const total = Object.values(counts).reduce((sum, n) => sum + (n ?? 0), 0)
  const indeterminate = total === 0
  const remaining = (counts.RUNNING ?? 0) + (counts.UNCLAIMED ?? 0)
  const isComplete = !indeterminate && remaining === 0

  const pills: Pill[] = []

  if (indeterminate) {
    pills.push({
      status: 'RUNNING',
      href: buildFilterUrl(['RUNNING', 'UNCLAIMED']),
      hover: 'indigo',
      icon: STATUS_META.RUNNING.icon,
      countText: '',
      rest: 'Testing in progress',
    })
  } else {
    PILL_STATUS_ORDER.forEach((status) => {
      const meta = STATUS_META[status]
      // The remaining pill sums running + queued, so it must key off
      // `remaining` rather than `counts.RUNNING` -- a run with specs queued
      // but none claimed yet (counts.RUNNING is 0) still needs this pill.
      if (status === 'RUNNING') {
        if (!remaining) return
        const runningCount = counts.RUNNING ?? 0
        const queuedCount = counts.UNCLAIMED ?? 0
        pills.push({
          status,
          href: buildFilterUrl(['RUNNING', 'UNCLAIMED']),
          hover: meta.hover,
          icon: meta.icon,
          countText: String(remaining),
          rest: `${remaining === 1 ? 'spec' : 'specs'} remaining`,
          tooltip:
            runningCount && queuedCount
              ? {
                  kind: 'breakdown',
                  rows: [
                    {
                      icon: STATUS_META.RUNNING.icon,
                      countText: String(runningCount),
                      label: `${specNoun(runningCount)} running`,
                    },
                    {
                      icon: STATUS_META.UNCLAIMED.icon,
                      countText: String(queuedCount),
                      label: `${specNoun(queuedCount)} queued`,
                    },
                  ],
                }
              : undefined,
        })
        return
      }
      const count = counts[status]
      if (!count) return
      pills.push({
        status,
        href: buildFilterUrl([status]),
        hover: meta.hover,
        icon: meta.icon,
        countText: String(count),
        rest: `${meta.label}${withSuffix(count, suffix)}`,
        tooltip:
          status === 'SKIPPED'
            ? {
                kind: 'breakdown',
                // Unlike the remaining pill, this always renders -- a
                // "skipped" spec is never self-explanatory the way "18
                // passed" is, so even a single-cause total still gets a
                // tooltip naming which real status it came from.
                rows: [
                  results.skipped
                    ? {
                        icon: STATUS_META.SKIPPED.icon,
                        countText: String(results.skipped),
                        label: `${specNoun(results.skipped)} skipped with no tests`,
                      }
                    : null,
                  results.cancelled
                    ? {
                        icon: 'lightning-bolt',
                        countText: String(results.cancelled),
                        label: `${specNoun(results.cancelled)} skipped via Auto Cancellation`,
                      }
                    : null,
                ].filter((row): row is TooltipRow => row !== null),
              }
            : undefined,
      })
    })
  }

  // A run whose groups are all done but held open by the project's
  // completion delay: swap the remaining pill's spec count for a countdown,
  // linking to the settings page that controls the delay.
  if (options.scheduledToComplete && isComplete) {
    pills.push({
      status: 'RUNNING',
      href: '../../settings/general',
      hover: 'indigo',
      icon: STATUS_META.RUNNING.icon,
      countText: options.scheduledToComplete,
      rest: 'remaining',
      tooltip: {
        kind: 'text',
        // Mirrors the real setting's own name and description on the
        // General settings page almost verbatim, rather than a paraphrase
        // that could quietly drift from what the setting page itself says.
        title: 'Run Completion Delay',
        text: "The number of seconds a run waits for new groups to join before transitioning to 'completed.'",
        linkLabel: 'Update settings',
      },
    })
  }

  const groups: TickGroup[] = []
  const sorted = (Object.keys(counts) as StripStatus[])
    .slice()
    .sort((a, b) => STATUS_ORDER.indexOf(a) - STATUS_ORDER.indexOf(b))
  sorted.forEach((status) => {
    for (let i = 0; i < (counts[status] ?? 0); i++) {
      const last = groups[groups.length - 1]
      if (last && last.status === status) last.count++
      else groups.push({ status, count: 1 })
    }
  })
  if (indeterminate) groups.push({ status: 'RUNNING', count: 1 })
  // Scheduled-to-complete: a small running block at the end of the bar (~1/24
  // of the width, at least one spec's worth) so the run still reads as live.
  if (options.scheduledToComplete && isComplete && !indeterminate) {
    groups.push({
      status: 'RUNNING',
      count: Math.max(1, Math.round(total / 24)),
    })
  }

  return { pills, groups, indeterminate, isComplete, remaining, total }
}
