import express, { Router } from 'express';
import multer from "multer";
import { authenticateUser } from '../authService.js';
import formidableMiddleware from "express-formidable"
import formidable from "express-formidable";
import { createUserPatientController, managePatientsController, getPatientInfoController, mriImageController, testPatientController, userHomeRouteConstroller, handleTestDelete, updateMRIController, handleDeletePatient} from './middlewares/userMiddleware.js';
import cors from 'cors';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userRouter = express.Router();

userRouter.use(authenticateUser);
userRouter.use(cors());

userRouter.get("/", (req, res) => {
    res.json({ message: "Your are Authorised" });
});

userRouter.post("/test-patient/:pid", testPatientController);
userRouter.post("/create-patients", formidable(), createUserPatientController);
userRouter.post("/updateMRI", formidable(), updateMRIController);
userRouter.post("/deleteTest", handleTestDelete);
userRouter.post("/deletePatient", handleDeletePatient);


userRouter.get("/manage-patients", managePatientsController);
userRouter.get("/get-patient-info", getPatientInfoController);
userRouter.get("/mri-image/:pid", mriImageController);
userRouter.get("/home", userHomeRouteConstroller);



export default userRouter;