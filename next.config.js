/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        additionalData: `
          @import "app/scss/vars.scss";
          @import "app/scss/mixins.scss";
      `,
    },
    experimental: { esmExternals: true },
    images: {
        domains: ['*'],
    },
    i18n,
};

module.exports = withBundleAnalyzer(nextConfig);
