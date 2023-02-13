import React, { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

/**
 * Checks the auth for the application -> check whether a user
 * is signed in.
 * @returns an auth user instance, if a user is signed in.
 */
export function useAuth() {
    const [user, setUser] = React.useState<User>();

    useEffect(() => {
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(undefined);
            }
        })
        return unsubscribeFromAuthStateChanged; 
    }, []);

    return {
        user
    };
}