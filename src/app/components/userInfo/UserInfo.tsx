"use client";

import "./UserInfo.css";
import React, { useState, useEffect } from "react";
import { imageFiles } from "../asyncOperations/fetchData";
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
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const data = await imageFiles();
                    return data;
                } catch (error) {
                    console.error("Error fetching image data:", error);
                    return [];
                }
            };
    
            const getData = async () => {
                const result = await fetchData();
                const pictures = result || [];
                setPicture({
                    setariPicture: pictures.find((element) => element.name === "settings-icon.png") || null,
                    comenziPlasate: pictures.find((element) => element.name === "order.png") || null,
                    cos: pictures.find((element) => element.name === "cos.png") || null,
                    loggoutPicture: pictures.find((element) => element.name === "out.png") || null,
                });
            };
    
            getData();
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
                picture: pictures.setariPicture || null,
                text: "Setari",
                link: "/setari/informati-de-baza",
            },
            {
                picture: pictures.comenziPlasate || null,
                text: "Comenzi",
                link: "/comenzi-plasate",
            },
            {
                picture: pictures.loggoutPicture || null,
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
                text: "cos",
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

    {Cookies.get("user") 
    ? 
        (loginItemsFPhone.map((item, index) => (
          <div key={index}>
            {item.text === "Sign Out" ? (
              <div onClick={handleLoggout} className="sign-out-item">
                <div className="setari-felxbox">
                  <div className="userInfo-pictures">
                    <Image
                      className="setari-picture"
                      alt={item.text}
                      src={item.picture ? item.picture.url : "/cancel.webp"}
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
                src={item.picture ? item.picture.url : "/cancel.webp"}
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
        ))
        ) : null}


                </div>

                <div className="userInfo-desktop">

                <button onClick={handleUserInfo} onMouseOver={handleMover}>
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
                                                    src={item.picture ? item.picture.url : "/cancel.webp"}
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
                                                    src={item.picture ? item.picture.url : "/cancel.webp"}
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
