import axios from 'axios';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const staticPages = [
  '/', '/cadouri-personalizate',
  '/despre-noi', '/harti',
  '/panouri-decorative', '/pandative',
  '/tablouri-decorative', '/tablouri-gravate',
  '/setari/informati-de-baza',
  '/blog'
];

const getDomain = () => {
  const host = headers().get('host');
  return host?.includes('.com') ? 'https://www.decorcut.com' : 'https://www.decorcut.ro';
};

const fetchDynamicPages = async (domain) => {
  try {
    const [panoruiTraforate, bloguri] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates`),
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles`)
    ]);

    const productUrls = panoruiTraforate.data.data.map(item => `
      <url>
        <loc>${domain}/produse/${item.id}?title=${encodeURIComponent(item.attributes.title)}&amp;description=${encodeURIComponent(item.attributes.description)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('');

    const blogUrls = bloguri.data.data.map(item => `
      <url>
        <loc>${domain}/blog/${item.id}?title=${encodeURIComponent(item.attributes.title)}&amp;description=${encodeURIComponent(item.attributes.shortDescription)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('');

    return productUrls + blogUrls;
  } catch (error) {
    console.error('Error fetching dynamic pages:', error);
    return '';
  }
};

export async function GET() {
  try {
    const domain = getDomain();
    const dynamicPages = await fetchDynamicPages(domain);

    const allPages = staticPages.map(page => `
      <url>
        <loc>${domain}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('') + dynamicPages;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages}
      </urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.error();
  }
}