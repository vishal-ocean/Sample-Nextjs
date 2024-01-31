const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  //   reactStrictMode: true,
  distDir: "app",
  output: "standalone",
  webpack: (config, { isServer, dev }) => {
    if (!dev) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /console\.log/,
          (resource) => {
            resource.request = require.resolve("./emptyFunction.js");
          }
        )
      );
    }

    // const envs = [
    //   "AUTH0_SECRET",
    //   "AUTH0_BASE_URL",
    //   "AUTH0_ISSUER_BASE_URL",
    //   "AUTH0_CLIENT_ID",
    //   "AUTH0_CLIENT_SECRET",
    //   "AUTH0_DB_NAME",
    //   "CRYPTO_NEWS_API_TOKEN",
    //   "NEXT_PUBLIC_BACKEND_BASE_URL_DEV",
    //   "STRIGA_APPLICATION_ID",
    //   "STRIGA_API_KEY",
    //   "STRIGA_SECRET",
    //   "STRIGA_UI_SECRET",
    //   "ABLY_SUBSCRIBER_PUBLISHER_KEY",
    //   "GOOGLE_CLIENT_EMAIL",
    //   "GOOGLE_AUTH_PRIVATE_KEY",
    //   "GOOGLE_SPREADSHEET_ID",
    //   "NEXT_PUBLIC_STRIGA_UI_SECRET",
    //   "NEXT_PUBLIC_STRIGA_APPLICATION_ID",
    //   "STRIGA_API_ENDPOINT",
    // ];
    // envs.forEach((env) => {
    //   if (!process.env[env]) {
    //     throw new Error(
    //       `The environment variable ${env} is missing. Please add it to your .env file.`
    //     );
    //   }
    // });

    return config;
  },
  images: {
    domains: ["assets.coingecko.com", "s.gravatar.com"],
  },
};

module.exports = nextConfig;
