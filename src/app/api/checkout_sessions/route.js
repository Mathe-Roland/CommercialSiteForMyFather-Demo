import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const response = await request.json();
  const line_items = response.cart.data.map((e) => ({
    price_data: {
      currency: "ron",
      product_data: { name: e.attributes.title },
      unit_amount: e.attributes.price * 100,
    },
    quantity: e.attributes.quantity,
  }));

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `https://www.decorcut.com/payment-success`,
    cancel_url: `https://www.decorcut.com/`,
    billing_address_collection: 'required',
  });

  return new NextResponse(JSON.stringify({ url: checkoutSession.url }), {
    headers: {
      'Cache-Control': 's-maxage=3600',
    },
  });
}
