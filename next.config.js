/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['sequelize'],
    },
    redirects: async () => [
        {
            source: '/',
            destination: '/dashboard',
            permanent: true,
        }
    ]
};

module.exports = nextConfig;
