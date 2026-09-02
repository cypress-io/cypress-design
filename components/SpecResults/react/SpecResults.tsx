import type { FC } from 'react'
import React from 'react'
import cs from 'clsx'
import { OutlineStatusIcon } from '@cypress-design/react-statusicon'
import { IconShapeLightningBolt } from '@cypress-design/react-icon'
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
  /** Remaining project completion delay (e.g. "60s"). When set and nothing is running or queued, the trailing pill shows this instead of a spec count. */
  scheduledToComplete?: string
  /** Noun appended to each pill ("28 passed specs"). Singular drops the trailing "s". Pass "" when the surrounding list is already titled "Specs". */
  label?: string
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
  scheduledToComplete,
  label = 'specs',
}) => {
  ensureShimmerStyle()
  const { pills, groups } = buildSpecResultsView(results, {
    label,
    scheduledToComplete,
  })

  return (
    <div className={CssClasses.strip} data-cy="spec-results">
      <div className={CssClasses.row}>
        <div className={CssClasses.pills}>
          {pills.map((pill, index) => {
            const link = (
              <a
                href={pill.href}
                data-cy={`spec-results-pill-${pill.status.toLowerCase()}`}
                className={cs(CssClasses.pill, HOVER_TEXT_CLASS[pill.hover])}
              >
                <OutlineStatusIcon status={pill.icon} size="16" />
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
                  {tooltip.text}
                </div>
              ) : (
                <div
                  className={CssClasses.tooltipRows}
                  data-cy={`spec-results-pill-${pill.status.toLowerCase()}-tooltip`}
                >
                  {tooltip.rows.map((row, rowIndex) => (
                    <div key={rowIndex} className={CssClasses.tooltipRow}>
                      {row.icon === 'lightning-bolt' ? (
                        <IconShapeLightningBolt
                          size="16"
                          strokeColor="indigo-500"
                          fillColor="indigo-200"
                        />
                      ) : (
                        <OutlineStatusIcon status={row.icon} size="16" />
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
                popperClassName={CssClasses.tooltipPopper}
                popper={popperContent}
              >
                {link}
              </Tooltip>
            )
          })}
        </div>
        {onCancel && (
          <div className="w-full border-t border-gray-100/80 pt-[12px] mt-[6px] @[576px]:w-auto @[576px]:border-t-0 @[576px]:pt-0 @[576px]:mt-0">
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
