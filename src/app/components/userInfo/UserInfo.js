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
                picture: pictures.loggoutPicture || "",
                text: "Sign Out",
                link: "#"
            }
        ];
        
        const image="/loginicon.png";

        return (
            <div onMouseLeave={onLeave} className="userInfo-container">
                <button onClick={handleUserInfo} onMouseOver={handleMover}>
                    <Image
                        alt="login"
                        src={`${image ? image :null}`}
                        width={48}
                        height={48}
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
        );
    };    

export default UserInfo;
