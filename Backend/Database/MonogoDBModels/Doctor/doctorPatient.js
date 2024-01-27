import mongoose from "mongoose";

const { Schema } = mongoose;

const DetectionResultSchema = new Schema({
    parameter_1: String,
    accuracy: String,
    recall: String,
    true_positive: String,
    true_negative: String,
    output: String,
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


const doctorPatientSchema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientName: {
        type: String,
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

const DoctorPatient = mongoose.model("DoctorPatient", doctorPatientSchema);

export default DoctorPatient;
