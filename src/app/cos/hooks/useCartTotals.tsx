


export function useCartTotals(cartItems) {
  if (!cartItems) {
    return {
      grandTotal: 0,
      transportMessage: "",
    };
  }

  if (cartItems.totalPrice >= 1000) {
    return {
      grandTotal: cartItems.totalPrice,
      transportMessage: "Transport Gratuit",
    };
  }

  return {
    grandTotal: cartItems.totalPrice + cartItems.transportCost,
    transportMessage: "Transport 35 lei",
  };
}