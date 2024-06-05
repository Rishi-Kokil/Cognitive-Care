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

        const newpatient = new UserPatient({
            user: profile_id,
            fullName: name,
            age,
            height,
            gender,
        });

        user_profile.patients.push(newpatient._id);
        await user_profile.save();

        if (image) {
            const imageBuffer = fs.readFileSync(image.path);
            const imageContentType = image.type;
            newpatient.mri_image = {
                data: imageBuffer,
                contentType: imageContentType,
            };
        }

        await newpatient.save();

        // Update UserStats after successfully creating a new patient
        const userStats = await UserStats.findOneAndUpdate(
            { userId },
            { $inc: { patientCreated: 1 } },
            { new: true, upsert: true }
        );

        res.status(201).json({
            success: true,
            message: "Patient Created Successfully",
            newpatient,
            userStats,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating patient",
        });
    }
};


const updateMRIController = async (req, res) => {
    const { userId } = req.user;  // assuming req.user is populated by authentication middleware
    const { image } = req.files;
    const { pid } = req.fields;

    try {
        // Find the patient by ID
        const patient = await UserPatient.findById(pid);

        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        // Get the user's profile
        const userProfile = await UserProfile.findOne({ userId });

        if (!userProfile) {
            return res.status(404).send('User profile not found');
        }

        const profileId = userProfile._id;

        // Check if the profile ID matches the patient user field
        if (patient.user.toString() !== profileId.toString()) {
            console.log(profileId + " + " + patient.user);
            console.log("Unauthorised");
            return res.status(403).send({ error: "Unauthorized to update this patient" });
        }

        // Update the MRI image
        if (image) {
            const imageBuffer = fs.readFileSync(image.path);
            const imageContentType = image.type;
            patient.mri_image = {
                data: imageBuffer,
                contentType: imageContentType,
            };
        }

        // Save the updated patient document
        await patient.save();

        // Update UserStats for MRI image updates
        const userStats = await UserStats.findOneAndUpdate(
            { userId },
            { $inc: { mriImagesUpdated: 1 } }, // Assuming you have a field for tracking MRI image updates
            { new: true, upsert: true }
        );

        res.status(200).json({ message: "MRI Image Updated Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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
    try {
        const patient_id = await UserPatient.findById(req.params.pid).select("mri_image");
        if (patient_id.mri_image.data) {
            res.set("Content-type", patient_id.mri_image.contentType);
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

        const patient_image = await UserPatient.findById(req.params.pid).select("mri_image");

        if (patient_image && patient_image.mri_image && patient_image.mri_image.data) {

            const binaryData = patient_image.mri_image.data;
            const imageContentType = patient_image.mri_image.contentType;

            // Create a FormData object and append the image file
            const formData = new FormData();
            formData.append('image', binaryData, { filename: 'image.jpg' });

            // Send the FormData to the Flask server
            const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });

            const updatedPatient = await UserPatient.findByIdAndUpdate(
                req.params.pid,
                {
                    $push: {
                        detectionResults: {
                            result: response.data.result,
                            accuracy: response.data.accuracy,
                        },
                    },
                },
                { new: true }
            );


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
            success: true,
            message: "Stats Found Successfully",
            userStats: userStats
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const handleTestDelete = async (req, res) => {
    const { patient_id: pid, test_id: tid } = req.query;
    const { userId } = req.user; // assuming req.user is populated by authentication middleware

    try {
        // Find the patient by ID
        const patient = await UserPatient.findById(pid);

        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        // Find the detection result by ID and remove it
        const detectionResultIndex = patient.detectionResults.findIndex(result => result._id.toString() === tid);

        if (detectionResultIndex === -1) {
            return res.status(404).send('Detection result not found');
        }

        // Remove the detection result from the array
        patient.detectionResults.splice(detectionResultIndex, 1);

        // Save the updated patient document
        await patient.save();

        // Update UserStats for the number of tests deleted
        const userStats = await UserStats.findOneAndUpdate(
            { userId },
            { $inc: { testsDeleted: 1 } }, // Assuming you have a field for tracking deleted tests
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Test Deleted Successfully",
            userStats
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const handleDeletePatient = async (req, res) => {
    const { patient_id } = req.query;
    const { userId } = req.user; // assuming req.user is populated by authentication middleware

    try {
        // Find the patient by ID
        const patient = await UserPatient.findById(patient_id);

        if (!patient) {
            return res.status(404).send({ message: 'Patient not found' });
        }

        const userProfile = await UserProfile.findOne({ userId });

        if (!userProfile) {
            return res.status(404).send({ message: 'User profile not found' });
        }

        const profileId = userProfile._id;

        if (patient.user.toString() !== profileId.toString()) {
            return res.status(403).send({ message: "Unauthorized to delete this patient" });
        }

        // Delete the patient
        await UserPatient.findByIdAndDelete(patient_id);

        // Remove the patient ID from the user's profile patients array
        userProfile.patients = userProfile.patients.filter(pId => pId.toString() !== patient_id.toString());
        await userProfile.save();

        // Update UserStats after successfully deleting a patient
        const userStats = await UserStats.findOneAndUpdate(
            { userId },
            { $inc: { patientDeleted: 1 } },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Patient Deleted Successfully",
            userStats
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export { createUserPatientController, managePatientsController, getPatientInfoController, mriImageController, testPatientController, userHomeRouteConstroller, handleTestDelete, updateMRIController, handleDeletePatient };



