import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    username: { 
        type: String,
        unique: true
    },
    password: String,
});

const Doctor = mongoose.model("Doctor" , doctorSchema);

export default Doctor;