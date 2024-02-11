import express from 'express';
import { authenticateAdmin } from '../authService.js';

const doctorRouter = express.Router();

doctorRouter.use(authenticateAdmin);

doctorRouter.get("/", (req, res) => {
    console.log("Inside Doctor router");
});

export default doctorRouter;