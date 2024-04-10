import mongoose from "mongoose";

const { Schema } = mongoose;

const MMSESchema = new Schema({
    OrientationSectionMarks : Number,
    RegistrationSectionMarks : Number,
    VisuospatialSectionMarks : Number,
    LanguageSectionMarks : Number,
    RecallSectionMarks : Number,
    TimeStamp: { type: Date, default: Date.now },
})

const DetectionResultSchema = new Schema({
    result : String,
    accuracy : String,
    TimeStamp : { type: Date, default: Date.now },
});

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
    MMSETestResults : [MMSESchema],

});

const UserPatient = mongoose.model("UserPatient", UserPatientRecordSchema);

export default UserPatient;
