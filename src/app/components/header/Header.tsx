'use client';

import "./Header.css";
import LoginModal from "../Modal/Modal";
import Link from "next/link";
import { useState, useEffect } from "react";
import UserInfo from "../userInfo/UserInfo";
import Cookies from 'js-cookie';
import Image from "next/image";
import { Provider } from "react-redux";
import { store, persistor } from "../../../redux/store";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useDispatch } from "react-redux";
import { userData } from "../asyncOperations/fetch-by-id/fetchBYId";
import { addItem, clearCart,setLoginLogOut,removeItem } from "../../../redux/cart";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart);
  const isInCart = cartItems.totalQuantity > 0;
  const dispatch = useDispatch();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setIsLoggedIn(true);
      dispatch(setLoginLogOut(false));
    }
  }, []);

  
  useEffect(() => {

    dispatch(setLoginLogOut(false));

    const populateCart = async () => {
      const registeredUser = await userData();

      if (registeredUser?.data?.length > 0) {
        const storeData = registeredUser.data.map((e) => ({
          id: e.id,
          title: e?.attributes?.title,
          price: e?.attributes?.price,
          selectedValues: e?.attributes?.optiunNormale,
          image: e?.attributes?.image?.data?.attributes?.url,
          quantity: e.attributes.quantity,
        }));

        
        cartItems.items.forEach((e) => {
          
          storeData.forEach((item)=>{
            if(e.title===item.title){
              dispatch(removeItem(e.id));
              
            }
          }
        ); 
        
      })
      
      
        storeData.forEach((e) => dispatch(addItem(e)));
        
      }

    };

    populateCart();

    if(cartItems.loginLogOut){
      dispatch(clearCart());
    }

  }, [Cookies.get("user")]);



  const handleShow = () => {
    setShow(!show);
  };

  const handleHamburger = () => {
    setShow(false);
  };

  const hamburger = "/menu.png";
  const monsrikLogo = "/logosDecorcut.png";

  return (
    <header>
      <div className="navbar-title-and-searchbar">
        <div className="row width80 j-c-b">
          <div className="logo-decorcut">
            <Image
              src={monsrikLogo ? monsrikLogo : "/cancel.webp"}
              width={70}
              height={70}
              alt={`${monsrikLogo}`}
            />
            <p className="logo-decorcut-text">decorcut.ro</p>
          </div>

          <div className="hamburger-centered">
            <div onMouseLeave={handleHamburger} className="hamburger-dropdown">
              <Image
                src={hamburger ? hamburger : null}
                onClick={handleShow}
                className="hamburger-menu"
                alt="hamburger-menu"
                width={28}
                height={31}
              />
              {show ? (
                <div className="navbar-dropdown">
                  {isLoggedIn ? (
                    <UserInfo setLogin={setIsLoggedIn} />
                  ) : (
                    <LoginModal setLogin={setIsLoggedIn} />
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="phoneviewHideDesktopContent">
            <div className="row j-c-c align-items-c">
              {isLoggedIn ? (
                <UserInfo setLogin={setIsLoggedIn} />
              ) : (
                <LoginModal setLogin={setIsLoggedIn} />
              )}
              <p className="header-destopview-phone">0770 803 858</p>
              <Link href={"/cos"} className="cos-de-cumparaturi">
                <Image
                  src={"/cos-de-cumparaturi.png"}
                  alt="cos de cumparaturi"
                  width={40}
                  height={40}
                />
                {isInCart ? (
                  <Image
                    className="is-in-cart"
                    src={"/exclamation-mark.png"}
                    alt="exclamation mark"
                    width={20}
                    height={20}
                  />
                ) : null}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const HeaderWithProvider = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
      </PersistGate>
    </Provider>
  );
};

export default HeaderWithProvider;