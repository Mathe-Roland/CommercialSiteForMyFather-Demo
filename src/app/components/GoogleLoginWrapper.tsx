"use client";

import GoogleLoginButton from "./google-login/GoogleLoginButton";

interface GoogleLoginWrapperProps {
  onSuccess: () => void;
}

export default function GoogleLoginWrapper({
  onSuccess,
}: GoogleLoginWrapperProps) {
  return <GoogleLoginButton onSuccess={onSuccess} />;
}