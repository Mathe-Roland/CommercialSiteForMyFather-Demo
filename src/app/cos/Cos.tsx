"use client";

import CosCard from "../components/cos/CosCard";
import "./Cos.css";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Cookies from "js-cookie";
import { loadStripe } from '@stripe/stripe-js';
import CosModal from "./Modal";
import { RootState } from "../../redux/store";
import { clearCart } from "../../redux/cart";
import { useSelector,useDispatch } from "react-redux";
import { postareComenziNonRegisteredUser,postareComenzi } from "../components/asyncOperations/postare-comenzi/comenzi";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Cos = () => {
  const [cardList, setCardList] = useState({ data: [] });
  const [grandTotal, setGrandTotal] = useState(0);
  const [payment, setPayment] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    surname: '',
    country: '',
    postalCode: '',
    city: '',
    address: '',
    phoneNumber: '',
    err: '',
  });

  const [TransportMessage,setTransportMessage]=useState("");

  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch=useDispatch();


  useEffect(() => {

    if(cartItems){
      setCardList({data:cartItems.items});
      if(cartItems.totalPrice>=1000){
        setGrandTotal(cartItems.totalPrice);
        setTransportMessage("Transport Gratuit");
      }else{
        let total = cartItems.totalPrice + cartItems.transportCost;
        setGrandTotal(total);
        setTransportMessage("Transport 35 lei");

      }
    }

    }, [cartItems]);
    


  const plataCuCard = () => {
    setPayment("card");
  }

  const plataLaCurier = () => {
    setPayment("cash");
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };



  const handleSubmitFormComanda= async ()=>{

    const userExist= Cookies.get("user") || 0;

    let description="";

    cardList?.data.forEach((element) => {

        description += `${element.title} at price ${element.price} RON number of items ${element.quantity} at size ${element.selectedValues} \n`;
    });

    const dataForNonRegisteredUser={
      name:formData.name,
      city:formData.city,
      surname:formData.surname,
      address:formData.address,
      email:formData.email,
      postalCode:formData.postalCode,
      country:formData.country,
      phoneNumber:formData.phoneNumber,
      total:grandTotal,
      description: description,
      payment:payment,
      date:new Date()


    }

      
        fetch('/api/send-mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject: 'New Order!',
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert('Email trimis cu succes!');
            } else {
              alert('Eroare: ' + data.error);
            }
          });
        

    if(userExist){

      await postareComenzi(dataForNonRegisteredUser);
      await dispatch(clearCart());
      setTimeout(() => {
        window.location.href = "/payment-success";
      }, 200);

    }else{

    await postareComenziNonRegisteredUser(dataForNonRegisteredUser);
    await dispatch(clearCart());

    setTimeout(() => {

      window.location.href = "/payment-success";

    }, 200);

    }
}


const handleComanda = async () => {
  if (payment === "cash") {
      setOpenModal(true);
      return;
  }

  try {
      const res = await fetch("/api/checkout_sessions", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: cardList,
            transportCost: cartItems.transportCost
           }),
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Something went wrong with the checkout session.");
      }

      const { url } = await res.json();


     

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Something went wrong with the checkout session.");
        }

        setTimeout(() => {
            window.location.href = url;
        }, 100);
        

  } catch (error) {
      console.error("Checkout error:", error);
  }
};



  return (
    <div className="cos-container">
      <h2 className="cos-header">Cos de cumparaturi</h2>
      <div className="cos-separare">
        <div className="cos-produse-cumparate">
          <div className="cos-items">
            <div className="cos-produs">Produs</div>
            <div className="cos-cantitate">Cantitate</div>
            <div className="cos-pret">Pret</div>
          </div>
          {cardList.data.map((element) => {
            return (
              <CosCard
                key={element.id}
                id={element.id}
                title={element?.title}
                image={element?.image}
                price={element?.price}
                quantity={element?.quantity}
              />
            );
          })}

        </div>
        <div className="cos-trimite-comanda ">
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
            <p className="cos-comanda">{TransportMessage}</p>
            <p className="cos-comanda">Total comanda: {grandTotal}</p>
            <Button
              onClick={handleComanda}
              variant="contained"
              className="custom-button"
            >
              Trimite comanda
            </Button>
          </div>
        </div>
      </div>
      {openModal ? (
        <CosModal
        openModal={openModal}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleSubmitFormComanda={handleSubmitFormComanda}
        formData={formData}
        />
     
      ):null}
    </div>
  );
}




export default Cos;