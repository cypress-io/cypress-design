module.exports = {
  addons: [
    'storybook-readme',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-backgrounds',
    '@storybook/addon-docs/preset',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-options',
    '@storybook/addon-viewport',
  ],
  stories: ['../stories/**/*.stories.mdx'],
}
