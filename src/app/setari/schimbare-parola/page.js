"use client";

import React, { useState, useEffect } from 'react';
import "./SchimbareParola.css";
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import Link from "next/link";
import { completeUserData, imageFiles } from '../../components/asyncOperations/fetchData';

const SchimbareParola = () => {
    const [pictures, setPictures] = useState({
        schimbParolaPicture: "",
        facturaPicture: "",
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
                const data = await completeUserData(); // Wait for the promise to resolve
                console.log(data); // Now you have the actual data

                setFormData({
                    id: data?.id,
                    name: data?.name,
                    surname: data?.surname,
                });
                console.log(data.id);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchImageData = async () => {
            try {
                const data = await imageFiles();
                return data;
            } catch (error) {
                console.error("Error fetching image files:", error);
                return [];
            }
        };

        const getData = async () => {
            const result = await fetchImageData();
            const schimbParolaPicture = result.find((element) => element.name === "schimbareParola.png");
            const facturaPicture = result.find((element) => element.name === "factura.png");
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

    const handleSubmit = () => {
        let newPasswordTextMessage = "";

        if (formData.confirmNewPassword !== formData.newPassword) {
            newPasswordTextMessage = "Passwords do not match";
        } else {
            newPasswordTextMessage = "Password changed successfully";
        }
        setTextMessage(newPasswordTextMessage);
    };

    return (
        <div className="schimbareParola-container">
            <div className="setari-welcome">
                <h4 className="headers">Bine ați venit</h4>
                <h3 className="headers">{formData.surname} <span>{formData.name}</span></h3>
            </div>

            <div className="setari-changer">
                <Link href="/setari/schimbare-parola" className="setari">
                    <p className="setari">
                        <span>
                            <img className="setari-picture" alt="settings icon" src={`${pictures.schimbParolaPicture?.url}`} />
                        </span>
                        Schimbare parolă
                    </p>
                </Link>
                <Link href="/setari/informati-de-baza" className="setari">
                    <p className="setari">
                        <span>
                            <img className="setari-picture" alt="settings icon" src={`${pictures.facturaPicture?.url}`} />
                        </span>
                        Date facturare
                    </p>
                </Link>
            </div>

            <Container maxWidth="sm" style={{ marginTop: '40px' }}>
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
                            <p className={`${textMessage !== "" ? "red" : null}`}>{textMessage}</p>
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
                        <Grid item xs={12} align="center">
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
