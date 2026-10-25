/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import { CssSize, CssColor } from '@cypress-design/constants-tag'
import assertions from '../assertions'
import Tag from './Tag.vue'

describe('<Tag/>', () => {
  function mountStory() {
    mount(() => (
      <div class="flex flex-row flex-wrap items-start justify-center gap-6 bg-gray-700">
        {(Object.keys(CssSize) as Array<keyof typeof CssSize>).map((size) => {
          return (
            <div class="my-4 flex flex-col items-center justify-center gap-3 rounded-lg bg-white p-4">
              <h3 class="text-right">{size}</h3>
              {(Object.keys(CssColor) as Array<keyof typeof CssColor>)
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
                        <Tag size={size} color={color} outline>
                          {`{Tag outline}`}
                        </Tag>
                      </div>
                      <div class="flex items-center justify-center">
                        <Tag size={size} color={color} dark>
                          {`{Tag dark}`}
                        </Tag>
                      </div>
                      <div class="flex items-center justify-center">
                        <Tag size={size} color={color} dark outline>
                          {`{Tag dark outline}`}
                        </Tag>
                      </div>
                    </>
                  )
                })}
            </div>
          )
        })}
      </div>
    ))
  }

  assertions(mountStory)
})
