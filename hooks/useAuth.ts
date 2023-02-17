import React, { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { LocalData } from "../LocalData/LocalData";

/**
 * Checks the auth for the application -> check whether a user
 * is signed in.
 * @returns an auth user instance, if a user is signed in.
 */
export function useAuth() {
    const [user, setUser] = React.useState<User>();

    useEffect(() => {
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in
                setUser(user);
                await LocalData.initCurrentUser();
            } else {
                // User is signed out
                setUser(undefined);
                await LocalData.initCurrentUser();
            }
        })
        return unsubscribeFromAuthStateChanged; 
    }, []);

    return {
        user
    };
}