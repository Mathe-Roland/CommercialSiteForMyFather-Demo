"use client";

import Produs from "../../components/produse-individuale/ProdusIndividual";
import { useEffect, useState } from "react";
import { fetchId } from "../../components/asyncOperations/fetch-by-id/fetchBYId";
import "./Produse.css";




const ProdusCC = () => {
  const [cardList, setCardList] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }

  }, []);


  useEffect(() => {
    if (!url) return;
    

    const fetchData = async () => {
      try {
        let titleMatch = url.match(/title=([^&]+)/);
        if (titleMatch) {
          let title = titleMatch[1].split("-").join(" ");
          console.log("title", title);
          
          const data = await fetchId(title);
          console.log("data", data);
          setCardList(data);
        } else {
          console.error("Title not found in URL");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [url]);
  

  if (!cardList) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div suppressHydrationWarning>
          <Produs
            id={cardList[0]?.id}
            img={cardList[0]?.attributes?.image?.data}
            title={cardList[0]?.attributes?.title}
            description={cardList[0]?.attributes?.description}
            price={cardList[0]?.attributes?.price}
            category={cardList[0]?.attributes.category}
            />
    </div>
  );
};

export default ProdusCC;