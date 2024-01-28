import React from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();

    return (
        <div className="flex justify-center h-[100vh] items-center">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" className="text-center" color="blue-gray">
                    Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-center">
                    Welcome Back!
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Username
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    
                    <Button className="mt-6" fullWidth>
                        Login
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Create an account ?{" "}
                        <span className="font-normal cursor-pointer font-bold text-black"
                            onClick={() => {
                                navigate('/signup')
                            }}>Sign Up</span>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}

export default Login;