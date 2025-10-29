'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { registerUser } from '../asyncOperations/user-requests/requests';
import { userMe } from '../asyncOperations/user-requests/requests';
import './Modal.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginLogOut } from '../../../redux/cart';
import { RootState } from '../../../redux/store';
import GoogleLoginButton from '../google-login/GoogleLoginButton';

const LoginModal = ({ setLogin }: { setLogin: (value: boolean) => void}) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [formIsValid, setFormValidation] = useState({
    name: '',
    password: '',
  });
  
    const isInCart = useSelector((state: RootState) => state.cart.items.length > 0);

    const dispatch = useDispatch();

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

    dispatch(setLoginLogOut(false));

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

      const userId = await userMe();
      Cookies.set('userId', userId, {
        secure: true,
        sameSite: 'Strict',
        expires: 1,
        path: '/',
      });

      setLogin(true);
    } catch (error) {
      console.error(error);
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

  const loginIcon = "/loginicon.png";

  return (
    <div>
      <div className='modal-items-container'>

      <Button
       onClick={handleOpen}
       className='modal-button'>
        <div className="desktop">
          <Image src={loginIcon} width={40} height={40} alt="loginIcon" />
        </div>
        <div className='mobile'>
          <p>Login</p>
        </div>
      </Button>
          {!Cookies.get("user") ? (
            <Link className='modal-cos-link'
             href={"/cos"}>
              Cos
              {isInCart && (
                <Image
                  className="modal-exclamation-mark"
                  src="/exclamation-mark.png"
                  alt="exclamation mark"
                  width={20}
                  height={20}
                />
              )}
            </Link>
          ) : null}

       </div>

      <Modal
        className="modal-z-index"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <Box
          className="modal-box"
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            className='modal-title'
          >
            Conectarea
          </Typography>
          <div className='modal-textfields-container'>
            <TextField
              label="name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={nameChange}
            />
            <TextField
              label="password"
              fullWidth
              variant="outlined"
              type="password"
              value={password}
              onChange={passwordChange}
            />
            <div>

            <Button className='modal-button' onClick={handleLogIn}>
              Conectare
            </Button>
            <Link className="modal-link" href="/Sign-In">
              <Button className='modal-button' onClick={handleClose}>
                Înregistrare
              </Button>
            </Link>


            </div>

            <Button onClick={handleClose}>Close Modal</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
