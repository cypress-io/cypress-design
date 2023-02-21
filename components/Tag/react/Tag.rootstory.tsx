import clsx from 'clsx'
import Tag from './Tag'
import * as React from 'react'
import { SizeClasses, ColorClasses } from '../constants'

export default () => (
  <div className="flex flex-row flex-wrap gap-3 justify-center">
    {(Object.keys(SizeClasses) as Array<keyof typeof SizeClasses>).map(
      (size) => {
        return (
          <div
            className={clsx(
              'flex flex-col items-center gap-3 justify-center mt-4 p-2'
            )}
          >
            <h3 className="text-right">{size}</h3>
            {(Object.keys(ColorClasses) as Array<keyof typeof ColorClasses>)
              .reverse()
              .map((color) => {
                return (
                  <div className="flex items-center justify-center">
                    <span className={'text-sm mr-4'}>{color}</span>
                    <Tag size={size} color={color}>
                      {'{Tag}'}
                    </Tag>
                  </div>
                )
              })}
          </div>
        )
      }
    )}
  </div>
)
