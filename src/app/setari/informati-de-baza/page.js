"use client";

import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import axios from 'axios';
import Link from 'next/link'; // Corrected import for Next.js
import { completeUserData, imageFiles } from '../../components/asyncOperations/fetchData';
import "./Setari.css";
import Cookies from 'js-cookie';
import { cloudinaryTransformation } from '../../components/functions/regexconversion';
import Image from 'next/image';

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
        const fetchData = async () => {
            try {
                const data = await completeUserData();
                setFormData({
                    id: data?.id,
                    email: data?.email,
                    username: data?.username,
                    name: data?.name,
                    surname: data?.surname,
                    country: data?.country,
                    postalCode: data?.postalcode,
                    city: data?.city,
                    birthDate: data?.birthdate,
                    address: data?.address,
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
                console.error("Error fetching image files:", error);
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
        fetchData();
    }, []);

    const updateUser = async () => {
        const jwt = Cookies.get("token");
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${formData.id}`, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
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

            console.log('User profile updated successfully:', response.data.user);
        } catch (error) {
            console.error('An error occurred:', error.response.data);
            alert("Data update unsuccessful")
        }
    };

    const handleSubmit = () => {
        updateUser();
        console.log(formData);
    };

    return (
        <div className='setari-container'>
            <div className='setari-welcome'>
                <h4 className='headers'>Bine ați venit</h4>
                <h3 className='headers'>{formData.surname} <span>{formData.name}</span></h3>
            </div>

            <div className='setari-changer'>
                <Link href="/setari/schimbare-parola">
                        <p className="setari">
                            <span>
                                <Image
                                    alt="settings icon"
                                    src={`${cloudinaryTransformation(pictures.schimbParolaPicture,24,24)}`} 
                                    width={24}
                                    height={24}/>
                            </span>Schimbare parolă
                        </p>
                </Link>
                <Link href="/setari/informati-de-baza">
                        <p className="setari">
                            <span>
                                <Image
                                    alt="settings icon"
                                    src={`${cloudinaryTransformation(pictures.facturaPicture,24,24)}`} 
                                    width={24}
                                    height={24}/>
                            </span>Date facturare
                        </p>
                </Link>
            </div>

            <Container maxWidth="sm" style={{ marginTop: '40px' }}>
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
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Birth Date"
                                variant="outlined"
                                value={formData.birthDate}
                                onChange={handleChange('birthDate')}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                    style: { transform: 'translate(0, -50%)' },
                                }}
                                InputProps={{
                                    style: { padding: '16px 14px' },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Link href="/">
                                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
};

export default Setari;
