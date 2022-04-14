// docs in Storybook http://localhost:6006/?path=/docs/design-system-avatar

import cs from 'clsx'
import React, { FunctionComponent, ImgHTMLAttributes } from 'react'
import { gravatarUrl } from '@packages/common'
import { CustomIcon } from '@frontend/design-system'

export type Entity = {
  /** avatar is an image URL */
  avatar?: string
  /** email will be used to generate a gravatar if the avatar prop is not provided */
  email?: string | null
  /** the name will be used in alt text, if provided */
  name?: string | null
}

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** any css color string */
  borderColor?: string
  'data-cy'?: string
  hasBorder?: boolean
  entity: Entity
  /** x13 is deprecated and should not be used in new code */
  size?: 'x13' | 'x16' | 'x24' | 'x32' | 'x48' | 'x64' | 'x80' | 'x96' | 'x128'
}

const Avatar: FunctionComponent<AvatarProps> = ({
  borderColor = 'white',
  'data-cy': dataCy,
  hasBorder = false,
  entity,
  size = 'x32',
  ...rest
}) => {
  const px = Number(size.replace('x', ''))
  const gravatarSize = px * 2
  const altText = rest.alt
    ? rest.alt
    : entity.name || entity.email
    ? `avatar for ${entity.name || entity.email}`
    : 'avatar'

  if (!entity.avatar && !entity.email) {
    return (
      <div
        className="inline-block text-gray-500 align-middle bg-gray-100 rounded-full"
        style={{
          boxShadow: `0px 0px 0px 2px ${borderColor}`,
          width: `${px}px`,
          height: `${px}px`,
        }}
      >
        <CustomIcon
          className="align-top"
          name="user-general"
          size="x16"
          width={px}
          height={px}
        />
      </div>
    )
  }

  return (
    <img
      {...rest}
      alt={altText}
      className={cs(
        'cy-avatar object-cover rounded-full text-[0px]',
        rest.className
      )}
      data-cy={dataCy}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null // prevents looping
        currentTarget.src = require('@DS/lib/img/gravatar-default.svg')
      }}
      src={
        entity.avatar ||
        `${gravatarUrl(entity.email || '', {
          // if the email does not have a gravatar,
          // have gravatar return a 404 then
          // replace with our own icon in onError
          default: '404',
          size: gravatarSize.toString(),
        })}`
      }
      style={{
        boxShadow: hasBorder ? `0px 0px 0px 2px ${borderColor}` : undefined,
      }}
      width={px}
      height={px}
    />
  )
}

export { Avatar }
