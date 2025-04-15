import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    const response = await request.json();
    const host = request.headers.get('host');

    const line_items = response.cart.data.map((e) => {
        const line_itemsObject = {
            price_data: {
                currency: "ron",
                product_data: {
                    name: e.title,
                    description:`Marimi:${e.selectedValues}-Vopsit:${e.vopsit}`,
                },
                unit_amount: e?.price * 100,
            },
            quantity: e?.quantity,
        };

        return line_itemsObject;
    });

    const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: `https://${host}/payment-success`,
        cancel_url: `https://${host}/cos`,
        billing_address_collection: 'required',
    });

    

    return NextResponse.json({ url: checkoutSession.url });
}
