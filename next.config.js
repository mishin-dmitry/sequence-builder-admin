/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  pageExtensions: ['page.tsx', 'page.ts'],
  env: {
    API_ORIGIN: process.env.API_ORIGIN,
    CDN_ORIGIN: process.env.CDN_ORIGIN
  }
}
