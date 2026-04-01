import { fetchArticleId } from "../../components/asyncOperations/fetch-by-id/fetchBYId";
import IndividualArticlesClient from "./IndividualArticlesClient";
import { Metadata } from "next";
import { formatForURL } from "../../components/functions";

export const revalidate = 86400; // ISR

// ---------- STATIC PARAMS ----------
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?pagination[limit]=1000&populate=*`
  );

  const data = await res.json();

  return data.data.map((item: any) => ({
    articleId: `${item.id}-${formatForURL(item.attributes.title)}`,
  }));
}

// ---------- METADATA ----------
export async function generateMetadata({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {
  const id = params.articleId.split("-")[0];
  console.log("Generating metadata for article ID:", id);
  const article = await fetchArticleId(id);

  if (!article) {
    return {
      title: "Article not found | DecorCut",
    };
  }
  console.log("Article data for metadata:", article);
  const title = article[0]?.attributes?.title || "DecorCut Blog Article";

  const description =
    article[0]?.attributes?.shortDescription ||
    article[0]?.attributes?.shortDescription ||
    "DecorCut blog article";

  return {
    title,
    description,
  };
}

// ---------- PAGE ----------
export default function IndividualArticles() {
  return <IndividualArticlesClient />;
}
