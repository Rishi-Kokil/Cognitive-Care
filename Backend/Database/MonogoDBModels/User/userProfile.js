import { ref } from "firebase/database";
import mongoose from "mongoose";

const { Schema } = mongoose;

const userProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
    },
    stats : {
        type : Schema.Types.ObjectId,
        ref : "UserStats",
    },
    created_at: { type: Date, default: Date.now },
    fullName: {
        type: String,
        required: true
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
