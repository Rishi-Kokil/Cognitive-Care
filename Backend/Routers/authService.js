import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentParentParentDir = path.resolve(__dirname, '../../');
const envPath = path.resolve(parentParentParentDir, '.env');
dotenv.config({ path: envPath });

const { SECRECT_ADMIN_KEY, SECRECT_USER_KEY, SECRECT_DOCTOR_KEY } = process.env;

//importing authenticate jwt
import { authenticateJWT } from '../Services/services.js';

const authenticateUser = async (req, res, next) => {
    const header = req.headers.authorization;
    if (header) {
        try {
            const token = header.split(" ")[1];
            const data = await authenticateJWT(token, SECRECT_USER_KEY);
            req.user = data;
            next();
        } catch (error) {
            res.status(403).json({ message: error.message });
        }
    }
    else {
        res.status(403).json({ message: "Unauthorized" });
    }
}

const authenticateAdmin = async (req, res, next) => {
    const header = req.headers.authorization;
    if (header) {
        try {
            const token = header.split[0];
            const data = await authenticateJWT(token, SECRECT_ADMIN_KEY);
            req.user = data;
            next();
        } catch (error) {
            res.status(403).json({ message: error.message });
        }
    }
    else {
        res.status(403).json({ message: "Unauthorized" });
    }
}

const authenticateDoctor = async (req, res, next) => {
    const header = req.headers.authorization;
    if (header) {
        try {
            const token = header.split[0];
            const data = await authenticateJWT(token, SECRECT_DOCTOR_KEY);
            req.user = data;
            next();
        } catch (error) {
            res.status(403).json({ message: error.message });
        }
    }
    else {
        res.status(403).json({ message: "Unauthorized" });
    }
}

export {authenticateUser , authenticateAdmin , authenticateDoctor};