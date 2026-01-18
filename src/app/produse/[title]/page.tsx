import { Metadata } from "next";
import Produs from "../../components/produse-individuale/ProdusIndividual";
import { fetchPanouById } from "../../components/asyncOperations/fetch-by-id/fetchBYId";
import "./Produse.css";

export async function generateMetadata({ params }: { params: { [key: string]: string } }): Promise<Metadata> {
  
  const panouriData = await fetchPanouById(params.title);

  
  const title = panouriData?.attributes?.title
    ? panouriData.attributes.title
    : "Normal Title";
 

  return {
    title,
  };
}

const Produse = async ({params}) => {
    const titleParam = params.title;


  if (!titleParam) {
      return <div className="loading-container">Title missing</div>;
    }
  
  
    let cardList;
  
    try {
      cardList = await fetchPanouById(titleParam);
    } catch (error) {
      console.error("Error fetching data:", error);
      return <div className="loading-container">Error loading product</div>;
    }
  
    if (!cardList || cardList.length === 0) {
  
  
  
  
  
      return <div className="loading-container">Product not found</div>;
    }
  
  




  return (
    <div>
      <Produs
        id={cardList.id}
        img={cardList.attributes?.image?.data}
        title={cardList.attributes?.title}
        description={cardList.attributes?.description}
        price={cardList.attributes?.price}
        category={cardList.attributes?.category}
      />
    </div>
  );
};

export default Produse;
