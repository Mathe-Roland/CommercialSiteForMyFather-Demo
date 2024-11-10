"use client";
import Produs from "../../components/produse-individuale/ProdusIndividual";
import { useEffect, useState } from "react";
import { fetchId } from "../../components/asyncOperations/fetchData";
import "./Produse.css";

const Produse = () => {
  const [cardList, setCardList] = useState({});
  const [url, setUrl] = useState(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;

      try {
        let title = url.match(/title=([^&]+)/);
        title = title[1][0].toUpperCase() + title[1].slice(1).split("-").join(" ");
        const data = await fetchId(title);
        setCardList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  if (!cardList) {
    return <div className="loading-container"></div>;
  }

  return (
    <div suppressHydrationWarning>
      <Produs
        img={cardList[0]?.attributes?.image?.data}
        title={cardList[0]?.attributes?.title}
        description={cardList[0]?.attributes?.description}
        price={cardList[0]?.attributes?.price}
      />
    </div>
  );
};

export default Produse;
