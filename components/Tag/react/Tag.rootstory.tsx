import clsx from 'clsx'
import Tag from './Tag'
import * as React from 'react'
import { SizeClasses, ColorClasses } from '../constants'

export default () => (
  <div className="flex flex-row flex-wrap gap-6 justify-center items-start bg-gray-700">
    {(Object.keys(SizeClasses) as Array<keyof typeof SizeClasses>).map(
      (size) => {
        return (
          <div
            className={clsx(
              'flex flex-col items-center gap-3 justify-center my-4 p-4 bg-white rounded-lg'
            )}
          >
            <h3 className="text-right">{size}</h3>
            {(
              Object.keys(ColorClasses) as Array<keyof typeof ColorClasses>
            ).map((color) => {
              return (
                <>
                  <div className="flex items-center justify-center">
                    <Tag size={size} color={color}>
                      {`{Tag}`}
                    </Tag>
                  </div>
                  <div className="flex items-center justify-center">
                    <Tag size={size} color={color} dark>
                      {`{Tag}`}
                    </Tag>
                  </div>
                </>
              )
            })}
          </div>
        )
      }
    )}
  </div>
)
