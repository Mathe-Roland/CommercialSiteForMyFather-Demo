import axios from 'axios';
import { NextResponse } from 'next/server';

const staticPages = [
  '/', '/contact', '/metode-de-plata', '/garantia', '/cadouri-personalizate',
  '/comenzi-plasate', '/confidentialitate', '/cos', '/despre-noi', '/harti',
  '/Sign-In', '/panouri-decorative', '/pandative', '/politica-de-cookie-uri',
  '/politica-de-retur', '/tablouri-decorative', '/tablouri-gravate',
  '/termeni-si-conditii', '/payment-success', '/setari/informati-de-baza',
  '/setari/schimbare-parola', '/blog'
];

const fetchDynamicPages = async () => {
  try {
    const response = await axios.get(
      'https://app-ece6f1a7-8619-459e-a9f4-1643769a735e.cleverapps.io/api/panouri-traforates'
    );
    return response.data.data.map(item => `
      <url>
        <loc>https://www.decorcut.com/produse/${item.attributes.title.toLowerCase().split(' ').join('-')}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('');
  } catch (error) {
    console.error('Error fetching dynamic pages:', error);
    return '';  // Return empty string if error occurs
  }
};

export async function GET() {
  try {
    const dynamicPages = await fetchDynamicPages();
    
    const allPages = staticPages.map(page => `
      <url>
        <loc>https://www.decorcut.com${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('') + dynamicPages;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages}
      </urlset>`;

    // Return a new Response object with the XML
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.error();  // Return a 500 error response
  }
}
