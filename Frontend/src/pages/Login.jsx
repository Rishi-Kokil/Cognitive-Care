import React, { useState } from 'react'
import {
    Card,
    Input,
    Button,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorState, setErrorState] = useState(null);

    const {login} = useAuth();

    const handleFormSubmit = async (e) => {
        console.log("inside submit");
        if (username !== "" && password !== "" && role) {
            try {
                console.log("test");
                const response = await axios.post("http://localhost:8080/login", {
                    role,
                    username,
                    password
                });

                const dashboardRoute = response.data.route;
                const token = response.data.token;
                // console.log(token + " " + role);
                login(token , role);

                navigate(dashboardRoute);

            } catch (error) {
                console.error("Error signing up:", error);
            }
        }
        else {
            setErrorState("Please Check form Entry")
        }
    }

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

                        <Select
                            size="lg"
                            label="Role"
                            value={role}
                            animate={{
                                mount: { y: 0 },
                                unmount: { y: 25 },
                            }}
                            onChange={(value) => {
                                console.log(value)
                                setRole(value)
                            }}
                        >
                            <Option value="admin">Admin</Option>
                            <Option value="doctor">Doctor</Option>
                            <Option value="user">User</Option>

                        </Select>

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Username
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            onChange={(e)=> setUsername(e.target.value)}
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
                            onChange={(e)=> setPassword(e.target.value)}
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>

                    <Button className="mt-6" fullWidth
                        onClick={handleFormSubmit} 
                    >
                        Login
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Create an account ?{" "}
                        <span className="font-normal cursor-pointer text-black"
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