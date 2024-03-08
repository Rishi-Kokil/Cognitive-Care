import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';


function MMSE() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("patient-list");
     }, []);
    return (
        <>
            <Outlet />
        </>
    );
}

export default MMSE;


