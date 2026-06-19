const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload.middleware');
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/post.controller');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', upload.single('image'), createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
