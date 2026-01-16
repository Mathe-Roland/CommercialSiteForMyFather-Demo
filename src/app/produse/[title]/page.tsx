import { Metadata } from "next";
import { fetchPanouriData } from "../../components/asyncOperations/fetch/fetchAllFields";
import Produs from "../../components/produse-individuale/ProdusIndividual";
import { fetchId } from "../../components/asyncOperations/fetch-by-id/fetchBYId";
import "./Produse.css";

export async function generateMetadata({ params }: { params: { [key: string]: string } }): Promise<Metadata> {
  const panouriData = await fetchPanouriData();

  const filteredPanouriData = panouriData?.filter(element => element.id === parseInt(params.title));

  
  const title = filteredPanouriData[0]?.attributes?.title
    ? filteredPanouriData[0].attributes.title
    : "Normal Title";
 

  return {
    title,
  };
}

const Produse = async ({searchParams}) => {
    const titleParam = searchParams?.title;

  if (!titleParam) {
      return <div className="loading-container">Title missing</div>;
    }
  
    const title = titleParam.split("-").join(" ");
  
    let cardList;
  
    try {
      cardList = await fetchId(title);
    } catch (error) {
      console.error("Error fetching data:", error);
      return <div className="loading-container">Error loading product</div>;
    }
  
    if (!cardList || cardList.length === 0) {
  
  
  
  
  
      return <div className="loading-container">Product not found</div>;
    }
  
    const product = cardList[0];
  




  return (
    <div>
      <Produs
        id={product.id}
        img={product.attributes?.image?.data}
        title={product.attributes?.title}
        description={product.attributes?.description}
        price={product.attributes?.price}
        category={product.attributes?.category}
      />
    </div>
  );
};

export default Produse;
