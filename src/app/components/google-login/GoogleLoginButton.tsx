"use client";

import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/auth-slice";
import { setLoginLogOut } from "../../../redux/cart";

interface Props {
    onSuccess?: () => void;
}

export default function GoogleLoginButton({ onSuccess }: Props) {
    const dispatch = useDispatch();

    const handleLoginSuccess = async (credentialResponse: any) => {
        const idToken = credentialResponse.credential;

        if (!idToken) {
            console.error("Google did not provide an ID token");
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Site": "decorcut",
                    },
                    body: JSON.stringify({
                        idToken,
                    }),
                }
            );

            const data = await res.json();


            if (!res.ok) {
                console.error("Google login failed:", data);
                return;
            }

            if (data.jwt) {
                Cookies.set("token", data.jwt, {
                    secure: true,
                    sameSite: "Strict",
                    expires: 1,
                    path: "/",
                });

                Cookies.set("user", data.user.username, {
                    secure: true,
                    sameSite: "Strict",
                    expires: 1,
                    path: "/",
                });
                
                Cookies.set("userId", String(data.user.id), {
                    secure: true,
                    sameSite: "Strict",
                    expires: 1,
                    path: "/",
                });


                const jwt = Cookies.get("token");


                if (jwt) {
                    dispatch(setToken(jwt));
                }

                dispatch(setLoginLogOut(true));


                onSuccess?.();


            } else {

            }
        } catch (error) {
            console.error("Google login request failed:", error);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Google Login Failed")}
        />
    );
}