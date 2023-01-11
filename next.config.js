const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'unsafe-inline' *.githubusercontent.com;
  child-src http://localhost:3000;
  style-src 'unsafe-inline';
  font-src 'self';
  img-src 'self' *.githubusercontent.com;
`;

module.exports = {
  images: {
    domains: ['avataaars.io', 'avatars.githubusercontent.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
     NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
}
