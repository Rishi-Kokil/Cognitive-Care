import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user', 'doctor'],
        default: 'user'
    },
});

const User = mongoose.model("User" , userSchema);

export default User;

