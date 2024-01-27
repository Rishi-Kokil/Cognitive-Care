import mongoose from "mongoose";

const { Schema } = mongoose;


const DetectionResultSchema = new Schema({
    parameter_1 : String,
    accuracy : String,
    recall : String,
    true_positive : String,
    true_negative : String,
    output : String,
});

// Define schema for genetic biomarkers
const geneticBiomarkerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

// Define schema for the patient
const UserPatientRecordSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User who created the patient record
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    medicalRecords: [{
        type: String
    }],
    mriScans: [{
        type: String
    }],
    geneticBiomarkers: [geneticBiomarkerSchema], // Nesting genetic biomarkers schema
    detectionResults: [DetectionResultSchema], 
});

const UserPatient = mongoose.model("UserPatient", UserPatientRecordSchema);

export default UserPatient;
