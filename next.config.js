const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'unsafe-inline' *.githubusercontent.com;
  child-src http://localhost:3000;
  style-src 'unsafe-inline';
  font-src 'self';
  img-src 'self' *.githubusercontent.com;
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },

    ]
  },
  env: {
     NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
}
