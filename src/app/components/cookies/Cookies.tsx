"use client";

import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./Cookies.css";
import Cookies from "js-cookie";

const ShowCookiesModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cookieExists = Cookies.get("showModal");
    if (!cookieExists) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    Cookies.set("showModal", "newCookies", {
      secure: true,
      sameSite: "Strict",
      expires: 7,
      path: "/",
    });
    setOpen(false);
  };


  return (
    <div className="Cookie-position">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <Box
          className="fixed-footer"
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
          >
            Politica de Cookie-uri
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body1"
            component="div"
          >
            La decorcut.com, utilizăm cookie-uri pentru a asigura funcționarea
            optimă a site-ului, pentru a îmbunătăți experiența utilizatorilor și
            pentru a oferi conținut și reclame personalizate. Această politică
            de cookie-uri explică ce sunt cookie-urile, ce tipuri de cookie-uri
            folosim, și cum poți gestiona preferințele tale legate de
            cookie-uri.
          </Typography>
          <div className="buttons">
            <Button
              variant="contained"
              color="primary"
              className="essential-cookies-btn"
              onClick={handleClose}
            >
              Folosesc doar cookie-uri esențiale
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="essential-cookies-btn"
              onClick={handleClose}
            >
              Am înțeles
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ShowCookiesModal;
