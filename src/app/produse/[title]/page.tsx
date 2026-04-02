import { Metadata } from "next";
import Produs from "../../components/produse-individuale/ProdusIndividual";
import { fetchPanouById } from "../../components/asyncOperations/fetch-by-id/fetchBYId";
import "./Produse.css";
import { formatForURL } from "../../components/functions";


export const revalidate = 60;


export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates?pagination[pageSize]=1000`
  );

  const data = await res.json();

  return data.data.map((item: any) => ({
    title: `${item.id}-${formatForURL(item.attributes.title)}`, 
  }));
}



export async function generateMetadata({ params }): Promise<Metadata> {
 

  const id = params.title.split("-")[0];

  const product = await fetchPanouById(id);


  if (!product) {
    return { title: "Produs indisponibil | DecorCut" };
  }


  const canonicalUrl = `https://www.decorcut.ro/produse/${params.title}`;


  return {
    title: `${product.attributes.title}`,
    description: product.attributes.description?.slice(0, 160),

    alternates: {
      canonical: canonicalUrl,
    },


    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: product.attributes.title,
      description: product.attributes.description?.slice(0, 160),
      images: [
      {
      url: `${product?.attributes?.image?.data[0]?.attributes?.url || "https://www.decorcut.ro/logosDecorcut.png"}`,
      width: 1200,
      height: 630,
      },
      ]
    },

    twitter: {
      card: "summary_large_image",
      title: product.attributes.title,
      description: product.attributes.description?.slice(0, 160),
      images: [product?.attributes?.image?.data[0]?.attributes?.url || "https://www.decorcut.ro/logosDecorcut.png"],
    },
  };
}



const Produse = async ({params}) => {
    const titleParam = params.title.split("-")[0];


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
    <>
      <Produs
        id={cardList.id}
        img={cardList.attributes?.image?.data}
        title={cardList.attributes?.title}
        description={cardList.attributes?.description}
        price={cardList.attributes?.price}
        category={cardList.attributes?.category}
      />
    </>
  );
};

export default Produse;