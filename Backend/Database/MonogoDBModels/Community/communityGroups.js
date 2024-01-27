import mongoose from "mongoose";

const { Schema } = mongoose;

const communityGroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    admins : [{ 
        type : Schema.Types.ObjectId ,
        ref : 'User'
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    doctors : [{
        type : Schema.Types.ObjectId,
        ref : 'Doctor',
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    // Add other fields as needed
});

const CommunityGroup = mongoose.model("CommunityGroup", communityGroupSchema);

export default CommunityGroup;
