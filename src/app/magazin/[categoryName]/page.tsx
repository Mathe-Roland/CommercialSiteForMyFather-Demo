import DespreNoiItems from "../../components/despre-noi-items/DespreNoiItems";
import { fetchCategoryDescriptions } from "../../components/asyncOperations/fetch/fetchAllFields";
import { notFound } from "next/navigation";
import { Metadata } from "next";


export const revalidate = 86400;
export const dynamicParams = false;




async function getCategories() {
  const categoriesData = await fetchCategoryDescriptions();

  return (
    categoriesData?.map((element) =>
      element.attributes.category
        .toLowerCase()
        .split(" ")
        .join("-")
    ) || []
  );
}



export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((categoryName) => ({
    categoryName,
  }));
}



const categories = [
  "harti",
  "masca-de-calorifer",
  "pandative",
  "panouri-decorative",
  "tablouri-gravate",
  "cadouri-personalizate",
];



export async function generateMetadata({
  params,
}: {
  params: { categoryName: string };
}): Promise<Metadata> {
  const { categoryName } = params;

  if (!categories.includes(categoryName)) {
    notFound();
  }

  const categoriesData = await fetchCategoryDescriptions();

  const slug = categoryName.split("-").join(" ").toLowerCase();

  const category = categoriesData?.find(
    (element) =>
      element.attributes.category?.toLowerCase() === slug
  )?.attributes;

  const isRadiatorCover = categoryName === "masca-de-calorifer";

  const title = isRadiatorCover
    ? "Mască de calorifer MDF la comandă | Decorcut"
    : `${category?.category || "Produse decorative"} | Decorcut`;

  const description =
    category?.metadescription ||
    (isRadiatorCover
      ? "Descoperă măști de calorifer din MDF cu modele decorative pentru amenajarea locuinței. Alege modelul potrivit pentru interiorul tău."
      : "Descoperă produsele decorative și personalizate de la Decorcut.");

  const url = `https://www.decorcut.ro/magazin/${categoryName}`;

  return {
    title: {
      absolute: title,
    },
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Decorcut",
      locale: "ro_RO",
      type: "website",
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}



const Category = ({
  params,
}: {
  params: { categoryName: string };
}) => {
  const { categoryName } = params;

    if (!categories.includes(categoryName)) {
    notFound();
  }


  return <DespreNoiItems params={params} />;
};

export default Category;