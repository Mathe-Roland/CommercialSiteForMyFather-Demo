/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/ddrkdrrre/**', // Adjust according to your Cloudinary URL structure
        },
      ],
    },
  };
  
  export default nextConfig;
  