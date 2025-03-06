"use client";

import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { imageFiles } from '../../components/asyncOperations/fetch/fetchAllFields';
import "./Setari.css";
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Cookie } from '@mui/icons-material';

const Setari = () => {
    const [pictures, setPicture] = useState({
        schimbParolaPicture: "",
        facturaPicture: "",
    });

    const [formData, setFormData] = useState({
        id: "",
        email: "",
        username: "",
        name: "",
        surname: '',
        country: '',
        postalCode: '',
        address: "",
        city: '',
        birthDate: '',
    });

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    useEffect(() => {
       
        const fetchImageData = async () => {
            try {
                const data = await imageFiles();
                return data;
            } catch (error) {

                return [];
            }
        };

        const getData = async () => {
            const result = await fetchImageData();
            const pictures = result || [];
            const schimbParolaPicture = pictures.find((element) => element.name === "schimbareParola.png");
            const facturaPicture = pictures.find((element) => element.name === "factura.png");
            setPicture({
                schimbParolaPicture: schimbParolaPicture?.url || "",
                facturaPicture: facturaPicture?.url || "",
            });
        };

        getData();
    }, []);

    const updateUser = async () => {
        const jwt = Cookies.get("token");
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${formData.id}`, {
                username: formData.username,
                email: formData.email,
                postalcode: formData.postalCode,
                city: formData.city,
                country: formData.country,
                birthdate: formData.birthDate,
                name: formData.name,
                surname: formData.surname,
                address: formData.address,
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            alert("Data successfully");

        } catch (error) {
            alert("Data update unsuccessful")
        }
    };

    const handleSubmit = () => {
        updateUser();
    };


    return (
        <div className='setari-container'>
            <div className='setari-welcome'>
                <h2 className='headers'>Bine ați venit </h2>
                <h3 className='headers'>{Cookies.get("user")} </h3>
            </div>

            <div className='setari-changer'>
                <Link href="/setari/schimbare-parola">
                    <div className='setari-informatii-container'>

                         <Image
                         alt="settings icon"
                         src={`${pictures ? pictures.schimbParolaPicture :"cancel.webp"}`} 
                         width={32}
                        height={32}/>

                        <p className="setari">
                            Schimbare parolă
                        </p>
                    </div>
                </Link>
                <Link href="/setari/informati-de-baza">
                <div className='setari-informatii-container'>

                     <Image
                        alt="settings icon"
                        src={`${pictures ? pictures.facturaPicture :"cancel.webp"}`} 
                        width={32}
                        height={32}/>

                        <p className="setari">


                            Date facturare
                        </p>

                </div>
                </Link>
            </div>

            <Container maxWidth="sm" className='container-informatii-de-baza'>
                <Typography variant="h5" align="center" gutterBottom>
                    Date facturare
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="outlined"
                                value={formData.email}
                                onChange={handleChange('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                value={formData.username}
                                onChange={handleChange('username')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                value={formData.name}
                                onChange={handleChange('name')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Surname"
                                variant="outlined"
                                value={formData.surname}
                                onChange={handleChange('surname')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Country of Origin"
                                variant="outlined"
                                value={formData.country}
                                onChange={handleChange('country')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                variant="outlined"
                                value={formData.address}
                                onChange={handleChange('address')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Postal Code"
                                variant="outlined"
                                value={formData.postalCode}
                                onChange={handleChange('postalCode')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="City"
                                variant="outlined"
                                value={formData.city}
                                onChange={handleChange('city')}
                            />
                        </Grid>
                        <Grid item xs={12} 
                        className='submit-button-container'
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                component="a"
                                href="/"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            </Grid>

                    </Grid>
                </form>
            </Container>
        </div>
    );
};

export default Setari;
