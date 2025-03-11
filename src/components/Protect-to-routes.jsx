import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { GlobalContext } from './GlobalContextState'

const ProtectToRoutes = ({ children }) => {
    const location=useLocation();
    const {loading, user } = useContext(GlobalContext);

    if(loading){
        return <div>Loading...</div>
    } 
    if (!user && location.pathname.includes('profile')) {
        return <Navigate to="/login" />;
    }
    
    if(user && (location.pathname.includes('login') || location.pathname.includes('register')) ){
        return <Navigate to={'/profile'} />
    }

    return children
}

export default ProtectToRoutes