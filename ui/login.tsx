'use client';

import { AuthContext } from "@/lib/firebase/auth-context";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useContext, useEffect } from "react";

export default function LoginComponent() {
  
  const user = useContext(AuthContext);
  
  if (user) {
    return (
      <p>Halo {user.displayName}!</p> 
    )
  } else {
    return (
      <Button
        size="lg"
        variant="outlined"
        color="blue-gray"
        className="flex items-center gap-3"
      >
        <Image height={24} width={24} src="/icons/google.svg" alt="metamask" className="h-6 w-6" />
        Login dengan Google
      </Button>
    )
  }
}