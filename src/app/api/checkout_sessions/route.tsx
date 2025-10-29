import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const response = await request.json();
  const host = request.headers.get("host");

  const { cart, transportCost } = response;

  const line_items = cart.data.map((e) => ({
    price_data: {
      currency: "ron",
      product_data: {
        name: e.title,
        description: `Marimi: ${e.selectedValues} - Vopsit: ${e.vopsit}`,
      },
      unit_amount: e.price * 100,
    },
    quantity: e.quantity,
  }));

  if (transportCost > 0) {
    line_items.push({
      price_data: {
        currency: "ron",
        product_data: {
          name: "Transport",
          description: "Cost de livrare standard",
        },
        unit_amount: transportCost * 100,
      },
      quantity: 1,
    });
  }else{
    line_items.push({
      price_data: {
        currency: "ron",
        product_data: {
          name: "Transport",
          description: "Transport Gratuit",
        },
        unit_amount: 0,
      },
      quantity: 1,
    });

  }

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `https://${host}/payment-success`,
    cancel_url: `https://${host}/cos`,
    billing_address_collection: "required",
  });

  return NextResponse.json({ url: checkoutSession.url });
}
