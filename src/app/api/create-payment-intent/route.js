import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, metadata } = await request.json();

    // Convert amount to cents
    const amountInCents = Math.round(amount * 100);


    const lineItems = metadata.data.map((item) => {
      return {
          currency: "ron",
          name: item.attributes.title,
          unit_amount: item.attributes.price,
          quantity: item.attributes.quantity,
      };
    });


    // Create a payment intent with metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "ron",
      automatic_payment_methods: { enabled: true },
      metadata: {
      products: JSON.stringify(lineItems),
  },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
