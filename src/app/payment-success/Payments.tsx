"use client";

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { userData,deleteProductData } from '../components/asyncOperations/fetch-by-id/fetchBYId';
import "./Payments.css";

const deleteCosDatas = async () => {
  try {
    const registeredUserData = await userData();
    
    if (registeredUserData.length > 0) {
      await Promise.all(
        registeredUserData.map(async (element) => {
          await deleteProductData(element.id);
        })
      );
    }
    
  } catch (error) {
    console.error('Error during data for deletion:', error);
  }
};


const PaymentSuccess = () => {
  useEffect(() => {
    const fetchData = async () => {
      await deleteCosDatas();
    };

    

    fetchData();
  }, []);

  return (
    <main className="main-container">
      <div className="heading-container">
        <h1>Thank you!</h1>
        <h2>You successfully sent the order or payment.</h2>
      </div>
    </main>
  );
};

export default PaymentSuccess;
