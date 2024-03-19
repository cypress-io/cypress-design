import * as React from 'react'
import { iconTechnologyGitBranches } from '@cypress-design/constants-icon'
import { PathMorpher } from './_Morphers'
import compileAttributes, { AnimatedProps } from './compileAttributes'

const IconViewChart: React.FC<
  AnimatedProps &
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
        {...iconTechnologyGitBranches.left}
        fill="#1B1E2E"
        className="icon-light"
        animated={animated}
      />
      <PathMorpher
        {...iconTechnologyGitBranches.right}
        fill="#747994"
        className="icon-dark"
        animated={animated}
      />
    </svg>
  )
}

export default IconViewChart
