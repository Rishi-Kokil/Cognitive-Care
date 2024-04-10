import { Card } from '@material-tailwind/react';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';


function MMSE() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("patient-list");
     }, []);
    return (
        <>
            <Card
                className='h-[calc(100vh-2rem)] w-full p-8 shadow-xl shadow-blue-gray-900/5 overflow-y-auto'
            >
                <Outlet />
            </Card>
        </>
    );
}

export default MMSE;


