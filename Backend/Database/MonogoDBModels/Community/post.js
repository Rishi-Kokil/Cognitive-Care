import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who created the post
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    images: [{
        type: String // Array of image URLs
    }],
    videos: [{
        type: String // Array of video URLs
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment' // Reference to comments on this post
    }],
    communityGroup: {
        type: Schema.Types.ObjectId,
        ref: 'CommunityGroup' // Reference to the community group this post belongs to
    },
    likeCount: {
        type: Number,
        default: 0
    }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
