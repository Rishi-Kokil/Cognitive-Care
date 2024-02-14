import mongoose from "mongoose";

const { Schema } = mongoose;

const doctorProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor', // Referencing the User model
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'DoctorPatient'
    }], 
    joinedCommunity: [{
        type: Schema.Types.ObjectId,
        ref: 'CommunityGroup' // Reference to the community groups the user has joined
    }],
});

const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);

export default DoctorProfile;
