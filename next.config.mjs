/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'backoffice.fabdev.fr',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        optimizeCss: true,
    },
};

export default nextConfig;
