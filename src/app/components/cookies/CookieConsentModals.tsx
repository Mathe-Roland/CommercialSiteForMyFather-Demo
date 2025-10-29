"use client";

import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import Cookies from "js-cookie";
import "./CookiesConsentModal.css";

const CookiesConsentModal = () => {
  const [open, setOpen] = useState(false);

 useEffect(() => {
  const cookieExists = Cookies.get("showModal");
  console.log("Cookie showModal exists:", cookieExists);
  if (!cookieExists) {
    setOpen(true);
    Cookies.set("showModal", "true", {
      secure: true,
      sameSite: "Strict",
      expires: 365,
      path: "/",
    });
  }
}, []);

  const handleAcceptCookies = (cookieType) => {

    Cookies.set("consent", `${cookieType}`, {
      secure: true,
      sameSite: "Strict",
      expires: 7,
      path: "/",
    });
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={()=>{}} aria-labelledby="cookie-modal-title">
      <Box className="cookie-modal">
        <Typography id="cookie-modal-title" variant="h6" component="h2">
          Politica de Cookie-uri
        </Typography>
        <Typography id="cookie-modal-description" variant="body2">
          La decorcut.com, utilizăm cookie-uri pentru a asigura funcționarea optimă a site-ului, 
          pentru a îmbunătăți experiența utilizatorilor și pentru a oferi conținut și reclame personalizate. 
          Această politică de cookie-uri explică ce sunt cookie-urile, ce tipuri de cookie-uri folosim 
          și cum poți gestiona preferințele tale legate de cookie-uri.
        </Typography>
        <div className="cookie-buttons">
          <Button
            className="cookie-btn essential"
            onClick={()=>{
              
              handleAcceptCookies("essential");
            }
          }
          >
            Folosesc doar cookie-uri esențiale
          </Button>
          <Button
            className="cookie-btn accept"
            onClick={()=>{
              
              handleAcceptCookies("all");
            }
          }
          >
            Am înțeles
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CookiesConsentModal;
