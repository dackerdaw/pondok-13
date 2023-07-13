'use client'

import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "./firebase-config";

export const AuthContext = createContext<User | null>(null)

export const useAuthContext = () => useContext(AuthContext);

// this provider was placed on the root layout
// might want to fix this so it's deeper in the tree
// to improve ssr
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <AuthContext.Provider value={ user }>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};