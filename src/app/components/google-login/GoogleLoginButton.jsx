"use client"

import { GoogleLogin } from '@react-oauth/google'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';
import { setToken } from '../../../redux/auth-slice';

export default function GoogleLoginButton() {
  const dispatch = useDispatch();
  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential
    
    console.log(idToken);

    // Send ID token to your Strapi backend
    const res = await fetch('http://localhost:1337/api/connect/google', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ idToken }),
});



    const data = await res.json()
    if (data.jwt) {
      Cookies.set('token', data.jwt, {
              secure: true,
              sameSite: 'Strict',
              expires: 1,
              path: '/',
            });
      const jwt = Cookies.get("token");
      
      dispatch(setToken(jwt));

      console.log("Logged in as", data.user);
    } else {
      console.error('Login failed:', data)
    }
  }

  return <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} />
}
