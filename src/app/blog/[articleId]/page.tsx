import IndividualArticlesClient from "./IndividualArticlesClient";

import { headers } from 'next/headers';
import { Metadata } from 'next';

      
export async function generateMetadata() {
  const headersList = headers();
  const fullUrl = headersList.get('referer') || "";

  let titleMatch = fullUrl.match(/title=([^&]+)/);
  let descriptionMatch = fullUrl.match(/description=([^&]+)/);

  const metadata:Metadata={
    title: titleMatch[1]?.split("-").join(" "),
    description: decodeURIComponent(descriptionMatch[1]),
  };

  return metadata;
}

const IndividualArticles = () => {


    return (<IndividualArticlesClient/>);
}

export default IndividualArticles;