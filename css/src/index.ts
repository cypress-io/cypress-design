import VitePlugin, { type UserOptions } from 'vite-plugin-windicss';
import WebpackPlugin from 'windicss-webpack-plugin';
import windiConfig from './windi.config';

export const CyCSSVitePlugin = (options: UserOptions) =>
  VitePlugin({
    config: windiConfig,
    ...options,
  });

export const CyCSSWebpackPlugin = (options: UserOptions) =>
  new WebpackPlugin({
    config: windiConfig,
    ...options,
  });

export { colors } from './colors';
