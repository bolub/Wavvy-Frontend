/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/login',
        has: [
          {
            type: 'cookie',
            key: 'USER_AUTHENTICATED',
            value: 'true',
          },
        ],
        destination: '/folder/uncategorized',
        permanent: false,
      },

      {
        source: '/signup',
        has: [
          {
            type: 'cookie',
            key: 'USER_AUTHENTICATED',
            value: 'true',
          },
        ],
        destination: '/folder/uncategorized',
        permanent: false,
      },

      {
        source: '/folder/uncategorized',
        has: [
          {
            type: 'cookie',
            key: 'USER_AUTHENTICATED',
            value: 'false',
          },
        ],
        destination: '/login',
        permanent: false,
      },

      {
        source: '/folder/:id*',
        has: [
          {
            type: 'cookie',
            key: 'USER_AUTHENTICATED',
            value: 'false',
          },
        ],
        destination: '/login',
        permanent: false,
      },
    ];
  },
};
