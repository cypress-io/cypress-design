// Every height is a literal `[Npx]` value rather than Tailwind's rem scale:
// cypress-services sets `html { font-size: 10px }`, which shrinks every rem
// utility to 62.5% there. See SpecResults' architecture.md for the details.
export const CssSizeClasses = {
  '6': 'h-[6px]',
  '8': 'h-[8px]',
  '12': 'h-[12px]',
} as const

export const CssTrackClasses = {
  light: 'bg-gray-50',
  dark: 'bg-gray-900',
} as const

export const CssTrackStaticClasses =
  'flex w-full gap-[2px] overflow-hidden rounded-full'

// Every preset except indigo-light holds 3:1 against its track (WCAG 1.4.11).
// indigo-light is a secondary share that always sits beside a text legend.
export const CssFillColorClasses = {
  light: {
    indigo: 'bg-indigo-500',
    'indigo-light': 'bg-indigo-300',
    purple: 'bg-purple-500',
    teal: 'bg-teal-400',
    jade: 'bg-jade-500',
    red: 'bg-red-400',
    orange: 'bg-orange-500',
    gray: 'bg-gray-600',
  },
  dark: {
    indigo: 'bg-indigo-400',
    'indigo-light': 'bg-indigo-300',
    purple: 'bg-purple-400',
    teal: 'bg-teal-300',
    jade: 'bg-jade-300',
    red: 'bg-red-300',
    orange: 'bg-orange-400',
    gray: 'bg-gray-500',
  },
} as const

export const CssFillStaticClasses =
  'h-full min-w-0 transition-[width] duration-500 ease-in-out'

// Only the last fill rounds its end; the track's overflow-hidden rounds the
// start, so the joins between segments stay square.
export const CssFillLastClasses = 'rounded-r-full'

export type ProgressBarSize = keyof typeof CssSizeClasses
export type ProgressBarTheme = keyof typeof CssTrackClasses
export type ProgressBarColor = keyof (typeof CssFillColorClasses)['light']

export const DefaultSize: ProgressBarSize = '6'
export const DefaultTheme: ProgressBarTheme = 'light'
export const DefaultColor: ProgressBarColor = 'indigo'
export const DefaultMax = 100

export interface ProgressBarSegment {
  value: number
  /** Preset fill color. Defaults to the bar's `color`. */
  color?: ProgressBarColor
  /** Extra classes for this segment's fill, merged last (e.g. `bg-teal-600`). */
  className?: string
  /** Name read out in the default `aria-valuetext`, e.g. "Open mode". */
  label?: string
  /** Animates this segment. Defaults to the bar's `active`. */
  active?: boolean
}

export interface ProgressBarProps {
  /** Filled amount, from 0 to `max`. Ignored when `segments` is non-empty. */
  value?: number
  max?: number
  /** Stacked fills, drawn left to right. */
  segments?: ProgressBarSegment[]
  size?: ProgressBarSize
  color?: ProgressBarColor
  theme?: ProgressBarTheme
  /** Animates the fill to show the work is ongoing. */
  active?: boolean
  /** Extra classes for the fill, merged last. Single-value bars only; segments take `className`. */
  fillClassName?: string
  /** Overrides the screen-reader announcement of the value. */
  valueText?: string
}

// The shimmer needs a gradient plus a @keyframes rule, and @cypress-design/css
// has no keyframe for it, so it's a small global style injected once per
// document. The id guard keeps React and Vue copies on one page from
// injecting it twice.
export const ActiveFillClass = 'cy-progress-bar-active'
const ActiveStyleId = 'cy-progress-bar-active-style'
const ActiveStyleCss = `
.${ActiveFillClass} {
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb, white 55%, transparent), transparent);
  background-size: 160px 100%;
  background-repeat: no-repeat;
  animation: cy-progress-bar-shimmer 1.6s ease-in-out infinite;
}
@keyframes cy-progress-bar-shimmer {
  from { background-position: -160px 0; }
  to { background-position: calc(100% + 160px) 0; }
}
@media (prefers-reduced-motion: reduce) {
  .${ActiveFillClass} { animation: none; background-image: none; }
}
`

export function ensureActiveStyle() {
  if (typeof document === 'undefined') return
  if (document.getElementById(ActiveStyleId)) return
  const style = document.createElement('style')
  style.id = ActiveStyleId
  style.textContent = ActiveStyleCss
  document.head.appendChild(style)
}

export interface ProgressBarFill {
  key: string
  /** Share of the track, 0–100. */
  width: number
  /** Pass to twMerge in order, so a custom class beats the preset color. */
  classes: string[]
  active: boolean
}

export interface ProgressBarView {
  trackClasses: string
  max: number
  now: number
  valueText?: string
  fills: ProgressBarFill[]
  hasActiveFill: boolean
}

function toAmount(value: number | undefined) {
  return Number.isFinite(value) && (value as number) > 0 ? (value as number) : 0
}

export function buildProgressBarView(props: ProgressBarProps): ProgressBarView {
  const theme = props.theme ?? DefaultTheme
  const size = props.size ?? DefaultSize
  const color = props.color ?? DefaultColor
  const max =
    Number.isFinite(props.max) && (props.max as number) > 0
      ? (props.max as number)
      : DefaultMax

  const segments: ProgressBarSegment[] = props.segments?.length
    ? props.segments
    : [{ value: props.value ?? 0, className: props.fillClassName }]

  // Clamp cumulatively so the fills never add up past `max`.
  let remaining = max
  const sized = segments.map((segment, index) => {
    const amount = Math.min(toAmount(segment.value), remaining)
    remaining -= amount
    return { segment, index, amount }
  })
  const visible = sized.filter(({ amount }) => amount > 0)

  const fills = visible.map(({ segment, index, amount }, position) => {
    const active = segment.active ?? !!props.active
    return {
      key: `${index}`,
      width: (amount / max) * 100,
      active,
      classes: [
        CssFillStaticClasses,
        CssFillColorClasses[theme][segment.color ?? color],
        position === visible.length - 1 ? CssFillLastClasses : '',
        active ? ActiveFillClass : '',
        segment.className ?? '',
      ],
    }
  })

  const labelled = props.segments?.length
    ? sized
        .filter(({ segment }) => segment.label)
        .map(({ segment }) => `${segment.label} ${toAmount(segment.value)}`)
    : []

  return {
    trackClasses: [
      CssTrackStaticClasses,
      CssSizeClasses[size],
      CssTrackClasses[theme],
    ].join(' '),
    max,
    now: max - remaining,
    valueText:
      props.valueText ?? (labelled.length ? labelled.join(', ') : undefined),
    fills,
    hasActiveFill: fills.some((fill) => fill.active),
  }
}
