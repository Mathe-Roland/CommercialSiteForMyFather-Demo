"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoginModal from "../Modal/Modal";
import Link from "next/link";
import Cookies from 'js-cookie';
import Image from "next/image";
import UserInfo from "../userInfo/UserInfo";

// Lazy load the CSS for the Header component
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [cssLoaded, setCssLoaded] = useState(false); // State to track if CSS has been loaded

  useEffect(() => {
    const loadCSS = async () => {
      await import("./Header.css");
      setCssLoaded(true); // Update the state once CSS is loaded
    };
    loadCSS();

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

  // Optionally render a fallback UI if CSS hasn't loaded yet
  if (!cssLoaded) {
    return <div>Loading header styles...</div>;
  }

  return (
    <div className="navbar-title-and-searchbar">
      <div className="row width80 j-c-b">
        <div>
          <Image src={monsrikLogo ? monsrikLogo : "/cancel.webp"}
                 width={100}
                 height={100}
                 alt="Monsrik Logo"
          />
        </div>
        <div className="hamburger-centered">
          <div onMouseLeave={handleHamburger} className="hamburger-dropdown">
            <Image src={hamburger} onClick={handleShow}
                   className="hamburger-menu" alt="hamburger-menu"
                   width={100}
                   height={100}
            />
            { show ?
              <div className="navbar-dropdown">
                { isLoggedIn ?
                  <UserInfo setLogin={setIsLoggedIn}/> :
                  <LoginModal setLogin={setIsLoggedIn}/>
                }
              </div> :
              null
            }
          </div>
        </div>
        <div className="phoneviewHideDesktopContent">
          <div className="row j-c-c align-items-c">
            { isLoggedIn ?
              <UserInfo setLogin={setIsLoggedIn}/> :
              <LoginModal setLogin={setIsLoggedIn}/>
            }
          </div>
          <div className="row j-c-c align-items-c">
            <Link href="/cos">
              <p className="Header-cos">Cos</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
