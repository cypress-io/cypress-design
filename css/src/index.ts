import type { UserOptions } from 'vite-plugin-windicss'
import VitePlugin from 'vite-plugin-windicss'
import WebpackPlugin from 'windicss-webpack-plugin'
import windiConfig from './windi.config'

function getConfig(options: UserOptions) {
  const scan = typeof options.scan === 'boolean' ? {} : options.scan ?? {}
  const include = Array.isArray(scan?.include)
    ? scan.include
    : scan.include
    ? [scan.include]
    : []

  return {
    config: windiConfig,
    ...options,
    scan: {
      ...(scan || {}),
      include: [
        ...include,
        '../../node_modules/@cypress-design/*/dist/*.@(js|css)',
        './node_modules/@cypress-design/*/dist/*.@(js|css)',
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
