//Main Server File
import express from 'express';
import { db } from './Database/index.js';
import adminRouter from './Routers/AdminRouter/index.js';
import userRouter from './Routers/UserRouter/index.js';
import doctorRouter from './Routers/DoctorRouter/index.js';
import { signUpRouteController, loginRouteController, authenticateController } from './Services/login_signup_controllers.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());
app.use("/admin" , adminRouter);
app.use("/user" , userRouter);
app.use("/doctor" , doctorRouter);

app.post("/login" , loginRouteController);
app.post("/signup" , signUpRouteController);
app.post("/authenticate" , authenticateController);



app.listen(8080 , ()=>{
    console.log("Server running on port 8080");
})