import { createContext, useEffect, useState } from "react";
import { auth } from "../googledatebase/config.js";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

//---UPDATES IF USER IS SIGNED IN OR NOT---
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};