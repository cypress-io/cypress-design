import VitePlugin from "vite-plugin-windicss";
import WebpackPlugin from "windicss-webpack-plugin";
import windiConfig, { defaultConfig } from "./windi.config";

export const CyCSSVitePlugin = () =>
  VitePlugin({
    config: windiConfig,
  });

export const CyCSSWebpackPlugin = () =>
  new WebpackPlugin({
    config: windiConfig,
  });

export { colors } from "./colors";
