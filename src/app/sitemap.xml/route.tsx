import axios from "axios";
import { NextResponse } from "next/server";

const domains = ["decorcut.ro", "decorcut.com"];

const fetchDynamicPages = async (domain) => {
  try {
    const [panouriTraforate, bloguri] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates`),
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles`),
    ]);

    const productUrls = panouriTraforate.data.data
      .map(
        (item) => `
      <url>
        <loc>https://www.${domain}/produse/${item.id}?title=${encodeURIComponent(
          item.attributes.title
        )}&description=${encodeURIComponent(item.attributes.description)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
      )
      .join("");

    const blogUrls = bloguri.data.data
      .map(
        (item) => `
      <url>
        <loc>https://www.${domain}/blog/${item.id}?title=${encodeURIComponent(
          item.attributes.title
        )}&description=${encodeURIComponent(item.attributes.shortDescription)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
      )
      .join("");

    return productUrls + blogUrls;
  } catch (error) {
    console.error(`Error fetching dynamic pages for ${domain}:`, error);
    return "";
  }
};

export async function GET() {
  try {
    const dynamicPages = await Promise.all(domains.map(fetchDynamicPages));

    const staticPages = [
      "/", "/cadouri-personalizate", "/despre-noi", "/harti",
      "/panouri-decorative", "/pandative", "/tablouri-decorative",
      "/tablouri-gravate", "/cos", "/blog"
    ];

    const staticPageUrls = domains
      .map((domain) =>
        staticPages
          .map(
            (page) => `
      <url>
        <loc>https://www.${domain}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
          )
          .join("")
      )
      .join("");

    const allPages = dynamicPages.join("") + staticPageUrls;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages}
      </urlset>`;

    return new Response(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return NextResponse.error();
  }
}
