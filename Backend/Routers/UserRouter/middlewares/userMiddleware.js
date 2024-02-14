import { log } from "console";
import { UserPatient, User, UserProfile } from "../../../Database/MonogoDBModels/User/index.js";
import fs from 'fs';

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
        await newpatient.save();

        //updating profile
        user_profile.patients.push(newpatient._id);
        await user_profile.save();


        if (image) {
            newpatient.mri_image.data = fs.readFileSync(image.path);
            newpatient.mri_image.contentType = image.type;
        }


        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
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

const managePatientsController = async (req , res) => {
    console.log(req);
    const { username, password, userId, role } = req.user;
    try {
        const profile = await UserProfile.findOne({ userId });
        const patientList = profile.patients;

        const patients = await UserPatient.find({ _id: { $in: patientList } });

        res.status(200).json({
            success: true,
            counTotal: patientList.length,
            message: "ALL Patient ",
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


export { createUserPatientController, managePatientsController};



