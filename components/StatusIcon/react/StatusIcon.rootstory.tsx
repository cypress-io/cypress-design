import clsx from 'clsx'
import * as React from 'react'
import StatusIcon from './StatusIcon'
// import type { StatusIconProps } from './StatusIcon'
import { sizes, statuses, variants } from '../constants'
// import type { ButtonSizes, ButtonVariants } from '../constants'

console.log('hello')
// console.log(StatusIconProps)

export default () => (
  <table className="w-full">
    <thead>
      <tr key="h0">
        <th className="text-left">Status</th>
        <th className="text-left">Variant</th>
        <th className="text-left" colSpan={sizes.length}>
          Size
        </th>
        <th className="text-left">Used for</th>
      </tr>
      <tr key="h1">
        <th className="border-b" />
        <th className="border-b" />
        {sizes.map((size) => {
          return (
            <th key={`heading-${size}`} className="border-b text-left">
              {size}
            </th>
          )
        })}
        <th className="border-b" />
      </tr>
    </thead>
    {/* FIXME: i think keys are still wrong: check errors */}
    <tbody>
      {Object.keys(statuses).map((status) => {
        return (
          <tr key={status}>
            <td className="align-top py-8 border-y">
              {statuses[status].link ? (
                <a
                  href={statuses[status].link}
                  className="text-indigo-500 underline"
                  target="_blank"
                >
                  {status}
                </a>
              ) : (
                status
              )}
            </td>
            <td className="py-8 border-y">
              {statuses[status].variants.map((variant) => {
                return (
                  <span key={`${status}-${variant}`} className="block">
                    {variant}
                  </span>
                )
              })}
            </td>

            {sizes.map((size) => {
              return (
                <td key={`${status}-${size}`} className="py-8 border-y">
                  {statuses[status].variants.map((variant) => {
                    return (
                      <span key={`${status}-${size}-${variant}`}>
                        <StatusIcon
                          status={status}
                          size={size}
                          variant={variant}
                        />
                        <br />
                      </span>
                    )
                  })}
                </td>
              )
            })}
            <td className="align-top py-8 border-y">{statuses[status].use}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
)
