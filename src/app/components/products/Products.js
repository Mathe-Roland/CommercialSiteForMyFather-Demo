"use client";

import React, { useState, useEffect, Suspense, lazy } from 'react';
import "./Product.css";
import { fetchPanouriData, promotii } from '../asyncOperations/fetchData';

// Lazy load the ProdusCard component
const ProdusCard = lazy(() => import('../card-produse/ProdusCard'));

const Products = () => {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promotileMele, setPromotileMele] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPanouriData();
        const dateleMele = await promotii();

        setPromotileMele(dateleMele.data);
        setCardList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='loader-container'>
        {/* Optionally, you could add a loader or spinner here */}
        Loading...
      </div>
    );
  }

  return (
    <div className='normal-headers' suppressHydrationWarning>
      <div className='margin0Auto'>
        <Suspense fallback={<div>Loading Products...</div>}>
          {cardList.length > 0 ? cardList.map((data, index) => (
            <ProdusCard
              key={data.id}
              image={data.attributes?.image?.data?.attributes?.url}
              title={data.attributes?.title}
              disponibil={"Produs Disponibil"}
              description={data.attributes?.description}
              price={data.attributes?.price}
              index={index}
            />
          )) : null}
        </Suspense>
      </div>
      <div className='products-container'>
        <p>Promotii actuale</p>
        <hr className='black' />
        <div className='margin0Auto'>
          <Suspense fallback={<div>Loading Promotions...</div>}>
            {
              promotileMele.length > 0
                ? promotileMele.map(e => (
                  <ProdusCard
                    key={e.id}
                    image={e.attributes?.promotionImage?.data?.attributes?.url}
                    title={e.attributes?.title}
                    description={e.attributes?.description}
                    price={e.attributes?.promotionPrice}
                  />
                ))
                : null
            }
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Products;
