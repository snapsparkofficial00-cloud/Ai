/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// Add this block to your existing next.config.js
// If next.config.js doesn't exist, create it with this content:

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverComponentsExternalPackages: [
    'puppeteer',
    'puppeteer-extra',
    'puppeteer-extra-plugin-stealth',
  ],
};

module.exports = nextConfig;
