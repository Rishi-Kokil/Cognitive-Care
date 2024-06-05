import mongoose from 'mongoose';
const { Schema } = mongoose;

const userStatsSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
    },
    
    patientCreated : {
        type : Number
    },

    patientDeleted : {
        type : Number
    },

    testsExecuted : {
        type : Number
    },

    testsDeleted : {
        type : Number
    },

    MMSEConducted : {
        type : Number,
    }
})

const UserStats = mongoose.model("UserStats", userStatsSchema);

export default UserStats;