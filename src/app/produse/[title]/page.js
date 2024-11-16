import ProdusCC from "./ProdusCC";
import { headers } from 'next/headers';

      
export async function generateMetadata() {
  const headersList = headers();
  const fullUrl = headersList.get('referer') || "";

  let titleMatch = fullUrl.match(/title=([^&]+)/);
  let descriptionMatch = fullUrl.match(/description=([^&]+)/);


  return {
    title: titleMatch[1]?.split("-").join(" "),
    description: decodeURIComponent(descriptionMatch[1]),
  };
}


const Produse = () => {

  return (
    <div suppressHydrationWarning>
      <ProdusCC/>
    </div>
  );
};

export default Produse;
