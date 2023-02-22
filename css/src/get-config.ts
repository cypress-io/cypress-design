import * as path from 'path'
import _ from 'lodash'
import { UserOptions } from 'vite-plugin-windicss'
import windiConfig from './windi.config'

const { mergeWith } = _

function customizer(objValue: any, srcValue: any) {
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return objValue.concat(srcValue)
  }
  return undefined
}

export function getConfig(options: UserOptions) {
  const scan = typeof options.scan === 'boolean' ? {} : options.scan ?? {}
  const include = Array.isArray(scan?.include)
    ? scan.include
    : scan.include
    ? [scan.include]
    : []

  const currentPackagePath = path.dirname(
    require.resolve('@cypress-design/css/package.json')
  )

  const config = mergeWith({}, windiConfig, options.config, customizer)

  return {
    ...options,
    config,
    scan: {
      ...(scan || {}),
      include: [
        ...include,
        path.resolve(
          currentPackagePath,
          '..', // remove css/ from path
          '*/dist/*.@(js|css)' // look for all component files
        ),
      ],
    },
  }
}
