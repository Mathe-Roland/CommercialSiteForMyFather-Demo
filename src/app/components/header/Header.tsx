'use client';

import "./Header.css";
import LoginModal from "../Modal/Modal";
import Link from "next/link";
import { useState, useEffect } from "react";
import UserInfo from "../userInfo/UserInfo";
import Cookies from 'js-cookie';
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Header = () => {
  const [show, setShow] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart);
  const isInCart = cartItems.totalQuantity > 0;

  const loginOrLoggout = useSelector((state: RootState) => state.cart.loginLogOut);

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
                  {loginOrLoggout ? (
                    <UserInfo />
                  ) : (
                    <LoginModal />
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="phoneviewHideDesktopContent">
            <div className="row j-c-c align-items-c">
              {loginOrLoggout ? (
                <UserInfo  />
              ) : (
                <LoginModal/>
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

      
 
export default Header;