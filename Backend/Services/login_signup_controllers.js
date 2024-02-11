import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parentParentParentDir = path.resolve(__dirname, '../../');
const envPath = path.resolve(parentParentParentDir, '.env');
dotenv.config({ path: envPath });

const { SECRECT_ADMIN_KEY, SECRECT_USER_KEY, SECRECT_DOCTOR_KEY } = process.env;

//mongodb models
import { User, UserProfile } from "../Database/MonogoDBModels/User/index.js";
import { Doctor, DoctorProfile } from "../Database/MonogoDBModels/Doctor/index.js";
import { Admin, AdminProfile } from "../Database/MonogoDBModels/Admin/index.js";

//importing hash and jwt service
import { hashPassword, comparePassword, generateToken } from './services.js';


const signUpRouteController = async (req, res) => {
    console.log(req);
    console.log(req.body);
    const { role, name, username, password } = req.body;

    try {
        // Check if the username already exists in the appropriate collection based on the role
        let existingUser;
        switch (role) {
            case 'user':
                existingUser = await User.findOne({ username });
                break;
            case 'admin':
                existingUser = await Admin.findOne({ username });
                break;
            case 'doctor':
                existingUser = await Doctor.findOne({ username });
                break;
            default:
                return res.status(403).json({ message: 'Invalid role specified' });
        }

        if (existingUser) {
            return res.status(403).json({ message: 'Username already exists' });
        }
        //hashing the password
        const newPassword = await hashPassword(password);

        let newUser;
        let key;
        switch (role) {
            case 'user':
                newUser = new User({ username, newPassword });
                key = SECRECT_USER_KEY;
                break;
            case 'admin':
                newUser = new Admin({ username, newPassword });
                key = SECRECT_ADMIN_KEY
                break;
            case 'doctor':
                newUser = new Doctor({ username, newPassword });
                key = SECRECT_DOCTOR_KEY;
                break;
        }

        // Save the new user to the appropriate collection
        await newUser.save();
        const userId = newUser._id;

        // Create a profile for the user based on the role
        let userProfile;
        switch (role) {
            case 'user':
                userProfile = new User({ userId: userId, fullName: name });
                break;
            case 'admin':
                userProfile = new Admin({ userId: userId, fullName: name });
                break;
            case 'doctor':
                userProfile = new Doctor({ userId: userId, fullName: name });
                break;
        }

        const token = await generateToken({ username, password, userId, role }, key);
        const route =  `/${role}`;
        return res.status(200).json({ message: 'User registered successfully', token ,route });

    } catch (error) {
        console.error('Error signing up:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export { signUpRouteController };