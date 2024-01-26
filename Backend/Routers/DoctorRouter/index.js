import express from 'express';


const doctorRouter = express.Router();


doctorRouter.get("/", (req, res) => {
    console.log("Inside Doctor router");
});

export default doctorRouter;