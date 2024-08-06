"use client";
import "./Contact.css";
import React, { useState } from 'react';
import { TextField, MenuItem, Button, Container, Grid } from '@mui/material';
import { postareContact } from "../components/asyncOperations/fetchData";




const ContactUsForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await postareContact(formData);
        alert('Form submitted.');
    };

    return (
        <div className="contact-container" suppressHydrationWarning>

        <Container>
            <h1 className="contact-header">Contacteaza-ne</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Company (optional)"
                            variant="outlined"
                            fullWidth
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Category"
                            variant="outlined"
                            fullWidth
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Inquiry">Inquiry</MenuItem>
                            <MenuItem value="Support">Support</MenuItem>
                            <MenuItem value="Feedback">Feedback</MenuItem>
                            <MenuItem value="Complaint">Complaint</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Message"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>


        </div>

    );
};

export default ContactUsForm;