const { mergeConfig } = require("vite");
const vueJsx = require("@vitejs/plugin-vue-jsx").default;
const WindiCSS = require("vite-plugin-windicss").default;

module.exports = {
  stories: ["../../components/*/vue/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // aadd management of jsx files
      plugins: [WindiCSS(), vueJsx()],
    });
  },
};
