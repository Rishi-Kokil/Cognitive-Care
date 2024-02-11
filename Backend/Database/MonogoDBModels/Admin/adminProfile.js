import mongoose from "mongoose";
const { Schema } = mongoose;

const adminProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin', // Referencing the User model
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
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'moderator'], // Adjust roles based on your application needs
        default: 'admin' // Default role for admins
    },
    contactNumber: {
        type: String
    },
    avatar: {
        type: String // You can store the URL or path to the avatar image
    },
    activityLogs: [{
        action: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

const AdminProfile = mongoose.model("AdminProfile", adminProfileSchema);

export default AdminProfile;
