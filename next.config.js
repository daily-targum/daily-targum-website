module.exports = {
  env: {
    AWS_APPSYNC_URL: process.env.AWS_APPSYNC_URL,
    AWS_APPSYNC_REGION: process.env.AWS_APPSYNC_REGION,
    AWS_APPSYNC_API_KEY: process.env.AWS_APPSYNC_API_KEY,

    GOOGLE_ANALYTICS_TRACKING_CODE: process.env.GOOGLE_ANALYTICS_TRACKING_CODE
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    return config
  },
}