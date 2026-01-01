import { useEffect, useState } from "react";

export function useCartTotals(cartItems) {
  const [grandTotal, setGrandTotal] = useState(0);
  const [transportMessage, setTransportMessage] = useState("");

  useEffect(() => {
    if (!cartItems) return;

    if (cartItems.totalPrice >= 1000) {
      setGrandTotal(cartItems.totalPrice);
      setTransportMessage("Transport Gratuit");
    } else {
      setGrandTotal(cartItems.totalPrice + cartItems.transportCost);
      setTransportMessage("Transport 35 lei");
    }
  }, [cartItems]);

  return { grandTotal, transportMessage };
}
