import * as React from 'react'
import { iconViewChart } from '@cypress-design/constants-icon'
import { PathMorpher } from './_Morphers'

const IconViewChart: React.FC<
  React.SVGProps<SVGSVGElement> & { animated: boolean }
> = ({ animated, ...rest }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <PathMorpher
        {...iconViewChart.topRight}
        fill="#AFB3C7"
        className="icon-light"
        animated={animated}
      />
      <PathMorpher
        {...iconViewChart.left}
        fill="#1B1E2E"
        className="icon-dark-secondary"
        animated={animated}
      />
      <PathMorpher
        {...iconViewChart.bottom}
        fill="#747994"
        className="icon-dark"
        animated={animated}
        shapeRendering="geometricPrecision"
      />
    </svg>
  )
}

export default IconViewChart
