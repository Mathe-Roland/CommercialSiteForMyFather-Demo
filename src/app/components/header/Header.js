"use client";
import "./Header.css";
import LoginModal from "../Modal/Modal";
import Link from "next/link"; // Use next/link instead of react-router-dom
import { useState, useEffect } from "react";
import UserInfo from "../userInfo/UserInfo";
import Cookies from 'js-cookie';
import Image from "next/image";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false); // Initialize with false

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array ensures this runs only once at mount.

  const handleShow = () => {
    setShow(!show);
  };

  const handleHamburger = () => {
    setShow(false);
  }

  return (
    <div className='navbar-title-and-searchbar'>
      <div className="row width80 j-c-b">
        <div>
          <h1 className="t-n-r">Decorcut</h1>
          <h2 className="t-n-r">Monstrik Dreamland</h2>
        </div>
        <div>
          <div onMouseLeave={handleHamburger} className="hamburger-dropdown">
            <Image src="/hamburger_menu.png" onClick={handleShow} 
              className="hamburger-menu" alt="hamburger-menu"
              width={25}
              height={25}/>
            { show ?
              <div className="navbar-dropdown">
                <input
                  type="text"
                  placeholder="Searchbar"
                  className="border-radius-10 search-icon search-input js"
                />
                { isLoggedIn ?
                  <UserInfo setLogin={setIsLoggedIn}/> :
                  <LoginModal setLogin={setIsLoggedIn}/>
                }
                <Link href="/cos" className="headerCos">
                  <strong>Cos</strong>
                </Link>
              </div> :
              null
            }
          </div>
        </div>
        <div className="phoneviewHideDesktopContent">



          <div className="row j-c-c align-items-c">
            <input
              type="text"
              placeholder="Searchbar"
              className="border-radius-10 search-icon search-input js"
            />
          </div>
          <div className="row j-c-c align-items-c">
            { isLoggedIn ?
              <UserInfo setLogin={setIsLoggedIn}/> :
              <LoginModal setLogin={setIsLoggedIn}/>
            }
          </div>
          <div className="row j-c-c align-items-c">
            <Link href="/cos" className="headerCos">
              <strong>Cos</strong>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
