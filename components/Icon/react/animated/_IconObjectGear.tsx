import * as React from 'react'
import { iconObjectGear } from '@cypress-design/constants-icon'
import { PathMorpher } from './_Morphers'
import compileAttributes, { AnimatedProps } from './compileAttributes'

const IconObjectGear: React.FC<
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
        fillRule="evenodd"
        clipRule="evenodd"
        {...iconObjectGear}
        fill="#1B1E2E"
        animated={animated}
        className="icon-light"
      />
      <circle cx="12" cy="12" r="2" fill="#9095AD" className="icon-dark" />
    </svg>
  )
}

export default IconObjectGear
