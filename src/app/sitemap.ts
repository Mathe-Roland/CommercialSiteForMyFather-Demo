import { formatForURL } from "./components/functions";

export const revalidate = 86400;

export default async function sitemap() {
  const domain = "https://www.decorcut.ro";

  const [productsRes, blogsRes, categoriesRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates?pagination[pageSize]=1000`
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?pagination[pageSize]=1000`
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?pagination[pageSize]=1000`
    ),
  ]);

  const products = await productsRes.json();
  const blogs = await blogsRes.json();
  const categories = await categoriesRes.json();


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

  const categoryUrls = categories.data.map((item: any) => ({
    url: `${domain}/magazin/${formatForURL(item.attributes.category)}`,
    lastModified: new Date(item.attributes.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
}));

    const staticUrls = [
      "/",
      "/despre-noi",
      "/blog",
    ].map((path) => ({
      url: `${domain}${path}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticUrls, ...productUrls, ...blogUrls, ...categoryUrls];
}