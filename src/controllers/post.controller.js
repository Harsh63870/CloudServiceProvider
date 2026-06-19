const Post = require('../model/post.model');
const { uploadImage, deleteImage } = require('../services/storage.service');

async function getAllPosts(req, res) {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
}

async function getPostById(req, res) {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ success: false, message: 'Post nahi mili' });
    }

    res.status(200).json({ success: true, data: post });
}

async function createPost(req, res) {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Image file bhejna zaroori hai' });
    }

    const { caption } = req.body;
    if (!caption || !caption.trim()) {
        return res.status(400).json({ success: false, message: 'Caption likhna zaroori hai' });
    }

    const { url, fileId } = await uploadImage(req.file);

    const post = await Post.create({
        image: url,
        imageFileId: fileId,
        caption: caption.trim(),
    });

    res.status(201).json({ success: true, message: 'Post ban gayi!', data: post });
}

async function updatePost(req, res) {
    const { caption } = req.body;

    if (!caption || !caption.trim()) {
        return res.status(400).json({ success: false, message: 'Naya caption likhna zaroori hai' });
    }

    const post = await Post.findByIdAndUpdate(
        req.params.id,
        { caption: caption.trim() },
        { new: true, runValidators: true }
    );

    if (!post) {
        return res.status(404).json({ success: false, message: 'Post nahi mili' });
    }

    res.status(200).json({ success: true, message: 'Post update ho gayi', data: post });
}

async function deletePost(req, res) {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ success: false, message: 'Post nahi mili' });
    }

    await deleteImage(post.imageFileId);
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Post delete ho gayi' });
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
