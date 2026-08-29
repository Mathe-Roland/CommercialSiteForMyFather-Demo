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

  console.log("PRODUCT COUNT:", products.data.length);
  console.log("PRODUCT IDS:", products.data.map((item: any) => item.id));

  console.log("BLOG COUNT:", blogs.data.length);

  const productUrls = products.data.map((item: any) => ({
    url: `${domain}/produse/${item.id}-${formatForURL(item.attributes.title)}`,
    lastModified: new Date(item.attributes.updatedAt),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const blogUrls = blogs.data.map((item: any) => ({
    url: `${domain}/blog/${item.id}-${formatForURL(item.attributes.title)}`,
    lastModified: new Date(item.attributes.updatedAt),
    changeFrequency: "weekly" as const,
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
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  console.log("TOTAL SITEMAP URLS:", 
    staticUrls.length + productUrls.length + blogUrls.length
  );

  return [...staticUrls, ...productUrls, ...blogUrls];
}