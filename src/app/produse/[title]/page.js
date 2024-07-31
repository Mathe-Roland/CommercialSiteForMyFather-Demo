"use client";
import Produs from "../../components/produse-individuale/ProdusIndividual";
import { useParams } from 'next/navigation';
import React from 'react';
import {fetchId} from "../../components/asyncOperations/fetchData";
import { useEffect,useState } from "react";
import "./Produse.css";

  const Produse = () => {

      const {title}=useParams();
      const [cardList, setCardList] = useState({});

      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchId(title);

            setCardList(data);
          } catch (error) {
          }
        };
    
        fetchData();
      }, [title]);
    
    
      if(!cardList){

        return (<div className="loading-container"></div>)

      }

      return (
        <div suppressHydrationWarning>
          <Produs
            img={cardList[0]?.attributes?.image?.data?.attributes?.url}
            title={cardList[0]?.attributes?.title}
            description={cardList[0]?.attributes?.description}
            price={cardList[0]?.attributes?.price}
          />
        </div>
      );
    };
        
  
  export default Produse;