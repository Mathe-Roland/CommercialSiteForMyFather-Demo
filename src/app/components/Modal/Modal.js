'use client';

import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Link from 'next/link'; 
import Cookies from 'js-cookie';
import { registerUser, userIds } from '../asyncOperations/fetchData';
import './Modal.css';
import Image from 'next/image';

const LoginModal = ({ setLogin }) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [formIsValid, setFormValidation] = useState({
    name: '',
    password: '',
  });

  const handleOpen = () => {
    setOpen(true);
    setFormValidation({ name: '', password: '' });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogIn = async () => {
    const usernameEmptyText = 'The username field is empty';
    const passwordEmptyText = 'The password field is empty';

    if (name.length === 0 && password.length === 0) {
      setFormValidation({ name: usernameEmptyText, password: passwordEmptyText });
      return;
    }

    if (name.length === 0) {
      setFormValidation({ ...formIsValid, name: usernameEmptyText });
      return;
    }

    if (password.length === 0) {
      setFormValidation({ ...formIsValid, password: passwordEmptyText });
      return;
    }

    try {
      const response = await registerUser(name, password);
      Cookies.set('token', response.data.jwt, {
        secure: true,
        sameSite: 'Strict',
        expires: 1,  
        path: '/',
      });
      
      Cookies.set('user', name, {
        secure: true,
        sameSite: 'Strict',
        expires: 1,   
        path: '/', 
      });
      
      const userId = await userIds();
      Cookies.set('userId', userId, {
        secure: true,
        sameSite: 'Strict',
        expires: 1, 
        path: '/', 
      });
      

      setLogin(true);
    } catch (error) {
    }
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);

    if (e.target.value === '') {
      setFormValidation({ ...formIsValid, password: 'The password field is empty' });
    } else {
      setFormValidation({ ...formIsValid, password: '' });
    }
  };

  const nameChange = (e) => {
    setName(e.target.value);

    if (e.target.value === '') {
      setFormValidation({ ...formIsValid, name: 'The username field is empty' });
    } else {
      setFormValidation({ ...formIsValid, name: '' });
    }
  };

  const loginIcon="/loginicon.png";


  return (
    <div>
      <Button onClick={handleOpen}>
        <div className='desktop'>

        <Image src={loginIcon ? loginIcon : null} width={40} height={40} alt='loginIcon'/>

        </div>

        <div className='mobile'>

        <p>Login</p>

        </div>
        </Button>
      <Modal
        className='modal-z-index'
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            sx={{ borderBottom: '2px solid lightgray', paddingBottom: '8px' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Conectarea
          </Typography>
          <TextField
            sx={{ marginBottom: '0' }}
            label="name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            onChange={nameChange}
          />
          <TextField
            sx={{ marginBottom: '16px' }}
            label="password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={passwordChange}
          />
          <Button sx={{ fontSize: '12px' }} onClick={handleLogIn}>
            Conectare
          </Button>
          <Link className="modal-link" href="/Sign-In">
            <Button sx={{ fontSize: '12px' }} onClick={handleClose}>
              Inregistrare
            </Button>
            <br />
          </Link>
          <Button onClick={handleClose}>Close Modal</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
