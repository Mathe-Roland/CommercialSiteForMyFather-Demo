export async function startCheckout(cartItems, transportCost) {
  const res = await fetch("/api/checkout_sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart: cartItems, transportCost }),
  });

  if (!res.ok) {
    throw new Error("Checkout session failed");
  }

  const { url } = await res.json();
  window.location.href = url;
}
