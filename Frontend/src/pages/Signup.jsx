import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../context/authContext";

// const backendURL = "http://localhost:8080"

const Signup = () => {
    const [role, setRole] = useState(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorState, setErrorState] = useState(null);

    const navigate = useNavigate();
    const {isAuthenticated , token, login, logout} = useAuth();

    const handleFormSubmit = async (e) => {
        if (name !== "" && username !== "" && password !== "" && role) {

            try {
                console.log("test");
                const response = await axios.post("http://localhost:8080/signup", {
                    role,
                    name,
                    username,
                    password
                });

                const dashboardRoute = response.data.route;
                const token = response.data.token;
                login(token , role);
                navigate(dashboardRoute);

            } catch (error) {
                console.error("Error signing up:", error);
            }
        }
        else{
            setErrorState("Please Check form Entry")
        }
    }

    return (
        <div className="flex justify-center h-[100vh] items-center">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" className="text-center" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-center">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                >
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
                            Your Name
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Eg. John"
                            value={name}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            onChange={(e) => setName(e.target.value)}
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Username
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            value={username}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={password}
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            onChange={(e) => setPassword(e.target.value)}
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6" fullWidth
                        onClick={handleFormSubmit}
                    >
                        Sign Up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <span className="font-normal cursor-pointer text-black"
                            onClick={() => {
                                navigate('/login')
                            }}>Login</span>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}

export default Signup;