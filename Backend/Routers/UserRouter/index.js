import express, { Router } from 'express';
import multer from "multer";
import { authenticateUser } from '../authService.js';
import formidableMiddleware from "express-formidable"
import formidable from "express-formidable";
import { createUserPatientController, managePatientsController, getPatientInfoController, mriImageController, testPatientController } from './middlewares/userMiddleware.js';
import cors from 'cors';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userRouter = express.Router();

//perform authentication
userRouter.use(authenticateUser);
userRouter.use(cors());

userRouter.get("/", (req, res) => {
    res.json({ message : "Your are Authorised"});
});

userRouter.post("/create-patients", formidable() , createUserPatientController);
userRouter.get("/manage-patients" , managePatientsController);
userRouter.get("/get-patient-info" , getPatientInfoController);
userRouter.get("/mri-image/:pid" , mriImageController);
userRouter.post("/test-patient/:pid" , testPatientController);


export default userRouter;