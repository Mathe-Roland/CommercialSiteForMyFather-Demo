"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Button from "@mui/material/Button";


const LoginModal = dynamic(() => import("./Modal/Modal"), {
  loading: () => null,
});

export default function LoginButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Image
          src="/loginicon.png"
          width={40}
          height={40}
          alt="Login"
        />
      </Button>

        {open && (
        <LoginModal
            onClose={() => setOpen(false)}
        />
        )}

   </>
  );
}