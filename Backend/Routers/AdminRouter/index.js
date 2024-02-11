import express from 'express';
import {authenticateAdmin} from "../authService.js"


const adminRouter = express.Router();

adminRouter.use(authenticateAdmin); //performs authentication for all incoming request

adminRouter.get("/" , (req,res)=>{
    res.send("Inside Admin Router");
});


export default adminRouter;