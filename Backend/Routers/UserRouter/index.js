import express from 'express';

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    console.log("Inside User Router");
});


export default userRouter;