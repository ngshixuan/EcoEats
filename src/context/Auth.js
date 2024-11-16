/* 
In React, Context provides a way to pass data through the component
tree without having to pass props manually at every level

*/

import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase-config";

//"children" refers to the component you are trying to use this box, for example <Header>, <Shop>
// this is a context provider component, which will wrap any part of the app that needs access to the auth context
export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(()=> {
        setLoading(true);

        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading
    }

    // AuthContext.Provider -> this context provider makes the aith state and the functions available to
    //                         any component wrapped by <AuthProvider>
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider;