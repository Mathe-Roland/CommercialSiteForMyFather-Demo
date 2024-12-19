"use client";

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { userData, nonRegisteredUserData, deleteNonRegisteredUserProduct } from '../components/asyncOperations/fetchData';
import "./Payments.css";

const deleteCosDatas = async () => {
  try {
    const panouForSpecificUser = await nonRegisteredUserData();
    const registeredUserData = await userData();
    const UUIDS = Cookies.get("userUUID");

    const panouForNonRegisteredUser = panouForSpecificUser.data.filter(
      (e) => e.attributes.UniqueIdentifier === UUIDS
    );

    if (panouForNonRegisteredUser.length > 0) {
      await Promise.all(
        panouForNonRegisteredUser.map(async (element) => {
          await deleteNonRegisteredUserProduct(element.id);
        })
      );
    }

    if (registeredUserData.length > 0) {
      await Promise.all(
        registeredUserData.map(async (element) => {
          await deleteNonRegisteredUserProduct(element.id);
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

    localStorage.removeItem("isInCart");

    window.dispatchEvent(
      new CustomEvent("localStorageUpdate", { detail: { key: "isInCart" } })
    );

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
