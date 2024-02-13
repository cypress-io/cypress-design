import * as React from 'react'
import clsx from 'clsx'
import style from './_IconGeneralChatBubble.module.css'

const IconGeneralChatBubble: React.FC<
  React.SVGProps<SVGSVGElement> & { isActive: boolean }
> = ({ className, isActive, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={clsx(
        {
          [style.active]: isActive,
        },
        className,
      )}
      {...rest}
    >
      <path
        stroke="#1B1E2E"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19,18 a2,2 0 0 0 2,-2 v-6 a2,2 0 0 0 -2,-2 h-2 v2 a3 3 0 0 1 -3 3 h-4 v2 c0,2 2,3 3,3 h1 l4,2 a3,10 0 0 0 1,-0.5 l0,-1.5 l0,0Z"
        className={style['small-bubble']}
      />
      <path
        fill="#BFC2D4"
        stroke="#1B1E2E"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m17 6 a2 2 0 0 0-2-2 h-11 a2 2 0 0 0-2 2 v6 a2 2 0 0 0 2 2 h1 v2.5 c0.1 .1.1 .1 .1 .1 l5-2.5 h5 a2 2 0 0 0 2-2 v-3Z"
        className={style['big-bubble']}
      />
      <circle
        cx="6"
        cy="9"
        r="1"
        fill="#1B1E2E"
        className={clsx(style.dots, style.dots1)}
      />
      <circle
        cx="9.5"
        cy="9"
        r="1"
        fill="#1B1E2E"
        className={clsx(style.dots, style.dots2)}
      />
      <circle
        cx="13"
        cy="9"
        r="1"
        fill="#1B1E2E"
        className={clsx(style.dots, style.dots3)}
      />
    </svg>
  )
}

export default IconGeneralChatBubble
