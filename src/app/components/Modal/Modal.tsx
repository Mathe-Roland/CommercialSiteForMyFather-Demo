"use client";

import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Link from "next/link";
import Cookies from "js-cookie";
import "./Modal.css";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  addItem,
  clearCart,
  setHasSyncedCart,
  setLoginLogOut,
} from "../../../redux/cart";


import dynamic from "next/dynamic";


interface GoogleLoginWrapperProps {
  onSuccess: () => void;
}

const GoogleLoginWrapper = dynamic<GoogleLoginWrapperProps>(
  () => import("../GoogleLoginWrapper"),
  {
    ssr: false,
    loading: () => null,
  }
);

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [formIsValid, setFormValidation] = useState({
    name: "",
    password: "",
  });

  const hasSyncedCart = useSelector(
    (state: RootState) => state.cart.hasSyncedCart
  );

  const isInCart = useSelector(
    (state: RootState) => state.cart.items.length > 0
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleLogIn = async () => {

    const { registerUser, userMe } = await import(
        "../asyncOperations/user-requests/requests"
        );

      const { userData } = await import(
        "../asyncOperations/fetch-by-id/fetchBYId"
      );

      const { syncCartToDB } = await import(
        "../functions"
      );

    const usernameEmptyText = "The username field is empty";
    const passwordEmptyText = "The password field is empty";

    dispatch(setLoginLogOut(false));

    if (name.length === 0 && password.length === 0) {
      setFormValidation({
        name: usernameEmptyText,
        password: passwordEmptyText,
      });
      return;
    }

    if (name.length === 0) {
      setFormValidation({
        ...formIsValid,
        name: usernameEmptyText,
      });
      return;
    }

    if (password.length === 0) {
      setFormValidation({
        ...formIsValid,
        password: passwordEmptyText,
      });
      return;
    }

    try {
      const response = await registerUser(name, password);

      Cookies.set("token", response.data.jwt, {
        secure: true,
        sameSite: "Strict",
        expires: 1,
        path: "/",
      });

      Cookies.set("user", name, {
        secure: true,
        sameSite: "Strict",
        expires: 1,
        path: "/",
      });

      const userId = await userMe();

      Cookies.set("userId", userId, {
        secure: true,
        sameSite: "Strict",
        expires: 1,
        path: "/",
      });

      dispatch(setLoginLogOut(true));

      const token = Cookies.get("token");

      if (isInCart && !hasSyncedCart) {
        await syncCartToDB(
          cartItems.map((item) => ({
            productID: item.productID,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            optiuniNormale: item.selectedValues,
            image: item.imageId,
            vopsit: item.vopsit || false,
          })),
          token
        );
      }

      dispatch(setHasSyncedCart(true));

      const registeredUserCartData = await userData();

      if (registeredUserCartData?.data?.length > 0) {
        const storeData = registeredUserCartData.data.map((e) => ({
          id: btoa(
            `${e.attributes.productID}-${e.attributes.optiuniNormale}`
          ),
          productID: e.attributes.productID,
          title: e.attributes.title,
          price: e.attributes.price,
          selectedValues: e.attributes.optiuniNormale,
          quantity: e.attributes.quantity,
          image: e.attributes.image?.data?.attributes?.url,
          imageId: e.attributes.image?.data?.id || null,
          vopsit: e.attributes.vopsit || false,
        }));

        dispatch(clearCart());

        storeData.forEach((item) => dispatch(addItem(item)));
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value === "") {
      setFormValidation({
        ...formIsValid,
        password: "The password field is empty",
      });
    } else {
      setFormValidation({
        ...formIsValid,
        password: "",
      });
    }
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    if (e.target.value === "") {
      setFormValidation({
        ...formIsValid,
        name: "The username field is empty",
      });
    } else {
      setFormValidation({
        ...formIsValid,
        name: "",
      });
    }
  };

  return (
    <Modal
      className="modal-z-index"
      open={true}
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <Box className="modal-box">
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          className="modal-title"
        >
          Conectarea
        </Typography>

        <div className="modal-textfields-container">
          <TextField
            label="name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={nameChange}
          />

          <TextField
            label="password"
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={passwordChange}
          />

          <div>
            <Button
              className="modal-button"
              onClick={handleLogIn}
            >
              Conectare
            </Button>

            <Link
              className="modal-link"
              href="/Sign-In"
            >
              <Button
                className="modal-button"
                onClick={onClose}
              >
                Înregistrare
              </Button>
            </Link>
          </div>

            <GoogleLoginWrapper onSuccess={onClose} />

          <Button onClick={onClose}>
            Close Modal
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginModal;