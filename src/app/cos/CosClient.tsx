"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/cart";
import type { RootState } from "../../redux/store";
import CosUI from "./CosUI";

import { useCartTotals } from "./hooks/useCartTotals";
import { useOrderForm } from "./hooks/useOrderForm";
import { submitOrder } from "./services/orderService";
import { startCheckout } from "./services/checkoutService";


const CosClient= () => {
  
   const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const { grandTotal, transportMessage } = useCartTotals(cartItems);
  const {
    openModal,
    setOpenModal,
    formData,
    handleChange,
    handleSubmit,
  } = useOrderForm();

  const [payment, setPayment] = useState<"card" | "cash" | "">("");


  const handleComanda = async () => {
  if (payment === "cash") {
    setOpenModal(true);
    return;
  }

  await startCheckout(cartItems.items, cartItems.transportCost);
};

const handleSubmitFormComanda = async () => {
  await submitOrder({
    formData,
    cartItems: cartItems.items,
    grandTotal,
    payment,
  });

  dispatch(clearCart());
  window.location.href = "/payment-success";
};


    


  return (
    <CosUI
      cardList={cartItems.items}
      openModal={openModal}
      formData={formData}
      grandTotal={grandTotal}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSubmitFormComanda={handleSubmitFormComanda}
      handleClose={() => setOpenModal(false)}
      transportMessage={transportMessage}
      handleComanda={handleComanda}
      plataCuCard={() => setPayment("card")}
      plataLaCurier={() => setPayment("cash")}
      
    />
  );
}

export default CosClient;