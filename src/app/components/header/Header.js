"use client";
import "./Header.css";
import LoginModal from "../Modal/Modal";
import Link from "next/link";
import { useState, useEffect } from "react";
import UserInfo from "../userInfo/UserInfo";
import Cookies from "js-cookie";
import Image from "next/image";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Check if user is logged in
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setIsLoggedIn(true);
    }

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", checkMobile);
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
    <div className="navbar-title-and-searchbar">
      <div className="row width80 j-c-b">
        <div>
          <Image
            src={monsrikLogo}
            width={100}
            height={100}
            alt="Monsrik Logo"
          />
        </div>
        {isMobile ? (
          <div className="hamburger-centered">
            <div onMouseLeave={handleHamburger} className="hamburger-dropdown">
              <Image
                src={hamburger}
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
        ) : (
          <div className="phoneviewHideDesktopContent">
            <div className="row j-c-c align-items-c">
              {isLoggedIn ? (
                <UserInfo setLogin={setIsLoggedIn} />
              ) : (
                <LoginModal setLogin={setIsLoggedIn} />
              )}
            </div>
            <div className="row j-c-c align-items-c">
              <Link href={"/cos"}>
                <p className="Header-cos">Cos</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
