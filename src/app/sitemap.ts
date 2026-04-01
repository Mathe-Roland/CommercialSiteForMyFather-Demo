// app/sitemap.ts

import { formatForURL } from "./components/functions";

export const revalidate = 86400;

export default async function sitemap() {
  const domain = "https://www.decorcut.ro";

  const [productsRes, blogsRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates?pagination[pageSize]=1000`
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?pagination[pageSize]=1000`
    ),
  ]);

  const products = await productsRes.json();
  const blogs = await blogsRes.json();

  const productUrls = products.data.map((item) => ({
    url: `${domain}/produse/${item.id}-${formatForURL(item.attributes.title)}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const blogUrls = blogs.data.map((item) => ({
    url: `${domain}/blog/${item.id}-${formatForURL(item.attributes.title)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const staticUrls = [
    "/",
    "/despre-noi",
    "/magazin/panouri-decorative",
    "/magazin/tablouri-gravate",
    "/magazin/harti",
    "/magazin/masca-de-calorifer",
    "/magazin/pandative",
    "/magazin/cadouri-personalizate",
    "/blog",
  ].map((path) => ({
    url: `${domain}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticUrls, ...productUrls, ...blogUrls];
}
