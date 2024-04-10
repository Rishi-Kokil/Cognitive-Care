import { error, log } from "console";
import { UserPatient, User, UserProfile, UserStats } from "../../../Database/MonogoDBModels/User/index.js";
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

const createUserPatientController = async (req, res) => {
    try {
        const { image } = req.files;
        const { name, age, height, weight, gender } = req.fields;

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !age:
                return res.status(500).send({ error: "Description is Required" });
            case !height:
                return res.status(500).send({ error: "Price is Required" });
            case !weight:
                return res.status(500).send({ error: "Category is Required" });
            case image && image.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const { username, password, userId, role } = req.user;
        const user_profile = await UserProfile.findOne({ userId });
        const profile_id = user_profile._id;

        const newpatient = new UserPatient({ user: profile_id, fullName: name, age, height, gender });
        //updating profile
        user_profile.patients.push(newpatient._id);
        await user_profile.save();

        if (image) {
            const imageBuffer = fs.readFileSync(image.path);
            const imageContentType = image.type;
            newpatient.mri_image = {
                data: imageBuffer,
                contentType: imageContentType
            };
        }

        await newpatient.save();
        res.status(201).json({
            success: true,
            message: "Patient Created Successfully",
            newpatient
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in crearing product",
        });
    }

}

const managePatientsController = async (req, res) => {
    const { username, password, userId, role } = req.user;
    try {
        const profile = await UserProfile.findOne({ userId });
        const patientList = profile.patients;

        const patients = await UserPatient.find({ _id: { $in: patientList } });

        res.status(200).json({
            success: true,
            counTotal: patientList.length,
            message: "ALL Patient",
            patients,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting Patients",
            error: error.message,
        });
    }
}

const getPatientInfoController = async (req, res) => {
    const patient_id = req.query.patient_id;
    console.log(patient_id);
    try {
        const patient = await UserPatient.findById(patient_id);
        res.send({
            success: "True",
            message: "Patient Found",
            error: error.message,
            patient
        });
    }
    catch (error) {
        res.status(500).send({
            success: "false",
            message: "Cannot Find Patient",
            error: error.message
        })
    }

}


const mriImageController = async (req, res) => {
    console.log("Reached MRI Route");
    try {
        const patient_id = await UserPatient.findById(req.params.pid).select("mri_image");
        if (patient_id.mri_image.data) {
            res.set("Content-type", patient_id.mri_image.contentType);
            console.log("Image Sent Back successfully");
            return res.status(200).send(patient_id.mri_image.data);
        }
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

const testPatientController = async (req, res) => {
    const { username, password, userId, role } = req.user;
    try {
        // Retrieve the MRI image data from MongoDB
        const patient_id = await UserPatient.findById(req.params.pid).select("mri_image");

        if (patient_id && patient_id.mri_image && patient_id.mri_image.data) {

            const binaryData = patient_id.mri_image.data;
            const imageContentType = patient_id.mri_image.contentType;

            // Create a FormData object and append the image file
            const formData = new FormData();
            formData.append('image', binaryData, { filename: 'image.jpg' });

            // Send the FormData to the Flask server
            const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });

            // Send the output from the AI model to the frontend through the backend
            res.send({
                success: true,
                result: response.data.result,
                accuracy: response.data.accuracy
            });
        } else {
            // MRI image data not found
            res.send({
                success: false,
                message: 'MRI image data not found for the specified patient ID'
            });
        }
    } catch (error) {
        // console.error(error);
        res.send({
            success: false,
            message: error.message
        });
    }
}


const userHomeRouteConstroller = async (req, res) => {
    const { username, password, userId, role } = req.user;
    try {
        const userStats = await UserStats.findOne({ userId: userId });
        res.json({
            success : true,
            message : "Stats Found Successfully",
            userStats : userStats
        });
    } catch (error) {
        res.json({
            success : false,
            message : error.message
        })
    }
}


export { createUserPatientController, managePatientsController, getPatientInfoController, mriImageController, testPatientController, userHomeRouteConstroller };



