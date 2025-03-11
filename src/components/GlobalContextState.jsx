import React, { createContext, use, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import auth from '../helpers/firebase'

export const GlobalContext = createContext(null)
const GlobalContextState = ({ children }) => {
    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    function onRegisterSubmit() {
        const { email, password } = registerFormData;
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        setLoading(true);
        const checkAuthState = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false);
        });
        return () => {
            checkAuthState();
        }
    }, [user])


    function handleLogout() {
        try {
            setLoading(true);
            signOut(auth);
            setLoading(false);
        } catch (error) {
            console.error(error)
            setLoading(false);
        }
    }

    const [loginFormData,setLoginFormData]=useState({
        email:'',
        password:''
    })

    function onLoginSubmit(){
        const {email,password}=loginFormData;
        console.log(email,password)
        return signInWithEmailAndPassword(auth,email,password);
    }
    // console.log(loginFormData)


    return <GlobalContext.Provider value={{onLoginSubmit,loginFormData,setLoginFormData, loading, setLoading, handleLogout, user, setUser, registerFormData, setRegisterFormData, onRegisterSubmit }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContextState