"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchCategory } from "../asyncOperations/fetch-by-id/fetchBYId";
import { fetchCategoryDescriptions } from "../asyncOperations/fetch/fetchAllFields";
import CustomizedAccordions from "../accordion/Accordion";
import ProdusCard from "../card-produse/ProdusCard";
import "./DespreNoiItems.css";

const DespreNoiItems = () => {
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);

  const categorySlug = segments[1] || "magazin";

  const header =
  categorySlug.charAt(0).toUpperCase() +
  categorySlug.slice(1).replaceAll("-", " ");


  const [cardList, setCardList] = useState([]);
  const [categoryDescriptions, setCategoryDescriptions] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const category = header.toLowerCase();

      const data = await fetchCategory(category);
      const descriptionsData = await fetchCategoryDescriptions();

      const matchedDescription = descriptionsData.find(
        desc => desc.attributes.category.toLowerCase() === category
      );

      setCategoryDescriptions(
        matchedDescription?.attributes?.description || ""
      );

      setCardList(data || []);
    };

    loadData();
  }, [categorySlug]);

  return (
    <div className="despre-noi-items-box">
      <div className="accordionplushd">
        <div className="accordion-container">
          <CustomizedAccordions />
        </div>

        <div className="headerplusdescription">
          <h1 className="header">{header}</h1>

          <div className="description-container">
            {categoryDescriptions ? (
              <p className="description-text">{categoryDescriptions}</p>
            ) : (
              <p>Descriere pentru categoria {header} nu este disponibilă momentan.</p>
            )}
          </div>
        </div>
      </div>

      <div className="cardList-container">
        {cardList.length > 0 &&
          cardList.map(e => (
            <ProdusCard
              key={e.id}
              id={e.id}
              title={e.attributes?.title || "Placeholder title"}
              description={e.attributes?.description || ""}
              image={e.attributes?.image?.data?.[0]?.attributes?.url || ""}
              disponibil="Este disponibil"
              price={e.attributes?.price || "Preț indisponibil"}
            />
          ))}
      </div>
    </div>
  );
};

export default DespreNoiItems;
