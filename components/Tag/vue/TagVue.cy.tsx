/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import { ColorClasses, SizeClasses } from '@cypress-design/constants-tag'
import assertions from '../assertions'
import Tag from './Tag.vue'

const TagStory = () => (
  <div class="flex flex-row flex-wrap items-start justify-center bg-gray-700 gap-6">
    {(Object.keys(SizeClasses) as Array<keyof typeof SizeClasses>).map(
      (size) => {
        return (
          <div class="flex flex-col items-center gap-3 justify-center my-4 p-4 bg-white rounded-lg">
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

describe('<Tag/>', () => {
  function mountStory() {
    mount(() => <TagStory />)
  }
  assertions(mountStory)
})
