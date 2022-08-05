import * as path from 'path'
import type { UserOptions } from 'vite-plugin-windicss'
import VitePlugin from 'vite-plugin-windicss'
import WebpackPlugin from 'windicss-webpack-plugin'
import windiConfig from './windi.config'
import { merge } from 'lodash'

function getConfig(options: UserOptions) {
  const scan = typeof options.scan === 'boolean' ? {} : options.scan ?? {}
  const include = Array.isArray(scan?.include)
    ? scan.include
    : scan.include
    ? [scan.include]
    : []

  const currentPackagePath = path.dirname(
    require.resolve('@cypress-design/css/package.json')
  )

  return {
    ...options,
    config: merge(windiConfig, options.config),
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

export const CyCSSVitePlugin = (options: UserOptions = {}) =>
  VitePlugin(getConfig(options))

export const CyCSSWebpackPlugin = (options: UserOptions) =>
  new WebpackPlugin(getConfig(options))

export * from './colors'

export { ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR } from './icon-color-plugins'

export { default as WindiKeepRollupPlugin } from './windi-keep-rollup-plugin'
