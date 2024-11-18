"use client";

import React, { useState, useEffect } from 'react';
import "./Product.css";
import ProdusCard from '../card-produse/ProdusCard';
import {fetchPanouriData ,promotii} from '../asyncOperations/fetchData';


const Products = () => {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promotileMele,setPromotileMele]=useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPanouriData();
        const dateleMele= await promotii();


        setPromotileMele(dateleMele.data);
        setCardList(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, []);

  if (loading) {
    return (
      <div className='loader-container'>
      </div>
    );
  }


  return (
    <div className='normal-headers' suppressHydrationWarning>
      <div className='margin0Auto'>
        {cardList.length > 0 ? cardList.map((data) => (
          <ProdusCard
            key={data.id}
            image={data?.attributes?.image?.data?.[0]?.attributes?.url}
            title={data.attributes?.title}
            disponibil={"Produs Disponibil"}
            description={data.attributes?.description}
            price={data.attributes?.price}
          />
        )) : null}
      </div>
      <div className='products-container'>
              
      <p>Promotii  actuale</p>

        <hr className='black'></hr>
        <div className='margin0Auto'>

        {
        promotileMele.length>0
        ? promotileMele.map(e=>
        (  <ProdusCard
           key={e.id}
           image={e.attributes?.promotionImage?.data?.attributes?.url}
           title={e.attributes?.title}
           description={e.attributes?.description}
           price={e.attributes?.promotionPrice}
           disponibil='disponibil'
         />)
          
        )
        :
        null
      }

        </div>

      </div>

 </div>
  );
};

export default Products;