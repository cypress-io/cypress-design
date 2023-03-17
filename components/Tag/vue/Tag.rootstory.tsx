import clsx from 'clsx'
import Tag from './Tag.vue'
import { SizeClasses, ColorClasses } from '../constants'

export default () => (
  <div class="flex flex-row flex-wrap items-start justify-center bg-gray-700 gap-6">
    {(Object.keys(SizeClasses) as Array<keyof typeof SizeClasses>).map(
      (size) => {
        return (
          <div
            class={clsx(
              'flex flex-col items-center gap-3 justify-center my-4 p-4 bg-white rounded-lg'
            )}
          >
            <h3 class="text-right">{size}</h3>
            {(Object.keys(ColorClasses) as Array<keyof typeof ColorClasses>)
              .reverse()
              .map((color) => {
                return (
                  <>
                    <div class="flex items-center justify-center">
                      <Tag size={size} color={color}>
                        {`{Tag}`}
                      </Tag>
                    </div>
                    <div class="flex items-center justify-center">
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
