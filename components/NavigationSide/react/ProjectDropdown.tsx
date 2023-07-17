import React from 'react'

export const ProjectDropdown = () => {
  return (
    <div className="bg-gray-900 flex">
      <div className="w-4 h-4 bg-white rounded-full"></div>
      <div className="inline-flex flex-col space-y-1.5 items-start justify-center">
        <p className="w-[308px] h-2.5 text-sm leading-tight text-white">
          Gatsby
        </p>
        <p className="text-base font-semibold leading-normal text-white">
          Design System
        </p>
      </div>
    </div>
  )
}
