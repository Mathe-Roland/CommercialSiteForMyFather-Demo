/** @type {import('next').NextConfig} */
const nextConfig = {

    async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/ddrkdrrre/**', 
      },
    ],
  },
};

export default nextConfig;
