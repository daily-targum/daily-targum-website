module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/preset-typescript',
    '@storybook/addon-knobs'
  ],
  "babel": {
    "presets": ["next/babel"]
  }
}