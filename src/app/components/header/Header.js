"use client";
import "./Header.css";
import LoginModal from "../Modal/Modal";
import Link from "next/link";
import { useState, useEffect } from "react";
import UserInfo from "../userInfo/UserInfo";
import Cookies from 'js-cookie';
import Image from "next/image";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
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
  }

  const hamburger="/hamburger_menu.png"

  return (
    <div className='navbar-title-and-searchbar'>
      <div className="row width80 j-c-b">
        <div>
          <h1 className="t-n-r">Decorcut</h1>
          <h2 className="t-n-r">Monstrik Dreamland</h2>
        </div>
        <div>
          <div onMouseLeave={handleHamburger} className="hamburger-dropdown">
            <Image src={hamburger ? hamburger : null } onClick={handleShow} 
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
        </div>
      </div>
    </div>
  );
};

export default Header;
