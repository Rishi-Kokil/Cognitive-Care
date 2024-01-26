//Main Server File
import express from 'express';
import { db } from './Database/index.js';
import adminRouter from './Routers/AdminRouter/index.js';
import userRouter from './Routers/UserRouter/index.js';
import doctorRouter from './Routers/DoctorRouter/index.js';

const app = express();

app.use("/admin" , adminRouter);
app.use("/user" , userRouter);
app.use("/doctor" , doctorRouter);

app.post("/login" , ()=>{});
app.post("/register" , ()=>{});


app.listen(8080 , ()=>{
    console.log("Server running on port 8080");
})