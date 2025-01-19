"use client";

import CosCard from "../components/cos/CosCard";
import "./Cos.css";
import { useState, useEffect } from "react";
import { postareComenziNonRegisteredUser , nonRegisteredUserData, userData, postareComenzi, completeUserData, deleteProductData, updateProductQuantity,deleteNonRegisteredUserProduct } from "../components/asyncOperations/fetchData";
import Button from '@mui/material/Button';
import Cookies from "js-cookie";
import { loadStripe } from '@stripe/stripe-js';
import CosModal from "./Modal";

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
    err: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userExistsOrNot = Cookies.get("user") || 0;
        let data = { data: [] };
        
        if (userExistsOrNot !== 0) {
          data = await userData();
        } else {
          const actualUUID = Cookies.get("userUUID");
          const totalNonRegisteredData = await nonRegisteredUserData();
          const filteredCards = totalNonRegisteredData.data.filter(
            (e) => e.attributes.UniqueIdentifier === actualUUID
          );
          data = { data: filteredCards };
        }
  
        const updatedData = data.data.map((item) => {
          const counting = item.attributes.quantity || 0;
          const optiuni = item.attributes.optiuniNormale.length > 0
            ? item.attributes.optiuniNormale
            : "original";
          return {
            ...item,
            counting,
            optiuni,
          };
        });
  
        setCardList({ data: updatedData });
  
        let totalSum = 0;
        updatedData.forEach((element) => {
          const price = element.attributes.price || 0;
          const counting = element.counting || 0;
          totalSum += price * counting;
        });
  
        setGrandTotal(totalSum);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (cardList && cardList.data) {
      let totalSum = 0;
      cardList.data.forEach((element) => {
        const price = element.attributes.price || 0;
        const counting = element.counting || element.attributes.quantity || 0;
        totalSum += price * counting;
      });

      setGrandTotal(totalSum);
    }

    console.log(cardList.data);

    if (cardList.data.length === 0) {
      localStorage.removeItem("isInCart");

      window.dispatchEvent(
        new CustomEvent("localStorageUpdate", { detail: { key: "isInCart" } })
      );
    } else {
      localStorage.setItem("isInCart", "true");

      window.dispatchEvent(
        new CustomEvent("localStorageUpdate", { detail: { key: "isInCart" } })
      );
    }
  }, [cardList]);


  const handleComanda = async () => {
    const username = Cookies.get("user") || 0;
    const userId = Cookies.get("userId");

    if (payment === "cash") {
      
        setOpenModal(true);
      

    } else if (payment === "card") {
      if (username) {
        
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
            console.error(e);
          });
      } else {


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
            console.error(e);
          });
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


const handleSubmitNonRegisteredUser= async ()=>{

      const userExist= Cookies.get("user") || 0;

      let description="";
  
      cardList?.data.forEach((element) => {

          description += `${element.attributes.title} at price ${element.attributes.price} RON number of items ${element.counting} at size ${element.optiuni} \n`;
      });
  
      const dataForNonRegisteredUser={
        name:formData.name,
        city:formData.city,
        surname:formData.surname,
        address:formData.address,
        email:formData.email,
        postalCode:parseInt(formData.postalCode),
        country:formData.country,
        total:grandTotal,
        description: description,
        payment:payment,
      }

      if(userExist){

        await postareComenzi(dataForNonRegisteredUser);
        window.location.href="/payment-success";

      }else{

  
      await postareComenziNonRegisteredUser(dataForNonRegisteredUser);
  
      window.location.href="/payment-success";

      }
  }


  

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
          {cardList.data.length === 0 ? (
            null
          ) : (
            cardList.data.map((element) => (
              <div className="cos-element" key={element.id}>
                <CosCard
                  id={element.id}
                  title={element.attributes?.title}
                  image={Cookies.get("user") ? element.attributes?.image?.data?.attributes?.url :element.attributes?.image?.data[0]?.attributes?.url}
                  price={element.attributes?.price}
                  quantityFromDatabase={element.attributes?.quantity}
                  addToCart={addToCart}
                />
              </div>
            ))
          )}
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
        handleSubmitNonRegisteredUser={handleSubmitNonRegisteredUser}
        formData={formData}
        />
     
      ):null}
    </div>
  );
}

export default Cos;