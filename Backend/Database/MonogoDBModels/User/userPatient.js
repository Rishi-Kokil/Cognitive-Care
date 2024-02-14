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
// const geneticBiomarkerSchema = new Schema({
//     blood_sugar : String,
//     blood_pressure : String,
// });

// Define schema for the patient
const UserPatientRecordSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile', // Reference to the User who created the patient record
        required: true
    },
    created_at: { type: Date, default: Date.now },
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    height : {
        type : String
    },
    weight : {
        type : String
    },
    gender : {
        type : String
    },

    medicalRecords: [{
        type: String
    }],
    
    mri_image : {
        data : Buffer,
        contentType: String
    },
    // geneticBiomarkers: geneticBiomarkerSchema, // Nesting genetic biomarkers schema
    detectionResults: [DetectionResultSchema], // array of detection results

});

const UserPatient = mongoose.model("UserPatient", UserPatientRecordSchema);

export default UserPatient;
