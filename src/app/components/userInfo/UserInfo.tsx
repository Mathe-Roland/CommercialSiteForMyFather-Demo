"use client";

import "./UserInfo.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from 'js-cookie';
import Image from "next/image";


const UserInfo = ({ setLogin }) => {
        const [pictures, setPicture] = useState({
            setariPicture: null,
            comenziPlasate: null,
            cos:null,
            loggoutPicture: null,
        });
    
        const [showUserInfo, setShowUserInfo] = useState(false);
        const [isInCart,setIsInCart] = useState(false);

       useEffect(() => {
          const handleStorageChange = () => {
            const cartStatus = localStorage.getItem("isInCart");
            setIsInCart(cartStatus === "true");
          };
        
          handleStorageChange();
        
          const handleCustomStorageChange = (event) => {
            if (event.detail?.key === "isInCart") {
              handleStorageChange();
            }
          };
        
          window.addEventListener("storage", handleStorageChange);
          window.addEventListener("localStorageUpdate", handleCustomStorageChange);
        
          return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("localStorageUpdate", handleCustomStorageChange);
          };
        }, []);
        
        useEffect(() => {           
                setPicture({
                    setariPicture: "/settings-icon.png",
                    comenziPlasate: "/order.png",
                    cos: "/cos-de-cumparaturi.png",
                    loggoutPicture: "/out.png",
                });
    
        }, []);
    

        const handleUserInfo = () => {
            setShowUserInfo(!showUserInfo);
        };
    
        const handleLoggout = (e) => {
            e.preventDefault();
            function deleteAllCookies() {
                const allCookies = Cookies.get();
                Object.keys(allCookies).forEach(cookieName => Cookies.remove(cookieName));
            }
    
            deleteAllCookies();
            setLogin(false);
        };
    
        const onLeave = () => {
            setShowUserInfo(false);
        };
    
        const handleMover = () => {
            setShowUserInfo(true);
        };
    
        const loginItems = [
            {
                picture: "/settings-icon.png",
                text: "Setari",
                link: "/setari/informati-de-baza",
            },
            {
                picture: "/order.png",
                text: "Comenzi",
                link: "/comenzi-plasate",
            },
            {
                picture: "/out.png",
                text: "Sign Out",
                link: "#"
            }
        ];
        
        const loginItemsFPhone = [
            {
                picture: pictures.setariPicture || "",
                text: "Setari",
                link: "/setari/informati-de-baza",
            },
            {
                picture: pictures.comenziPlasate || "",
                text: "Comenzi",
                link: "/comenzi-plasate",
            },
            {
                picture: pictures.cos || "",
                text: "Cos",
                link: "/cos"
            },
            {
                picture: pictures.loggoutPicture || "",
                text: "Sign Out",
                link: "#"
            },
        ];

        const loginIcon="/loginicon.png";


        return (
        <div onMouseLeave={onLeave} className="userInfo-container">

                <div className="userInfo-mobile">

                {Cookies.get("user") ? (
  loginItemsFPhone.map((item, index) => (
    <div key={index}>
      {item.text === "Sign Out" ? (
        <div onClick={handleLoggout} className="sign-out-item">
          <div className="mobile-flexbox">
            <div className="userInfo-pictures">
              <Image
                className="setari-picture"
                alt={item.text}
                src={item.picture ? item.picture : "/cancel.webp"}
                width={40}
                height={40}
              />
            </div>
            <p className="setari">{item.text}</p>
          </div>
        </div>
      ) : item.text === "Cos" ? (
        <div className="cos-item cos-item-position">
          <Link href={item.link} passHref>
            <div className="mobile-flexbox">
              <div className="userInfo-pictures">
                <Image
                  className="setari-picture"
                  alt={item.text}
                  src={item.picture ? item.picture: "/cancel.webp"}
                  width={40}
                  height={40}
                />
              </div>
              <p className="setari">{item.text}</p>
            </div>
          </Link>
                {isInCart ?  
                  (<Image
                  className="cart-position"
                  src={"/exclamation-mark.png"}
                  alt="exclamation mark"
                  width={20}
                  height={20}
                  />)
                  :
                  null
                }  
        </div>
      ) : (
        <Link href={item.link} passHref>
          <div className="mobile-flexbox">
            <div className="userInfo-pictures">
              <Image
                className="setari-picture"
                alt={item.text}
                src={item.picture ? item.picture : "/cancel.webp"}
                width={40}
                height={40}
              />
            </div>
            <p className="setari">{item.text}</p>
          </div>
        </Link>
      )}
    </div>
  ))
) : null}



                </div>

                <div className="userInfo-desktop">

                <button onClick={handleUserInfo} onMouseOver={handleMover}
                className="login-button">
                    <Image
                        alt="login"
                        src={`${loginIcon ? loginIcon :null}`}
                        width={40}
                        height={50}
                    />
                </button>
                {showUserInfo && (
                    <div className="userInfo-info" onMouseLeave={onLeave}>
                        {loginItems.map((item, index) => (
                            <div key={index}>
                                {item.text === "Sign Out" ? (
                                    <div onClick={handleLoggout} className="sign-out-item">
                                        <div className="setari-felxbox">
                                            <div className="userInfo-pictures">
                                                <Image
                                                    className="setari-picture"
                                                    alt={item.text}
                                                    src={item.picture ? item.picture : "/cancel.webp"}
                                                    width={40} 
                                                    height={40}
                                                />
                                            </div>
                                            <p className="setari">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <Link href={item.link} passHref>
                                        <div className="setari-felxbox">
                                            <div className="userInfo-pictures">
                                                <Image
                                                    className="setari-picture"
                                                    alt={item.text}
                                                    src={item.picture ? item.picture : "/cancel.webp"}
                                                    width={40} 
                                                    height={40}
                                                />
                                            </div>
                                            <p className="setari">
                                                {item.text}
                                            </p>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                </div>
            </div>
        );
    };    

export default UserInfo;
