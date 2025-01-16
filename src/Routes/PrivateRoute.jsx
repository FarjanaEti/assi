import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRout = ({children}) => {                       
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
  

    if(loading){
        return <span className="loading loading-ring loading-lg"></span>
    }

    if(user && user?.email){
        return children
    }
    else{
        {user ? children : <Navigate to="/login" />} 
       }
    return <Navigate to="/login" state={location?.pathname}></Navigate>
};

export default PrivateRout;