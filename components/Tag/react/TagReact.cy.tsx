/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import Tag from './Tag'
import { CssSize, CssColor } from '@cypress-design/constants-tag'
import assertions from '../assertions'

describe('Tag', () => {
  function mountStory() {
    mount(
      <div className="flex flex-row flex-wrap items-start justify-center gap-6 bg-gray-700">
        {(Object.keys(CssSize) as Array<keyof typeof CssSize>).map((size) => {
          return (
            <div
              key={`size-${size}`}
              className="my-4 flex flex-col items-center justify-center gap-3 rounded-lg bg-white p-4"
            >
              <h3 className="text-right">{size}</h3>
              {(Object.keys(CssColor) as Array<keyof typeof CssColor>).map(
                (color) => {
                  return (
                    <React.Fragment key={color}>
                      <div
                        key={color}
                        className="flex items-center justify-center"
                      >
                        <Tag size={size} color={color}>
                          {`{Tag}`}
                        </Tag>
                      </div>
                      <div
                        key={`${color}-2`}
                        className="flex items-center justify-center"
                      >
                        <Tag size={size} color={color} outline>
                          {`{Tag outline}`}
                        </Tag>
                      </div>
                      <div
                        key={`${color}-3`}
                        className="flex items-center justify-center"
                      >
                        <Tag size={size} color={color} dark>
                          {`{Tag dark}`}
                        </Tag>
                      </div>
                      <div
                        key={`${color}-4`}
                        className="flex items-center justify-center"
                      >
                        <Tag size={size} color={color} dark outline>
                          {`{Tag dark outline}`}
                        </Tag>
                      </div>
                    </React.Fragment>
                  )
                },
              )}
            </div>
          )
        })}
      </div>,
    )
  }

  assertions(mountStory)
})
