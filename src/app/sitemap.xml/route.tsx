import axios from "axios";
import { NextResponse } from "next/server";
import {formatForURL} from "../components/functions";

const domains = ["decorcut.ro"];

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
        <loc>https://www.${domain}/produse/${item.id}?title=${formatForURL(
          item.attributes.title
        )}</loc>
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
        <loc>https://www.${domain}/blog/${item.id}?title=${formatForURL(
          item.attributes.title
        )}</loc>
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
    const dynamicPages = await fetchDynamicPages(domains[0]);

    const staticPages = [
      "/", "/cadouri-personalizate", "/despre-noi", "/harti",
      "/panouri-decorative", "/pandative", "/tablouri-decorative",
      "/tablouri-gravate", "/cos", "/blog"
    ];

    const staticPageUrls = staticPages
          .map(
            (page) => `
      <url>
        <loc>https://www.${domains[0]}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
          )
      .join("");

    const allPages = dynamicPages + staticPageUrls;

    console.log("All pages:", allPages);
    console.log("dynamicPage",dynamicPages);

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
