'use client';

import { app } from "@/lib/firebase/firebase-config";
import { Button } from "@material-tailwind/react";
import { GoogleAuthProvider, User, getAuth, getRedirectResult, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoginComponent() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function handleLogin() {
    signInWithRedirect(auth, provider)
    // getRedirectResult(auth)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access Google APIs.
    //     const credential = GoogleAuthProvider.credentialFromResult(result!);
    //     const token = credential?.accessToken;

    //     // The signed-in user info.
    //     const user = result!.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  }

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
        onClick={handleLogin}
      >
        <Image height={24} width={24} src="/icons/google.svg" alt="metamask" className="h-6 w-6" />
        Login dengan Google
      </Button>
    )
  }
}