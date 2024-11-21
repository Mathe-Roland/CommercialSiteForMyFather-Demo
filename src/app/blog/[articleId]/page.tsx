import IndividualArticlesClient from "./IndividualArticlesClient";
import { Metadata } from 'next';


export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string } }): Promise<Metadata> {
  const title = searchParams.title ? searchParams.title.split("-").join(" ") : "Default Title";
  const description = searchParams.description ? decodeURIComponent(searchParams.description) : "Default Description";

  return {
    title,
    description,
  };
}


const IndividualArticles = () => {


    return (<IndividualArticlesClient/>);
}

export default IndividualArticles;

