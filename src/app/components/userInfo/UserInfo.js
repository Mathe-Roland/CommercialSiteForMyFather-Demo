"use client"; // Add this directive

import "./UserInfo.css";
import React, { useState, useEffect } from "react";
import { imageFiles } from "../asyncOperations/fetchData";
import Link from "next/link";
import Cookies from 'js-cookie';
import Image from "next/image";

const UserInfo = ({ setLogin }) => {
    const [pictures, setPicture] = useState({
        anonPicture: null,
        setariPicture: null,
        cosPicture: null,
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
                return [];
            }
        };

        const getData = async () => {
            const result = await fetchData();
            const pictures = result || [];
            setPicture({
                anonPicture: pictures.find((element) => element.name === "anonymous-person.png") || null,
                setariPicture: pictures.find((element) => element.name === "settings-icon.png") || null,
                cosPicture: pictures.find((element) => element.name === "cos.png") || null,
                comenziPlasate: pictures.find((element) => element.name === "comenzi plasate.png") || null,
                loggoutPicture: pictures.find((element) => element.name === "out.png") || null,
            });
        };

        getData();
    }, []);

    const handleUserInfo = () => {
        setShowUserInfo(!showUserInfo);
    };

    const handleLoggout = () => {
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

    return (
        <div onMouseLeave={onLeave} className="userInfo-container">
            <button onClick={handleUserInfo} onMouseOver={handleMover}>
                <Image
                    alt="login"
                    src={pictures.anonPicture ? pictures.anonPicture.url : '/cancel.webp'}
                    width={48}
                    height={48}
                />
            </button>
            {showUserInfo ? (
                <div className="userInfo-info" onMouseLeave={onLeave}>
                    <Link href="/cos" className="setari">
                        <p className="setari">
                            <span>
                                <Image
                                    className="setari-picture"
                                    alt="cos icon"
                                    src={pictures.cosPicture ? pictures.cosPicture.url: "/cancel.webp"}
                                    width={16}
                                    height={16}
                                />
                            </span>
                            Comenzi
                        </p>
                    </Link>
                    <Link href="/setari/informati-de-baza" className="setari">
                        <p className="setari">
                            <span>
                                <Image
                                    className="setari-picture"
                                    alt="settings icon"
                                    src={pictures.setariPicture ? pictures.setariPicture.url: '/cancel.webp'}
                                    width={16}
                                    height={16}
                                />
                            </span>
                            Setari
                        </p>
                    </Link>
                    <Link href="/comenzi-plasate" className="setari">
                        <p className="setari">
                            <span>
                                <Image
                                    className="setari-picture"
                                    alt="comenzi plasate"
                                    src={pictures.comenziPlasate ? pictures.comenziPlasate.url : '/cancel.webp'}
                                    width={16}
                                    height={16}
                                />
                            </span>
                            Comenzi plasate
                        </p>
                    </Link>
                    <p className="logout" onClick={handleLoggout}>
                        <span>
                            <Image
                                className="setari-picture"
                                alt="logout icon"
                                src={pictures.loggoutPicture ? pictures.loggoutPicture.ur : '/cancel.webp'}
                                width={16}
                                height={16}
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
