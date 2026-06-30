import * as React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import StatusIcon from '@cypress-design/react-statusicon'
import {
  IconStatusFlaky,
  IconGeneralSparkleSingle,
  IconTechnologyBranchH,
} from '@cypress-design/react-icon'
import Tooltip from '@cypress-design/react-tooltip'
import {
  CssClasses,
  CssTheme,
  CssTooltipPopperDark,
  CssTooltipPopperLight,
  TooltipColorForTheme,
  RUN_STATUS_VARIANTS,
  RUN_STATUS_TEXT_CLASSES,
  RUN_STATUS_BORDER_CLASSES,
  RUN_STATUS_LABELS,
  type RunResultsProps,
  type RunResultsTheme,
  type RunStatusConfig,
  type StatKey,
  getSeparatorAfterKey,
  getTooltipLabel,
  getTooltipPlacement,
  getFlakyTooltipText,
  hasAnyStat,
  showRegularStat,
  statKeyToKebab,
  statValue,
} from '@cypress-design/constants-runresults'

export type {
  RunResultsProps,
  RunStatusConfig,
  RunStatusKey,
} from '@cypress-design/constants-runresults'

interface StatProps {
  statKey: StatKey
  count: number
  link: string | undefined
  renderLink: RunResultsProps['renderLink']
  showTooltip: boolean
  theme: RunResultsTheme
  applySeparator: boolean
}

const Stat: React.FC<StatProps> = ({
  statKey,
  count,
  link,
  renderLink,
  showTooltip,
  theme,
  applySeparator,
}) => {
  const kebab = statKeyToKebab(statKey)
  const isLinked = !!link
  const label = getTooltipLabel(statKey, count, isLinked)

  const icon = (() => {
    if (statKey === 'flaky') {
      return (
        <IconStatusFlaky
          size="12"
          data-cy="status-icon-flaky"
          className={CssClasses.iconFlaky}
        />
      )
    }
    if (statKey === 'selfHealed') {
      return (
        <IconGeneralSparkleSingle
          size="12"
          strokeColor="jade-400"
          fillColor="jade-50"
          data-cy="status-icon-self-healed"
          className={CssClasses.iconSelfHealed}
        />
      )
    }
    return (
      <StatusIcon
        size="12"
        status={statKey}
        data-cy={`status-icon-${kebab}`}
        className={CssClasses.icon}
      />
    )
  })()

  const inner = (
    <>
      {icon}
      <span>{count}</span>
    </>
  )

  const linkClasses = clsx(CssClasses.link, CssTheme[theme].link)
  const unlinkedClasses = CssClasses.unlinked

  let content: React.ReactNode
  if (isLinked && link) {
    if (renderLink) {
      content = renderLink(link, inner, linkClasses) as React.ReactNode
    } else {
      content = (
        <a
          href={link}
          aria-label={label}
          data-cy={`link-${kebab}`}
          className={linkClasses}
        >
          {inner}
        </a>
      )
    }
  } else {
    content = <span className={unlinkedClasses}>{inner}</span>
  }

  const tooltipText = statKey === 'flaky' ? getFlakyTooltipText(count) : label

  const wrappedContent = showTooltip ? (
    <Tooltip
      placement={getTooltipPlacement(statKey)}
      color={TooltipColorForTheme[theme]}
      popper={tooltipText}
      popperClassName={
        TooltipColorForTheme[theme] === 'dark'
          ? CssTooltipPopperDark
          : CssTooltipPopperLight
      }
    >
      {content}
    </Tooltip>
  ) : (
    content
  )

  return (
    <li
      data-cy={`total-${kebab}`}
      className={clsx(
        CssClasses.item,
        applySeparator && CssClasses.separatorAfter,
        applySeparator && CssTheme[theme].separator,
      )}
    >
      {wrappedContent}
    </li>
  )
}

interface RunStatusSegmentProps {
  kind: 'build-number' | 'branch'
  icon: React.ReactNode
  label: React.ReactNode
  href: string | undefined
  ariaLabel: string
  renderLink: RunResultsProps['renderLink']
  theme: RunResultsTheme
  applyDivider: boolean
}

const RunStatusSegment: React.FC<RunStatusSegmentProps> = ({
  kind,
  icon,
  label,
  href,
  ariaLabel,
  renderLink,
  theme,
  applyDivider,
}) => {
  const isLinked = !!href
  const segmentBase = clsx(
    CssClasses.runStatusSegment,
    applyDivider && CssClasses.runStatusDivider,
    applyDivider && CssTheme[theme].runStatusDivider,
  )
  const linkClasses = clsx(
    segmentBase,
    CssClasses.runStatusLink,
    CssTheme[theme].runStatusLink,
  )
  const unlinkedClasses = segmentBase

  const inner = (
    <>
      {icon}
      {label}
    </>
  )

  if (isLinked && href) {
    if (renderLink) {
      return renderLink(href, inner, linkClasses) as React.ReactElement
    }
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        data-cy={`run-status-${kind}`}
        className={linkClasses}
      >
        {inner}
      </a>
    )
  }
  return (
    <span data-cy={`run-status-${kind}`} className={unlinkedClasses}>
      {inner}
    </span>
  )
}

interface RunStatusPillProps {
  config: RunStatusConfig
  renderLink: RunResultsProps['renderLink']
  theme: RunResultsTheme
}

const RunStatusPill: React.FC<RunStatusPillProps> = ({
  config,
  renderLink,
  theme,
}) => {
  const {
    buildNumber,
    status,
    branch,
    variant = 'base',
    href,
    branchHref,
    pillClassName,
  } = config

  const { variant: iconVariant, size: iconSize } = RUN_STATUS_VARIANTS[status]
  const isLink = variant === 'link'

  const pillClasses = twMerge(
    CssClasses.runStatusPill,
    CssTheme[theme].runStatusPill,
    isLink && RUN_STATUS_BORDER_CLASSES[status],
    pillClassName,
  )

  // Build-number segment: status icon + #N (with status-colored text).
  const buildNumberIcon = (
    <StatusIcon
      size={iconSize}
      status={status}
      variant={iconVariant}
      data-cy="run-status-icon"
      className={CssClasses.runStatusIcon}
    />
  )
  const buildNumberLabel = (
    <span className={RUN_STATUS_TEXT_CLASSES[status]}>{`#${buildNumber}`}</span>
  )

  // Branch segment: branch icon + branch text (in neutral theme color).
  const hasBranch = !!branch
  const branchIcon = hasBranch ? (
    <IconTechnologyBranchH
      size="16"
      strokeColor="gray-500"
      data-cy="run-status-branch-icon"
      className={CssClasses.runStatusIcon}
    />
  ) : null
  const branchLabel = hasBranch ? (
    <span
      className={clsx(
        CssClasses.runStatusBranchText,
        CssTheme[theme].runStatusBranchText,
      )}
    >
      {branch}
    </span>
  ) : null

  return (
    <span
      data-cy="run-status"
      title={RUN_STATUS_LABELS[status]}
      className={pillClasses}
    >
      <RunStatusSegment
        kind="build-number"
        icon={buildNumberIcon}
        label={buildNumberLabel}
        href={href}
        ariaLabel={`View run #${buildNumber}`}
        renderLink={renderLink}
        theme={theme}
        applyDivider={hasBranch}
      />
      {hasBranch && (
        <RunStatusSegment
          kind="branch"
          icon={branchIcon}
          label={branchLabel}
          href={branchHref}
          ariaLabel={`View branch ${branch}`}
          renderLink={renderLink}
          theme={theme}
          applyDivider={false}
        />
      )}
    </span>
  )
}

// `forwardRef` so a parent can attach a `ref` to the root wrapper `<div>`.
export const RunResults = React.forwardRef<
  HTMLDivElement,
  RunResultsProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof RunResultsProps>
>(function RunResults(
  {
    runStatus,
    passed,
    failed,
    skipped,
    pending,
    flaky,
    selfHealed,
    showSelfHealed = false,
    theme = 'light',
    expanded = false,
    links,
    renderLink,
    showTooltip = true,
    className,
    pillClassName,
    ...rest
  },
  ref,
) {
  const summaryProps = {
    passed,
    failed,
    skipped,
    pending,
    flaky,
    selfHealed,
    showSelfHealed,
    expanded,
  }

  const showTestCounts = hasAnyStat(summaryProps)
  const showRunStatus = !!runStatus

  // Both pills empty → render nothing. See instructions.md "Empty state".
  if (!showRunStatus && !showTestCounts) return null

  const separatorAfterKey = getSeparatorAfterKey(summaryProps)
  const showFlaky = statValue(flaky) > 0
  // Self-healed renders whenever the flag is true; the count (0 included) is
  // shown verbatim. See instructions.md / architecture.md for rationale.
  const showSelfHealedStat = !!showSelfHealed

  return (
    // The wrapper `<div>` is the root. Holds up to two pills:
    //   1. run-status pill (rendered when `runStatus` is set)
    //   2. test-counts pill (rendered when `hasAnyStat` is true)
    // `className` lands here per DS convention. `pillClassName` lands on the
    // test-counts `<ul>`; `runStatus.pillClassName` lands on the run-status
    // `<span>`. Both merged via `tailwind-merge` so consumer overrides win
    // the Tailwind source-order conflict against the theme.
    <div
      ref={ref}
      {...rest}
      // `data-cy` is set AFTER `{...rest}` so a consumer passing their own
      // `data-cy` cannot override our fixed selector. This matches the Vue
      // side and preserves the documented public test contract — see the
      // `[data-cy="run-results"]` row in instructions.md.
      data-cy="run-results"
      className={clsx(CssClasses.container, className)}
    >
      {showRunStatus && (
        <RunStatusPill
          config={runStatus as RunStatusConfig}
          renderLink={renderLink}
          theme={theme}
        />
      )}
      {showTestCounts && (
        <ul
          className={twMerge(
            CssClasses.list,
            CssTheme[theme].list,
            pillClassName,
          )}
        >
          {showFlaky && (
            <Stat
              statKey="flaky"
              count={statValue(flaky)}
              link={links?.flaky}
              renderLink={renderLink}
              showTooltip={showTooltip}
              theme={theme}
              applySeparator={separatorAfterKey === 'flaky'}
            />
          )}
          {showSelfHealedStat && (
            <Stat
              statKey="selfHealed"
              count={statValue(selfHealed)}
              link={links?.selfHealed}
              renderLink={renderLink}
              showTooltip={showTooltip}
              theme={theme}
              applySeparator={separatorAfterKey === 'selfHealed'}
            />
          )}
          {showRegularStat(skipped, expanded) && (
            <Stat
              statKey="skipped"
              count={statValue(skipped)}
              link={links?.skipped}
              renderLink={renderLink}
              showTooltip={showTooltip}
              theme={theme}
              applySeparator={false}
            />
          )}
          {showRegularStat(pending, expanded) && (
            <Stat
              statKey="pending"
              count={statValue(pending)}
              link={links?.pending}
              renderLink={renderLink}
              showTooltip={showTooltip}
              theme={theme}
              applySeparator={false}
            />
          )}
          {showRegularStat(passed, expanded) && (
            <Stat
              statKey="passed"
              count={statValue(passed)}
              link={links?.passed}
              renderLink={renderLink}
              showTooltip={showTooltip}
              theme={theme}
              applySeparator={false}
            />
          )}
          {showRegularStat(failed, expanded) && (
            <Stat
              statKey="failed"
              count={statValue(failed)}
              link={links?.failed}
              renderLink={renderLink}
              showTooltip={showTooltip}
              theme={theme}
              applySeparator={false}
            />
          )}
        </ul>
      )}
    </div>
  )
})

export default RunResults
