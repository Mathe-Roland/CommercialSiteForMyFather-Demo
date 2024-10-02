"use client";

import CosCard from "../components/cos/CosCard";
import "./Cos.css";
import { useState, useEffect } from "react";
import { postareComenziNonRegisteredUser , updateProductQuantityForNonRegisteredUser, nonRegisteredUserData, userData, postareComenzi, completeUserData, deleteProductData, updateProductQuantity } from "../components/asyncOperations/fetchData";
import Button from '@mui/material/Button';
import Cookies from "js-cookie";
import { loadStripe } from '@stripe/stripe-js';
import { Modal, Box, Typography, TextField, Grid } from "@mui/material";

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
    const userExistsOrNot = Cookies.get("user") || 0;
    if (userExistsOrNot !== 0) {
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
          console.error(error);
        }
      };
      fetchCardListData();
    } else {
      const actualUUID = localStorage.getItem("userUUID");
      const nonRegisteredUserDataFetch = async () => {
        const totalNonRegisteredData = await nonRegisteredUserData();
        const filteredCards = totalNonRegisteredData.data.filter((e) => e.attributes.UniqueIdentifier === actualUUID);
        if (filteredCards.length > 0) {
          setCardList({ data: filteredCards });

          const updatedData = filteredCards.map(item => {
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

      }
      nonRegisteredUserDataFetch();

    }
  }, []);

  useEffect(() => {
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

  const handleComanda = async () => {
    const username = Cookies.get("user") || 0;
    const userId = Cookies.get("userId");

    if (payment === "cash") {
      if (username !== 0) {
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

          setCardList({ data: [] });
          setGrandTotal(0);

          const panouForSpecificUser = await nonRegisteredUserData();

          const UUIDS = localStorage.getItem("userUUID");

          const panouForNonRegisteredUser = panouForSpecificUser.data.filter((e) => e.attributes.UniqueIdentifier === UUIDS);

          await Promise.all(panouForNonRegisteredUser.map(async (element) => {
            await deleteNonRegisteredUserProduct(element.id);
          }));

          window.location.href = "/payment-success";

        }
      } else {
        setOpenModal(true);
      }

    } else if (payment === "card") {
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
            console.error(e);
          });
      } else {

        const panouForSpecificUser = await nonRegisteredUserData();

        const UUIDS = localStorage.getItem("userUUID");

        const panouForNonRegisteredUser = panouForSpecificUser.data.filter((e) => e.attributes.UniqueIdentifier === UUIDS);

        const updatedItems = panouForNonRegisteredUser?.map(item => ({
          ...item,
          attributes: {
            ...item.attributes,
            quantity: cardList?.data?.find(cardItem => cardItem.id === item.id)?.counting || item.attributes.quantity
          }
        }));

        await Promise.all(updatedItems.map(async (element) => {
          await updateProductQuantityForNonRegisteredUser(element.id, element.attributes.quantity);
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
    console.log("Form submitted:", formData);
    handleClose();
  };

const handleSubmitNonRegisteredUser= async ()=>{

  //  user?.data?.forEach((element) => {
  //     const item = cardList?.data?.find(filteredCardlist => element.attributes.title === filteredCardlist.attributes.title);
  //     if (item) {
  //       description += `${element.attributes.title} at price ${element.attributes.price} number of items ${item.counting} at size ${element.attributes.optiuniNormale}\n`;
  //     }
  //   });


    const dataForNonRegisteredUser={
      name:formData.name,
      city:formData.city,
      surname:formData.surname,
      email:formData.email,
      postalcode:formData.postalcode,
      country:formData.country,
      total:grandTotal,
      description: formData.description,
      payment:payment,
    }

    await postareComenziNonRegisteredUser(dataForNonRegisteredUser);

    window.location.href="/payment-success"
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
                  image={element.attributes?.image?.data[0]?.attributes?.url}
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
      {openModal ? (
        
      <Modal
        className='modal-z-index'
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Înregistrare comanda
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nume"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prenume"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tara"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cod postal"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Oras"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Adresa"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmitNonRegisteredUser}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "black", "&:hover": { backgroundColor: "red" } }}
                >
                  Trimite comanda
                </Button>
              </Grid>
            </Grid>
          </form>
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Închide
          </Button>
        </Box>
      </Modal>
      ):null}
    </div>
  );
}

export default Cos;