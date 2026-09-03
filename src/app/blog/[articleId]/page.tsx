import { fetchArticleId } from "../../components/asyncOperations/fetch-by-id/fetchBYId";
import IndividualArticlesClient from "./IndividualArticlesClient";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { formatForURL } from "../../components/functions";



export const revalidate = 86400;

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?pagination[limit]=1000&populate=*`
  );

  const data = await res.json();

  return data.data.map((item: any) => ({
    articleId: `${item.id}-${formatForURL(item.attributes.title)}`,
  }));
}




export async function generateMetadata({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {

  const id = params.articleId.split("-")[0];

  const article = await fetchArticleId(id);

  if (!article || article.length === 0) {
    const canonicalUrl =
      `https://www.decorcut.ro/blog/${params.articleId}`;

    return {
      title: "Article not found | DecorCut",
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  const title =
    article[0]?.attributes?.title || "DecorCut Blog Article";

  const description =
    article[0]?.attributes?.shortDescription ||
    "DecorCut blog article";

  const expectedSlug =
    `${article[0].id}-${formatForURL(article[0].attributes.title)}`;

  // Redirect old/incorrect article URLs to the canonical URL
  if (params.articleId !== expectedSlug) {
    permanentRedirect(`/blog/${expectedSlug}`);
  }

  const canonicalUrl =
    `https://www.decorcut.ro/blog/${expectedSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
export default async function IndividualArticles({
  params,
}: {
  params: { articleId: string };
}) {
  const id = params.articleId.split("-")[0];

  const article = await fetchArticleId(id);

  if (!article || article.length === 0) {
    notFound();
  }

  return <IndividualArticlesClient />;
}