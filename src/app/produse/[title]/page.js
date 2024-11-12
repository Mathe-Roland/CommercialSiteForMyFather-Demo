"use client";
import Produs from "../../components/produse-individuale/ProdusIndividual";
import { useEffect, useState } from "react";
import { fetchId } from "../../components/asyncOperations/fetchData";
import "./Produse.css";

const Produse = () => {
  const [cardList, setCardList] = useState(null);
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
        let titleMatch = url.match(/title=([^&]+)/);
        let descriptionMatch = url.match(/description=([^&]+)/);
        let title = titleMatch[1].split("-").join(" ") ;
        title = title[0].toUpperCase() + title.slice(1);

        let description = descriptionMatch ? decodeURIComponent(descriptionMatch[1]) : "Default Description";

        document.title = title;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", description);
        } else {
          const meta = document.createElement("meta");
          meta.name = "description";
          meta.content = description;
          document.head.appendChild(meta);
        }

        const data = await fetchId(title);
        setCardList(data);
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
        img={cardList[0]?.attributes?.image?.data}
        title={cardList[0]?.attributes?.title || "Default Title"}
        description={cardList[0]?.attributes?.description || "Default Description"}
        price={cardList[0]?.attributes?.price}
      />
    </div>
  );
};

export default Produse;
