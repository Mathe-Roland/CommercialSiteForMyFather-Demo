"use client";

import Checkout from "../components/checkout/Checkout";
import { Elements, AddressElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { userData } from "../components/asyncOperations/fetchData";
import Cookies from 'js-cookie';
import "./Stripe.css";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const [userSpecificPanori, setUserSpecificPanori] = useState({});
  const [total, setTotal] = useState(0);
  const [metadata,setMetadata]=useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const panouri = await userData();
        setUserSpecificPanori(panouri);

        // Calculate total amount from the fetched data
        if (panouri.data && Array.isArray(panouri.data)) {
          let calculatedTotal = 0;
          panouri.data.forEach((item) => {
            if (item.attributes) {
              calculatedTotal += item.attributes.price * (item.attributes.quantity || 1);
            }
          });
          setTotal(calculatedTotal);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(userSpecificPanori.data)) {
    return <div className="loading-screen">
    </div>; 
  }

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">{Cookies.get("user")}</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> {total} RON</span>
        </h2>
      </div>
      <div className="products-container">
      {metadata.length>0 || metadata? metadata.data?.map((e)=>{

        return (<div className="product-rows">
          <p className="product-row">
            Product name {e.attributes.title} ,quantity {e.attributes.quantity},unit amount {e.attributes.price}

            </p>
        </div>)
      }):null}
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: total=== 0 ? 1 :total * 100,
          currency: "ron",
        }}
      >
        <AddressElement
          className="mb-5"
          options={{ mode: "billing" }}
        />
        <Checkout amount={total===0 ? 1 : total} user={setMetadata}/>
      </Elements>
    </main>
  );
}
