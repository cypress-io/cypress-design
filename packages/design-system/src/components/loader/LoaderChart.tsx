import { palette } from '@frontend/design-system'
import cs from 'clsx'
import React, { FunctionComponent } from 'react'
import {
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  LineSeries,
  XAxis,
} from 'react-vis'

type LoaderChartProps = {
  className?: string
  height?: number
}

const loadingData = [
  { x: 0, y: 81 },
  { x: 1, y: 103 },
  { x: 2, y: 99 },
  { x: 3, y: 74 },
  { x: 4, y: 80 },
  { x: 5, y: 104 },
  { x: 6, y: 81 },
  { x: 7, y: 62 },
  { x: 8, y: 115 },
  { x: 9, y: 139 },
  { x: 10, y: 140 },
  { x: 11, y: 103 },
  { x: 12, y: 122 },
  { x: 13, y: 67 },
  { x: 14, y: 22 },
  { x: 15, y: 45 },
  { x: 16, y: 62 },
  { x: 17, y: 43 },
  { x: 18, y: 106 },
  { x: 19, y: 136 },
  { x: 20, y: 65 },
  { x: 21, y: 102 },
  { x: 22, y: 52 },
  { x: 23, y: 34 },
  { x: 24, y: 72 },
  { x: 25, y: 105 },
  { x: 26, y: 115 },
  { x: 27, y: 89 },
]

const LoaderChart: FunctionComponent<LoaderChartProps> = ({
  className,
  height = 300,
}) => {
  return (
    <FlexibleWidthXYPlot
      className={cs('runs-over-time-chart', className)}
      height={height}
      margin={{ left: 0, top: 0, right: 0, bottom: 0 }}
    >
      <HorizontalGridLines />
      <XAxis tickTotal={0} />
      <LineSeries
        color={palette.gray50}
        data={loadingData}
        // @ts-ignore
        strokeWidth="5px"
      />
    </FlexibleWidthXYPlot>
  )
}

export { LoaderChart }
