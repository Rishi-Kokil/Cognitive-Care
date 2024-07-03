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
                className='h-[99vh] w-full shadow-xl shadow-blue-gray-900/5 overflow-y-auto'
            >
                <Outlet />
            </Card>
        </>
    );
}

export default MMSE;


