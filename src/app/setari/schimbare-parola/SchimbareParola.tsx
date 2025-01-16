"use client";

import React, { useState, useEffect } from 'react';
import "./SchimbareParola.css";
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import Link from "next/link";
import { changePasswordAuthUser,completeUserData, imageFiles } from '../../components/asyncOperations/fetchData';
import Image from 'next/image';

const SchimbareParola = () => {
    const [pictures, setPictures] = useState<{
        schimbParolaPicture: { url: string };
        facturaPicture: { url: string };
    }>({
        schimbParolaPicture: { url: "" },
        facturaPicture: { url: "" },
    });
    

    const [textMessage, setTextMessage] = useState("");

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        surname: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await completeUserData();
                setFormData({
                    id: data?.id || "",
                    name: data?.name || "",
                    surname: data?.surname || "",
                    oldPassword: formData.oldPassword || "",
                    newPassword: formData.newPassword || "",
                    confirmNewPassword: formData.confirmNewPassword || "",
                  });
                  
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchImageData = async () => {
            try {
                const data = await imageFiles();
                return data;
            } catch (error) {
                console.error("Error fetching image data:", error);
                return [];
            }
        };

        const getData = async () => {
            const result = await fetchImageData();
            const schimbParolaPicture = result.find((element) => element.name === "schimbareParola.png") || { url: "/cancel.webp" };
            const facturaPicture = result.find((element) => element.name === "factura.png") || { url: "/cancel.webp" };
            setPictures({
                schimbParolaPicture,
                facturaPicture,
            });
        };

        getData();
        fetchData();
    }, []);

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handleSubmit = async () => {
        let newPasswordTextMessage = "";

        if (formData.confirmNewPassword !== formData.newPassword) {
            newPasswordTextMessage = "Passwords do not match";
        } else {
            newPasswordTextMessage = "Password changed successfully";
        }

        setTextMessage(newPasswordTextMessage);

       const data= await changePasswordAuthUser(formData.oldPassword,formData.newPassword);
    };

    return (
        <div className="schimbareParola-container">
            <div className="setari-welcome">
                <h2 className="headers">Bine ați venit</h2>
                <h3 className="headers">{formData.surname} <span>{formData.name}</span></h3>
            </div>

            <div className="setari-changer">
                <Link href="/setari/schimbare-parola" className="setari">
                    <p className="setari">
                        <span>
                            <Image
                                className="setari-picture"
                                alt="settings icon"
                                src={pictures.schimbParolaPicture?.url || "/cancel.webp"}
                                height={24}
                                width={24}
                            />
                        </span>
                        Schimbare parolă
                    </p>
                </Link>
                <Link href="/setari/informati-de-baza" className="setari">
                    <p className="setari">
                        <span>
                            <Image
                                className="setari-picture"
                                alt="settings icon"
                                src={pictures.facturaPicture?.url || "/cancel.webp"}
                                width={24}
                                height={24}
                            />
                        </span>
                        Date facturare
                    </p>
                </Link>
            </div>

            <Container maxWidth="sm" className='schimbare-parola-container'>
                <Typography variant="h5" align="center" gutterBottom>
                    Schimbare parolă
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Parola Veche"
                                variant="outlined"
                                type="password"
                                value={formData.oldPassword}
                                onChange={handleChange('oldPassword')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Parola Noua"
                                type="password"
                                variant="outlined"
                                value={formData.newPassword}
                                onChange={handleChange('newPassword')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Confirma Parola Noua"
                                type="password"
                                variant="outlined"
                                value={formData.confirmNewPassword}
                                onChange={handleChange('confirmNewPassword')}
                            />
                            <p className={`${textMessage !== "" ? "red" : null}`}>{textMessage}</p>
                        </Grid>
                        <Grid item xs={12}  className='schimbare-parola-submit-container' >
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default SchimbareParola;
