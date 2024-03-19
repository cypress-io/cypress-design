import * as React from 'react'
import { iconAnimatedViewChart } from '@cypress-design/icon-registry'
import { PathMorpher } from './_Morphers'
import compileAttributes, { AnimatedProps } from './compileAttributes'
import { HasSecondaryStrokeColor } from '@cypress-design/icon-registry'

const IconViewChart: React.FC<
  AnimatedProps &
    HasSecondaryStrokeColor &
    React.SVGProps<SVGSVGElement> & {
      animated: boolean
    }
> = ({ animated, ...fullRest }) => {
  const rest = compileAttributes(fullRest)
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <PathMorpher
        {...iconAnimatedViewChart.topRight}
        fill="#AFB3C7"
        className="icon-light"
        animated={animated}
      />
      <PathMorpher
        {...iconAnimatedViewChart.left}
        fill="#1B1E2E"
        className="icon-dark-secondary"
        animated={animated}
      />
      <PathMorpher
        {...iconAnimatedViewChart.bottom}
        fill="#747994"
        className="icon-dark"
        animated={animated}
        shapeRendering="geometricPrecision"
      />
    </svg>
  )
}

export default IconViewChart
