const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer-Cloudinary Storage Engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blogEdge', // folder name in your cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

module.exports = { cloudinary, storage };
