import * as React from 'react'
import clsx from 'clsx'
import StatusIcon from '@cypress-design/react-statusicon'
import {
  IconStatusFlaky,
  IconGeneralSparkleSingleSmall,
} from '@cypress-design/react-icon'
import Tooltip from '@cypress-design/react-tooltip'
import {
  CssClasses,
  CssTheme,
  CssTooltipPopper,
  TooltipColorForTheme,
  type RunStatusProps,
  type RunStatusTheme,
  type StatKey,
  getSeparatorAfterKey,
  getTooltipLabel,
  getTooltipPlacement,
  hasAnyStat,
  showRegularStat,
  statKeyToKebab,
  statValue,
} from '@cypress-design/constants-runstatus'

export type { RunStatusProps } from '@cypress-design/constants-runstatus'

interface StatProps {
  statKey: StatKey
  count: number
  link: string | undefined
  renderLink: RunStatusProps['renderLink']
  showTooltip: boolean
  theme: RunStatusTheme
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
          className={CssClasses.icon}
        />
      )
    }
    if (statKey === 'selfHealed') {
      return (
        <IconGeneralSparkleSingleSmall
          strokeColor="jade-400"
          fillColor="jade-50"
          data-cy="status-icon-self-healed"
          className={CssClasses.icon}
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
      content = renderLink(link, inner) as React.ReactNode
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

  const li = (
    <li
      data-cy={`total-${kebab}`}
      className={clsx(
        CssClasses.item,
        applySeparator && CssClasses.separatorAfter,
        applySeparator && CssTheme[theme].separator,
      )}
    >
      {content}
    </li>
  )

  if (!showTooltip) return li

  return (
    <Tooltip
      placement={getTooltipPlacement(statKey)}
      color={TooltipColorForTheme[theme]}
      popper={label}
      popperClassName={CssTooltipPopper}
    >
      {li}
    </Tooltip>
  )
}

export const RunStatus: React.FC<
  RunStatusProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof RunStatusProps>
> = ({
  passed,
  failed,
  skipped,
  pending,
  flaky,
  selfHealed,
  showSelfHealed = false,
  theme = 'light',
  expanded = false,
  fullWidth = false,
  links,
  renderLink,
  showTooltip = true,
  className,
  ...rest
}) => {
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

  if (!hasAnyStat(summaryProps)) return null

  const separatorAfterKey = getSeparatorAfterKey(summaryProps)
  const showFlaky = statValue(flaky) > 0
  const showSelfHealedStat = showSelfHealed && statValue(selfHealed) > 0

  return (
    <div
      data-cy="run-stats"
      {...rest}
      className={clsx(
        CssClasses.container,
        fullWidth && CssClasses.fullWidth,
        className,
      )}
    >
      <ul
        className={clsx(
          CssClasses.list,
          CssTheme[theme].list,
          fullWidth && CssClasses.fullWidth,
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
    </div>
  )
}

export default RunStatus
