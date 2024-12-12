"use client";
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { userData,nonRegisteredUserData, deleteNonRegisteredUserProduct } from '../components/asyncOperations/fetchData';

const deleteCosDatas = async () => {
  try {
    const panouForSpecificUser = await nonRegisteredUserData();

    const registeredUserData=await userData();

    const UUIDS = Cookies.get("userUUID");

    const panouForNonRegisteredUser = panouForSpecificUser.data.filter(
      (e) => e.attributes.UniqueIdentifier === UUIDS
    );

    panouForNonRegisteredUser.length>0 ? 
    await Promise.all(
      panouForNonRegisteredUser.map(async (element) => {
        await deleteNonRegisteredUserProduct(element.id);
      })
    )
    :
    null;


    registeredUserData.length>0 ?
    
    await Promise.all(
      registeredUserData.map(async (element) => {
        await deleteNonRegisteredUserProduct(element.id);
      })
    )
    :
    null;


  } catch (error) {
    console.error('Error during data fetching or deletion:', error);
  }
};

const PaymentSuccess = () => {
  useEffect(() => {
    const fetchData = async () => {
      await deleteCosDatas();
    };

    Cookies.remove("isInCart");

    fetchData(); 
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent the order or payment.</h2>
      </div>
    </main>
  );
};

export default PaymentSuccess;
