/** @type {import('next').NextConfig} */
const nextConfig = {
  serverComponentsExternalPackages: [
    'puppeteer',
    'puppeteer-extra',
    'puppeteer-extra-plugin-stealth',
  ],
};

module.exports = nextConfig;
