
import React, { useEffect } from 'react';
import { AuthComponent } from './authContext';

function ContextWrapper({ children }) {
    useEffect(()=>{
        console.log("inside wrapper");
    },[])
    return (
        <AuthComponent>
            {children}
        </AuthComponent>
    );
}

export default ContextWrapper;