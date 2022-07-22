import * as React from 'react'
import clsx from 'clsx'
import StatusIcon from './StatusIcon'
import { statuses } from '../constants'

const sizes = ['4', '8', '12', '16', '24']

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
        <th />
        <th />
        {sizes.map((size) => {
          return (
            <th key={`heading-${size}`} className="text-left">
              {size}
            </th>
          )
        })}
        <th />
      </tr>
    </thead>
    <tbody>
      {Object.keys(statuses).map((status) => {
        const statusInfo = statuses[status]

        return (
          <>
            {statusInfo.variants.map((variant, i) => {
              return (
                <tr
                  className={clsx(i === 0 && 'border-t')}
                  key={`${status}-${variant}`}
                >
                  {i === 0 ? (
                    <td>
                      {statusInfo.link ? (
                        <a
                          href={statusInfo.link}
                          className="text-indigo-500 underline"
                          target="_blank"
                        >
                          {status}
                        </a>
                      ) : (
                        status
                      )}
                    </td>
                  ) : (
                    <td />
                  )}

                  <td>{variant}</td>
                  {sizes.map((size) => {
                    return (
                      <td key={`${status}-${size}-${variant}`} className="py-2">
                        <StatusIcon
                          status={status}
                          size={size}
                          variant={variant}
                        />
                      </td>
                    )
                  })}
                  <td className="align-top py-2">
                    {i === 0 ? statusInfo.use : ''}
                  </td>
                </tr>
              )
            })}
          </>
        )
      })}
    </tbody>
  </table>
)
