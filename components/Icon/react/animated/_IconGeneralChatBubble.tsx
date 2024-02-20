import * as React from 'react'
import clsx from 'clsx'
import { CircleTranslate, PathMorpher } from './_Morphers'

const IconGeneralChatBubble: React.FC<
  React.SVGProps<SVGSVGElement> & { animated: boolean }
> = ({ className, animated, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={clsx(className)}
      {...rest}
    >
      <PathMorpher
        className="icon-dark"
        fill="#1B1E2E"
        d="M14 18 h-1 a3 3 0 0 1-3-3 v-1 h4 a3 3 0 0 0 3-3 V8 h2 a3 3 0 0 1 3 3 v4 a3 3 0 0 1-3 3 h0 v1.3 c0 .5-.6 1-1 .7Z"
        dAnimated="M15 19 h-2 a3 3 0 0 1-3-3 v-1 h3 a5 5 0 0 0 5-5 V6 h3 a3 3 0 0 1 3 3 v7 a3 3 0 0 1-3 3 h-1 v1.7 c0 .6-.6 1-1.1.6Z"
        animated={animated}
      />
      <PathMorpher
        className="icon-light"
        fill="#1B1E2E"
        d="M17 7a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3v1.3c0 .5.6 1 1 .7l4-2h4a3 3 0 0 0 3-3V7ZM7 9c0 .5523-.4477 1-1 1-.5523 0-1-.4477-1-1 0-.5523.4477-1 1-1 .5523 0 1 .4477 1 1zM10.5 9c0 .5523-.4477 1-1 1-.5523 0-1-.4477-1-1 0-.5523.4477-1 1-1 .5523 0 1 .4477 1 1zm3.5 0c0 .5523-.4477 1-1 1-.5523 0-1-.4477-1-1 0-.5523.4477-1 1-1 .5523 0 1 .4477 1 1z"
        dAnimated="M16 4a3 3 0 00-3-3h-10a3 3 0 00-3 3v6a3 3 0 003 3v1.8c0 .5.6 1 1 .7l5-2.5h4a3 3 0 003-3v-6zM5 7c0 .5523-.4477 1-1 1-.5523 0-1-.4477-1-1 0-.5523.4477-1 1-1 .5523 0 1 .4477 1 1zM9 7c0 .5523-.4477 1-1 1-.5523 0-1-.4477-1-1 0-.5523.4477-1 1-1 .5523 0 1 .4477 1 1zM13 7c0 .5523-.4477 1-1 1-.5523 0-1-.4477-1-1 0-.5523.4477-1 1-1 .5523 0 1 .4477 1 1z"
        animated={animated}
      />
    </svg>
  )
}

export default IconGeneralChatBubble
