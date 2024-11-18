import ProdusCC from "./ProdusCC";
import { headers } from 'next/headers';
import { Metadata } from 'next';

      
export async function generateMetadata() {
  const headersList = headers();
  const fullUrl = headersList.get('referer') || "";

  const titleMatch = fullUrl.match(/title=([^&]+)/)||"";
  const descriptionMatch = fullUrl.match(/description=([^&]+)/)||"";

  const metadata:Metadata={
    title: titleMatch[1]?.split("-").join(" "),
    description: decodeURIComponent(descriptionMatch[1]),
  };

  return metadata;
  
}


const Produse = () => {

  return (
    <div suppressHydrationWarning>
      <ProdusCC/>
    </div>
  );
};

export default Produse;
