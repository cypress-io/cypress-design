// docs in Storybook http://localhost:6006/?path=/docs/design-system-avatar

import cs from 'clsx'
import { take } from 'lodash'
import React, { FunctionComponent, OlHTMLAttributes } from 'react'
import { Avatar, CustomIcon } from '@frontend/design-system'
import { Entity } from './Avatar'

interface AvatarListProps extends OlHTMLAttributes<HTMLOListElement> {
  borderColor?: string
  'data-cy'?: string
  entities: Entity[]
  /** limits to the first n avatars, default is infinity */
  maxShown?: number
  size?: 'x16' | 'x24' | 'x32' | 'x48' | 'x64' | 'x80' | 'x96' | 'x128'
  /** if the total number of entities is larger than entities.length, be sure to provide this, so the component can show an icon indicating that there are more that are not shown */
  total?: number
}

const AvatarList: FunctionComponent<AvatarListProps> = ({
  borderColor = 'white',
  'data-cy': dataCy,
  entities,
  maxShown,
  size = 'x16',
  total,
  ...rest
}) => {
  if (!entities) {
    return null
  }

  // if total (or entities.length) is larger than maxShown, show a + icon
  const totalItems = total || entities.length
  const shouldDisplayPlusIcon = maxShown && totalItems > maxShown
  const entitiesToDisplay = maxShown ? take(entities, maxShown) : entities
  const px = Number(size.replace('x', ''))

  return (
    <ol
      {...rest}
      className={cs('pl-0 list-none', rest.className)}
      data-cy={dataCy}
    >
      {entitiesToDisplay.map((entity, i) => {
        return (
          <li
            className={cs('inline-block align-middle', i !== 0 && '-ml-1')}
            key={i}
          >
            <Avatar
              entity={entity}
              size={size}
              hasBorder
              borderColor={borderColor}
            />
          </li>
        )
      })}
      {shouldDisplayPlusIcon && (
        <li className={cs('inline-block align-middle -ml-1')}>
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
              name="action-add-xsmall"
              size="x16"
              width={px}
              height={px}
            />
          </div>
        </li>
      )}
    </ol>
  )
}

export { AvatarList }
