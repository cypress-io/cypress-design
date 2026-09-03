import type { FC, ReactNode } from 'react'
import React from 'react'
import cs from 'clsx'
import { OutlineStatusIcon } from '@cypress-design/react-statusicon'
import {
  IconShapeLightningBolt,
  IconActionArchive,
} from '@cypress-design/react-icon'
import Button from '@cypress-design/react-button'
import Tooltip from '@cypress-design/react-tooltip'
import {
  CssClasses,
  HOVER_TEXT_CLASS,
  HOVER_COUNT_CLASS,
  STATUS_META,
  buildSpecResultsView,
  type SpecResultCounts,
} from '@cypress-design/constants-spec-results'

export interface SpecResultsProps {
  /** Per-status totals. Omitted keys are zero; every key at zero renders the indeterminate "Testing in progress" state. */
  results: SpecResultCounts
  /** Renders the Cancel run button and fires on click. Omit once the run completes. */
  onCancel?: () => void
  /** Renders the Archive run button once the run is complete, and fires on click. */
  onArchive?: () => void
  /** Remaining project completion delay (e.g. "60s"). When set and nothing is running or queued, the trailing pill shows this instead of a spec count. */
  scheduledToComplete?: string
  /** Noun appended to each pill ("28 passed specs"). Singular drops the trailing "s". Pass "" when the surrounding list is already titled "Specs". */
  label?: string
  /** Extra context about the run's own outcome (timed out, errored, manually/auto cancelled, no tests at all) -- renders below the pills, inside this same card, separated by a thin divider rather than a second bordered panel. The caller owns the content; this component only provides the slot. */
  description?: ReactNode
  /** Overrides the derived "is this run complete" state. A timed-out/abandoned run still has specs the recorder never claimed -- indistinguishable from a genuinely live `queued` count by pure totals alone -- so without this override it reads as still running and Archive never shows. Pass `true` once the caller knows independently (e.g. run.status === 'TIMEDOUT') that nothing is actually still executing. */
  isComplete?: boolean
}

// Tailwind's JIT can't synthesize a `linear-gradient(...)` + `@keyframes` pair
// from arbitrary utility values in a way that's portable across every
// consumer's Tailwind config, so the running tick's shimmer is a small,
// once-injected global style rather than a class -- see architecture.md
// ("Running tick shimmer").
let shimmerStyleInjected = false
const RUNNING_TICK_CLASS = 'cy-spec-results-running-tick'
function ensureShimmerStyle() {
  if (shimmerStyleInjected || typeof document === 'undefined') return
  shimmerStyleInjected = true
  const style = document.createElement('style')
  style.textContent = `
    .${RUNNING_TICK_CLASS} {
      background-color: #6470F3;
      background-image: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
      background-size: 160px 100%;
      background-repeat: no-repeat;
      animation: cy-spec-results-shimmer 1.6s ease-in-out infinite;
    }
    @keyframes cy-spec-results-shimmer {
      from { background-position: -160px 0; }
      to { background-position: calc(100% + 160px) 0; }
    }
  `
  document.head.appendChild(style)
}

export const SpecResults: FC<SpecResultsProps> = ({
  results,
  onCancel,
  onArchive,
  scheduledToComplete,
  label = 'specs',
  description,
  isComplete: isCompleteOverride,
}) => {
  ensureShimmerStyle()
  const {
    pills,
    groups,
    isComplete: derivedIsComplete,
  } = buildSpecResultsView(results, { label, scheduledToComplete })
  const isComplete = isCompleteOverride ?? derivedIsComplete

  return (
    <div
      className={cs(
        CssClasses.strip,
        description
          ? CssClasses.stripPaddingWithDescription
          : CssClasses.stripPadding,
      )}
      data-cy="spec-results"
    >
      {description && (
        <div
          className="border-b [border-bottom-style:solid] border-gray-100/80 pb-[16px] text-[14px] leading-[20px] text-gray-700"
          data-cy="spec-results-description"
        >
          {description}
        </div>
      )}
      <div className={CssClasses.row}>
        <div className={CssClasses.pills}>
          {pills.map((pill, index) => {
            const link = (
              <a
                href={pill.href}
                data-cy={`spec-results-pill-${pill.status.toLowerCase()}`}
                className={cs(CssClasses.pill, HOVER_TEXT_CLASS[pill.hover])}
              >
                <OutlineStatusIcon
                  status={pill.icon}
                  size="16"
                  className={
                    pill.icon === 'running'
                      ? CssClasses.runningTrackOnLight
                      : undefined
                  }
                />
                <span>
                  {pill.countText && (
                    <span
                      className={cs(
                        CssClasses.count,
                        HOVER_COUNT_CLASS[pill.hover],
                      )}
                    >
                      {pill.countText}
                    </span>
                  )}
                  {pill.countText ? ' ' : ''}
                  {pill.rest}
                </span>
              </a>
            )
            if (!pill.tooltip) {
              return (
                <React.Fragment key={`${pill.status}-${index}`}>
                  {link}
                </React.Fragment>
              )
            }
            const tooltip = pill.tooltip
            const popperContent =
              tooltip.kind === 'text' ? (
                <div
                  className={CssClasses.tooltipText}
                  data-cy={`spec-results-pill-${pill.status.toLowerCase()}-tooltip`}
                >
                  <div className={CssClasses.tooltipTitle}>{tooltip.title}</div>
                  <div>{tooltip.text}</div>
                  <a href={pill.href} className={CssClasses.tooltipLink}>
                    {tooltip.linkLabel}
                  </a>
                </div>
              ) : (
                <div
                  className={CssClasses.tooltipRows}
                  data-cy={`spec-results-pill-${pill.status.toLowerCase()}-tooltip`}
                >
                  {tooltip.rows.map((row, rowIndex) => (
                    <div key={rowIndex} className={CssClasses.tooltipRow}>
                      {row.icon === 'lightning-bolt' ? (
                        // Inverted from the light-background version
                        // (indigo-500 stroke / indigo-200 fill): on this
                        // dark tooltip, the stroke needs to be the lighter
                        // of the two so the outline actually reads against
                        // the dark background, with the fill as the richer
                        // color underneath it. indigo-300, not indigo-200,
                        // so the stroke itself isn't the brightest thing in
                        // the row -- one shade darker than a first pass.
                        <IconShapeLightningBolt
                          size="16"
                          strokeColor="indigo-300"
                          fillColor="indigo-500"
                        />
                      ) : (
                        <OutlineStatusIcon
                          status={row.icon}
                          size="16"
                          className={
                            row.icon === 'running'
                              ? CssClasses.runningTrackOnDark
                              : row.icon === 'unclaimed'
                                ? CssClasses.queuedTrackOnDark
                                : undefined
                          }
                        />
                      )}
                      <span>
                        <span className={CssClasses.tooltipRowCount}>
                          {row.countText}
                        </span>{' '}
                        {row.label}
                      </span>
                    </div>
                  ))}
                </div>
              )
            return (
              <Tooltip
                key={`${pill.status}-${index}`}
                color="dark"
                placement="top"
                interactive
                popperClassName={CssClasses.tooltipPopper}
                popper={popperContent}
              >
                {link}
              </Tooltip>
            )
          })}
        </div>
        {onCancel && (
          <div className="w-full border-t [border-top-style:solid] border-gray-100/80 pt-[12px] mt-[6px] @[576px]:w-auto @[576px]:border-t-0 @[576px]:pt-0 @[576px]:mt-0">
            <Button
              variant="outline-red"
              size="24"
              data-cy="spec-results-cancel"
              className="flex-shrink-0 !bg-white !px-[6px] gap-[6px]"
              onClick={onCancel}
            >
              <OutlineStatusIcon
                status="skipped"
                size="16"
                className="!icon-dark-red-500"
              />
              Cancel run
            </Button>
          </div>
        )}
        {isComplete && onArchive && (
          <div className="w-full border-t [border-top-style:solid] border-gray-100/80 pt-[12px] mt-[6px] @[576px]:w-auto @[576px]:border-t-0 @[576px]:pt-0 @[576px]:mt-0">
            <Button
              variant="outline-gray-light"
              size="24"
              data-cy="spec-results-archive"
              className="flex-shrink-0 !bg-white !px-[6px] gap-[6px]"
              onClick={onArchive}
            >
              <IconActionArchive
                size="16"
                strokeColor="gray-500"
                fillColor="gray-200"
              />
              Archive run
            </Button>
          </div>
        )}
      </div>
      <div className={CssClasses.bar} data-cy="spec-results-bar">
        {groups.map((group, index) => (
          <div
            key={index}
            className={cs(
              CssClasses.tick,
              index === 0 && CssClasses.tickFirst,
              index === groups.length - 1 && CssClasses.tickLast,
              group.status === 'RUNNING'
                ? RUNNING_TICK_CLASS
                : STATUS_META[group.status].tickClass ?? 'bg-transparent',
            )}
            style={{ flex: `${group.count} 0 0%` }}
          />
        ))}
      </div>
    </div>
  )
}

export default SpecResults
