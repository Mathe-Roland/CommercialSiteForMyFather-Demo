import DespreNoiItems from "../../components/despre-noi-items/DespreNoiItems";
import { fetchCategoryDescriptions } from "../../components/asyncOperations/fetch/fetchAllFields";
import { notFound } from "next/navigation";


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
}) {
  const { categoryName } = params;

  if (!categories.includes(categoryName)) {
    notFound();
  }

  const categoriesData = await fetchCategoryDescriptions();

  const slug = params.categoryName.split("-").join(" ").toLowerCase();

  const filteredCategory = categoriesData?.filter(
    (element) => element.attributes.category === slug
  );

  const title = filteredCategory[0]?.attributes?.category
    ? filteredCategory[0].attributes.category
    : "Categories";

  const description =
    filteredCategory[0]?.attributes?.metadescription
      ? filteredCategory[0].attributes.metadescription
      : "Explore our diverse range of categories, each offering unique products tailored to your needs. From home decor to personalized gifts, find everything you need to enhance your lifestyle.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.decorcut.ro/magazin/${params.categoryName}`,
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