"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./google-login/GoogleLoginButton";


interface GoogleLoginWrapperProps {
    onSuccess: () => void;
}

export default function GoogleLoginWrapper({
    onSuccess,
}: GoogleLoginWrapperProps) {

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_S_CLIENT_ID!}
    >
        <GoogleLoginButton onSuccess={onSuccess} />
    </GoogleOAuthProvider>
  );
}