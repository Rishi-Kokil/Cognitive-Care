
import React, { useEffect } from 'react';
import { AuthComponent } from './authContext';
import { MMSEContextWrapper } from './MMSEContext';
import { AxiosContextWrapper } from './axiosContext';


function ContextWrapper({ children }) {
    useEffect(() => {
        console.log("inside wrapper");
    }, [])
    return (
        <AuthComponent>
            <AxiosContextWrapper>
                <MMSEContextWrapper>
                    {children}
                </MMSEContextWrapper>
            </AxiosContextWrapper>
        </AuthComponent>
    );
}

export default ContextWrapper;