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
import { User, UserProfile, UserStats } from "../Database/MonogoDBModels/User/index.js";
import { Doctor, DoctorProfile } from "../Database/MonogoDBModels/Doctor/index.js";
import { Admin, AdminProfile } from "../Database/MonogoDBModels/Admin/index.js";

//importing hash and jwt service
import { hashPassword, comparePassword, generateToken, authenticateJWT } from './services.js';

const authenticateController = async (req, res) => {
    const { role, token } = req.body;
    let decoded;

    try {
        let secretKey;
        switch (role) {
            case "user":
                secretKey = SECRECT_USER_KEY;
                break;
            case "admin":
                secretKey = SECRECT_ADMIN_KEY;
                break;
            case "doctor":
                secretKey = SECRECT_DOCTOR_KEY;
                break;
            default:
                return res.send({
                    success: false,
                    message: "Invalid role specified"
                });
        }

        decoded = await authenticateJWT(token, secretKey);

        if (decoded) {
            return res.send({
                success: true,
                message: "Authenticated Successfully"
            });
        }
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }

    return res.send({
        success: false,
        message: "Authentication failed"
    });
}


const signUpRouteController = async (req, res) => {
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
                newUser = new User({ username, password: newPassword });
                key = SECRECT_USER_KEY;
                break;
            case 'admin':
                newUser = new Admin({ username, password: newPassword });
                key = SECRECT_ADMIN_KEY
                break;
            case 'doctor':
                newUser = new Doctor({ username, password: newPassword });
                key = SECRECT_DOCTOR_KEY;
                break;
        }

        // Save the new user to the appropriate collection
        await newUser.save();
        const userId = newUser._id;
        console.log(userId);

        // Create a profile for the user based on the role
        let userProfile;
        let userStats;
        switch (role) {
            case 'user':
                userStats = new UserStats({userId : userId, patientCreated : 0, testsExecuted : 0, MMSEConducted : 0});
                await userStats.save();
                const statsID = userStats._id;
                userProfile = new UserProfile({ userId: userId, fullName: name, stats : statsID});
                break;
            case 'admin':
                userProfile = new AdminProfile({ userId: userId, fullName: name });
                break;
            case 'doctor':
                userProfile = new DoctorProfile({ userId: userId, fullName: name });
                break;
            default:
                console.log("No Role Match")
        }

        
        await userProfile.save();

        const token = await generateToken({ username, password, userId, role }, key);
        const route = `/${role}`;
        return res.status(200).json({ message: 'User registered successfully', token, route });

    } catch (error) {
        console.error('Error signing up:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const loginRouteController = async (req, res) => {
    const { role, username, password } = req.body;

    try {
        let user;
        switch (role) {
            case 'user':
                user = await User.findOne({ username });
                break;
            case 'admin':
                user = await Admin.findOne({ username });
                break;
            case 'doctor':
                user = await Doctor.findOne({ username });
                break;
            default:
                return res.status(403).json({ message: 'Invalid role specified' });
        }

        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const userId = user._id;
        const key = role === 'user' ? SECRECT_USER_KEY : role === 'admin' ? SECRECT_ADMIN_KEY : SECRECT_DOCTOR_KEY;
        const token = await generateToken({ username, password, role, userId }, key);

        // Respond with token and route
        const route = `/${role}`;
        return res.status(200).json({ message: 'Login successfull', token, route });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { signUpRouteController, loginRouteController, authenticateController };

