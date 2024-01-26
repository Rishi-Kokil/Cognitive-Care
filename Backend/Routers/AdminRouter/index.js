import express from 'express'
import adminauthentication from './adminRoutesController/adminAuthentication.js';

const adminRouter = express.Router();

adminRouter.use(adminauthentication); //performs authentication for all incoming request

adminRouter.get("/" , (req,res)=>{
    res.send("Inside Admin Router");
});



export default adminRouter;