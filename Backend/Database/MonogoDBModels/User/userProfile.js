import mongoose from "mongoose";

const { Schema } = mongoose;

const userProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'UserPatient'
    }], 
    joinedCommunity: [{
        type: Schema.Types.ObjectId,
        ref: 'CommunityGroup' // Reference to the community groups the user has joined
    }],
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
