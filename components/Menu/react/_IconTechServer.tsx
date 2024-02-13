import * as React from 'react'
import clsx from 'clsx'

const IconTechServer: React.FC<
  React.SVGProps<SVGSVGElement> & { isActive: boolean }
> = ({ className, isActive, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      className={clsx('stroke-gray-900 hover:stroke-white group', className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g strokeLinecap="round" clipRule="evenodd">
        <g transform={isActive ? `translate(0 -2)` : undefined}>
          <path
            className="fill-transparent group-hover:fill-gray-200"
            d="M2 5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Z"
          />
          <path d="M8 6 L16 6" strokeWidth="2" />
          <path d="M5 6Z" strokeWidth="2" />
        </g>
        <g
          transform={isActive ? `scale(1.2)` : undefined}
          transform-origin="50% 50%"
        >
          <path
            className="fill-gray-200 group-hover:fill-gray-800"
            fillRule="evenodd"
            d="M2 11c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2Z"
          />
          <path d="M8 12 L19 12" strokeWidth="2" />
          <path d="M5 12Z" strokeWidth="2" />
        </g>
        <g transform={isActive ? `translate(0 2)` : undefined}>
          <path
            d="M2 17c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2Z"
            className="fill-transparent group-hover:fill-gray-200"
          />
          <path d="M8 18L12 18" strokeWidth="2" />
          <path d="M5 18Z" strokeWidth="2" />
        </g>
      </g>
    </svg>
  )
}

export default IconTechServer
