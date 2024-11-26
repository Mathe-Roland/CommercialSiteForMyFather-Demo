import { fetchArticlesData} from "../../components/asyncOperations/fetchData";
import IndividualArticlesClient from "./IndividualArticlesClient";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { [key: string]: string } }): Promise<Metadata> {
  const panouriData = await fetchArticlesData();

  const filteredPanouriData = panouriData?.filter(element => element.id === parseInt(params.title));

  const title = filteredPanouriData[0]?.attributes?.title
    ? filteredPanouriData[0].attributes.title
    : "Normal Title";
  const description = filteredPanouriData[0]?.attributes.description
    ? filteredPanouriData.description
    : "Default Description";

  return {
    title,
    description,
  };
}

const IndividualArticles = () => {


    return (<IndividualArticlesClient/>);
}

export default IndividualArticles;

