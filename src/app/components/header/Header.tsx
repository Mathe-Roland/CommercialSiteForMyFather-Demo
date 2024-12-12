'use client';
import "./Header.css";
import LoginModal from "../Modal/Modal";
import Link from "next/link";
import { useState, useEffect } from "react";
import UserInfo from "../userInfo/UserInfo";
import Cookies from 'js-cookie';
import Image from "next/image";
import { Cookie } from "@mui/icons-material";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);

  
  
  useEffect(() => {
    Cookies.set("url", window.location.href, {secure: true,
      sameSite: 'Strict',
      expires: 1,   
      path: '/', });   
      const userCookie = Cookies.get('user');
    if (userCookie) {
      setIsLoggedIn(true);
    }
  }, []);

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
      <div className='navbar-title-and-searchbar'>
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
                width={100}
                height={100}
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
              <Link
               href={"/cos"}
               className="cos-de-cumparaturi"
               >
                <Image                
                  src={"/cos-de-cumparaturi.png"}
                  alt="cos de cumparaturi"
                  width={40}
                  height={40}
                />
              {Cookies.get("isInCart") ? (
                <Image
                className="is-in-cart"
                src={"/exclamation-mark.png"}
                alt="exclamation mark"
                width={20}
                height={20}
                />
              )
                :
              null
            } 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;