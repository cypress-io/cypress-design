import * as React from 'react'
import { iconAnimatedGeneralChatBubble } from '@cypress-design/icon-registry'
import { PathMorpher } from './_Morphers'
import compileAttributes, { AnimatedProps } from './compileAttributes'

const IconGeneralChatBubble: React.FC<
  AnimatedProps &
    React.SVGProps<SVGSVGElement> & {
      animated: boolean
    }
> = ({ animated, ...fullRest }) => {
  const rest = compileAttributes(fullRest)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...rest}
    >
      <PathMorpher
        className="icon-dark"
        fill="#1B1E2E"
        {...iconAnimatedGeneralChatBubble.small}
        animated={animated}
      />
      <PathMorpher
        className="icon-light"
        fill="#1B1E2E"
        {...iconAnimatedGeneralChatBubble.big}
        animated={animated}
      />
    </svg>
  )
}

export default IconGeneralChatBubble
