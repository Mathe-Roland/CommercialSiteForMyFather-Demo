import axios from 'axios';
import { NextResponse } from 'next/server';

const staticPages = [
  '/', '/cadouri-personalizate',
  '/despre-noi', '/harti',
  '/panouri-decorative', '/pandative',
  '/tablouri-decorative', '/tablouri-gravate',
  '/setari/informati-de-baza',
  '/blog'
];

const fetchDynamicPages = async () => {
  try {
    const panoruiTraforate = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates`
    );
    const bloguri = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles`
    );
    return panoruiTraforate.data.data.map(item => `
      <url>
        <loc>https://www.decorcut.com/produse/$${item.id}?title=${item.attributes.title}&description=${item.attributes.description}}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('') + bloguri.data.data.map(item => `
      <url>
        <loc>https://www.decorcut.com/blog//blog/${item.id}?title=${item.attributes.title}&description=${item.attributes.shortDescription}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('')
    ;
  } catch (error) {
    console.error('Error fetching dynamic pages:', error);
    return ''; 
  }
};

export async function GET() {
  try {
    const dynamicPages = await fetchDynamicPages();
    
    const allPages = staticPages.map(page => {
      return `
        <url>
          <loc>https://www.decorcut.com${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `;
    }).join('') + dynamicPages;

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
