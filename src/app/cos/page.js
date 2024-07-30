"use client";

import CosCard from "../components/cos/CosCard";
import "./Cos.css";
import { useState, useEffect } from "react";
import { userData, postareComenzi, completeUserData, deleteProductData, updateProductQuantity } from "../components/asyncOperations/fetchData";
import Button from '@mui/material/Button';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  );
  

const Cos = () => {
    const [cardList, setCardList] = useState({ data: [] });
    const [grandTotal, setGrandTotal] = useState(0);
    const [payment, setPayment] = useState("");

    const router=useRouter();


    const handleComanda = async () => {
        const username = Cookies.get("user");
        const userId = Cookies.get("userId");

        if (payment === "cash") {
            const data = await completeUserData();
            const user = await userData();

            let description = "";

            user?.data?.forEach((element) => {
                const item = cardList?.data?.find(filteredCardlist => element.attributes.title === filteredCardlist.attributes.title);
                if (item) {
                    description += `${element.attributes.title} at price ${element.attributes.price} number of items ${item.counting} at size ${element.attributes.optiuniNormale}\n`;
                }
            });

            const comandaData = {
                name: data.name,
                postalcode: data.postalcode,
                country: data.country,
                city: data.city,
                surname: data.surname,
                customerName: userId,
                email: data.email,
                total: grandTotal,
                payment: payment,
                description: description,
            };

            if (grandTotal !== 0) {
                await postareComenzi(comandaData);

                await Promise.all(user.data.map(async (element) => {
                    await deleteProductData(element.id);
                }));

                alert("Comanda a fost trimisă cu succes!");
                setCardList({ data: [] });
                setGrandTotal(0);
            }
        } else if (payment === "card") {
            if (username) {
                if (username) {
                    const user = await userData();
                    const data = await completeUserData();
    
                    const updatedItems = user?.data?.map(item => ({
                        ...item,
                        attributes: {
                            ...item.attributes,
                            quantity: cardList?.data?.find(cardItem => cardItem.id === item.id)?.counting || item.attributes.quantity
                        }
                    }));
    
                    await Promise.all(updatedItems.map(async (element) => {
                        await updateProductQuantity(element.id, element.attributes.quantity);
                    }));
                    

                    fetch("/api/checkout_sessions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            cart: cardList,
                        }),
                    })
                        .then(res => {
                            if (res.ok) return res.json();
                            return res.json().then(json => Promise.reject(json));
                        })
                        .then(({ url }) => {
                            window.location.href = url;
                        })
                        .catch(e => {
                            console.error(e.error);
                        });
                } else {
                    console.error("Username not found in local storage");
                }
            }
        };
    };

    const addToCart = (product) => {
        setCardList(prevCardList => {
            const updatedData = prevCardList.data.map(item => {
                if (item.id === product.id) {
                    item.counting = product.count;
                }
                return item;
            });

            return { ...prevCardList, data: updatedData };
        });
    };

    const plataCuCard = () => {
        setPayment("card");
    }

    const plataLaCurier = () => {
        setPayment("cash");
    }

    useEffect(() => {
        
        const fetchCardListData = async () => {
            try {
                const data = await userData();
                if (data && data.data) {
                    setCardList(data);

                    const updatedData = data.data.map(item => {
                        const matchedItem = cardList.data.find(databaseItem => databaseItem.attributes.title === item.attributes.title);
                        if (matchedItem) {
                            item.counting = matchedItem.attributes.quantity || 0;
                        }
                        return item;
                    });
                    setCardList({ data: updatedData });

                    let totalSum = 0;
                    updatedData.forEach((element) => {
                        const price = element.attributes.price || 0;
                        const counting = element.counting || 0;
                        totalSum += price * counting;
                    });

                    setGrandTotal(totalSum);
                } else {
                    setCardList({ data: [] });
                }
            } catch (error) {
                console.error('Error fetching card list data:', error);
            }
        };
        fetchCardListData();
    }, []);

    useEffect(() => {
    console.log(cardList)
        if (cardList && cardList.data) {
            let totalSum = 0;
            cardList.data?.forEach((element) => {
                const price = element.attributes.price || 0;
                const counting = element.counting || element.attributes.quantity || 0;
                totalSum += price * counting;
            });

            setGrandTotal(totalSum);
        }
    }, [cardList]);

    return (
        <div className="cos-container">
                <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>

            <h2 className="cos-header">Cos de cumparaturi</h2>
            <div className="cos-separare">
                <div className="cos-produse-cumparate">
                    <div className="cos-items">
                        <div className="cos-produs">Produs</div>
                        <div className="cos-cantitate">Cantitate</div>
                        <div className="cos-pret">Pret</div>
                    </div>
                    {cardList.data.length === 0 ? (
                        null
                    ) : (
                        cardList.data.map((element) => (
                            <div className="cos-element" key={element.id}>
                                <CosCard
                                    id={element.id}
                                    title={element.attributes.title}
                                    image={element.attributes.image.data.attributes.url}
                                    price={element.attributes.price}
                                    quantityFromDatabase={element.attributes.quantity}
                                    addToCart={addToCart}
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className="cos-trimite-comanda">
                    <div className="cos-trimite-comanda-background">
                        <div className="form-check">
                            <input onClick={plataCuCard}
                                className="form-check-input" type="radio" name="optiune" id="optiune1" value="optiune1" />
                            <label className="form-check-label" htmlFor="optiune1">
                                Plata cu card
                            </label>
                            <input onClick={plataLaCurier}
                                className="form-check-input" type="radio" name="optiune" id="optiune2" value="optiune2" />
                            <label className="form-check-label" htmlFor="optiune2">
                                Ramburs la curier
                            </label>
                        </div>
                        <p className="cos-comanda">Total comanda: {grandTotal}</p>
                        <Button
                            onClick={handleComanda}
                            variant="contained"
                            sx={{
                                backgroundColor: "black",
                                marginTop: "auto",
                                marginBottom: "100px",
                                "&:hover": {
                                    backgroundColor: "red"
                                }
                            }}
                        >
                            Trimite comanda
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cos;

