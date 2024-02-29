import * as React from 'react'
import { iconGeneralChatBubble } from '@cypress-design/constants-icon'
import { PathMorpher } from './_Morphers'

const IconGeneralChatBubble: React.FC<
  React.SVGProps<SVGSVGElement> & { animated: boolean }
> = ({ animated, ...rest }) => {
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
        {...iconGeneralChatBubble.small}
        animated={animated}
      />
      <PathMorpher
        className="icon-light"
        fill="#1B1E2E"
        {...iconGeneralChatBubble.big}
        animated={animated}
      />
    </svg>
  )
}

export default IconGeneralChatBubble
