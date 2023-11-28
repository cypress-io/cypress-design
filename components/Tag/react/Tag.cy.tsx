/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Tag from './Tag'
import { SizeClasses, ColorClasses } from '../constants'
import assertions from '../assertions'

describe('Tag', () => {
  function mountStory() {
    mount(
      <div className="flex flex-row flex-wrap items-start justify-center bg-gray-700 gap-6">
        {(Object.keys(SizeClasses) as Array<keyof typeof SizeClasses>).map(
          (size) => {
            return (
              <div className="flex flex-col items-center gap-3 justify-center my-4 p-4 bg-white rounded-lg">
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
          },
        )}
      </div>,
    )
  }

  assertions(mountStory)
})
