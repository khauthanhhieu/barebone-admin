/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['sequelize'],
    },
    redirects: async () => [
        {
            source: '/',
            destination: '/admin',
            permanent: false,
        }
    ]
};

module.exports = nextConfig;
