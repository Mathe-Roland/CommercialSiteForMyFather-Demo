import DespreNoiItems from "../../components/despre-noi-items/DespreNoiItems"
import { Metadata } from "next";
import { fetchCategoryDescriptions } from "../../components/asyncOperations/fetch/fetchAllFields";

export async function generateMetadata({ params }: { params: { [key: string]: string } }): Promise<Metadata> {
  const categoriesData = await fetchCategoryDescriptions();

    const slug=params.categoryName.split("-").join(" ").toLowerCase();


    const filteredCategory = categoriesData?.filter(element => element.attributes.category === slug);

  
  const title = filteredCategory[0]?.attributes?.category
    ? filteredCategory[0].attributes.category
    : "Categories";

 

  const description = filteredCategory[0]?.attributes?.metadescription
    ? filteredCategory[0].attributes.metadescription
    : "Explore our diverse range of categories, each offering unique products tailored to your needs. From home decor to personalized gifts, find everything you need to enhance your lifestyle.";

  return {
    title,
    description,
  };
}




const Category=()=>{



    return (
        <DespreNoiItems/>
    )
}

export default Category;