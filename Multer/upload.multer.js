const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    format: async (req, file) => "jpg", // Force JPG format
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

module.exports = upload;
