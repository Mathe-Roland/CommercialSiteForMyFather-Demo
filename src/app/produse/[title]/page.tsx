import ProdusCC from "./ProdusCC";
import { Metadata } from "next";
import { fetchPanouriData } from "../../components/asyncOperations/fetchData";

export async function generateMetadata({ params }: { params: { [key: string]: string } }): Promise<Metadata> {
  const panouriData = await fetchPanouriData();

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

const Produse = () => {
  return (
    <div>
      <ProdusCC />
    </div>
  );
};

export default Produse;
