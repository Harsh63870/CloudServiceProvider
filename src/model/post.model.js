const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        imageFileId: {
            type: String,
        },
        caption: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
