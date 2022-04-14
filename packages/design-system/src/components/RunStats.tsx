import { TestResultStatesValue } from '@packages/common/src/enums'
import { FlakyBadge, TestResultStatusIcon } from '@frontend/design-system'
import { Link } from '@reach/router'
import cs from 'clsx'
import { capitalize, toUpper } from 'lodash'
import queryString from 'query-string'
import Tooltip from 'rc-tooltip'
import React, { FunctionComponent } from 'react'
import styles from './module.RunStats.scss'

type RunStatProps = {
  status: TestResultStatesValue
  value: number | null | undefined
  link: string | null
  showTooltip?: boolean
  projectsListV2?: boolean
}

const RunStat: FunctionComponent<RunStatProps> = ({
  status,
  value,
  link,
  showTooltip = true,
  projectsListV2,
}) => {
  return showTooltip ? (
    <Tooltip
      placement="top"
      overlay={link ? `View ${status} tests` : `${capitalize(status)} tests`}
    >
      {link ? (
        <Link
          data-cy={`link-${status}`}
          data-pendo={`link-${status}`}
          to={link}
        >
          <li data-cy={`total-${status}`} data-pendo={`total-${status}`}>
            <TestResultStatusIcon status={status} />
            <span>{value || (projectsListV2 ? `--` : 0)}</span>
          </li>
        </Link>
      ) : (
        <li data-cy={`total-${status}`} data-pendo={`total-${status}`}>
          <TestResultStatusIcon status={status} />
          <span>{value || (projectsListV2 ? `--` : 0)}</span>
        </li>
      )}
    </Tooltip>
  ) : link ? (
    <Link data-cy={`link-${status}`} data-pendo={`link-${status}`} to={link}>
      <li data-cy={`total-${status}`} data-pendo={`total-${status}`}>
        <TestResultStatusIcon status={status} />
        <span>{value || (projectsListV2 ? `--` : 0)}</span>
      </li>
    </Link>
  ) : (
    <li data-cy={`total-${status}`} data-pendo={`total-${status}`}>
      <TestResultStatusIcon status={status} />
      <span>{value || (projectsListV2 ? `--` : 0)}</span>
    </li>
  )
}

type RunStatsProps = {
  className?: string
  projectId?: string
  buildNumber?: number
  flaky?: number | null
  passed: number | null
  failed: number | null
  skipped: number | null
  pending: number | null
  expanded?: boolean
  showTooltip?: boolean
  projectsListV2?: boolean
}

const RunStats: FunctionComponent<RunStatsProps> = React.memo(
  ({
    className = '',
    projectId,
    buildNumber,
    skipped,
    pending,
    flaky,
    passed,
    failed,
    expanded = false,
    showTooltip = true,
    projectsListV2 = false,
  }) => {
    const testResultsUrl = `/projects/${projectId}/runs/${buildNumber}/test-results`
    const testResultsStatusRedirect = (status: string) => {
      if (!projectId || !buildNumber) {
        return null
      }

      const filters =
        status === 'flaky'
          ? {
              statuses: [],
              isFlaky: JSON.stringify([{ value: true, label: 'Flaky' }]),
            }
          : {
              statuses: JSON.stringify([
                { value: toUpper(status), label: toUpper(status) },
              ]),
              isFlaky: [],
            }

      const query = queryString.stringify(filters)

      return `${testResultsUrl}?${query}`
    }

    return (
      <div data-cy="run-stats" className={cs(styles.runStats, className)}>
        {Boolean(flaky) && (
          <span className={styles.flakyBadge} data-cy="run-stats-flaky-badge">
            {/* FIXME: flaky badge doesn't look right */}
            {Boolean(testResultsStatusRedirect('flaky')) ? (
              <Link
                data-cy="run-header-flaky-badge"
                // @ts-ignore
                to={testResultsStatusRedirect('flaky')}
              >
                <FlakyBadge count={flaky} />
              </Link>
            ) : (
              <FlakyBadge count={flaky} />
            )}
          </span>
        )}
        {projectsListV2 ? (
          <ul className={styles.testResultStatuses}>
            <RunStat
              status="passed"
              value={passed}
              link={testResultsStatusRedirect('passed')}
              showTooltip={showTooltip}
              projectsListV2={projectsListV2}
            />
            <RunStat
              status="failed"
              value={failed}
              link={testResultsStatusRedirect('failed')}
              showTooltip={showTooltip}
              projectsListV2={projectsListV2}
            />
            <RunStat
              status="skipped"
              value={skipped}
              link={testResultsStatusRedirect('skipped')}
              showTooltip={showTooltip}
              projectsListV2={projectsListV2}
            />
            <RunStat
              status="pending"
              value={pending}
              link={testResultsStatusRedirect('pending')}
              showTooltip={showTooltip}
              projectsListV2={projectsListV2}
            />
          </ul>
        ) : (
          <ul className={styles.testResultStatuses}>
            {(expanded || Boolean(skipped)) && (
              <RunStat
                status="skipped"
                value={skipped}
                link={testResultsStatusRedirect('skipped')}
                showTooltip={showTooltip}
              />
            )}
            {(expanded || Boolean(pending)) && (
              <RunStat
                status="pending"
                value={pending}
                link={testResultsStatusRedirect('pending')}
                showTooltip={showTooltip}
              />
            )}
            {(expanded || Boolean(passed)) && (
              <RunStat
                status="passed"
                value={passed}
                link={testResultsStatusRedirect('passed')}
                showTooltip={showTooltip}
              />
            )}
            {(expanded || Boolean(failed)) && (
              <RunStat
                status="failed"
                value={failed}
                link={testResultsStatusRedirect('failed')}
                showTooltip={showTooltip}
              />
            )}
          </ul>
        )}
      </div>
    )
  }
)

export { RunStats }
