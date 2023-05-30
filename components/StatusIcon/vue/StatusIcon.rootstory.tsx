import clsx from 'clsx'
import StatusIcon from './StatusIcon.vue'
import { statuses } from '../constants'

const sizes = ['4', '8', '12', '16', '24'] as const

export default () => (
  <table class="w-full">
    <thead>
      <tr key="h0">
        <th class="text-left">Status</th>
        <th class="text-left">Variant</th>
        <th class="text-left" col-span={sizes.length}>
          Size
        </th>
        <th class="text-left">Used for</th>
      </tr>
      <tr key="h1">
        <th />
        <th />
        {sizes.map((size) => {
          return (
            <th key={`heading-${size}`} class="text-left">
              {size}
            </th>
          )
        })}
        <th />
      </tr>
    </thead>
    <tbody>
      {Object.keys(statuses).map((status) => {
        const statusInfo = statuses[status as keyof typeof statuses]

        return (
          <>
            {statusInfo.variants.map((variant, i) => {
              return (
                <tr
                  class={clsx(i === 0 && 'border-t')}
                  key={`${status}-${variant}`}
                >
                  {i === 0 ? (
                    <td>
                      {statusInfo.link ? (
                        <a
                          href={statusInfo.link}
                          class="text-indigo-500 underline"
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
                      <td key={`${status}-${size}-${variant}`} class="py-2">
                        <StatusIcon
                          status={status as keyof typeof statuses}
                          size={size}
                          variant={variant}
                        />
                      </td>
                    )
                  })}
                  <td class="py-2 align-top">
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
