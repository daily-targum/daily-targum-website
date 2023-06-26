const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting
const withSourceMaps = require("@zeit/next-source-maps");

// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env;

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA ||
  VERCEL_GITLAB_COMMIT_SHA ||
  VERCEL_BITBUCKET_COMMIT_SHA;

module.exports = withBundleAnalyzer(
  withSourceMaps({
    serverRuntimeConfig: {
      rootDir: __dirname,
    },
    sassOptions: {
      includePaths: [
        path.join(__dirname, "src", "styles"),
        path.join(__dirname, "node_modules"),
      ],
    },
    webpack: (config, options) => {
      config.plugins.push(
        new options.webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// })
      );

      // In `pages/_app.js`, Sentry is imported from @sentry/browser. While
      // @sentry/node will run in a Node.js environment. @sentry/node will use
      // Node.js-only APIs to catch even more unhandled exceptions.
      //
      // This works well when Next.js is SSRing your page on a server with
      // Node.js, but it is not what we want when your client-side bundle is being
      // executed by a browser.
      //
      // Luckily, Next.js will call this webpack function twice, once for the
      // server and once for the client. Read more:
      // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
      //
      // So ask Webpack to replace @sentry/node imports with @sentry/browser when
      // building the browser's bundle
      if (!options.isServer) {
        config.resolve.alias["@sentry/node"] = "@sentry/browser";
      }

      if (!options.dev) {
        config.resolve.alias["react"] = "preact/compat";
        config.resolve.alias["react-dom"] = "preact/compat";
        config.resolve.alias["react/jsx-runtime"] = "preact/jsx-runtime";
      }

      // When all the Sentry configuration env variables are available/configured
      // The Sentry webpack plugin gets pushed to the webpack plugins to build
      // and upload the source maps to sentry.
      // This is an alternative to manually uploading the source maps
      // Note: This is disabled in development mode.
      if (
        SENTRY_DSN &&
        SENTRY_ORG &&
        SENTRY_PROJECT &&
        SENTRY_AUTH_TOKEN &&
        COMMIT_SHA &&
        NODE_ENV === "production"
      ) {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: ".next",
            ignore: ["node_modules"],
            stripPrefix: ["webpack://_N_E/"],
            urlPrefix: "~/_next",
            release: COMMIT_SHA,
          })
        );
      }

      return config;
    },
    env: {
      AWS_APPSYNC_URL: process.env.AWS_APPSYNC_URL,
      AWS_APPSYNC_REGION: process.env.AWS_APPSYNC_REGION,
      AWS_APPSYNC_API_KEY: process.env.AWS_APPSYNC_API_KEY,
      AWS_ELASTICSEARCH_URL: process.env.AWS_ELASTICSEARCH_URL,

      CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
      CONTENTFUL_ACCESS_TOKEN_DRAFTS:
        process.env.CONTENTFUL_ACCESS_TOKEN_DRAFTS,

      GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,

      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,

      ENV: process.env.ENV,
    },
    pageExtensions: ["page.tsx"],

    async redirects() {
      return [
        {
          source: "/multimedia/video",
          destination: "/videos",
          permanent: true,
        },
        {
          source: "/multimedia/photo",
          destination: "/photos",
          permanent: true,
        },
        {
          source: "/page/staff",
          destination: "/page/contact",
          permanent: true,
        },
        {
          source: "/page/classifieds",
          destination: "/classifieds",
          permanent: true,
        },
      ];
    },
  })
);
