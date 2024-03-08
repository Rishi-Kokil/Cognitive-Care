import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Button } from '@material-tailwind/react';

function PageNotFound() {
    const navigate = useNavigate();
    const {role} = useAuth();
    return (
        <>
            <div class="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
                <div class="rounded-lg bg-white p-8 text-center shadow-xl">
                    <h1 class="mb-4 text-4xl font-bold">404</h1>
                    <p class="text-gray-600 my-2">Oops! The page you are looking for could not be found.</p>
                    {/* <a href="/" class="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"> </a> */}
                    <Button
                        onClick={()=>{ navigate(`/${role}`)}}
                        className='mt-2 hover:shadow-xl'
                    >  Go back to Home </Button>
                </div>
            </div>
        </>
    )
}

export default PageNotFound;