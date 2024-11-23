import ProdusCC from "./ProdusCC";
import { Metadata } from 'next';

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string } }): Promise<Metadata> {
  const title = searchParams.title.split("-").join(" ");
  const description = searchParams.description ? decodeURIComponent(searchParams.description) : "Default Description";
  console.log(searchParams);

  return {
    title,
    description,
  };
}




const Produse = () => {

  return (
    <div>
      <ProdusCC/>
    </div>
  );
};

export default Produse;
