// babel.config.js
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
};