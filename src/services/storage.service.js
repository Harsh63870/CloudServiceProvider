require('dotenv').config();

const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadImage(file) {
    const result = await imagekit.files.upload({
        file: await toFile(file.buffer, file.originalname),
        fileName: file.originalname || 'image.jpg',
    });

    return {
        url: result.url,
        fileId: result.fileId,
    };
}

async function deleteImage(fileId) {
    if (!fileId) return;
    await imagekit.files.delete(fileId);
}

module.exports = { uploadImage, deleteImage };
