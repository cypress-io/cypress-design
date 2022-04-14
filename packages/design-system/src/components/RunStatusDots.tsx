import cs from 'clsx'
import { fill, map, min } from 'lodash'
import React, {
  FunctionComponent,
  OlHTMLAttributes,
  useState,
  useRef,
  useLayoutEffect,
} from 'react'
import { formatDistanceStrict, parseISO } from 'date-fns'

import { RunStatusEnum } from '@frontend/dashboard/src/graphql-codegen-operations.gen'
import {
  Avatar,
  HorizontalList,
  StatusIconV2,
  Tooltip,
} from '@frontend/design-system'
import { runStatusEnumToStatus } from '@frontend/dashboard/src/lib/utils-ts'
import { RunStats } from './RunStats'
import { FlakyBadge } from './badges/FlakyBadge'
import { TooltipOverlay } from './TooltipOverlay'
import { useWindowSize } from '../hooks'

type Run = {
  buildNumber?: number
  status?: RunStatusEnum
  endTime?: string
  commit?: {
    authorAvatar?: string | null
    authorEmail?: string | null
    authorName?: string | null
  }
  totalFailed?: number
  totalFlakyTests?: number
  totalPassed?: number
  totalPending?: number
  totalSkipped?: number
  project?: {
    id?: string
  }
}

type Dot = Run | null

interface RunStatusDotsProps extends OlHTMLAttributes<HTMLOListElement> {
  /** limits to the last n runs, default is infinity */
  maxShown?: number
  runs?: Run[]
  shouldFillEmpty?: boolean
  showTooltip: boolean
}

const getTooltipTitle = (run: Run | null) => {
  // e.g. (depending on props provided)
  // Run #3427 passed 16 mins ago
  // Run #3427 passed
  // Run passed 16 mins ago
  // Run passed

  if (!run) {
    return 'No run'
  }

  let tooltipText = 'Run '
  if (run.buildNumber) {
    tooltipText += `#${run.buildNumber} `
  }
  return tooltipText
}

const useShouldOffsetArrowRight = () => {
  const windowSize = useWindowSize()
  const anchorRef = useRef<HTMLLIElement>(null)
  const [shouldOffsetRight, setShouldOffsetRight] = useState(false)
  const distanceFromLeft = anchorRef?.current?.getBoundingClientRect()?.right
  useLayoutEffect(() => {
    if (distanceFromLeft) {
      const distanceFromRight = window.innerWidth - distanceFromLeft
      // We can get more granular with this
      // condition in the future if necessary
      const induceOffset = distanceFromRight < 100
      setShouldOffsetRight(induceOffset)
    }
    // recalculates on
    // window size change
  }, [windowSize, distanceFromLeft])

  return { anchorRef, shouldOffsetRight }
}

export const RunStatusDots: FunctionComponent<RunStatusDotsProps> = ({
  maxShown,
  runs,
  shouldFillEmpty,
  showTooltip = false,
  ...rest
}) => {
  const { anchorRef, shouldOffsetRight } = useShouldOffsetArrowRight()

  const numberOfDotsShown: number = shouldFillEmpty
    ? maxShown || runs?.length || 0
    : min([maxShown, runs?.length]) || 0

  if (numberOfDotsShown === 0) {
    return null
  }

  const numberOfEmptyDots = runs
    ? numberOfDotsShown - runs.length
    : numberOfDotsShown

  const dots: Dot[] = map(fill(Array(numberOfDotsShown), null), (item, i) => {
    if (i < numberOfEmptyDots) {
      return null
    }
    return runs![i - numberOfEmptyDots]
  })

  return (
    <ol
      {...rest}
      className={cs('inline-block pl-0 mb-0 list-none h-16px', rest.className)}
    >
      {dots.map((dot, i) => {
        const isLastDot = i === dots.length - 1

        let authorAvatar
        let authorEmail
        let authorName
        if (dot?.commit) {
          authorAvatar = dot.commit.authorAvatar
          authorEmail = dot.commit.authorEmail
          authorName = dot.commit.authorName
        }

        const commitAndTimeRunRow = (
          <HorizontalList margin={8}>
            <div className="commit-author">
              <Avatar
                className="commit-author__avatar"
                entity={{
                  avatar: authorAvatar || undefined,
                  email: authorEmail,
                }}
                size="x16"
              />
              {authorName ? (
                <p className="commit-author__name">{authorName}</p>
              ) : (
                <p className="commit-author__no-data">Not available</p>
              )}
            </div>
            <div>
              {dot?.endTime
                ? `${formatDistanceStrict(
                    parseISO(dot.endTime),
                    Date.now()
                  )} ago`
                : `Running`}
            </div>
          </HorizontalList>
        )

        const runStatsRow = (
          <div className="run-stats-row">
            <RunStats
              passed={dot?.totalPassed || 0}
              failed={dot?.totalFailed || 0}
              skipped={dot?.totalSkipped || 0}
              pending={dot?.totalPending || 0}
              showTooltip={false}
              projectsListV2={true}
            />
            {dot && dot.totalFlakyTests! > 0 && (
              <FlakyBadge
                count={dot?.totalFlakyTests || 0}
                showTooltip={false}
              />
            )}
          </div>
        )

        return (
          <Tooltip
            visible={showTooltip && isLastDot && runs && runs?.length > 0}
            overlayClassName={cs('run-status-tooltip', {
              'offset-arrow--right': shouldOffsetRight,
            })}
            key={i}
            overlay={
              <TooltipOverlay
                titleText={getTooltipTitle(dot)}
                variant={dot ? runStatusEnumToStatus(dot.status) : 'default'}
                contentRows={[commitAndTimeRunRow, runStatsRow]}
                to={`/projects/${dot?.project?.id}/runs/${dot?.buildNumber}/overview`}
              />
            }
            data-cy="run-status-dots"
            arrowContent={<div className="rc-tooltip-arrow-inner" />}
            placement="top"
          >
            <li
              ref={isLastDot ? anchorRef : null}
              className="inline-block align-top ml-4px"
            >
              <StatusIconV2
                className={isLastDot ? undefined : 'my-6px'}
                status={dot ? runStatusEnumToStatus(dot.status) : null}
                size={isLastDot ? 'x16' : 'x4'}
                variant="solid"
              />
            </li>
          </Tooltip>
        )
      })}
    </ol>
  )
}
