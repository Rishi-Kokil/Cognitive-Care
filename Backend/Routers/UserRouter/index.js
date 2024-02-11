import express, { Router } from 'express';
import { authenticateUser } from '../authService.js';

const userRouter = express.Router();

//perform authentication
userRouter.use(authenticateUser);

userRouter.get("/", (req, res) => {
    console.log("Inside User Router");
});


export default userRouter;