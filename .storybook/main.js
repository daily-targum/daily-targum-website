const path = require('path');

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
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.resolve.alias['react'] = path.resolve(__dirname, '..', 'node_modules', 'react');
    config.resolve.alias['react-dom'] = path.resolve(__dirname, '..', 'node_modules', 'react-dom');

    // Return the altered config
    return config;
  },
}