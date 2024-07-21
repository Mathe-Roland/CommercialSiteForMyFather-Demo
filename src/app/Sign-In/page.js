"use client";

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    surname: '',
    country: '',
    postalCode: '',
    city: '',
    address: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    err: '' // Error message field
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setFormData({ ...formData, err: "Passwords don't match" });
      return false;
    }

    // Add additional validation checks here
    if (!formData.email || !formData.password) {
      setFormData({ ...formData, err: "Email and Password are required" });
      return false;
    }

    return true;
  };

  const registerUser = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, {
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
      });
      // Handle success.
      console.log('Well done!');
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      setFormData({ ...formData, err: '' }); // Clear errors on success
    } catch (error) {
      console.log(error.response);
      const errorMessage = error.response?.data?.error.message;
      setFormData({ ...formData, err: errorMessage });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      registerUser();
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Înregistrare
      </Typography>
      <form onSubmit={handleSubmit}>
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
              label="Password"
              variant="outlined"
              value={formData.password}
              type="password"
              onChange={handleChange('password')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              value={formData.confirmPassword}
              type="password"
              onChange={handleChange('confirmPassword')}
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
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
          {formData.err ? (
            <Grid item xs={12} align="center">
              <Typography color="error">{formData.err}</Typography>
            </Grid>
          ):null
          }
        </Grid>
      </form>
    </Container>
  );
};

export default SignIn;
