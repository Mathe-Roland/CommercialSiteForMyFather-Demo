"use client";

import React, { useState, useEffect } from 'react';
import "./Product.css";
import ProdusCard from '../card-produse/ProdusCard';
import { fetchPanouriData } from '../asyncOperations/fetchData';


const Products = () => {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPanouriData();
        setCardList(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, []); 

  if (loading) {
    return (
      <div className='loader-container'>
         <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            </div>
      </div>
    );
  }

  return (
    <div className='normal-headers' suppressHydrationWarning>
      <div className='margin0Auto'>
        {cardList.length > 0 ? cardList.map((data, index) => (
          <ProdusCard
            key={index}
            image={data.attributes?.image?.data?.attributes?.url}
            title={data.attributes?.title}
            disponibil={"Produs Disponibil"}
            description={data.attributes?.description}
            price={data.attributes?.price}
            index={index}
          />
        )) : null}
      </div>
    </div>
  );
};

export default Products;
