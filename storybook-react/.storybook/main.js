module.exports = {
  stories: ["../stories/**/*.stories.mdx", "../../components/*/react/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
}
