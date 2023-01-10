import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { auth } from "../firebase/Firebase.init";

export const AuthContex = createContext()

export const AuthContexProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })

        return () => {
            unsubscribe()
        }
    }, []);

    return (
        <AuthContex.Provider value={{ currentUser }}>
            {children}
        </AuthContex.Provider>
    )
}