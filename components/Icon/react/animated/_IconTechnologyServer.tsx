import * as React from 'react'
import { iconTechnologyServer } from '@cypress-design/constants-icon'
import { PathMorpher } from './_Morphers'
import compileAttributes, { AnimatedProps } from './compileAttributes'

const IconTechServer: React.FC<
  AnimatedProps &
    React.SVGProps<SVGSVGElement> & {
      animated: boolean
    }
> = ({ animated, ...fullRest }) => {
  const rest = compileAttributes(fullRest)
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <PathMorpher
        fillRule="evenodd"
        clipRule="evenodd"
        {...iconTechnologyServer.top}
        animated={animated}
        fill="#1B1E2E"
        className="icon-light"
      />
      <PathMorpher
        fillRule="evenodd"
        clipRule="evenodd"
        {...iconTechnologyServer.middle}
        animated={animated}
        fill="#9095AD"
        className="icon-dark"
      />

      <PathMorpher
        fillRule="evenodd"
        clipRule="evenodd"
        {...iconTechnologyServer.bottom}
        animated={animated}
        fill="#9095AD"
        className="icon-dark"
      />
    </svg>
  )
}

export default IconTechServer
