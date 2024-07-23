"use client"; // Add this directive

import "./UserInfo.css";
import React, { useState, useEffect } from "react";
import { imageFiles } from "../asyncOperations/fetchData";
import Link from "next/link"; // Use next/link instead of react-router-dom
import Cookies from 'js-cookie';
import { cloudinaryTransformation } from "../functions/regexconversion";

const UserInfo = ({ setLogin }) => {
    const [pictures, setPicture] = useState({
        anonPicture:"",
        setariPicture:"",
        cosPicture:"",
        comenziPlasate:"",
        loggoutPicture:"",
    });

    const [showUserInfo, setShowUserInfo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await imageFiles();
                return data;
            } catch (error) {
                console.error("Error fetching image files:", error);
                return [];
            }
        };

        const getData = async () => {
            const result = await fetchData();
            const pictures = result || [];
            const anonPicture = pictures.find((element) => element.name === "anonymous-person.png");
            const settingsPicture = pictures.find((element) => element.name === "settings-icon.png");
            const cosPicture = pictures.find((element) => element.name === "cos.png");
            const loggoutPicture = pictures.find((element) => element.name === "out.png");
            const comenziPlasate = pictures.find((element) => element.name === "comenzi plasate.png");
            setPicture({
                anonPicture:anonPicture,
                setariPicture:settingsPicture,
                cosPicture:cosPicture,
                comenziPlasate:comenziPlasate,
                loggoutPicture:loggoutPicture,
            });
        };

        getData();
    }, []);

    const handleUserInfo = () => {
        setShowUserInfo(!showUserInfo);
    };

    const handleLoggout = () => {
        function deleteAllCookies() {
            const allCookies = Cookies.get(); // Get all cookies as an object
            Object.keys(allCookies).forEach(cookieName => Cookies.remove(cookieName)); // Remove each cookie by name
        }

        deleteAllCookies();
        setLogin(false);
    }

    const onLeave = () => {
        setShowUserInfo(false);
    }

    const handleMover = () => {
        setShowUserInfo(true);
    }

    return (
        <div onMouseLeave={onLeave} className="userInfo-container">
            <button onClick={handleUserInfo} onMouseOver={handleMover}>
                <img
                    className="userInfo-img"
                    alt="login"
                    src={`${cloudinaryTransformation(pictures.anonPicture?.url,48,48)}`}
                />
            </button>
            {showUserInfo ? (
                <div className="userInfo-info" onMouseLeave={onLeave}>
                    <Link href="/cos" className="setari">
                        <p className="setari">
                            <span>
                                <img
                                    className="setari-picture"
                                    alt="setings icon"
                                    src={`${cloudinaryTransformation(pictures.cosPicture?.url,48,48)}`}
                                />
                            </span>
                            Comenzi
                        </p>
                    </Link>
                    <Link href="/setari/informati-de-baza" className="setari">
                        <p className="setari">
                            <span>
                                <img
                                    className="setari-picture"
                                    alt="setings icon"
                                    src={`${cloudinaryTransformation(pictures.setariPicture?.url,48,48)}`}
                                />
                            </span>
                            Setari
                        </p>
                    </Link>
                    <Link href="/comenzi-plasate" className="setari">
                        <p className="setari">
                            <span>
                                <img
                                    className="setari-picture"
                                    alt="comenzi plasate"
                                    src={`${cloudinaryTransformation(pictures.comenziPlasate?.url),48,48}`}
                                />
                            </span>
                            Comenzi plasate
                        </p>
                    </Link>
                    <p className="logout" onClick={handleLoggout}>
                        <span>
                            <img
                                className="setari-picture"
                                alt="setings icon"
                                src={`${cloudinaryTransformation(pictures.loggoutPicture?.url,48,48)}`}
                            />
                        </span>
                        Sign out
                    </p>
                </div>
            ) : null}
        </div>
    );
};

export default UserInfo;
